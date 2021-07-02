import React from "react";
import Base from "../Components/Base";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/firestore";
import { useState } from "react";
import { Spinner, Card, ListGroup } from "react-bootstrap";
import { useEffect } from "react";
import ConfirmationCard from "./ConfirmationCard";
const Confirmations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmations, setConfirmations] = useState([]);
  useEffect(() => {
    let confirm = [];
    setIsLoading(true);
    firebase
      .firestore()
      .collection("confirmations")
      .orderBy("timestamp", "desc")
      .limit(5)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc, index) => {
          let data = {};
          data["id"] = doc.id;
          data["data"] = doc.data();
          confirm.push(data);
          console.log(data);
        });
        setConfirmations(confirm);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Base>
        <Link to="/admin" className="btn btn-md btn-dark my-3">
          Admin Home
        </Link>
        <h1 className="text-center">CONFIRMATION'S</h1>
        {isLoading ? (
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
        ) : (
          <>
            {confirmations.length === 0 && (
              <h1 className="text-center">No Latest Confirmation's</h1>
            )}

            {confirmations.map((confirmation) => {
              return (
                <ConfirmationCard
                  data={confirmation.data}
                  id={confirmation.id}
                />
              );
            })}
          </>
        )}
      </Base>
    </div>
  );
};
export default Confirmations;
