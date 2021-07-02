import React from "react";
import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { isAuthenticated } from "../auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userDetails } = useContext(UserContext);
  return (
    // <Route
    //   {...rest}
    //   render={(props) =>
    //     userDetails.email ? (
    //       <Component {...props} />
    //     ) : (
    //       <Redirect
    //         to={{
    //           pathname: "/login",
    //           state: { from: props.location },
    //         }}
    //       />
    //     )
    //   }
    // />
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isAuthenticated().email ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
