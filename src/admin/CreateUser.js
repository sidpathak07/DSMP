import React from "react";
import Base from "../Components/Base";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";
import { useState } from "react";
import firebase from "firebase/app";
import "firebase/functions";
import { toast } from "react-toastify";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Spinner } from "react-bootstrap";
import { send } from "emailjs-com";
export default function CreateUser() {
  const regex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,})/;

  const { setUserDetails } = useContext(UserContext);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { name, email, password, error } = user;
  const handleChange = (e, field) => {
    setUser({ ...user, [field]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // if (email) {
    //   const addAdminRole = firebase.functions().httpsCallable("addAdminRole");
    //   addAdminRole({ email: email }).then((result) => {
    //     console.log(result);
    //   });
    // } else {
    //   return toast.error("Please Give Email Id");
    // }
    // console.log(`Name:${name} Email:${email} Password:${password} `);
    if (email && name && password) {
      //
      if (password.length < 8) {
        setIsLoading(false);
        return toast.error(
          "Password should be alphanumeric with special symbols including at least 1 capital letter and of min length 8"
        );
      } else {
        let check = regex.test(password);
        if (check) {
          const createUser = firebase.functions().httpsCallable("createUser");
          createUser({
            name: name,
            email: email,
            password: password,
          })
            .then((data) => {
              setUser({
                name: "",
                email: "",
                password: "",
                error: false,
              });
              setIsLoading(false);
              send(
                "service_0hd8qmt",
                "template_ns8wh9k",
                {
                  to_name: `${name}`,
                  message: `EMAIL:${email} Password:${password}`,
                  toemail: `${email}`,
                  reply_to: "no_reply",
                },
                "user_65Tp5ayfLRK5vN4Ct7mrk"
              )
                .then((response) => {
                  setIsLoading(false);
                  return toast.success(
                    `User is Successfully Created and Has been sent mail`
                  );
                })
                .catch((err) => {
                  setIsLoading(false);
                  return toast.success(
                    `User is Successfully Created and Has not been sent mail`
                  );
                });
            })
            .catch((error) => {
              console.log("ERROR:", error);
              setIsLoading(false);
            });
        } else {
          setIsLoading(false);
          return toast.error(
            "Password should be alphanumeric with special symbols including at least 1 capital letter "
          );
        }
      }
    } else {
      return toast.error("Fill all fields");
    }
  };

  const createUserForm = () => (
    <div>
      <form>
        <div className="form-group">
          <input
            onChange={(e) => handleChange(e, "name")}
            name="name"
            type="text"
            className="form-control  mb-2"
            placeholder="Enter Name"
            value={name}
          />
        </div>

        <div className="form-group">
          <input
            onChange={(e) => handleChange(e, "email")}
            name="email"
            type="email"
            className="form-control  mb-2"
            placeholder="Enter email Id"
            value={email}
          />
        </div>
        <div className="form-group">
          <input
            onChange={(e) => handleChange(e, "password")}
            name="password"
            type={showPassword ? "text" : "password"}
            className="form-control  mb-2"
            placeholder="Enter Password"
            value={password}
          />
        </div>
        {showPassword ? (
          <BsEyeSlashFill
            style={{ color: "#000000" }}
            onClick={() => setShowPassword(!showPassword)}
          />
        ) : (
          <BsEyeFill
            style={{ color: "#000000" }}
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
        <button
          type="submit"
          onClick={onSubmit}
          className="btn btn-outline-success my-3 d-block"
        >
          Create User
        </button>
      </form>
      {isLoading && (
        <Spinner
          className="text-center"
          animation="border"
          role="status"
          style={{ color: "#000000" }}
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </div>
  );
  return (
    <div>
      <Base>
        <Link to="/admin" className="btn btn-md btn-dark my-3">
          Admin Home
        </Link>
        <h1 className="text-white">Create User</h1>
        <div className="row bg-light text-white rounded">
          <div className="col-md-8 offset-md-2">{createUserForm()}</div>
        </div>
      </Base>
    </div>
  );
}
