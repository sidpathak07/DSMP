import React from "react";
import { useState } from "react";
import Base from "../Components/Base";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/firestore";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { imageConfig } from "../Config/firebaseConfig";
import { readAndCompressImage } from "browser-image-resizer";
import "firebase/storage";

const CreateCollection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  //USER STATES
  const [ipUser, setIpUser] = useState("");
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");

  //COLLECTION STATES
  const [collectionId, setCollectionId] = useState("");
  const [description, setDescription] = useState("");
  const [resizedCoverPicFile, setResizedCoverPicFile] = useState(null);
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [collection, setCollection] = useState({
    name: "",
    date: "",
    isPublic: true,
    subCollectionId: "",
  });

  const { name, date, isPublic } = collection;
  const handleChange = (value, field) => {
    setCollection({ ...collection, [field]: value });
  };
  //SUBCOLLECTION STATES
  const [imageFiles, setImageFiles] = useState(null);
  const [resizedImageFile, setResizedImageFile] = useState([]);
  const [urls, setUrls] = useState([]);
  // const [subCollection, setSubCollection] = useState({
  //   imageUrls: [],
  // });

  const handleCoverPicFile = async (e) => {
    setIsLoading(true);
    let file = e.target.files[0];
    let resizedFile = await readAndCompressImage(file, imageConfig);
    setResizedCoverPicFile(resizedFile);
    setIsLoading(false);
  };

  const addCoverPhoto = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (name) {
      const uploadTask = firebase
        .storage()
        .ref(`/${name}/`)
        .child("coverImage")
        .put(resizedCoverPicFile);
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (snapshot.state === firebase.storage.TaskState.RUNNING) {
            console.log(`Progress: ${progress}%`);
          }
        },
        (error) => console.log(error.code),
        async () => {
          const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
          // do something with the url
          setCoverImageUrl(downloadURL);
          setIsLoading(false);
        }
      );
    } else {
      setIsLoading(false);
      return toast.error(
        "ENTER NAME,DATE AND DESCRIPTION BEFORE ADDING COVER IMAGE"
      );
    }
  };

  //FIRESTORE
  const db = firebase.firestore();

  const handleCollectionImages = (e) => {
    setIsLoading(true);
    let files = [];
    for (let i = 0; i < e.target.files.length; i++) {
      const newFile = e.target.files[i];
      files.push(newFile);
    }
    setImageFiles(files);
    setIsLoading(false);
    // setResizedImageFile([]);
    // let files = Object.entries(file);
    // let resizedimages = [];
    // files.forEach(async (file) => {
    //   // console.log(file);
    //   setIsLoading(true);
    //   // let resizedFile = await readAndCompressImage(file, imageConfig);
    //   readAndCompressImage(file, imageConfig).then((resizedimg) => {
    //     console.log(resizedimg);
    //     resizedimages.push(resizedimg);
    //     console.log(resizedimages);
    //     if (resizedimages.length === files.length) setIsLoading(false);
    //   });
    //   console.log("adding img to arr");
    //   setResizedImageFile(resizedimages);
    // });
  };

  const handleAddImages = (e) => {
    setIsLoading(true);
    setResizedImageFile([]);
    e.preventDefault();
    setUrls([]);
    const promises = [];

    imageFiles.forEach((img, index) => {
      console.log(img);
      const uploadTask = firebase
        .storage()
        .ref(`/${name}/`)
        .child(`${img.name}`)
        .put(img);
      promises.push(uploadTask);
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (snapshot.state === firebase.storage.TaskState.RUNNING) {
            console.log(`Progress: ${progress}%`);
          }
        },
        (error) => console.log(error.code),
        async () => {
          const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
          // do something with the url
          setUrls((prevState) => [...prevState, downloadURL]);
        }
      );
    });
    Promise.all(promises)
      .then(() => {
        alert("All files uploaded");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.code);
        setIsLoading(false);
      });
  };

  //WORKING FUNCTION

  const handleCreateCollection = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (name && date && description && coverImageUrl && urls && ipUser) {
      db.collection("users")
        .where("email", "==", ipUser)
        .get()
        .then((user) => {
          db.collection("Collections")
            .add({
              name: name,
              date: date,
              isPublic: isPublic,
              description: description,
              coverImage: coverImageUrl,
              urls: urls,
              userId: user.docs[0].id,
            })
            .then((snapshot) => {
              db.collection("users")
                .doc(user.docs[0].id)
                .update({
                  collections: firebase.firestore.FieldValue.arrayUnion(
                    snapshot.id
                  ),
                })
                .then((snapshot) => {
                  setIsLoading(false);
                  setTimeout(() => {
                    history.push("/admin");
                  }, 5000);
                  return toast.success("COLLECTION CREATED");
                })
                .catch((error) => {
                  setIsLoading(false);
                  return toast.error(error);
                });
            })
            .catch((error) => {
              setIsLoading(false);
              return toast.error(error);
            });
        })
        .catch((err) => {
          setIsLoading(false);
          return toast.error(err);
        });
    } else {
      setIsLoading(false);
      return toast.error("Fill All The Above Fields");
    }
  };

  return (
    <div>
      <Base>
        <Link to="/admin" className="btn btn-md btn-dark my-3">
          Admin Home
        </Link>

        <div className="row bg-light text-white rounded">
          <h5 className="text-dark text-center">Add User</h5>
          <div className="container w-50">
            <div className="form-group ">
              <label className="text-dark mt-3">
                Enter User Email <span className="text-danger">*</span>
              </label>
              <input
                name="email"
                onChange={(e) => setIpUser(e.target.value)}
                className="form-control"
                type="email"
                required
                value={ipUser}
              />
            </div>
          </div>

          <h5 className="text-dark text-center mt-2">Create Collection</h5>
          <div className="container w-50">
            <div className="form-group ">
              <label className="text-dark mt-3">
                Enter Collection Name <span className="text-danger">*</span>
              </label>
              <input
                name="name"
                onChange={(e) => handleChange(e.target.value, "name")}
                className="form-control"
                type="text"
                required
                value={name}
              />
            </div>
            <div className="form-group ">
              <label className="text-dark mt-3">
                Enter Description <span className="text-danger">*</span>
              </label>
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                className="text-dark"
              />
            </div>
            <div className="form-group ">
              <label className="text-dark mt-3">
                Enter Marriage Date <span className="text-danger">*</span>
              </label>
              <input
                name="date"
                onChange={(e) => handleChange(e.target.value, "date")}
                className="form-control"
                type="date"
                required
                value={date}
              />
            </div>
            <div className="form-group ">
              <label className="text-dark mt-3">
                Choose Cover Photo <span className="text-danger">*</span>
              </label>
              <input
                name="coverphoto"
                onChange={handleCoverPicFile}
                className="form-control"
                type="file"
                required
              />
              <button
                className="btn btn-dark mt-2"
                onClick={addCoverPhoto}
                disabled={
                  name && date && description && resizedCoverPicFile
                    ? false
                    : true
                }
              >
                Add Cover Photo
              </button>
            </div>
            <div className="form-group ">
              <div className="d-flex align-items-center mt-2">
                <label htmlFor="isPublic" className="me-2 text-dark">
                  Public
                </label>
                <input
                  type="checkbox"
                  name="isPublic"
                  value={isPublic}
                  checked={isPublic}
                  id=""
                  onChange={(e) => handleChange(e.target.checked, "isPublic")}
                />
              </div>
            </div>
            <div className="form-group ">
              <label className="text-dark mt-3">
                Add Collection Images <span className="text-danger">*</span>
              </label>
              <input
                name="coverphoto"
                onChange={handleCollectionImages}
                className="form-control"
                type="file"
                required
                multiple
              />
              <button
                className="btn btn-dark mt-2"
                onClick={handleAddImages}
                disabled={coverImageUrl && imageFiles ? false : true}
              >
                Add Images
              </button>
            </div>
            <div className="text-center mt-3">
              {isLoading && (
                <Spinner
                  className="text-center"
                  animation="border"
                  role="status"
                  style={{ color: "#000000" }}
                >
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}
            </div>
            <div className="text-center mt-2">
              <button
                className="btn btn-dark me-2"
                onClick={handleCreateCollection}
                disabled={ipUser && urls && coverImageUrl ? false : true}
              >
                Create Collection
              </button>
              <button
                className="btn btn-dark "
                onClick={() =>
                  console.log(name, date, description, coverImageUrl, urls)
                }
              >
                CHECK
              </button>
            </div>
          </div>
        </div>
      </Base>
    </div>
  );
};
export default CreateCollection;
