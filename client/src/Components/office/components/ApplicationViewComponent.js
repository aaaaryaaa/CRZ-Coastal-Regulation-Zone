import React, { Component, useEffect, useState } from "react";
import { Card, CardBody, Row, Col, Button } from "reactstrap";
import Doclist from "./Doclist";
import Upload from "./UploadComponent";
import DownloadFiles from "./DownloadFiles";
import { useLocation } from "react-router-dom";
import axios from "axios";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const ApplicationView = () => {
  const applicationId = useLocation().state;
  const [remarks, setRemarks] = useState("");
  const [docs, setDocs] = useState([]);
  const [application, setApplication] = useState(null);
  const [myFiles, setMyFiles] = useState([]);

  const [loading, setLoading] = useState(true);

  const handleSubmit = () => {
    var temp = {};

    var lisDocs = [];
    myFiles.forEach((e) => {
      if (docs.includes(e.id.toString())) {
        lisDocs.push(e.id.toString());
      }
    });
    temp["documents"] = lisDocs;
    temp["remarks"] = remarks;
    temp["applicationId"] = application.id;

    axios
      .post(SERVER_URL + "/api/uploadDocuments/setDocs", temp, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200 && response.data && response.data.success) {
          alert("Application Updated");
        }
      });
  };
  const handleDocs = (event) => {
    if (event.target.checked) {
      var temp = [...docs];
      temp.push(event.target.value);
      setDocs(temp);
    } else {
      var temp = [...docs];

      const index = temp.indexOf(event.target.value);
      if (index > -1) {
        temp.splice(index, 1);
      }
      setDocs(temp);
    }
  };

  useEffect(() => {
    axios
      .get(SERVER_URL + "/api/documents/getAll", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200 && response.data && response.data.success) {
          setMyFiles(response.data["documents"]);
        }

        axios
          .post(
            SERVER_URL + "/api/application/appById",
            {
              applicationId: applicationId,
            },
            { withCredentials: true }
          )
          .then((response1) => {
            if (
              response1.status === 200 &&
              response1.data &&
              response1.data.success
            ) {
              setApplication(response1.data.application);
              setLoading(false);
            }
          });
      });
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading .... </div>
      ) : (
        <div
          className="container"
          style={{
            marginRight: "1",
            backgroundImage: "../assets/bgimg.png",
            backgroundSize: "cover",
          }}
        >
          <Row style={{ textAlign: "center" }}>
            <Col md={{ size: 2 }} lg={{ size: 4 }}>
              <h4>Application</h4>
              <Card
                style={{
                  backgroundColor: "#A2A6FD",
                  borderColor: "#333",
                  textAlign: "left",
                }}
              >
                <CardBody>
                  <li className="list-unstyled m-1 applist">
                    {" "}
                    <span style={{ color: "red" }}>Application for:</span>
                    {application.type}{" "}
                  </li>
                  <li className="list-unstyled m-1 applist">
                    {" "}
                    <span style={{ color: "red" }}>Appliant name:</span>
                    {application.name}{" "}
                  </li>


                  <li className="list-unstyled m-1 applist">
                    {" "}
                    <span style={{ color: "red" }}>Appliant email:</span>
                    {application.email}{" "}
                  </li>





                  <li className="list-unstyled m-1 applist">
                    {" "}
                    <span style={{ color: "red" }}>
                      Correspondence Address:
                    </span>
                    {application.address}{" "}
                  </li>
                  <li className="list-unstyled m-1 applist">
                    {" "}
                    <span style={{ color: "red" }}>Mobile Number :</span>
                    {application.phone}{" "}
                  </li>
                  <li className="list-unstyled m-1 applist">
                    {" "}
                    <span style={{ color: "red" }}>Survey Number: </span>
                    {application.surveyNo}
                  </li>
                  <li className="list-unstyled m-1 applist">
                    {" "}
                    <span style={{ color: "red" }}>Village: </span>
                    {application.village}{" "}
                  </li>
                  <li className="list-unstyled m-1 applist">
                    {" "}
                    <span style={{ color: "red" }}>Taluk:</span>{" "}
                    {application.taluk}
                  </li>
                  <li className="list-unstyled m-1 applist">
                    <textarea
                      id="feedback"
                      name="feedback"
                      cols={40}
                      placeholder="Feedback/remarks"
                      onChange={(e) => {
                        setRemarks(e.target.value);
                      }}
                      value={remarks}
                    ></textarea>
                  </li>
                </CardBody>
              </Card>
              <br />
              <h4 style={{ color: "blue" }}>Download Documents</h4>

              <div
                style={{ borderColor: "#333", backgroundColor: "#57896033" }}
              >
                <DownloadFiles application={application} />
              </div>

              <h4 style={{ color: "green" }}>Upload Clearence</h4>
              <div
                style={{ borderColor: "#333", backgroundColor: "#486c5345" }}
              >
                <Upload applicationId={application.id} />
              </div>
            </Col>
            <Col md={{ size: 2 }} lg={{ size: 7 }} className="m-2">
              <div style={{ borderColor: "#333", textAlign: "center" }}>
                <h4>Mark the Requisite Documents</h4>
                <Doclist onChange={handleDocs} docList={myFiles} />
              </div>
            </Col>
          </Row>
          <Row
            style={{ marginTop: "5%", justifyContent: "center", width: "auto" }}
          >
            <Button onClick={handleSubmit}>Submit</Button>
          </Row>
        </div>
      )}
    </>
  );
};
export default ApplicationView;
