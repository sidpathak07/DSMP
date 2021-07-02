/* eslint-disable indent */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.createUser = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .createUser({
      email: data.email,
      emailVerified: false,
      password: data.password,
      displayName: data.name,
      disabled: false,
    })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      // console.log("Successfully created new user:", userRecord.uid);
      return userRecord;
    })
    .catch((error) => {
      console.log("Error creating new user:", error);
    });
});

// eslint-disable-next-line arrow-parens
exports.newUserSignUp = functions.auth.user().onCreate((user) => {
  // for background triggers you must return a value/promise
  return admin.firestore().collection("users").doc(user.uid).set({
    email: user.email,
    name: user.displayName,
    collections: [],
    confirmation: false,
  });
});
