import React from "react";
import { Link } from "react-router-dom";
import "bulma-extensions/bulma-timeline/dist/css/bulma-timeline.min.css";
import "./StatusBar.css";
import { STEPS, STATUSES_NAMES, MAIN_STEPS } from "../../../server/const/steps";
import TimelineMain from "./Status/TimelineMain";
import TimelineItem from "./Status/TimelineItem";

const StatusBar = ({ refreshData, application }) => {
  const statusToClass = (status) => {
    let statusClass = "";
    switch (status) {
      case "done":
        statusClass = "is-success";
        break;
      case "current":
        statusClass = "is-info";
        break;
      case "future":
        statusClass = "is-dark";
        break;
    }
    return statusClass;
  };
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

  let timeline = [];

  for (const mainStep of MAIN_STEPS) {
    let renderSteps = [];
    let subSteps = [];
    let status = "";
    let subText = "";
    let collapsed = true;
    subSteps = STEPS.filter((step) => step.mainStep === mainStep.id);

    for (const step of subSteps) {
      if (step.name === currentAction.action) {
        status = "current";
        step.status = "current";
        step.date = currentAction.date;
        collapsed = false;
        subText = step.string;
      } else {
        const historyStep = application.history.find(
          (action) => action.action === step.name
        );
        if (historyStep) {
          status = "done";
          step.status = "done";

          step.date = historyStep.date;
          subText =
            "Abgeschlossen am " +
            new Date(parseInt(historyStep.date) * 1000).toLocaleDateString(
              "de-DE"
            );
        } else {
          if (!step.showDefault) continue;
          if (status === "") {
            status = "future";
          }

          step.status = "future";
        }
      }
      renderSteps.push(
        <TimelineItem
          text={step.string}
          status={statusToClass(step.status)}
          date={step.date}
          key={step.name}
        />
      );
    }
    timeline.push(
      <TimelineMain
        collapseDetails={collapseDetails}
        status={status}
        text={subText}
        title={mainStep.name}
        key={"main-" + mainStep.id}
        id={mainStep.id}
      />
    );
    if (MAIN_STEPS.length !== mainStep.id) {
      timeline.push(
        <div
          className={"timeline-item " + statusToClass(status)}
          id={"row-spacer-" + mainStep.id}
        ></div>
      );
    }

    timeline.push(
      <div id={"content-" + mainStep.id} className="is-hidden">
        {renderSteps}
      </div>
    );
  }

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
