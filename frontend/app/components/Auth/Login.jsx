import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { sendData } from "../utils/api";
import Notification from "../Notification/Notification";

import "bulma-extensions/bulma-checkradio/dist/css/bulma-checkradio.min.css";
import "./Login.css";

const Login = (props) => {
  const [notification, setNotification] = useState(null);
  const history = useHistory();

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

  return (
    <React.Fragment>
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
              placeholder="Passsword"
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
        <Notification
          notification={notification}
          size="medium"
          close={setNotification}
        />
      </div>
      <article class="message is-dark test-data-info-box">
        <div class="message-header">
          <p>Zugangsdaten</p>
        </div>
        <div class="message-body">
          <small>
            Mit diesen Daten können Sie sich jeweils als Forscher:in oder als
            FDZ Mitarbeiter:in einloggen.
            <br />
            <br />
            <strong>
              <u>Forscher:in</u>
            </strong>
            <br />
            Email: <i>forschung@rki.de</i>
            <br />
            Passwort: <i>abc</i>
            <br />
            <br />
            <strong>
              <u>FDZ Mitarbeiter:in</u>
            </strong>
            <br />
            Email: <i>support@fdz.de</i>
            <br />
            Passwort: <i>abc</i>
            <br />
            <br />
            Der Antragsstatus von Diabetes wird nach dem Ausloggen
            zurückgesetzt.
          </small>
        </div>
      </article>
    </React.Fragment>
  );
};

export default Login;
