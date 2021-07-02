import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Routes from "./Routes";
import { UserContext, UserProvider } from "./Context/UserContext";
import { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";

//firebase imports
import { firebaseConfig } from "./Config/firebaseConfig";
import firebase from "firebase/app";
firebase.initializeApp(firebaseConfig);
function App() {
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  return (
    <UserProvider>
      <Routes />
    </UserProvider>
  );
}

export default App;
