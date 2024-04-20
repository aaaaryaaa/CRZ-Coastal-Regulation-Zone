import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./style/PendingApplication.css";

const RejectedApplication = ({ rejectedApplications }) => {
  const text1 = "Application 101";
  const text2 = "View";
  const [width, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);
  const { t } = useTranslation();
  return (
    rejectedApplications.length > 0 && (
      <Container
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
      >
        <Row
          className="mainContainer"
          style={{ width: width > 950 ? "60%" : "100%" }}
        >
          <Col>
            <Row>
              <Container className="rowHeader">
                {"Rejected Applications"}
              </Container>
            </Row>

            {rejectedApplications.length > 0 &&
              rejectedApplications.map((data) => (
                <Row>
                  <Container className="rowText" key={data.id}>
                    <p className="applName">{data.id}</p>
                    <p className="taskName">{t("view")}</p>
                  </Container>
                </Row>
              ))}
          </Col>
        </Row>
      </Container>
    )
  );
};

export default RejectedApplication;
