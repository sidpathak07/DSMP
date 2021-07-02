import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import CreateUser from "./admin/CreateUser";
import AboutUs from "./Pages/AboutUs";
import AdminPanel from "./Pages/AdminPanel";
import ContactUs from "./Pages/ContactUs";
import Gallery from "./Pages/Gallery";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import ConfirmationForm from "./private/ConfirmationForm";
import firebase from "firebase/app";
import "firebase/auth";

import { useContext, useEffect } from "react";
import { UserContext } from "./Context/UserContext";
import AdminRoute from "./Components/AdminRoute";
import PrivateRoute from "./Components/PrivateRoute";
import CreateCollection from "./admin/CreateCollection";
import Enquiry from "./admin/Enquiry";
import Confirmations from "./admin/Confirmations";
import SubCollectionCard from "./Components/SubCollectionCard";
import ProfileCollections from "./private/ProfileCollections";
import ProfileSubCollection from "./private/ProfileSubCollection";
import ManageCollections from "./admin/ManageCollections";
import UpdateCollection from "./admin/UpdateCollection";
import { authenticacte } from "./auth";
const Routes = () => {
  const { userDetails, setUserDetails } = useContext(UserContext);
  // console.log(userDetails.email ? userDetails.email : "no details");
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdTokenResult().then((idTokenResult) => {
          if (idTokenResult.claims?.admin === true) {
            // console.log("IS ADMIN");
            setUserDetails({
              email: user.email,
              uid: user.uid,
              admin: true,
            });
            authenticacte({ email: user.email, uid: user.uid, admin: true });
            <Redirect to="/admin" />;
          } else {
            // console.log("IS NOT ADMIN");
            setUserDetails({
              email: user.email,
              uid: user.uid,
              admin: false,
            });
            authenticacte({ email: user.email, uid: user.uid, admin: false });
            <Redirect to="/profile" />;
          }
        });
      } else {
        setUserDetails({
          email: "",
          uid: "",
          admin: false,
        });
        authenticacte({ email: "", uid: "", admin: false });
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/gallery" exact component={Gallery} />
        <Route path="/aboutus" exact component={AboutUs} />
        <Route path="/contactus" exact component={ContactUs} />
        <Route path="/login" exact component={Login} />
        <Route path="/collection/:id" exact component={SubCollectionCard} />
        <AdminRoute path="/admin" exact component={AdminPanel} />
        <AdminRoute path="/admin/create/user" exact component={CreateUser} />
        <AdminRoute path="/admin/enquiries" exact component={Enquiry} />
        <AdminRoute
          path="/admin/confirmations"
          exact
          component={Confirmations}
        />
        <AdminRoute
          path="/admin/create/collections"
          exact
          component={CreateCollection}
        />
        <AdminRoute
          path="/admin/managecollections"
          exact
          component={ManageCollections}
        />
        <AdminRoute
          path="/updateCollection/:id"
          exact
          component={UpdateCollection}
        />
        <PrivateRoute path="/profile" exact component={Profile} />
        <PrivateRoute
          path="/profilecollections/:id"
          exact
          component={ProfileCollections}
        />
        <PrivateRoute
          path="/profilesubcollection/:id"
          exact
          component={ProfileSubCollection}
        />
        <PrivateRoute
          path="/user/fillConfirmationForm"
          exact
          component={ConfirmationForm}
        />
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
