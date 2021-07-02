import React, { useContext, useEffect, useState } from "react";
import Base from "../Components/Base";
import { UserContext } from "../Context/UserContext";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const { email } = userDetails;

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/user" className="nav-link text-success">
              Create User
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/admin/create/collections"
              className="nav-link text-success"
            >
              Create Collections
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/admin/managecollections"
              className="nav-link text-success"
            >
              Manage Collections
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/enquiries" className="nav-link text-success">
              Manage Enquiries
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/confirmations" className="nav-link text-success">
              See Confirmation's
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin Information</h4>
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
        <div className="row mt-5">
          <div className="col-3">{adminLeftSide()}</div>
          <div className="col-9">{adminRightSide()}</div>
        </div>
      </Base>
    </div>
  );
};
export default AdminPanel;
