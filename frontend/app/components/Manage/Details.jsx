import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getData, sendData } from "../utils/api";
import Notification from "../Notification/Notification";
import "./Details.css";
import { STEPS, MAIN_STEPS } from "../../../../server/const/steps";

const Application = () => {
  const [applicationId, setApplicationId] = useState(useParams().id);
  const [application, setApplication] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchData();
  }, [applicationId]);

  const fetchData = async () => {
    const data = await getData(`/applications/${applicationId}`);
    setApplication(data.application);
  };

  const handleStatusChange = (event) => {
    setNotification(null);
    setNewStatus(event.target.value);
  };

  const submitNewStatus = async () => {
    const userMessageElement = document.getElementById("userMessage");
    if (userMessageElement) var message = userMessageElement.value;
    const result = await sendData(
      `/applications/${applicationId}/status`,
      "PUT",
      {
        status: newStatus,
        message,
      }
    );
    await fetchData();
    if (result.status === 200) {
      setNotification({
        text: "Status erfolgreich geändert",
        status: "is-success",
      });
    } else {
      setNotification({
        text: "Status konnte nicht geändert werden",
        status: "is-fail",
      });
    }
    setNewStatus("");
  };

  const closeNotification = () => {
    setNotification(null);
  };

  const timestampToString = (timestap) => {
    const date = new Date(timestap);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    const hour = date.getHours().toString().padStart(2, "0");
    const min = date.getMinutes().toString().padStart(2, "0");
    const sec = date.getSeconds().toString().padStart(2, "0");
    const timeString =
      day + "." + month + "." + year + " - " + hour + ":" + min + ":" + sec;
    return timeString;
  };

  let applicationContent = "";
  if (application) {
    const history = [];
    let i = 0;
    for (const step of application.history) {
      i++;
      const templateStep = STEPS.find((tStep) => tStep.name === step.name);
      if (
        templateStep.type === "waiting" ||
        (templateStep.type === "unsubmitted" && i < application.history.length)
      )
        continue;
      const statusText = templateStep.string.includes(":var:")
        ? templateStep.string.replace(":var:", step.variable)
        : templateStep.string;
      history.push(
        <div key={step.name + step.date}>
          {timestampToString(step.date)} -{statusText}
        </div>
      );
    }
    applicationContent = (
      <div className="content-box">
        <div className="application-name">{application.name}</div>
        <div className="application-description">{application.description}</div>
        <div className="application-institution">
          <i className="fa fa-university"></i> {application.institution.name}
        </div>
        <div className="application-user">
          <i className="fa fa-user"></i> {application.user.email}
        </div>
        <div className="application-action">
          <button className="button is-info is-outlined">
            <span className="icon">
              <i className="fa fa-cloud-download-alt"></i>
            </span>
            <span>Skript</span>
          </button>
          <button className="button is-info is-outlined">
            <span className="icon">
              <i className="fa fa-cloud-download-alt"></i>
            </span>
            <span>PDF</span>
          </button>

          <div className="field">
            <div className="control has-icons-left">
              <div className="select">
                <select
                  name="cars"
                  id="cars"
                  value={newStatus}
                  onChange={handleStatusChange}
                >
                  <option value="" disabled hidden>
                    Neuen Status auswählen
                  </option>
                  <optgroup label="Antrag">
                    <option value="application_checked">
                      Antrag erfolgreich überprüft
                    </option>
                    <option value="application_failed">
                      Antrag muss überarbeitet werden
                    </option>
                  </optgroup>
                  <optgroup label="Testdaten">
                    <option value="testdata_delivered">
                      Testdaten bereitgestellt
                    </option>
                  </optgroup>
                  <optgroup label="Skript">
                    <option value="script_executed">
                      Das Skript wurde erfolgreich ausgeführt
                    </option>
                    <option value="script_failed">
                      Das Skript muss überarbeitet werden
                    </option>
                    <option value="results_delivered">
                      Die Ergebnismenge wurde erfolgreich übermittelt
                    </option>
                  </optgroup>
                </select>
              </div>
              <div className="icon is-small is-left">
                <i className="fas fa-globe"></i>
              </div>
            </div>
          </div>

          {(newStatus === "script_failed" ||
            newStatus === "application_failed") && (
            <textarea
              className="textarea"
              id="userMessage"
              placeholder="Nachricht an User"
            ></textarea>
          )}

          {newStatus && (
            <button className="button is-info" onClick={submitNewStatus}>
              Abschicken
            </button>
          )}

          <Notification
            notification={notification}
            size="large"
            close={setNotification}
          />
        </div>
        <div className="application-history">
          <b>Chronik</b> {history}
        </div>
      </div>
    );
  }

  return <React.Fragment>{applicationContent}</React.Fragment>;
};

export default Application;
