import React from "react";
import { Card, ListGroup } from "react-bootstrap";

const ConfirmationCard = ({ data, id }) => {
  const {
    email,
    nameOfBride,
    nameOfGroom,
    contactDetailsOfBride,
    contactDetailsOfGroom,
    residentialAddress,
    residentialAddressAfterWedding,
    photographyDates,
    ceremonyTimingsAndLocations,
    covid19Measures,
    agreementForm,
    requirementsAndInstructions,
  } = data;
  return (
    <div>
      <Card style={{ width: "50%" }} className="my-3">
        <ListGroup variant="flush">
          <ListGroup.Item>
            <b>Email:</b>
            {email}
          </ListGroup.Item>
          <ListGroup.Item>
            {" "}
            <b>Name of Bride:</b> {nameOfBride}
          </ListGroup.Item>
          <ListGroup.Item>
            {" "}
            <b>Name of Groom:</b> {nameOfGroom}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Contact Number Of Bride:</b>
            {contactDetailsOfBride}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Contact Number Of Groom:</b>
            {contactDetailsOfGroom}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Residential Address:</b>
            {residentialAddress}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Residential Address after Wedding:</b>
            {residentialAddressAfterWedding}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Photography dates:</b>
            {photographyDates}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Ceremony Timings and Locations :</b>
            {ceremonyTimingsAndLocations}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>
              Looking upon the Covid-19 Rules and regulations by the Government
              of INDIA we have took all the precautions and preventive measures
              required.?:
            </b>
            {covid19Measures}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>
              I have gone through the agreement form sent over WhatsApp
              Thoroughly, and agree with all the terms and Conditions.:
            </b>
            {agreementForm}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>
              Any specific requirements, Instructions form you to us that you
              wish to be looked upon as a team.:
            </b>
            {requirementsAndInstructions}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};
export default ConfirmationCard;
