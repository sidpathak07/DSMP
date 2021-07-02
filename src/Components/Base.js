import React from "react";
import { ToastContainer } from "react-toastify";
import Footer from "./Footer";
import NavBar from "./Navbar";

const Base = ({ children }) => {
  return (
    <div className="align">
      <NavBar />
      <div className="container">
        <ToastContainer />

        {children}
      </div>
    </div>
  );
};
export default Base;
