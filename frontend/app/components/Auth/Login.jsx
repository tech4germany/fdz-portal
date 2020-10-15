import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { sendData } from "../utils/api";
import Notification from "../Notification/Notification";

import "bulma-extensions/bulma-checkradio/dist/css/bulma-checkradio.min.css";
import "./Login.css";

const Login = (props) => {
  const [notification, setNotification] = useState(null);
  const history = useHistory();

  useEffect(() => {
    document.addEventListener("keyup", handleEnterPassword);
    return () => {
      document.removeEventListener("keyup", handleEnterPassword);
    };
  });

  const doLogin = async () => {
    const result = await sendData(`/auth/login`, "POST", {
      email: document.getElementById("email").value.toLowerCase(),
      password: document.getElementById("password").value,
    });

    if (result.status !== 200) {
      setNotification({ text: result.message, status: "is-danger" });
      document.getElementById("password").value = "";
      return;
    }

    localStorage.setItem("identity", result.jwtToken);
    setNotification(null);
    props.setUser(false);
  };

  const closeNotification = () => {
    setNotification(null);
  };

  const setResearch = () => {
    document.getElementById("email").value = "forschung@rki.de";
    document.getElementById("password").value = "abc";
  };

  const setFDZ = () => {
    document.getElementById("email").value = "support@fdz.de";
    document.getElementById("password").value = "abc";
  };

  const handleEnterPassword = (event) => {
    console.log("enter");
    if (event.key === "Enter") doLogin();
  };

  return (
    <div className="login">
      <div className="loginForm">
        <div className="field">
          <label className="label">Email</label>
          <div className="control has-icons-left">
            <input
              className="input"
              type="text"
              id="email"
              placeholder="forschung@rki.de"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-user"></i>
            </span>
          </div>
        </div>
        <div className="field">
          <label className="label">Passwort</label>
          <div className="control has-icons-left">
            <input
              className="input"
              type="password"
              id="password"
              placeholder="Passswort"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </div>
        </div>
        <div className="control">
          <button className="button is-info" onClick={doLogin}>
            Login
          </button>
        </div>
      </div>
      <Notification
        notification={notification}
        size="medium"
        close={closeNotification}
      />
      <article className="message is-dark test-data-info-box">
        <div className="message-header">
          <p>Zugangsdaten für Demo</p>
        </div>
        <div className="message-body">
          <small>
            Mit diesen Daten können Sie sich jeweils als Forscher:in oder als
            FDZ Mitarbeiter:in einloggen:
            <br />
            <br />
            <strong>
              <u className="is-clickable" onClick={setResearch}>
                Forscher:in
              </u>
            </strong>
            <br />
            Email: <i>forschung@rki.de</i>
            <br />
            Passwort: <i>abc</i>
            <br />
            <br />
            <strong>
              <u className="is-clickable" onClick={setFDZ}>
                FDZ Mitarbeiter:in
              </u>
            </strong>
            <br />
            Email: <i>support@fdz.de</i>
            <br />
            Passwort: <i>abc</i>
          </small>
        </div>
      </article>
    </div>
  );
};

export default Login;
