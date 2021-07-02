import React from "react";
import NavBar from "../Components/Navbar";
import { Carousel } from "react-bootstrap";
import image1 from "../media/30.JPG";
import image2 from "../media/3.JPG";
import image3 from "../media/9.JPG";
import image4 from "../media/5.JPG";
import image5 from "../media/16.JPG";
import image6 from "../media/24.JPG";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
const Home = () => {
  const { userDetails } = useContext(UserContext);
  return (
    <div>
      <NavBar />
      {/* <video width="100%" height="590" autoPlay="true" muted="true" loop="true">
        <source src={video} type="video/mp4" />
      </video> */}
      <div>
        <Carousel fade={true} controls={false}>
          <Carousel.Item interval={4000}>
            <img
              style={{ height: "82vh" }}
              className="d-block mx-auto w-75"
              src={image1}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={4000}>
            <img
              style={{ height: "82vh" }}
              className="d-block mx-auto w-75"
              src={image2}
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={4000}>
            <img
              style={{ height: "82vh" }}
              className="d-block mx-auto w-75"
              src={image3}
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={4000}>
            <img
              style={{ height: "82vh" }}
              className="d-block mx-auto w-75"
              src={image4}
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={4000}>
            <img
              style={{ height: "82vh" }}
              className="d-block mx-auto w-75"
              src={image5}
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={4000}>
            <img
              style={{ height: "82vh" }}
              className="d-block mx-auto w-75"
              src={image6}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      {
        <>
          <h1>{userDetails.email}</h1>
          <h1>{userDetails.admin}</h1>
        </>
      }
    </div>
  );
};
export default Home;
