import React from "react";
import ReactHtmlParser from "react-html-parser";
import { Link, useHistory } from "react-router-dom";
import { MdModeEdit, MdDelete } from "react-icons/md";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import { toast } from "react-toastify";
const ManageCollectionCards = ({ id, data }) => {
  const { date, description, name, userId } = data;
  const history = useHistory();
  const deleteCollection = () => {
    let storageRef = firebase.storage().ref().child(`${name}`).listAll();
    storageRef.then((snapshot) => {
      // console.log(snapshot.items);
      let items = snapshot.items;
      let imgrefs = [];
      let promises = [];
      items.forEach((item) => {
        // console.log(item.fullPath);
        imgrefs.push(item.fullPath);
      });
      // console.log(imgrefs);
      imgrefs.forEach((imgref) => {
        let deleteTask = firebase.storage().ref().child(`${imgref}`);
        deleteTask.delete();
        promises.push(deleteTask);
      });
      Promise.all(promises).then(() => {
        // console.log("ALL FILES DELETED");
        firebase
          .firestore()
          .collection("Collections")
          .doc(`${id}`)
          .delete()
          .then(() => {
            // console.log("DOC FROM COLLECTIONS DELETED");
            firebase
              .firestore()
              .collection("users")
              .doc(`${userId}`)
              .update({
                collections: firebase.firestore.FieldValue.arrayRemove(id),
              })
              .then((snapshot) => {
                // console.log("COLLECTION REMOVED FROM USER DOC");
                setTimeout(() => {
                  history.push("/admin");
                }, 5000);
                return toast.success("COLLECTION DELETED");
              });
          });
      });
    });
    // console.log(storageRef);
  };
  return (
    <>
      <div
        class="card mb-3 w-75 h-75 mx-auto rounded-3 bg-light bg-gradient"
        style={{ boxShadow: "19px 13px 30px 6px rgba(0,0,0,0.34)" }}
      >
        <div class="card-body">
          <h5 class="card-title text-center text-dark">{name}</h5>
          <p class="card-text text-center text-dark">
            {ReactHtmlParser(description)}
          </p>
          <div className="d-flex justify-content-between">
            <p class="card-text">
              <small class="text-muted">{date}</small>
            </p>
            <div>
              <Link to={`/updateCollection/${id}`}>
                <button className="btn btn-dark px-3 me-2">
                  <MdModeEdit style={{ width: "1.5em", height: "1.5em" }} />
                </button>
              </Link>
              <button className="btn btn-dark px-3" onClick={deleteCollection}>
                <MdDelete style={{ width: "1.5em", height: "1.5em" }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageCollectionCards;
