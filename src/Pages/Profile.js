import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Base from "../Components/Base";
import { UserContext } from "../Context/UserContext";
import firebase from "firebase/app";
import "firebase/firestore";
import { Spinner } from "react-bootstrap";
import { isAuthenticated } from "../auth";
const Profile = () => {
  const { userDetails, profile, setProfile } = useContext(UserContext);
  const { email, uid } = userDetails;
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    firebase
      .firestore()
      .collection("users")
      .doc(`${isAuthenticated().uid}`)
      .get()
      .then((snapshot) => {
        setIsLoading(false);
        setProfile(snapshot.data());
      })
      .catch((err) => console.log(err));
  }, []);

  const userLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">User Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link
              to={`/profilecollections/${uid}`}
              className="nav-link text-success"
            >
              View Collections
            </Link>
          </li>
          {!profile?.confirmation && (
            <li className="list-group-item">
              <Link
                to="/user/fillConfirmationForm"
                className="nav-link text-success"
              >
                Fill Confirmation Form
              </Link>
            </li>
          )}
        </ul>
      </div>
    );
  };
  const userRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">User Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge bg-success me-2">Email: </span>
            {email}
          </li>
        </ul>
      </div>
    );
  };

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
          <div className="row mt-5">
            <div className="col-3">{userLeftSide()}</div>
            <div className="col-9">{userRightSide()}</div>
          </div>
        )}
      </Base>
    </div>
  );
};
export default Profile;
