import React, { useContext, useState } from "react";
import Base from "../Components/Base";
import { UserContext } from "../Context/UserContext";
import firebase from "firebase/app";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { authenticacte } from "../auth";
const Login = () => {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const regex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,})/;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const sendResetPasswordEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setIsLoading(false);
        return toast.success("Email has been sent");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        setIsLoading(false);
        return toast.error(`${errorMessage}`);
      });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (password.length < 8) {
      setIsLoading(false);
      return toast.error(
        "Password should be alphanumeric with special symbols including at least 1 capital letter and of min length 8"
      );
    } else {
      let check = regex.test(password);
      console.log(check);
      if (check) {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Signed in
            var user = userCredential;
            user.user.getIdTokenResult().then((idTokenResult) => {
              if (idTokenResult.claims.admin === true) {
                setUserDetails({
                  email: user.user.email,
                  uid: user.user.uid,
                  admin: true,
                });
                setIsLoading(false);
                setTimeout(() => {
                  history.push("/admin");
                }, 5000);
                return toast.success("Log In Success");
              } else {
                setUserDetails({
                  email: user.user.email,
                  uid: user.user.uid,
                  admin: false,
                });
                setIsLoading(false);
                setTimeout(() => {
                  history.push("/profile");
                }, 5000);
                return toast.success("Log In Success");
              }
            });

            // ...
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
            setIsLoading(false);
            return toast.error(`${errorMessage}`);
          });
      } else {
        setIsLoading(false);
        return toast.error(
          "Password should be alphanumeric with special symbols including at least 1 capital letter "
        );
      }
    }
  };

  return (
    <div>
      <Base>
        <h1 className="text-center">Log In</h1>
        <div className="row">
          <div className="container w-50 text-left">
            <form>
              <div className="form-group ">
                <label className="text-dark">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  name="email"
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                  type="email"
                  required
                  value={email}
                />
              </div>
              <div className="form-group">
                <label className="text-dark">
                  Password <span className="text-danger">*</span>
                </label>
                <input
                  name="password"
                  className="form-control password "
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="d-flex justify-content-between align-items-center my-3">
                {showPassword ? (
                  <blockquote
                    style={{ cursor: "pointer", margin: "0" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    Hide password
                  </blockquote>
                ) : (
                  <blockquote
                    style={{ cursor: "pointer", margin: "0" }}
                    className="text-decoration-underline text-primary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    Show password
                  </blockquote>
                )}
                <span
                  style={{ cursor: "pointer" }}
                  className="text-decoration-underline text-primary"
                  onClick={sendResetPasswordEmail}
                >
                  Forgot Password?
                </span>
              </div>

              <div className="d-grid gap-2 my-3">
                <button
                  className="btn btn-dark"
                  onClick={(e) => onSubmit(e)}
                  type="submit"
                >
                  Log In
                </button>
              </div>
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
export default Login;
