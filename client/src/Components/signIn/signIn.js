import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import * as Icons from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../contexts/authContext";

import "./styles/signIn.css";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const LoginPage = () => {
  const [num, setNum] = useState("");

  const [sname, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [width, setScreenWidth] = useState(window.innerWidth);

  // const [enteredName, setEnteredName] = useState("");


  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (!isNaN(e.target.value)) setNum(value);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      // The entered value is a number, do not update the state
      return;
    }
    // console.log(value); // Log the entered name value
    setName(value); // Update the state with the entered name value
    // setEnteredName(value);
  };
  
  
  const handleOTPChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (!isNaN(e.target.value)) setOtp(value);
  };
  const { loggedIn, setLogin } = useContext(AuthContext);
  const { t } = useTranslation();

  useEffect(() => {
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
      fluid={width < 950}
      className="mainContent"
      style={{
        paddingTop: "30px",
        marginTop: "30px",
        marginBottom: "30px",
        paddingBottom: "30px",
        maxWidth: width > 950 ? "40%" : "90%",
      }}
    >
      {!loggedIn && (
        <Card className="cardWhole">
          <div className="text-center">
            <Icons.PersonCircle size="100" className="iconStyle" />
          </div>
          <Card.Body>
            <Card.Title
              className="cardTitle"
              style={{ textAlign: "center", color: "#243b58" }}
            >
              {t("sign_in")}
            </Card.Title>
            <Card.Text className="cardText" style={{ textAlign: "center" }}>
              {t("otp_sign")}
            </Card.Text>
            <Container fluid>
              <Form>
                <Row>


                  <Col
                    xs={12}
                    xl={8}
                    style={{ padding: 0, paddingLeft: "10px" }}
                  >
                    <Form.Group className="mb-4">
                      <Form.Label style={{ marginLeft: 15, padding: 1 }}>
                        {" "}
                        {t("s_name")}
                      </Form.Label>
                      <Form.Control
                        className="controlName"
                        type="text"
                        maxLength={20}
                        style={{ marginTop: "8px" }}
                        placeholder={t("enter_nam")}
                        onChange={handleNameChange}
                        value={sname}
                        
                        id="nameInput" // add an id attribute
                        name="nameInput" 
                      />
               
                    </Form.Group>
                  </Col>



                  <Col
                    xs={12}
                    xl={8}
                    style={{ padding: 0, paddingLeft: "10px" }}
                  >
                    <Form.Group className="mb-4">
                      <Form.Label style={{ marginLeft: 15, padding: 1 }}>
                        {" "}
                        {t("mob_no")}
                      </Form.Label>
                      <Form.Control
                        className="controlNumber"
                        type="text"
                        maxLength={10}
                        style={{ marginTop: "8px" }}
                        placeholder={t("enter_mob")}
                        onChange={handleChange}
                        value={num}
                      />
                    </Form.Group>
                  </Col>





                  <Col
                    xs={5}
                    xl={4}
                    style={{
                      alignContent: "center",
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Button
                      variant="primary"
                      style={{
                        marginTop: 15,
                        backgroundColor: "#4089c8",
                        borderColor: "#4089c8",
                      }}
                      onClick={async () => {
                        axios
                          .post(SERVER_URL + "/api/auth/getOtp", {
                            phone: num,
                            navname:sname,
                          })
                          .then((response) => {
                            if (
                              response.status === 200 &&
                              response.data &&
                              response.data.success
                            )
                              alert("OTP sent");
                          });
                      }}
                    >
                      {t("send_otp")}
                    </Button>
                  </Col>
                </Row>
                <Form.Group className="mb-4">
                  <Form.Label> </Form.Label>
                  <Form.Control
                    type="otp"
                    placeholder={t("enter_otp")}
                    value={otp}
                    maxLength={6}
                    onChange={handleOTPChange}
                  />
                </Form.Group>
              </Form>
              <p
                style={{
                  cursor: "pointer",
                }}
                className="resend"
                onClick={async () => {
                  axios
                    .post(SERVER_URL + "/api/auth/getOtp", {
                      phone: num,
                      navname:sname
                    })
                    .then((response) => {
                      if (
                        response.status === 200 &&
                        response.data &&
                        response.data.success
                      )
                        alert("OTP resent");
                    });
                }}
              >
                {t("resend_code")}
              </p>
              <div className="text-center">
                <Button
                  variant="primary"
                  style={{
                    marginTop: 8,
                    backgroundColor: "#4089c8",
                    borderColor: "#4089c8",
                  }}
                  onClick={() => {
                    axios
                      .post(
                        SERVER_URL + "/api/auth/login",
                        {
                          phone: num,
                          navname:sname,
                          otp: otp,
                        },
                        { withCredentials: true }
                      )
                      .then((response) => {
                        if (
                          response.status === 200 &&
                          response.data &&
                          response.data.success
                        ) {
                          setLogin({
                            phone: num,
                            navname:sname
                          });
                          window.localStorage.setItem("num", num);
                        }
                      });
                  }}
                >
                  {t("submit_button")}
                </Button>
              </div>
            </Container>
          </Card.Body>
        </Card>
      )}
      {loggedIn && (
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
            <h3> {t("Logged in as")} {loggedIn.navname}</h3>
          </Row>
        </Col>
      )}
    </Container>
  );
};

export default LoginPage;
