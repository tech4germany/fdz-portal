import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../utils/api";
import "./Details.css";
import { STEPS, MAIN_STEPS } from "../../../../server/const/steps";

const Application = () => {
  const [applicationId, setApplicationId] = useState(useParams().id);
  const [application, setApplication] = useState(null);

  useEffect(() => {
    fetchData();
  }, [applicationId]);

  const fetchData = async () => {
    const data = await getData(`/applications/${applicationId}`);
    setApplication(data.application);
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
          {timestampToString(step.date)} - {statusText}
        </div>
      );
    }
    applicationContent = (
      <div className="content-box">
        <div className="application-name">{application.name}</div>
        <div className="application-description">{application.description}</div>
        <div className="application-institute">
          <i className="fa fa-university"></i> {application.institution.name}
        </div>
        <div className="application-user">
          <i className="fa fa-user"></i> {application.user.email}
        </div>
        <div className="application-history">{history}</div>
      </div>
    );
  }

  return <React.Fragment>{applicationContent}</React.Fragment>;
};

export default Application;
