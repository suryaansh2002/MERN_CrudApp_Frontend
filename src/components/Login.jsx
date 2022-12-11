import { React, useState, useEffect } from "react";
import { FiLogIn } from "react-icons/fi";
import { AiFillEye } from "react-icons/ai";
import axios from "axios";
import { removeCookie } from "react-cookie";

import "./Login.css";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorStatus, setError] = useState(false);
  const [successStatus, setSuccess] = useState(false);
  const [signupMsg, setSignupMsg] = useState("");
  const [loginMsg, setLoginMsg] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleLogout = async () => {
    await props.removeCookie("user");
    try {
      document.getElementById("loginmodal").innerHTML = "aria-hidden='true'";
      window.location.reload();
    } catch (error) {}
  };

  const handleLogin = async () => {
    const loginData = {
      email,
      password,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    await axios
      .post("https://crud-server-jwpup3fpm-suryaansh2002.vercel.app/users/login", loginData, {
        headers: headers,
      })
      .then((res) =>
        res.data.status == "error"
          ? (setSuccess(false), setError(true), setLoginMsg(res.data.error))
          : (setError(false),
            props.setUser(res.data.data),
            props.setCookie("user", res.data.data),
            setSuccess(true),
            setError(false),
            setLoginMsg("Logged in Successfully!"))
      );
  };

  const handleSignup = () => {
    const signupData = {
      username,
      email,
      password,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .post("https://crud-server-jwpup3fpm-suryaansh2002.vercel.app/users/signup", signupData, {
        headers: headers,
      })
      .then((res) =>
        res.data.status == "error"
          ? (setError(true), setSignupMsg(res.data.error))
          : (setSuccess(true),
            setError(false),
            setSignupMsg("Account Created Successfully!"))
      );
  };

  const togglePassword = () => {
    if (passwordVisible) {
      setPasswordVisible(false);
    } else {
      setPasswordVisible(true);
    }
  };

  return (
    <div>
      <button
        className="login-button"
        onClick={props.cookie.user ? handleLogout : null}
        data-toggle={props.cookie.user ? null : "modal"}
        data-target={props.cookie.user ? null : "#loginmodal"}
      >
        <FiLogIn className="login-icon" />
        {props.cookie.user ? "Logout" : "Login"}
      </button>
      <div
        className="modal fade"
        id="loginmodal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginheader">
                Login
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="msg-container">
              {successStatus && loginMsg ? (
                <div className="success">{loginMsg}</div>
              ) : null}
              {errorStatus && loginMsg ? (
                <div className="failure">{loginMsg}</div>
              ) : null}
            </div>

            <form>
              <div className="modal-body">
                <div classNameName="row">
                  <input
                    name="email"
                    type="email"
                    className="login-input"
                    placeholder="Email Address"
                    color="white"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div classNameName="row">
                  <input
                    name="password"
                    type={passwordVisible ? "text" : "password"}
                    className="login-input"
                    placeholder="Password"
                    color="white"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <AiFillEye onClick={togglePassword} className="toggle-eye" />
                </div>
                <button
                  type="button"
                  className="login-submit"
                  onClick={handleLogin}
                >
                  Login
                </button>
                <div className="sign-link">
                  <a
                    href=""
                    data-toggle="modal"
                    data-target="#signupmodal"
                    data-dismiss="modal"
                  >
                    New here? Sign up now!
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="signupmodal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginheader">
                Sign Up
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="msg-container">
              {errorStatus && signupMsg ? (
                <div className="failure">{signupMsg}</div>
              ) : null}
              {successStatus && signupMsg ? (
                <div className="success">{signupMsg}</div>
              ) : null}
            </div>

            <form>
              <div className="modal-body">
                <div classNameName="row">
                  <input
                    name="username"
                    type="text"
                    className="login-input"
                    placeholder="Name"
                    color="white"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div classNameName="row">
                  <input
                    name="email"
                    type="email"
                    className="login-input"
                    placeholder="Email Address"
                    color="white"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div classNameName="row">
                  <input
                    name="password"
                    type={passwordVisible ? "text" : "password"}
                    className="login-input"
                    placeholder="Password"
                    color="white"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <AiFillEye onClick={togglePassword} className="toggle-eye" />
                </div>
                <button
                  type="button"
                  className="login-submit"
                  onClick={handleSignup}
                >
                  Sign Up
                </button>
                <div className="sign-link">
                  <a
                    href=""
                    data-toggle="modal"
                    data-target="#loginmodal"
                    data-dismiss="modal"
                  >
                    Already have an account? Login Now!
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
