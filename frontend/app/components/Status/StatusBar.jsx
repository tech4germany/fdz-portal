import React from "react";
import { Link } from "react-router-dom";
import "bulma-extensions/bulma-timeline/dist/css/bulma-timeline.min.css";
import "./StatusBar.css";
import { STEPS, MAIN_STEPS } from "../../../../server/const/steps";
import TimelineMain from "./TimelineMain";
import TimelineItem from "./TimelineItem";

const StatusBar = ({ refreshData, application }) => {
  const statusToClass = (status) => {
    let statusClass = "";
    let iconClass = "";
    switch (status) {
      case "done":
        statusClass = "is-success";
        iconClass = "fa-check";
        break;
      case "waiting":
      case "current":
        statusClass = "is-info";
        iconClass = "fa-hourglass-start";
        break;
      case "unsubmitted":
        statusClass = "is-info";
        iconClass = "fa-exclamation";
        break;
      case "problem":
        statusClass = "is-danger";
        iconClass = "fa-exclamation";
      case "future":
        statusClass = "is-dark";
        break;
    }
    return { statusClass, iconClass };
  };
  const collapseDetails = (element) => {
    const content = document.getElementById(
      `content-${element.currentTarget.id}`
    );
    content.classList.toggle("is-hidden");

    const icon = document.getElementById(`icon-${element.currentTarget.id}`);
    icon.classList.toggle("fa-angle-down");
    icon.classList.toggle("fa-angle-up");

    if (element.currentTarget.id < MAIN_STEPS.length) {
      const spacer = document.getElementById(
        `row-spacer-${element.currentTarget.id}`
      );
      spacer.classList.toggle("is-hidden");
    }
  };

  const currentStep = application.history[application.history.length - 1];

  let timeline = [];

  for (const mainStep of MAIN_STEPS) {
    let renderSteps = [];
    let subSteps = [];
    let status = "";
    let subText = "";
    let link = "";
    let waitingTime = "";
    let collapsed = true;
    subSteps = STEPS.filter((step) => step.mainStep === mainStep.id);

    for (const step of subSteps) {
      step.message = "";

      const historyStep = application.history.find(
        (historyStep) => historyStep.name === step.name
      );

      if (step.name === currentStep.name) {
        status = "current";
        //step.message = "test current";
        if (step.link) {
          link = step.link.replace(":id:", application._id);
          step.link = link;
        }
        step.status = step.type;
        step.date = currentStep.date;
        collapsed = false;
        subText = step.string;
        if (historyStep.time) {
          step.time = historyStep.time;
          waitingTime = historyStep.time;
        }
      } else {
        if (historyStep) {
          status = "done";
          step.status = "done";
          if (historyStep.message) step.message = historyStep.message;

          step.date = historyStep.date;
          subText =
            "Abgeschlossen am " +
            new Date(parseInt(historyStep.date) * 1000).toLocaleDateString(
              "de-DE"
            );
          if (step.string.includes(":var:")) {
            step.string = step.string.replace(":var:", historyStep.var);
          }
        } else {
          if (!step.showDefault) continue;
          if (status === "") {
            status = "future";
          }

          step.status = "future";
        }
      }
      // Override old status if same group
      if (step.status !== "future" && !step.newBubble) renderSteps.pop();

      renderSteps.push(
        <TimelineItem
          text={step.string}
          message={step.message}
          status={statusToClass(step.status).statusClass}
          icon={statusToClass(step.status).iconClass}
          date={step.date}
          key={step.name}
          name={step.name}
          link={step.link}
          time={step.time}
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
        link={link}
        time={waitingTime}
      />
    );

    // Don't show connecting timeline for last main step
    if (MAIN_STEPS.length !== mainStep.id) {
      timeline.push(
        <div
          className={"timeline-item " + statusToClass(status).statusClass}
          id={"row-spacer-" + mainStep.id}
          key={"row-spacer-" + mainStep.id}
        ></div>
      );
    }

    timeline.push(
      <div
        id={"content-" + mainStep.id}
        key={"content-" + mainStep.id}
        className="is-hidden"
      >
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
