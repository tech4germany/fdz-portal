import React from "react";
import { Link } from "react-router-dom";
import "bulma-extensions/bulma-timeline/dist/css/bulma-timeline.min.css";
import "./StatusBar.css";
import { STEPS, STATUSES_NAMES, MAIN_STEPS } from "../../../server/const/steps";
import TimelineMain from "./Status/TimelineMain";
import TimelineItem from "./Status/TimelineItem";

const StatusBar = ({ refreshData, application }) => {
  console.log(application);
  const collapseDetails = (element) => {
    const content = document.getElementById(
      `content-${element.currentTarget.id}`
    );
    content.classList.toggle("is-hidden");

    const icon = document.getElementById(`icon-${element.currentTarget.id}`);
    icon.classList.toggle("fa-angle-down");
    icon.classList.toggle("fa-angle-up");

    const spacer = document.getElementById(
      `row-spacer-${element.currentTarget.id}`
    );
    spacer.classList.toggle("is-hidden");
  };

  const currentAction = application.history[application.history.length - 1];
  console.log(currentAction);

  let timeline = [];
  let currentMainStep = 0;
  for (const step of STEPS) {
    if (step.mainStep !== currentMainStep) {
      timeline.push(
        <TimelineMain
          collapseDetails={collapseDetails}
          status={application.mainSteps[step.mainStep - 1].status}
          text="test"
          key={"main" + currentMainStep}
        />
      );

      currentMainStep = step.mainStep;
    }
    let status = "future";
    let text = step.string;
    let date = "future";
    if (currentAction.action === step.name) {
      status = "current";
    } else if (application.history.find((action) => action.id === step.name)) {
      const historyStep = application.history.find(
        (action) => action.id === step.name
      );
    }
    timeline.push(
      <TimelineItem text={text} status={status} date={date} key={step.name} />
    );
  }

  console.log(timeline);
  return (
    <div className="content-box">
      <div className="application-title">
        {application.name}{" "}
        <i
          className="fas fa-sync-alt is-hidden"
          aria-hidden="true"
          onClick={refreshData}
        ></i>
      </div>
      <div className="timeline">{timeline}</div>
    </div>
  );
};

export default StatusBar;
