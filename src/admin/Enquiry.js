import React from "react";
import Base from "../Components/Base";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/firestore";
import { useState } from "react";
import { Spinner, Card, ListGroup } from "react-bootstrap";
import { useEffect } from "react";
import EnquiryCard from "./EnquiryCard";
const Enquiry = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    let enquiry = [];

    firebase
      .firestore()
      .collection("enquiry")
      .where("enquiryComplete", "==", false)
      .get()
      .then((snapshot) => {
        setIsLoading(false);
        // setEnquiries(snapshot.docs);
        snapshot.docs.forEach((doc) => {
          let enq = {};
          enq["id"] = doc.id;
          enq["data"] = doc.data();
          enquiry.push(enq);
        });
        setEnquiries(enquiry);
        // console.log(enquiry);
      })
      .catch((error) => {
        setIsLoading(false);
        // console.log("ERROR LOADING ENQUIRIES:", error);
      });
  }, []);

  return (
    <div>
      <Base>
        <Link to="/admin" className="btn btn-md btn-dark my-3">
          Admin Home
        </Link>
        <h1 className="text-center">Enquiries</h1>
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
            {enquiries.length === 0 && (
              <h1 className="text-center">No Enquiries</h1>
            )}
            {enquiries.map((enquiry) => {
              return <EnquiryCard details={enquiry} />;
            })}
          </>
        )}
      </Base>
    </div>
  );
};
export default Enquiry;
