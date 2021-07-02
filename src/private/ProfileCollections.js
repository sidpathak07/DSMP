import React, { useState, useEffect } from "react";
import Base from "../Components/Base";
import { Spinner } from "react-bootstrap";
import firebase from "firebase/app";
import "firebase/firestore";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { useParams } from "react-router-dom";
import ProfileCollectionCard from "./ProfileCollectionCard";
const ProfileCollections = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [collections, setCollections] = useState([]);
  const [profile, setProfile] = useState({});

  // document.addEventListener("contextmenu", (e) => {
  //   e.preventDefault();
  // });
  useEffect(() => {
    setCollections([]);
    setIsLoading(true);
    firebase
      .firestore()
      .collection("users")
      .doc(`${id}`)
      .get()
      .then((snapshot) => {
        let collection = snapshot.data().collections;
        collection.forEach((coll) => {
          firebase
            .firestore()
            .collection("Collections")
            .doc(`${coll}`)
            .get()
            .then((snapshot) => {
              let data = {};
              data["id"] = snapshot.id;
              data["data"] = snapshot.data();
              console.log(snapshot.data());
              setCollections((prevState) => [...prevState, data]);
            });
        });
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Base>
        {isLoading && (
          <div className="text-center">
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
            {collections.length === 0 && (
              <h1 className="text-center">No Collections Available</h1>
            )}
          </div>
        )}
        {!isLoading && (
          <div>
            {collections.map((collection) => {
              return (
                <ProfileCollectionCard
                  id={collection.id}
                  data={collection.data}
                />
              );
            })}
          </div>
        )}
      </Base>
    </div>
  );
};

export default ProfileCollections;
