import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  Card,
  CardBody,
  Row,
  Col,
  Label,
  Input,
  FormGroup,
} from "reactstrap";
import * as Icons from "react-bootstrap-icons";

import axios from "axios";
import { AuthContext } from "../../../contexts/authContext";
import { useNavigate } from "react-router-dom";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { officeLogin, setOfficeLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    axios
      .post(SERVER_URL + "/api/officeUser/login", {
        email: username,
        password: password,
      })
      .then((response) => {
        if (
          response.status == 200 &&
          response.data &&
          response.data.success &&
          response.data.success === true
        ) {
          window.localStorage.setItem("email", username);
          setOfficeLogin(username);
          navigate("/office", { replace: true });
        } else {
          alert("Wrong password or username");
        }
      })
      .catch((error) => {});

    e.preventDefault();
  };

  useEffect(() => {
    axios
      .get(SERVER_URL + "/api/officeUser/verify", {}, { withCredentials: true })
      .then((response) => {
        if (response.status === 200 && response.data && response.data.success) {
          setOfficeLogin(response.data.email);
          navigate("/office", { replace: true });
        } else {
          window.localStorage.removeItem("email");
        }
      });
  }, []);

  return (
    <div style={{ marginTop: "-2.5%", padding: "3%" }}>
      {officeLogin ? (
        <Container>
          <p>Already logged In</p>
        </Container>
      ) : (
        <Card
          className="cardwhole"
          style={{
            marginBottom: "2rem",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Icons.PersonCircle size="100" className="iconStyle" />
          </div>
          <CardBody>
            <Container>
              <Row>
                <Col style={{ textAlign: "center" }}>
                  <h3>Login</h3>
                </Col>
              </Row>
              <Form>
                <Row>
                  <FormGroup>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      type="text"
                      id="username"
                      name="username"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </FormGroup>
                </Row>
                <Row style={{ marginTop: "5%" }}>
                  <Col>
                    <Button onClick={handleLogin}>Login</Button>
                  </Col>
                </Row>
              </Form>
            </Container>
          </CardBody>
        </Card>
      )}
    </div>
  );
};
export default Login;
