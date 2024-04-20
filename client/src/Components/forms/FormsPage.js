import { Button, Card, Col, Container, Row } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Buffer } from "buffer";
import axios from "axios";
import "./styles/formPage.css";
import { useTranslation } from "react-i18next";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const FormsPage = () => {
  const [importantFormList, setForms] = useState([]);

  useEffect(() => {
    axios.get(SERVER_URL + "/api/forms/getAll").then((response) => {
      if (response.status === 200 && response.data && response.data.success)
        setForms(response.data.forms);
    });
  }, []);

  const { t } = useTranslation();
  return (
    <Container
      fluid
      style={{
        minHeight: "30rem",
      }}
    >
      <Container
        style={{
          marginTop: "5rem",
          marginBottom: "5rem",
        }}
      >
        <Card>
          <Card.Header
            style={{
              fontSize: "23px",
            }}
          >
            {t("imp_forms")}
          </Card.Header>
          <Card.Body
            style={{
              height: "30rem",
              overflowY: "scroll",
            }}
          >
            {importantFormList.length > 0 &&
              importantFormList.map((formData) => (
                <Container
                  key={formData.id}
                  style={{
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    marginBottom: "5px",
                    borderStyle: "solid",
                    borderWidth: "1px 1px 1px 1px",
                  }}
                >
                  <Row>
                    <Col
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",

                        flexGrow: 1,
                      }}
                    >
                      <p
                        style={{
                          display: "flex",
                          textAlign: "center",
                          alignContent: "flex-start",
                        }}
                      >
                        {formData.name}
                      </p>
                    </Col>
                    <Col
                      style={{
                        flexGrow: 0,
                      }}
                    >
                      <Button
                        onClick={() => {
                          var a = formData.data;
                          var binaryData = new Buffer.from(a, "base64");

                          var blob = new Blob([binaryData], {
                            type: "application/pdf",
                          });
                          try {
                            const url = window.URL.createObjectURL(blob);
                            const link = document.createElement("a");
                            if (link.download !== undefined) {
                              link.setAttribute("href", url);
                              link.setAttribute("download", "test.pdf");
                              link.style.visibility = "hidden";
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                            }
                          } catch (e) {}
                        }}
                      >
                        {t("download")}
                      </Button>
                    </Col>
                  </Row>
                </Container>
              ))}
          </Card.Body>
        </Card>
        {/* <Card
          style={{
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <Card.Header
            style={{
              fontSize: "23px",
            }}
          >
            {t("notify")}
          </Card.Header>
          <Card.Body
            style={{
              maxHeight: "400px",
              overflowY: "scroll",
            }}
          >
            {notifications.length > 0 &&
              notifications.map((formData) => (
                <Container
                  key={formData.id}
                  style={{
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    marginBottom: "5px",
                    borderStyle: "solid",
                    borderWidth: "1px 1px 1px 1px",
                  }}
                >
                  <Row>
                    <Col
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",

                        flexGrow: 1,
                      }}
                    >
                      <p
                        style={{
                          display: "flex",
                          textAlign: "center",
                          alignContent: "flex-start",
                        }}
                      >
                        {formData.name}
                      </p>
                    </Col>
                    <Col
                      style={{
                        flexGrow: 0,
                      }}
                    >
                      <Button>{t("download")}</Button>
                    </Col>
                  </Row>
                </Container>
              ))}
          </Card.Body>
        </Card> */}
      </Container>
    </Container>
  );
};

export default FormsPage;
