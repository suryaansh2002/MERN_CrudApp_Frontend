import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import Login from "./Login";

const NavigationBar = (props) => {
  var username = "";
  try {
    var username = props.cookie.user.username;
  } catch (error) {}
  return (
    <Navbar bg="dark" variant="dark" className="nav">
      <Nav className="me-auto">

        <Nav.Link>
          <Link className="link" to={""}>
            All BLog Posts
          </Link>
          <br />
        </Nav.Link>
        {props.cookie.user ? (
          <Nav.Link>
            <Link className="link" to={"add"}>
              Add a new Blog Post
            </Link>
            <br />
          </Nav.Link>
        ) : null}
      </Nav>
      <Nav className="ml-auto">
        <Login
          cookie={props.cookie}
          removeCookie={props.removeCookie}
          setCookie={props.setCookie}
          user={props.user}
          setUser={props.setUser}
        />
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
