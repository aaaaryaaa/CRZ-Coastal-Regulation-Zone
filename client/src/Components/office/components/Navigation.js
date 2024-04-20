import axios from "axios";
import React from "react";
import { Navbar, Nav, NavItem, NavLink, Button } from "reactstrap";
import "./Navigation.css";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
function Navigation() {
  return (
    <Navbar expand="md" className="Navigation">
      <div className="container">
        <Nav navbar style={{ textAlign: "left", fontSize: "large" }}>
          <NavItem>
            <NavLink style={{ color: "black" }} href="/office/" active>
              Home
            </NavLink>
          </NavItem>

          <NavItem style={{ marginLeft: "70%" }}>
           { <Button
              style={{ color: "white", backgroundColor: "#0a58ca" }}
              onClick={() => {
                axios
                  .get(
                    SERVER_URL + "/api/officeUser/logout",
                    {},
                    { withCredentials: true }
                  )
                  .then((res) => {
                    if (res.status === 200 && res.data && res.data.success) {
                      window.location.reload();
                    }
                  });
              }}
            >
              Logout
            </Button>}
          </NavItem>
        </Nav>
      </div>
    </Navbar>
  );
}
export default Navigation;
