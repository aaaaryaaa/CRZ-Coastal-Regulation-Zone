import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Container, Row, Col } from "react-bootstrap";
import PendingApplication from "./PendingApplication";
import PreviousApplication from "./PreviousApplication";
import { AuthContext } from "../../contexts/authContext";
import RejectedApplication from "./RejectedApplication";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
function PendingPrevious() {
  const [pendingApplications, setPending] = useState([]);
  const [previousApplication, setPrevious] = useState([]);
  const [rejectedApplication, setRejected] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .post(
        SERVER_URL + "/api/application/appStatus",
        {
          phone: window.localStorage.getItem("num"),
        },
        {
          headers: { authorization: window.localStorage.getItem("token") },
        }
      )
      .then((response) => {
        if (response.status === 200 && response.data && response.data.success) {
          setPending(response.data.pendingApplication);
          setPrevious(response.data.approvedApplication);
          setRejected(response.data.rejectedApplication);
        }
      });
  }, []);
  const { loggedIn, setLogin } = useContext(AuthContext);
  return (
    <Container
      fluid
      style={{
        minHeight: "30rem",
      }}
    >
      {loggedIn ? (
        pendingApplications.length > 0 ||
        previousApplication.length > 0 ||
        rejectedApplication.length > 0 ? (
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <PendingApplication pendingApplications={pendingApplications} />
            <div style={{ height: 100 }}></div>
            <PreviousApplication previousApplications={previousApplication} />
            <div style={{ height: 100 }}></div>
            <RejectedApplication rejectedApplications={rejectedApplication} />
          </Row>
        ) : (
          <Container>
            <Row
              style={{
                paddingTop: "100px",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "25px",
                }}
              >
                {t("No application available")}
              </p>
            </Row>
          </Container>
        )
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

export default PendingPrevious;
