import React from "react";
import Base from "../Components/Base";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { Spinner } from "react-bootstrap";
import ManageCollectionCards from "./ManageCollectionCards";
const ManageCollections = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [collections, setCollections] = useState([]);
  useEffect(() => {
    let col = [];
    setIsLoading(true);
    firebase
      .firestore()
      .collection("Collections")
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
        <Link to="/admin" className="btn btn-md btn-dark my-3">
          Admin Home
        </Link>
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
                <ManageCollectionCards
                  id={col.id}
                  data={col.data}
                  index={index}
                />
              );
            })}
          </div>
        )}
      </Base>
    </div>
  );
};

export default ManageCollections;
