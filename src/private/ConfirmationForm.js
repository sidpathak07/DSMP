import React from "react";
import Base from "../Components/Base";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/firestore";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
const ConfirmationForm = () => {
  const history = useHistory();
  const { userDetails } = useContext(UserContext);
  const [confirmationDetails, setConfirmationDetails] = useState({
    email: "",
    nameOfBride: "",
    nameOfGroom: "",
    contactDetailsOfBride: "",
    contactDetailsOfGroom: "",
    residentialAddress: "",
    residentialAddressAfterWedding: "",
    photographyDates: "",
    ceremonyTimingsAndLocations: "",
    covid19Measures: "",
    agreementForm: "",
    requirementsAndInstructions: "",
  });

  const [isLoading, setIsLoading] = useState(false);

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
  } = confirmationDetails;

  const handleChange = (e, field) => {
    setConfirmationDetails({ ...confirmationDetails, [field]: e.target.value });
  };

  const submitConfirmation = (e) => {
    e.preventDefault();
    if (
      email &&
      nameOfBride &&
      nameOfGroom &&
      contactDetailsOfBride &&
      contactDetailsOfGroom &&
      residentialAddress &&
      residentialAddressAfterWedding &&
      photographyDates &&
      ceremonyTimingsAndLocations &&
      covid19Measures &&
      agreementForm &&
      requirementsAndInstructions
    ) {
      firebase
        .firestore()
        .collection("confirmations")
        .add({
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
          timestamp: new Date(),
        })
        .then((snapshot) => {
          firebase
            .firestore()
            .collection("users")
            .doc(`${userDetails.uid}`)
            .update({
              confirmation: true,
            })
            .then((snapshot) => {
              setIsLoading(false);
              console.log(snapshot);
              setTimeout(() => {
                history.push("/profile");
              }, 5000);
              setConfirmationDetails({
                email: "",
                nameOfBride: "",
                nameOfGroom: "",
                contactDetailsOfBride: "",
                contactDetailsOfGroom: "",
                residentialAddress: "",
                residentialAddressAfterWedding: "",
                photographyDates: "",
                ceremonyTimingsAndLocations: "",
                covid19Measures: "",
                agreementForm: "",
                requirementsAndInstructions: "",
              });
              return toast.success("Form Submitted Successfully!!!");
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          setIsLoading(false);
          return toast.error("Failed To Submit Form..Try Again After Sometime");
        });
    }
  };

  return (
    <div>
      <div>
        <Base>
          <Link to="/profile" className="btn btn-md btn-dark my-3">
            Back to Profile
          </Link>
          <h1 className="text-center">Confirmation Form</h1>
          <div className="row">
            <div className="container w-50 text-left">
              <form>
                <div className="form-group">
                  <label className="text-dark">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    name="email"
                    className="form-control password "
                    type="email"
                    required
                    value={email}
                    onChange={(e) => handleChange(e, "email")}
                  />
                </div>
                <div className="form-group ">
                  <label className="text-dark">
                    Name of Bride <span className="text-danger">*</span>
                  </label>
                  <input
                    name="nameOfBride"
                    onChange={(e) => handleChange(e, "nameOfBride")}
                    className="form-control"
                    type="text"
                    required
                    value={nameOfBride}
                  />
                </div>
                <div className="form-group">
                  <label className="text-dark">
                    Name of Groom <span className="text-danger">*</span>
                  </label>
                  <input
                    name="nameOfGroom"
                    className="form-control password "
                    type="text"
                    required
                    value={nameOfGroom}
                    onChange={(e) => handleChange(e, "nameOfGroom")}
                  />
                </div>
                <div className="form-group">
                  <label className="text-dark">
                    Contact Number Of Bride{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    name="contactDetailsOfBride"
                    className="form-control password "
                    type="tel"
                    pattern="[0-9]{10}"
                    minLength="10"
                    maxLength="10"
                    required
                    value={contactDetailsOfBride}
                    onChange={(e) => handleChange(e, "contactDetailsOfBride")}
                  />
                </div>
                <div className="form-group">
                  <label className="text-dark">
                    Contact Number Of Groom{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    name="contactDetailsOfGroom"
                    className="form-control password "
                    type="tel"
                    pattern="[0-9]{10}"
                    minLength="10"
                    maxLength="10"
                    required
                    value={contactDetailsOfGroom}
                    onChange={(e) => handleChange(e, "contactDetailsOfGroom")}
                  />
                </div>
                <div className="form-group">
                  <label className="text-dark">
                    Residential Address <span className="text-danger">*</span>
                  </label>
                  <input
                    name="residentialAddress"
                    className="form-control password "
                    type="text"
                    required
                    value={residentialAddress}
                    onChange={(e) => handleChange(e, "residentialAddress")}
                  />
                </div>
                <div className="form-group">
                  <label className="text-dark">
                    Residential Address after Wedding{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    name="residentialAddressAfterWedding"
                    className="form-control password "
                    type="text"
                    required
                    value={residentialAddressAfterWedding}
                    onChange={(e) =>
                      handleChange(e, "residentialAddressAfterWedding")
                    }
                  />
                </div>
                <div className="form-group">
                  <label className="text-dark">
                    Photography dates <span className="text-danger">*</span>
                  </label>
                  <input
                    name="photographyDates"
                    className="form-control password "
                    type="text"
                    required
                    value={photographyDates}
                    onChange={(e) => handleChange(e, "photographyDates")}
                  />
                </div>
                <div className="form-group mt-2">
                  <label className="text-dark">
                    Ceremony Timings and Locations{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    name="ceremonyTimingsAndLocations"
                    className="form-control mt-2 "
                    type="text"
                    required
                    value={ceremonyTimingsAndLocations}
                    onChange={(e) =>
                      handleChange(e, "ceremonyTimingsAndLocations")
                    }
                  />
                </div>

                <div className="form-group mt-2">
                  <label className="text-dark">
                    Looking upon the Covid-19 Rules and regulations by the
                    Government of INDIA we have took all the precautions and
                    preventive measures required.
                    <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="form-group ">
                  <div className="d-flex align-items-center mt-2">
                    <input
                      type="radio"
                      name="covid19Measures"
                      value="yes"
                      onChange={(e) => handleChange(e, "covid19Measures")}
                    />
                    <label htmlFor="styles" className="me-2 text-dark">
                      Yes
                    </label>
                  </div>
                  <div className="d-flex align-items-center mt-2">
                    <input
                      type="radio"
                      name="covid19Measures"
                      value="no"
                      onChange={(e) => handleChange(e, "covid19Measures")}
                    />
                    <label htmlFor="styles" className="me-2 text-dark">
                      No
                    </label>
                  </div>
                </div>
                <div className="form-group mt-2">
                  <label className="text-dark">
                    I have gone through the agreement form sent over WhatsApp
                    Thoroughly, and agree with all the terms and Conditions.
                    <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="form-group ">
                  <div className="d-flex align-items-center mt-2">
                    <input
                      type="radio"
                      name="agreementForm"
                      value="yes"
                      onChange={(e) => handleChange(e, "agreementForm")}
                    />
                    <label htmlFor="styles" className="me-2 text-dark">
                      Yes
                    </label>
                  </div>
                  <div className="d-flex align-items-center mt-2">
                    <input
                      type="radio"
                      name="agreementForm"
                      value="no"
                      onChange={(e) => handleChange(e, "agreementForm")}
                    />
                    <label htmlFor="styles" className="me-2 text-dark">
                      No
                    </label>
                  </div>
                </div>
                <div className="form-group mt-2">
                  <label className="text-dark">
                    Any specific requirements, Instructions form you to us that
                    you wish to be looked upon as a team.
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    name="requirementsAndInstructions"
                    className="form-control mt-2 "
                    type="text"
                    required
                    value={requirementsAndInstructions}
                    onChange={(e) =>
                      handleChange(e, "requirementsAndInstructions")
                    }
                  />
                </div>
                <div className="d-grid gap-2 my-3">
                  <button
                    className="btn btn-dark"
                    onClick={submitConfirmation}
                    type="submit"
                  >
                    Submit Details
                  </button>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(confirmationDetails);
                  }}
                >
                  CHECK
                </button>
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
    </div>
  );
};
export default ConfirmationForm;
