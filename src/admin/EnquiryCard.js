import React from "react";
import { useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import firebase from "firebase/app";
import "firebase/firestore";
export default function EnquiryCard({ details }) {
  const { data, id } = details;
  const [mark, setMark] = useState(false);
  const {
    name,
    email,
    contactNumber,
    date,
    eventDetails,
    weddingStyles,
    workDetails,
    workSeen,
  } = data;

  const handleMark = (id) => {
    firebase
      .firestore()
      .collection("enquiry")
      .doc(`${id}`)
      .update({
        enquiryComplete: true,
      })
      .then((snapshot) => {
        setMark(true);
        console.log("DOCUMENT", snapshot.doc.data());
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Card style={{ width: "50%" }} className="my-3">
        <ListGroup variant="flush">
          <ListGroup.Item>
            {" "}
            <b>Name:</b> {name}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Email:</b>
            {email}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Contact Number:</b>
            {contactNumber}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Date:</b>
            {date}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Event Details:</b>
            {eventDetails}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>
              In What Styles do you expect us to photograph and film your
              wedding.Select Your Choices:
            </b>
            {weddingStyles.map((element) => {
              return <li>{element}</li>;
            })}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>How did you hear of us? Have you seen our work? :</b>
            {workDetails}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Where did you see our work most recently?:</b>
            {workSeen}
          </ListGroup.Item>
        </ListGroup>
        <Card.Body>
          {mark ? (
            <button className="btn btn-success">
              Marked as Completed <FaCheck />{" "}
            </button>
          ) : (
            <button className="btn btn-success" onClick={() => handleMark(id)}>
              Mark as Complete <FaCheck />{" "}
            </button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
