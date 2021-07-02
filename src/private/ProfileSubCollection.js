import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import firebase from "firebase/app";
import "firebase/firestore";
import Base from "../Components/Base";
import ReactHtmlParser from "react-html-parser";
import { toast } from "react-toastify";
const ProfileSubCollection = () => {
  const { id } = useParams();
  const [col, setCol] = useState({});
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { coverImage, date, description, name, urls } = col;

  // document.addEventListener("contextmenu", (e) => {
  //   e.preventDefault();
  // });
  useEffect(() => {
    setIsLoading(true);
    console.log(col);
    firebase
      .firestore()
      .collection("Collections")
      .doc(`${id}`)
      .get()
      .then((snapshot) => {
        console.log(snapshot.data());
        setCol(snapshot.data());
        // setUrls(snapshot.data().urls);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const downloadImg = (url) => {
    fetch(`${url}`, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "image.png"); //or any other extension
          document.body.appendChild(link);
          link.click();
          console.log("Downloaded");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addToSelected = (e, value) => {
    // console.log(e.target.checked, value);
    let selectedImg = selected;
    if (e.target.checked) {
      setSelected((prevState) => [...prevState, value]);
    }
    if (!e.target.checked) {
      selectedImg = selectedImg.filter((img) => img !== value);
      setSelected(selectedImg);
    }
  };

  const downloadAll = () => {
    urls.forEach((url) => downloadImg(url));
  };

  const downloadSelected = () => {
    if (selected.length === 0) {
      return toast.error("PLEASE SELECT IMAGE TO DOWNLOAD");
    } else {
      selected.forEach((url) => downloadImg(url));
    }
  };

  return (
    <div>
      <Base>
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
            <button
              onClick={downloadAll}
              className="btn btn-primary text-start"
            >
              Download All <FaCloudDownloadAlt />
            </button>
            <button
              onClick={downloadSelected}
              className="btn btn-primary text-start ms-2"
            >
              Download Selected <FaCloudDownloadAlt />
            </button>
            {/* <button onClick={() => console.log(selected)}>CHECK</button> */}
            <div className="row g-2">
              {urls.map((url) => {
                return (
                  <div className="p-2 col-sm-6">
                    <div className="d-flex">
                      <input
                        type="checkbox"
                        name="downloadimg"
                        id=""
                        value={url}
                        className="border border-dark"
                        onChange={(e) => addToSelected(e, e.target.value)}
                      />
                      <img src={url} alt="" className="img-fluid" />
                    </div>
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
export default ProfileSubCollection;
