import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import firebase from "firebase/app";
import "firebase/firestore";
import Base from "./Base";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
const SubCollectionCard = () => {
  const { id } = useParams();
  const [col, setCol] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { coverImage, date, description, name, urls } = col;

  useEffect(() => {
    setIsLoading(true);
    firebase
      .firestore()
      .collection("Collections")
      .doc(`${id}`)
      .get()
      .then((snapshot) => {
        setCol(snapshot.data());
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // document.addEventListener("contextmenu", (e) => {
  //   e.preventDefault();
  // });

  return (
    <div>
      <Base>
        <Link to="/gallery" className="btn btn-md btn-dark my-3">
          Back To Gallery
        </Link>
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
        {!isLoading && urls && (
          <div className="container text-center">
            <img
              src={coverImage}
              class="card-img-top w-50 h-50 mx-auto my-3  rounded-3"
              alt="..."
            />
            <h3>{name}</h3>
            <p>{ReactHtmlParser(description)}</p>
            <p>{date}</p>
            <div className="row">
              {urls.map((url) => {
                return (
                  <div className="p-2 col-sm-6">
                    <img src={url} alt="" className="img-fluid" />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Base>
    </div>
  );
};
export default SubCollectionCard;
