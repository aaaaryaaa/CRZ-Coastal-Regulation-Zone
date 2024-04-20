import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { Container, Row, Button } from "reactstrap";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const DownloadFile = ({ application }) => {
  const uploadedDocuments = application.uploadedDocuments;

  return (
    <div>
      <Container
        style={{
          margin: "4px",
        }}
      >
        <Row>
          <Button
            varient="Primary"
            onClick={() => {
              var a = application.rtc;
              var binaryData = new Buffer.from(a, "base64");
              console.log(application);
              var blob = new Blob([binaryData], {
                type:
                  application.rtcType == "png"
                    ? "image/png"
                    : application.rtcType == "pdf"
                    ? "application/pdf"
                    : "image/jpg",
              });
              try {
                const url = window.URL.createObjectURL(blob);
                const pdfWindow = window.open();
                pdfWindow.location.href = url;
              } catch (e) {}
            }}
          >
            RTC
          </Button>
        </Row>
      </Container>
      <Container
        style={{
          margin: "4px",
        }}
      >
        <Row>
          <Button
            varient="Primary"
            onClick={() => {
              var a = application.surveySketch;
              var binaryData = new Buffer.from(a, "base64");

              var blob = new Blob([binaryData], {
                type:
                  application.surveySketchType == "png"
                    ? "image/png"
                    : application.surveySketchType == "pdf"
                    ? "application/pdf"
                    : "image/jpg",
              });
              try {
                const url = window.URL.createObjectURL(blob);
                const pdfWindow = window.open();
                pdfWindow.location.href = url;
              } catch (e) {}
            }}
          >
            Survey Sketch
          </Button>
        </Row>
      </Container>
      <Container
        style={{
          margin: "4px",
        }}
      >
        <Row>
          <Button
            varient="Primary"
            onClick={() => {
              var a = application.formOne;
              var binaryData = new Buffer.from(a, "base64");

              var blob = new Blob([binaryData], {
                type:
                  application.formOneType == "png"
                    ? "image/png"
                    : application.formOneType == "pdf"
                    ? "application/pdf"
                    : "image/jpg",
              });
              try {
                const url = window.URL.createObjectURL(blob);
                const pdfWindow = window.open();
                pdfWindow.location.href = url;
              } catch (e) {}
            }}
          >
            FormOne
          </Button>
        </Row>
      </Container>
      <Container
        style={{
          margin: "4px",
        }}
      >
        <Row>
          <Button
            varient="Primary"
            onClick={() => {
              var a = application.challan;
              var binaryData = new Buffer.from(a, "base64");

              var blob = new Blob([binaryData], {
                type:
                  application.challanType == "png"
                    ? "image/png"
                    : application.challanType == "pdf"
                    ? "application/pdf"
                    : "image/jpg",
              });
              try {
                const url = window.URL.createObjectURL(blob);
                const pdfWindow = window.open();
                pdfWindow.location.href = url;
              } catch (e) {}
            }}
          >
            Challan
          </Button>
        </Row>
      </Container>
      {uploadedDocuments.length > 0 &&
        uploadedDocuments.map((data, index) => (
          <Container
            key={index}
            style={{
              margin: "4px",
            }}
          >
            {data.data && (
              <Row>
                <Button
                  style={{ backgroundColor: "#64a2df" }}
                  varient="Primary"
                  onClick={() => {
                    var a = data.data;
                    var binaryData = new Buffer.from(a, "base64");

                    var blob = new Blob([binaryData], {
                      type:
                        data.documentType == "png"
                          ? "image/png"
                          : data.documentType == "pdf"
                          ? "application/pdf"
                          : "image/jpg",
                    });
                    try {
                      const url = window.URL.createObjectURL(blob);
                      const pdfWindow = window.open();
                      pdfWindow.location.href = url;
                    } catch (e) {}
                  }}
                >
                  {data.documentId}
                </Button>
              </Row>
            )}
          </Container>
        ))}
    </div>
  );
};

export default DownloadFile;
