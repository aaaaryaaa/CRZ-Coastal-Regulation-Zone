import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Details from "./Details";
import DropDwn from "./DropDown";
import "./styles/newApplication.css";
import UploadDocuments from "./UploadDocuments";
function NewApplication() {
  const [screenWidth, changeWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      changeWidth(window.innerWidth);
    });
    return () => {
      window.removeEventListener("resize", () => {
        changeWidth(window.innerWidth);
      });
    };
  }, []);

  return (
    <Container
      className="newApplication"
      fluid
      style={{
        margin: "0px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Row
        style={{
          justifyContent: "center",
          width: screenWidth > 950 ? "50%" : "90%",
        }}
      >
        <Details />
      </Row>
    </Container>
  );
}

export default NewApplication;
