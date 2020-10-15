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
      case "success":
        statusClass = "item-successful";
        iconClass = "fa-check";
        break;
      case "waiting":
      case "current":
        statusClass = "item-current";
        iconClass = "fa-hourglass-start";
        break;
      case "unsubmitted":
        statusClass = "item-current";
        iconClass = "fa-exclamation";
        break;
      case "problem":
        statusClass = "item-fail";
        iconClass = "fa-times";
        break;
      case "future":
        statusClass = "item-future";
        iconClass = "";
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

  const createStepString = (string, variable) => {
    if (string.includes(":var:")) {
      string = string.replace(":var:", variable);
    }
    return string;
  };

  const timeline = [];

  for (const mainStep of MAIN_STEPS) {
    let status = "";
    let subText = "";
    let link = "";
    let time = "";
    const renderSteps = [];
    const historySteps = application.history.filter(
      (step) => step.mainStep === mainStep.id
    );
    const lastStep = historySteps[historySteps.length - 1];

    if (historySteps.length === 0) {
      status = "future";
    } else if (lastStep.name === application.status) {
      const templateLastStep = STEPS.find(
        (tStep) => tStep.name === lastStep.name
      );
      status = "current";
      subText = createStepString(templateLastStep.string, lastStep.variable);
      if (lastStep.time) {
        time = lastStep.time;
      }
      if (templateLastStep.link) {
        link = templateLastStep.link.replace(":id:", application._id);
      }
    } else {
      status = "success";
      subText =
        "Abgeschlossen am " +
        new Date(lastStep.date).toLocaleDateString("de-DE");
    }

    for (const step of historySteps) {
      const templateStep = STEPS.find((tStep) => tStep.name === step.name);
      const statusInfo = statusToClass(templateStep.type);

      // Override old status if same group
      if (!templateStep.newBubble) renderSteps.pop();
      if (templateStep.link)
        templateStep.link = templateStep.link.replace(":id:", application._id);
      // Add previous steps
      renderSteps.push(
        <TimelineItem
          text={createStepString(templateStep.string, step.variable)}
          message={step.message}
          status={statusInfo.statusClass}
          icon={statusInfo.iconClass}
          date={step.date}
          key={step.name + step.date}
          name={step.name}
          link={templateStep.link}
          time={step.time}
        />
      );
    }
    // Add future stepps
    if (status !== "success") {
      let subSteps = STEPS.filter((step) => step.mainStep === mainStep.id);
      if (historySteps.length === 0) {
        for (const step of subSteps) {
          if (step.showDefault) {
            const statusInfo = statusToClass("future");
            renderSteps.push(
              <TimelineItem
                text={step.string}
                status={statusInfo.statusClass}
                icon={statusInfo.iconClass}
                key={step.name}
              />
            );
          }
        }
      } else {
        const templateStep = subSteps.find(
          (step) => step.name === lastStep.name
        );

        const nextIndex = subSteps.findIndex(
          (step) => step.name === templateStep.next
        );
        if (nextIndex !== -1) {
          subSteps = subSteps.slice(nextIndex);
          for (const step of subSteps) {
            if (step.showDefault) {
              const statusInfo = statusToClass("future");
              renderSteps.push(
                <TimelineItem
                  text={step.string}
                  status={statusInfo.statusClass}
                  icon={statusInfo.iconClass}
                  key={step.name}
                />
              );
            }
          }
        }
      }
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
        time={time}
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
        Statusübersicht - {application.name}
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
