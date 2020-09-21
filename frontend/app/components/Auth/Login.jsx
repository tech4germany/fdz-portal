import React from "react";
import { useHistory } from "react-router-dom";

import "bulma-extensions/bulma-checkradio/dist/css/bulma-checkradio.min.css";
import "./Login.css";

const Login = () => {
  const history = useHistory();

  const doLogin = () => {
    history.push("/");
  };

  return (
    <div className="loginForm">
      <div className="field">
        <label className="label">Email</label>
        <div className="control has-icons-left">
          <input className="input" type="text" placeholder="user@rki.de" />
          <span className="icon is-small is-left">
            <i className="fas fa-user"></i>
          </span>
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control has-icons-left">
          <input className="input" type="password" placeholder="Passsword" />
          <span className="icon is-small is-left">
            <i className="fas fa-lock"></i>
          </span>
        </div>
      </div>
      <div className="control">
        <button className="button is-info" onClick={() => doLogin()}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
