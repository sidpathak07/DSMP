import React from "react";
import Base from "../Components/Base";
import viren from "../media/viren.jpeg";
const AboutUs = () => {
  return (
    <div>
      <Base>
        <h3 className="text-center mt-2">ABOUT US</h3>
        <div class="card mb-3 my-3">
          <div class="row g-0 ">
            <div class="col-md-4">
              <img src={viren} class="img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-md-8 d-flex flex-column justify-content-center align-items-center">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Base>
    </div>
  );
};
export default AboutUs;
