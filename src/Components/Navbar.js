import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import image from "../media/1.png";
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";

import firebase from "firebase/app";
import "firebase/auth";
import { toast } from "react-toastify";
const NavBar = () => {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        // console.log("USER SIGNED OUT");
        setUserDetails({
          email: "",
          uid: "",
        });
        localStorage.removeItem("user");
        return toast.success("SIGN OUT SUCCESSFULL");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={image}
            alt=""
            srcset=""
            style={{ width: "100px", height: "100px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/gallery">
                Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/aboutus">
                About Us
              </Link>
            </li>
            {!userDetails.admin && (
              <li className="nav-item">
                <Link className="nav-link" to="/contactus">
                  Enquiry
                </Link>
              </li>
            )}

            {userDetails.admin && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  Admin Panel
                </Link>
              </li>
            )}

            {userDetails.email && !userDetails.admin && (
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
            )}

            {!userDetails.email && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Log In
                </Link>
              </li>
            )}
            {userDetails.email && (
              <li className="nav-item" onClick={handleSignOut}>
                <Link className="nav-link" to="/">
                  Log Out
                </Link>
              </li>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default withRouter(NavBar);
