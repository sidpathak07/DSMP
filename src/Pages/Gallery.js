import React, { useContext, useState } from "react";
import { useEffect } from "react";
import Base from "../Components/Base";
import { UserContext } from "../Context/UserContext";
import { Spinner } from "react-bootstrap";
import firebase from "firebase/app";
import "firebase/firestore";
import CollectionCard from "../Components/CollectionCard";
const Gallery = () => {
  const { collections, setCollections } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  // document.addEventListener("contextmenu", (e) => {
  //   e.preventDefault();
  // });
  useEffect(() => {
    let col = [];
    setIsLoading(true);
    firebase
      .firestore()
      .collection("Collections")
      .where("isPublic", "==", true)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          let data = {};
          data["id"] = doc.id;
          data["data"] = doc.data();
          col.push(data);
        });
        setCollections(col);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Base>
        {isLoading && (
          <div className="text-center mt-5">
            <Spinner
              className="text-center"
              animation="border"
              role="status"
              style={{ color: "#000000" }}
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        {!isLoading && (
          <div>
            {collections.map((col, index) => {
              return (
                <CollectionCard id={col.id} data={col.data} index={index} />
              );
            })}
          </div>
        )}
      </Base>
    </div>
  );
};
export default Gallery;
