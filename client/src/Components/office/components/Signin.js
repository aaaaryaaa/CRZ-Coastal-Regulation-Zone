import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import * as Icons from "react-bootstrap-icons";
import "./Signin.css";

const SigninPage = () => {
  const [num, setNum] = useState("");
  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setNum(value);
  };

  return (
    <div
      className="mainContent"
      style={{
        paddingTop: "30px",
        paddingBottom: "30px",
      }}
    >
      <Card className="cardWhole">
        <div className="text-center">
          <Icons.PersonCircle size="100" className="iconStyle" />
        </div>
        <Card.Body>
          <Card.Title
            className="cardTitle"
            style={{ textAlign: "center", marginBottom: "50px" }}
          >
            Sign In
          </Card.Title>

          <Container>
            <Form>
              <Row>
                <Col>
                  <Form.Group className="mb-4" controlID="username">
                    <Form.Label style={{ marginLeft: 15, padding: 1 }}>
                      Username
                    </Form.Label>
                    <Form.Control
                      className="username"
                      type="text"
                      placeholder="Username"
                      onClick={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-4" controlID="password">
                <Form.Label> </Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Form>
            <a href="#">Forgot password ?</a>
            <div className="text-center">
              <Button variant="primary" style={{ marginTop: 8 }}>
                Login
              </Button>
            </div>
          </Container>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SigninPage;
