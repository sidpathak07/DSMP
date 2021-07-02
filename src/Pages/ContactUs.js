import React from "react";
import Base from "../Components/Base";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/firestore";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
const ContactUs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [enquiryDetails, setEnquiryDetails] = useState({
    name: "",
    email: "",
    date: "",
    location: "",
    contactNumber: "",
    eventDetails: "",
    workDetails: "",
    workSeen: "",
  });
  const [weddingStyles, setWeddingStyles] = useState([]);
  const {
    name,
    email,
    date,
    contactNumber,
    eventDetails,
    workDetails,
    workSeen,
  } = enquiryDetails;
  const handleChange = (e, field) => {
    setEnquiryDetails({ ...enquiryDetails, [field]: e.target.value });
  };

  const submitEnquiry = (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (
      name &&
      email &&
      date &&
      eventDetails &&
      workDetails &&
      workSeen &&
      weddingStyles
    ) {
      firebase
        .firestore()
        .collection("enquiry")
        .add({
          name,
          email,
          contactNumber,
          date,
          eventDetails,
          weddingStyles,
          workDetails,
          workSeen,
          enquiryComplete: false,
        })
        .then((snapshot) => {
          setIsLoading(false);
          setEnquiryDetails({
            name: "",
            email: "",
            date: "",
            eventDetails: "",
            weddingStyles: "",
            workDetails: "",
            workSeen: "",
          });
          return toast.success(
            "YOUR REQUEST HAS BEEN SUBMITED WILL REVERT BACK TO YOU SOON"
          );
        })
        .catch((error) => {
          setIsLoading(false);
          return toast.success(
            "FAILED TO SUBMIT YOUR REQUEST PLEASE TRY AGAIN"
          );
        });
    } else {
      setIsLoading(false);
      return toast.success("FILL ALL THE FIELDS");
    }
  };

  const handleWeddingStyles = (e, value) => {
    let styles = weddingStyles;
    if (e.target.checked) {
      setWeddingStyles((prevState) => [...prevState, value]);
    }
    if (!e.target.checked) {
      styles = styles.filter((style) => style !== value);
      setWeddingStyles(styles);
    }
  };
  return (
    <div>
      <Base>
        <h1 className="text-center">Contact Us</h1>
        <div className="row">
          <div className="container w-50 text-left">
            <form>
              <div className="form-group">
                <label className="text-dark">
                  Your Name <span className="text-danger">*</span>
                </label>
                <input
                  name="name"
                  className="form-control password "
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleChange(e, "name")}
                />
              </div>
              <div className="form-group ">
                <label className="text-dark">
                  Email ID <span className="text-danger">*</span>
                </label>
                <input
                  name="email"
                  onChange={(e) => handleChange(e, "email")}
                  className="form-control"
                  type="email"
                  required
                  value={email}
                />
              </div>
              <div className="form-group">
                <label className="text-dark">
                  Contact Number <span className="text-danger">*</span>
                </label>
                <input
                  name="contactNumber"
                  className="form-control password "
                  type="tel"
                  pattern="[0-9]{10}"
                  minLength="10"
                  maxLength="10"
                  required
                  value={contactNumber}
                  onChange={(e) => handleChange(e, "contactNumber")}
                />
              </div>
              <div className="form-group">
                <label className="text-dark">
                  Date <span className="text-danger">*</span>
                </label>
                <input
                  name="date"
                  className="form-control password "
                  type="text"
                  required
                  value={date}
                  onChange={(e) => handleChange(e, "date")}
                />
              </div>
              <div className="form-group mt-2">
                <label className="text-dark">
                  Event Details `(What are the tentative
                  events/functions/timings per day) You want us to cover`{" "}
                  <span className="text-danger">*</span>
                </label>
                <input
                  name="eventDetails"
                  className="form-control mt-2 "
                  type="text"
                  required
                  value={eventDetails}
                  onChange={(e) => handleChange(e, "eventDetails")}
                />
              </div>
              <div className="form-group mt-2">
                <label className="text-dark">
                  In What Styles do you expect us to photograph and film your
                  wedding.Select Your Choices
                  <span className="text-danger">*</span>
                </label>
              </div>

              <div className="form-group ">
                <div className="d-flex align-items-center mt-2">
                  <input
                    type="checkbox"
                    name="weddingStyles"
                    value="Traditional Photographs"
                    onClick={(e) => handleWeddingStyles(e, e.target.value)}
                  />
                  <label htmlFor="styles" className="me-2 text-dark">
                    Traditional Photographs
                  </label>
                </div>
                <div className="d-flex align-items-center mt-2">
                  <input
                    type="checkbox"
                    name="weddingStyles"
                    value="Candid Photographs"
                    onClick={(e) => handleWeddingStyles(e, e.target.value)}
                  />
                  <label htmlFor="styles" className="me-2 text-dark">
                    Candid Photographs
                  </label>
                </div>
                <div className="d-flex align-items-center mt-2">
                  <input
                    type="checkbox"
                    name="weddingStyles"
                    value="Cinematic Film"
                    onClick={(e) => handleWeddingStyles(e, e.target.value)}
                  />
                  <label htmlFor="styles" className="me-2 text-dark">
                    Cinematic Film
                  </label>
                </div>
                <div className="d-flex align-items-center mt-2">
                  <input
                    type="checkbox"
                    name="weddingStyles"
                    value="Traditional Film"
                    onClick={(e) => handleWeddingStyles(e, e.target.value)}
                  />
                  <label htmlFor="styles" className="me-2 text-dark">
                    Traditional Film
                  </label>
                </div>
              </div>

              <div className="form-group mt-2">
                <label className="text-dark">
                  How did you hear of us? Have you seen our work?
                  <span className="text-danger">*</span>
                </label>
                <input
                  name="workDetails"
                  className="form-control mt-2 "
                  type="text"
                  required
                  value={workDetails}
                  onChange={(e) => handleChange(e, "workDetails")}
                />
              </div>

              <div className="form-group mt-2">
                <label className="text-dark">
                  Where did you see our work most recently?
                  <span className="text-danger">*</span>
                </label>
              </div>
              <div className="form-group ">
                <div className="d-flex align-items-center mt-2">
                  <input
                    type="radio"
                    name="workSeen"
                    value="Friends Wedding"
                    onChange={(e) => handleChange(e, "workSeen")}
                  />
                  <label htmlFor="styles" className="me-2 text-dark">
                    Friends Wedding
                  </label>
                </div>
                <div className="d-flex align-items-center mt-2">
                  <input
                    type="radio"
                    name="workSeen"
                    value="Instagram"
                    onChange={(e) => handleChange(e, "workSeen")}
                  />
                  <label htmlFor="styles" className="me-2 text-dark">
                    Instagram
                  </label>
                </div>
                <div className="d-flex align-items-center mt-2">
                  <input
                    type="radio"
                    name="workSeen"
                    value="facebook"
                    onChange={(e) => handleChange(e, "workSeen")}
                  />
                  <label htmlFor="styles" className="me-2 text-dark">
                    Facebook
                  </label>
                </div>
              </div>

              <div className="d-grid gap-2 my-3">
                <button
                  className="btn btn-dark"
                  onClick={submitEnquiry}
                  type="submit"
                >
                  Submit Details
                </button>
              </div>
              <button onClick={() => console.log(enquiryDetails)}>CHECK</button>
            </form>
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
          </div>
        </div>
      </Base>
    </div>
  );
};
export default ContactUs;
