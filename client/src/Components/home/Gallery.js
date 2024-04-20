import React, { useState, useEffect } from "react";
import { Container, Image, Row } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import "./style/Gallery.css";
const imageList = [
  {
    title: "Udupi",
    url: "https://www.karnataka.gov.in/storage/slids/1638784483.jpg",
  },
  {
    title: "Udupi",
    url: "https://www.karnataka.gov.in/storage/slids/1638784182.jpg",
  },
  {
    title: "Udupi",
    url: "https://www.karnataka.gov.in/storage/slids/1638783245.jpg",
  },

//added
  {
    title: "Udupi",
    url: "https://www.karnataka.gov.in/storage/slids/1638784672.jpg",
  },
  {
    title: "Udupi",
    url: "https://www.karnataka.gov.in/storage/slids/1630648890.png",
  },
  {
    title: "Udupi",
    url: "https://www.karnataka.gov.in/storage/slids/1656590446.jpg",
  },
];

function Gallery(props) {
  const [index, updateIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

//added  <img src={imageList[index].url} alt="Slideshow" />
  //const [indx, setIndx] = useState(0);
  useEffect(() => {
    const timerId = setTimeout(() => {
      updateIndex((index + 1) % imageList.length);
    }, 6000);
    return () => clearTimeout(timerId);
  }, [index, imageList.length]);



  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);
  return (
    <Container className="gallery" fluid>
      {imageList && index !== -1 && index < imageList.length && (
        <Container className="image" fluid>
          <div>
         
            <Icon.CaretLeftFill
              className="icon left"
              color="white"
              size={40}
              onClick={() => {
                if (index > 0) {
                  updateIndex(index - 1);
                } else {
                  updateIndex(imageList.length - 1);
                }
              }}
              style={{
                flexGrow: 0,
              }}
            />
            <Image
              className="images"
              fluid
              src={imageList[index].url}
              alt="Slideshow"
              style={{
                flexGrow: 1,
              }}
            />

            <Icon.CaretRightFill
              className="icon right"
              color="white"
              size={40}
              style={{
                flexGrow: 0,
              }}
              onClick={() => {
                updateIndex((index + 1) % imageList.length);
              }}
            />
          </div>
        </Container>
      )}
    </Container>
  );
}

export default Gallery;
