import React from "react";
import NavBar from "../Components/Navbar";
import { Carousel } from "react-bootstrap";
import image1 from "../media/30-min-min.JPG";
import image2 from "../media/29-min.JPG";
import image3 from "../media/24-min-min.JPG";
import image4 from "../media/22-min.JPG";
import image5 from "../media/20-min.JPG";

const Home = () => {
  return (
    <div>
      <NavBar />
      <div>
        <Carousel fade={true} controls={false}>
          <Carousel.Item interval={4000}>
            <img
              style={{ height: "89vh" }}
              className="d-block mx-auto w-75"
              src={image1}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={4000}>
            <img
              style={{ height: "89vh" }}
              className="d-block mx-auto w-75"
              src={image2}
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={4000}>
            <img
              style={{ height: "89vh" }}
              className="d-block mx-auto w-75"
              src={image3}
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={4000}>
            <img
              style={{ height: "89vh" }}
              className="d-block mx-auto w-75"
              src={image4}
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={4000}>
            <img
              style={{ height: "89vh" }}
              className="d-block mx-auto w-75"
              src={image5}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};
export default Home;
