import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./style/PendingApplication.css";

const PendingApplication = ({ pendingApplications }) => {
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
    pendingApplications.length > 0 && (
      <Container
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <Row
          className="mainContainer"
          style={{ width: width > 950 ? "60%" : "100%" }}
        >
          <Col>
            <Row>
              <Container className="rowHeader">{t("pending_app")}</Container>
            </Row>

            {pendingApplications.length > 0 &&
              pendingApplications.map((data) => (
                <Row key={data.id}>
                  <Container className="rowText">
                    <p className="applName">{data.id}</p>
                    <Link
                      to={`/pending/${data.id}`}
                      state={{ data: data, canModify: false }}
                      className="taskName"
                    >
                      {t("view")}
                    </Link>
                  </Container>
                </Row>
              ))}
          </Col>
        </Row>
      </Container>
    )
  );
};

export default PendingApplication;
