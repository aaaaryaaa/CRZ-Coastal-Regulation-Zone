import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Buffer } from "buffer";
import "./style/PreviousApplication.css";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const PreviousApplication = ({ previousApplications }) => {
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
  const text2 = t("view");
  const text3 = t("download");

  return (
    <Container
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {previousApplications.length > 0 && (
        <Row
          className="mainContainer"
          style={{
            width: width > 950 ? "60%" : "100%",
          }}
        >
          <Col>
            <Row>
              <Container className="rowHeader">{t("prev_app")}</Container>
            </Row>
            {previousApplications.map((data) => (
              <Row key={data.id}>
                <Container className="rowText">
                  <p className="applName">{data.id}</p>
                  <p className="taskName">
                    <Link
                      to={`/previous/${data.id}`}
                      state={{ data: data, canModify: false }}
                      className="taskName"
                    >
                      {t("view")}
                    </Link>
                  </p>
                  <p
                    className="taskName"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      axios
                        .post(
                          SERVER_URL + "/api/application/download",
                          {
                            applicationId: data.id,
                          },
                          {
                            withCredentials: true,
                          }
                        )
                        .then((response) => {
                          if (
                            response.status === 200 &&
                            response.data &&
                            response.data.success
                          ) {
                            var a = response.data.data;
                            var binaryData = new Buffer.from(a, "base64");

                            var blob = new Blob([binaryData], {
                              type: "application/pdf",
                            });
                            try {
                              const url = window.URL.createObjectURL(blob);
                              const pdfWindow = window.open();
                              pdfWindow.location.href = url;
                            } catch (e) {}
                          }
                        });
                    }}
                  >
                    {text3}
                  </p>
                </Container>
              </Row>
            ))}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default PreviousApplication;
