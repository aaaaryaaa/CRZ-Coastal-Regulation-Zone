import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import * as Icons from "react-bootstrap-icons";
import { useParams } from "react-router-dom";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
function UploadDocuments() {
  const params = useParams();
  const [pendingData, setPendingData] = useState([]);
  const [newData, setData] = useState({});
  const [width, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    axios
      .post(SERVER_URL + "/api/uploadDocuments/pendingDocs", {
        applicationId: params.id,
      })
      .then((response) => {
        if (response.status === 200 && response.data && response.data.success) {
          setPendingData(response.data.docs);
        }
      });

    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  return (
    <Container
      className="uploadDocuments"
      style={{
        width: width > 950 ? "60%" : "100%",
      }}
    >
      {pendingData != null ? (
        <Col>
          <Row
            className="title"
            style={{
              marginTop: "2rem",
              justifyContent: "center",
            }}
          >
            <Col
              sm={3}
              style={{
                backgroundColor: "#ADD8E6",
                textAlign: "center",
              }}
            >
              <h3>Documents</h3>
            </Col>
          </Row>
          {pendingData.length > 0 &&
            pendingData.map((data) => (
              <Row
                key={data.documents.id.toString()}
                style={{
                  margin: "10px",
                  marginLeft: "0px",
                  marginRight: "0px",
                  backgroundColor: "#97CCB6",
                }}
              >
                <Col
                  className={`element`}
                  style={{
                    flexGrow: 1,
                  }}
                >
                  <div
                    className="fileName"
                    style={{
                      padding: "10px",
                    }}
                  >
                    <p>{data.documents.name}</p>
                  </div>
                </Col>

                <Col
                  style={{
                    flexGrow: 0,
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <input
                    type="file"
                    onChange={(file) => {
                      let a = newData;
                      a[data.documents.id] = file.target.files[0];

                      setData(a);
                    }}
                  ></input>
                </Col>
              </Row>
            ))}
          <Row
            style={{
              margin: "2rem",
            }}
          >
            <input
              value={"Submit"}
              type="submit"
              className="btn1"
              style={{
                backgroundColor: "#add8e6",
              }}
              onClick={async (e) => {
                e.preventDefault();
                const formData = new FormData();
                formData.append("applicationId", params.id);
                pendingData.forEach((d) => {
                  formData.append(d.documentId, newData[d.documentId]);
                });

                axios
                  .post(
                    SERVER_URL + "/api/uploadDocuments/upload",
                    formData,
                    {}
                  )
                  .then((response) => {
                    if (
                      response.status === 200 &&
                      response.data &&
                      response.data.success
                    ) {
                      alert(`Application submitted`);
                      window.location.reload();
                    }
                  });
              }}
            />
          </Row>
        </Col>
      ) : (
        <Container style={{ margin: "auto" }}>No Pending Application</Container>
      )}
    </Container>
  );
}

export default UploadDocuments;
