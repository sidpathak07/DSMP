import React from "react";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Base from "../Components/Base";
import firebase from "firebase/app";
import "firebase/firestore";
import { Spinner } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { MdDelete, MdRemoveCircle } from "react-icons/md";
import { toast } from "react-toastify";
import { readAndCompressImage } from "browser-image-resizer";
import { imageConfig } from "../Config/firebaseConfig";
const UpdateCollection = () => {
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [isPublic, setIsPublic] = useState("");
  const [deletedImages, setDeletedImages] = useState([]);
  const [deletedCoverImageUrl, setDeletedCoverImageUrl] = useState("");
  const [resizedCoverPicFile, setResizedCoverPicFile] = useState(null);
  const [newImageFiles, setNewImageFiles] = useState(null);
  const [newUrls, setNewUrls] = useState([]);
  useEffect(() => {
    console.log("useEffect Runed");
    setIsLoading(true);
    firebase
      .firestore()
      .collection("Collections")
      .doc(`${id}`)
      .get()
      .then((snapshot) => {
        setName(snapshot.data().name);
        setDescription(snapshot.data().description);
        setDate(snapshot.data().date);
        setCoverImageUrl(snapshot.data().coverImage);
        setImageUrls(snapshot.data().urls);
        setIsPublic(snapshot.data().isPublic);
        setIsLoading(false);
      });
  }, []);

  //delete image from collection and move to trash
  const deleteImage = (url) => {
    let images = imageUrls;
    images = images.filter((imgUrl) => imgUrl !== url);
    setImageUrls(images);
    setDeletedImages((prevState) => [...prevState, url]);
    return toast.success("Moved Image To Trash Bin");
  };

  //delete image from trash and move to collection
  const removeImageFromTrash = (url) => {
    let images = deletedImages;
    images = images.filter((imgUrl) => imgUrl !== url);
    setDeletedImages(images);
    setImageUrls((prevState) => [...prevState, url]);
    return toast.success("Moved Image From Trash To Collection");
  };

  //delete cover image
  const deleteCoverImage = () => {
    setDeletedCoverImageUrl(coverImageUrl);
    setCoverImageUrl("");
    return toast.success("Added To Trash");
  };

  //restore cover image
  const removeDeletedCoverImage = () => {
    setCoverImageUrl(deletedCoverImageUrl);
    setDeletedCoverImageUrl("");
    return toast.success("Removed From Trash");
  };

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

  //ADD IMAGES TO COLLECTION
  const handleCollectionImages = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let files = [];
    for (let i = 0; i < e.target.files.length; i++) {
      const newFile = e.target.files[i];
      files.push(newFile);
    }
    setNewImageFiles(files);
    setIsLoading(false);
  };

  const handleAddImages = (e) => {
    setIsLoading(true);
    e.preventDefault();
    setNewUrls([]);
    const promises = [];

    newImageFiles.forEach((img, index) => {
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
          setNewUrls((prevState) => [...prevState, downloadURL]);
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

  //DELETE IMAGES PERMENENTLY
  const deleteFromStorage = (url) => {
    var httpsReference = firebase.storage().refFromURL(url);
    let ref = httpsReference.fullPath;
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child(`${ref}`);
    imageRef.delete().then(() => {
      let urls = deletedImages;
      urls = urls.filter((imgUrl) => imgUrl !== url);
      setDeletedImages(urls);
      return toast.success("Deleted image from storage");
    });
  };

  //UPDATE CHANGES
  const updateChanges = () => {
    if (newImageFiles) {
      if (!(newUrls.length === 0)) {
        let updatedUrls = [...imageUrls, ...newUrls];
        // console.log(updatedUrls);
        firebase
          .firestore()
          .collection("Collections")
          .doc(`${id}`)
          .update({
            description,
            urls: updatedUrls,
            date,
            coverImageUrl,
            isPublic,
          })
          .then((snapshot) => {
            setTimeout(() => {
              history.push("/admin");
            }, 5000);
            return toast.success("Updated Changes");
          });
      } else {
        return toast.error(
          "Add images to collection first and then update changes"
        );
      }
    } else {
      firebase
        .firestore()
        .collection("Collections")
        .doc(`${id}`)
        .update({
          description,
          urls: imageUrls,
          date,
          coverImageUrl,
          isPublic,
        })
        .then((snapshot) => {
          setTimeout(() => {
            history.push("/admin");
          }, 5000);
          return toast.success("Updated Changes");
        });
    }
  };

  return (
    <div>
      <Base>
        {isLoading && (
          <div className="text-center mt-5">
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
        {!isLoading && imageUrls && (
          <div className="container">
            <h1 className="text-center">Update Collection</h1>
            <button
              className="btn btn-dark"
              disabled={coverImageUrl && description && date ? false : true}
              onClick={updateChanges}
            >
              Update Collection
            </button>
            <div className="form-group ">
              <label className="text-dark mt-3">
                Enter Collection Name <span className="text-danger">*</span>
              </label>
              <input
                name="name"
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                type="text"
                required
                value={name}
                readOnly={true}
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
                onChange={(e) => setDate(e.target.value)}
                className="form-control"
                type="date"
                required
                value={date}
              />
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
                  onChange={(e) => setIsPublic(e.target.checked)}
                />
              </div>
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
                disabled={coverImageUrl ? true : false}
              />
              <button
                className="btn btn-dark mt-2"
                onClick={addCoverPhoto}
                disabled={coverImageUrl ? true : false}
              >
                Add Cover Photo
              </button>
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
                disabled={newImageFiles ? false : true}
              >
                Add Images
              </button>
            </div>
            <div className="w-50 h-50">
              <h3>Cover Image</h3>
              {!coverImageUrl && (
                <h3 className="text-center">No Cover Image</h3>
              )}
              {coverImageUrl && (
                <>
                  <img src={coverImageUrl} className="img-fluid " alt="" />
                  <button
                    className="btn btn-dark px-3 mt-2"
                    onClick={deleteCoverImage}
                  >
                    <MdDelete style={{ width: "1.5em", height: "1.5em" }} />
                  </button>
                </>
              )}
            </div>
            <div className="row">
              <h3>Collection Images</h3>
              {!imageUrls && (
                <h3 className="text-center">No Images in Collection</h3>
              )}
              {imageUrls.map((url) => {
                return (
                  <div className="p-2 col-sm-6">
                    <img src={url} alt="" className="img-fluid" />
                    <button
                      className="btn btn-dark px-3 mt-2"
                      onClick={() => deleteImage(url)}
                    >
                      <MdDelete style={{ width: "1.5em", height: "1.5em" }} />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="row">
              <h3>Trash Images</h3>
              {deletedImages.length === 0 && (
                <h3 className="text-center">No Images In Trash</h3>
              )}
              {deletedImages.map((url) => {
                return (
                  <div className="p-2 col-sm-6">
                    <img src={url} alt="" className="img-fluid" />
                    <button
                      className="btn btn-dark px-3 mt-2"
                      onClick={() => removeImageFromTrash(url)}
                    >
                      <MdRemoveCircle
                        style={{ width: "1.5em", height: "1.5em" }}
                      />
                    </button>
                    <button
                      className="btn btn-danger px-3 mt-2 ms-2"
                      onClick={() => deleteFromStorage(url)}
                    >
                      Delete Permanently
                    </button>
                  </div>
                );
              })}
            </div>
            {deletedCoverImageUrl && (
              <div className="w-50 h-50">
                <h3>Deleted Cover Image</h3>
                {deletedCoverImageUrl && (
                  <>
                    <img
                      src={deletedCoverImageUrl}
                      className="img-fluid "
                      alt=""
                    />
                    <button
                      className="btn btn-dark px-3 mt-2"
                      onClick={removeDeletedCoverImage}
                    >
                      <MdRemoveCircle
                        style={{ width: "1.5em", height: "1.5em" }}
                      />
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </Base>
    </div>
  );
};

export default UpdateCollection;
