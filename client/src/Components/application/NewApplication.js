import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AuthContext } from "../../contexts/authContext";
import { useTranslation } from "react-i18next";
import Details from "./Details";

import "./styles/newApplication.css";

function NewApplication() {
  const [screenWidth, changeWidth] = useState(window.innerWidth);
  const { loggedIn, setLogin } = useContext(AuthContext);
  const { t } = useTranslation();
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
      {loggedIn ? (
        <Row
          style={{
            justifyContent: "center",
            width: screenWidth > 950 ? "50%" : "90%",
          }}
        >
          <Details phone={loggedIn.phone} />
        </Row>
      ) : (
        <Col
          style={{
            display: "flex",
            justifyContent: "center",
            minHeight: "25rem",
            flexDirection: "column",
            alignContent: "center",
          }}
        >
          <Row
            style={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <h3>{t("Login to view this page")}</h3>
          </Row>
        </Col>
      )}
    </Container>
  );
}

export default NewApplication;
