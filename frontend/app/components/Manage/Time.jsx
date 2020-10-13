import React, { useState, useEffect } from "react";
import { getData, sendData } from "../utils/api";
import Notification from "../Notification/Notification";
import "./Time.css";

const Time = () => {
  const [time, setTime] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getData(`/time`);
    setTime(data.time);
  };

  const changeTimeEstimate = async () => {
    const result = await sendData(`/time`, "PUT", {
      application: document.getElementById("application-input").value,
      testdata: document.getElementById("testdata-input").value,
      scriptPartial: document.getElementById("script-partial-input").value,
      scriptFull: document.getElementById("script-full-input").value,
    });

    if (result.status === 200) {
      setNotification({
        text: "Zeitschätzung erfolgreich geändert",
        status: "is-success",
      });
    } else {
      setNotification({
        text: "Zeitschätzung konnte nicht geändert werden",
        status: "is-danger",
      });
    }
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <React.Fragment>
      <div className="content-box time">
        <div className="page-header">Zeitschätzung</div>

        <div className="time-setter">
          <div className="time-setter-name">Antragsbearbeitung:</div>
          <div className="time-setter-input">
            <input
              className="input"
              defaultValue={time ? time.application : ""}
              placeholder=""
              id="application-input"
            ></input>
          </div>
        </div>

        <div className="time-setter">
          <div className="time-setter-name">Testdatenbereitellung:</div>
          <div className="time-setter-input">
            <input
              className="input"
              defaultValue={time ? time.testdata : ""}
              placeholder=""
              id="testdata-input"
            ></input>
          </div>
        </div>

        <div className="time-setter">
          <div className="time-setter-name">Skript (Teil-Ergebnismenge):</div>
          <div className="time-setter-input">
            <input
              className="input"
              defaultValue={time ? time.scriptPartial : ""}
              placeholder=""
              id="script-partial-input"
            ></input>
          </div>
        </div>

        <div className="time-setter">
          <div className="time-setter-name">
            Sckipt (Komplette Ergebnismenge):
          </div>
          <div className="time-setter-input">
            <input
              className="input"
              defaultValue={time ? time.scriptFull : ""}
              placeholder=""
              id="script-full-input"
            ></input>
          </div>
        </div>
        <button className="button is-info" onClick={changeTimeEstimate}>
          Ändern
        </button>
        <Notification
          notification={notification}
          size="large"
          close={closeNotification}
        />
      </div>
    </React.Fragment>
  );
};

export default Time;
