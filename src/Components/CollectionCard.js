import React from "react";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
const CollectionCard = ({ id, data, index }) => {
  const { coverImage, date, description, name } = data;

  // document.addEventListener("contextmenu", (e) => {
  //   e.preventDefault();
  // });

  return (
    <>
      <Link to={`/collection/${id}`} className="nav-link">
        <div
          class="card mb-3 w-75 h-75 mx-auto rounded-3 bg-light bg-gradient"
          style={{ boxShadow: "19px 13px 30px 6px rgba(0,0,0,0.34)" }}
        >
          <img
            src={coverImage}
            class="card-img-top w-50 h-50 mx-auto my-3 rounded-3"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title text-center text-dark">{name}</h5>
            <p class="card-text text-center text-dark">
              {ReactHtmlParser(description)}
            </p>
            <p class="card-text">
              <small class="text-muted">{date}</small>
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};
export default CollectionCard;
