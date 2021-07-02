import React from "react";
import Base from "../Components/Base";
import { Link } from "react-router-dom";
function ErrorPage() {
  return (
    <div>
      <Base>
        <div className="text-center mt-5">
          <h1 className="text-center">Error 404</h1>
          <h1 className="text-center">Page Not Found</h1>
          <Link to="/" className="btn btn-md btn-dark my-3">
            Go Back To Home
          </Link>
        </div>
      </Base>
    </div>
  );
}

export default ErrorPage;
