import React from "react";
import Base from "../Components/Base";
import viren from "../media/viren.jpeg";
import { FaInstagram } from "react-icons/fa";
const AboutUs = () => {
  return (
    <div>
      <Base>
        <h3 className="text-center mt-2">ABOUT US</h3>
        <div class="card mb-3 my-3">
          <div class="row g-0 ">
            <div class="col-md-4 card-body">
              <img src={viren} class="img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-md-8 d-flex flex-column justify-content-center align-items-center">
              <div class="card-body">
                <h3 class="card-title text-center">Viren Shirgaokar</h3>
                <p class="card-text text-center">
                  <h5>Photographer & Video Creator</h5>
                  <p>
                    Featured artist over print,radio and Various global
                    platforms
                  </p>
                  <p>Available to capture your weddings Worldwide</p>
                  <h5>All about dreams and dedication</h5>
                </p>
                <p className="text-center">
                  <h5>Follow Me On</h5>
                  <a
                    className="nav-link"
                    href="https://www.instagram.com/virenshirgaokar/"
                  >
                    <FaInstagram size={30} color={"#000000"} />
                  </a>
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
