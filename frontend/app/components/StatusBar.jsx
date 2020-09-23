import React from "react";
import "bulma-extensions/bulma-timeline/dist/css/bulma-timeline.min.css";
import "./StatusBar.css";

const StatusBar = () => {
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

  const createTimeline = () => {
    let timeline = '<div className="timeline">';
  };

  return (
    <div className="content-box">
      <div className="timeline">
        <header className="timeline-header">
          <span className="tag is-large is-success">
            <span className="timeline-header-text">Antrag</span>
            <span
              className="icon is-small click"
              id="1"
              onClick={collapseDetails}
            >
              <i className="fas fa-angle-up" aria-hidden="true" id="icon-1"></i>
            </span>
          </span>
        </header>
        <div
          className="timeline-item is-hidden is-success"
          id="row-spacer-1"
        ></div>
        <div id="content-1">
          <div className="timeline-item is-success">
            <div className="timeline-marker is-icon is-success">
              <i className="fa fa-check"></i>
            </div>
            <div className="timeline-content">
              <p className="heading">January 2016</p>
              <p>Timeline content - Can include any HTML element</p>
            </div>
          </div>
          <div className="timeline-item is-success">
            <div className="timeline-marker is-icon is-success">
              <i className="fa fa-check"></i>
            </div>
            <div className="timeline-content">
              <p className="heading">February 2016</p>
              <p>Timeline content - Can include any HTML element</p>
            </div>
          </div>
        </div>
        <header className="timeline-header">
          <span className="tag is-large is-info">
            <span className="timeline-header-text">Testdaten</span>
            <span
              className="icon is-small click"
              id="2"
              onClick={collapseDetails}
            >
              <i className="fas fa-angle-up" aria-hidden="true" id="icon-2"></i>
            </span>
          </span>
        </header>
        <div className="timeline-item is-hidden" id="row-spacer-2"></div>
        <div id="content-2">
          <div className="timeline-item">
            <div className="timeline-marker is-icon is-info">
              <i className="fa fa-hourglass-start"></i>
            </div>
            <div className="timeline-content">
              <p className="heading">March 2017</p>
              <p>Timeline content - Can include any HTML element</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-marker is-icon is-info">
              <i className="fa fa-exclamation"></i>
            </div>
            <div className="timeline-content">
              <p className="heading">March 2017</p>
              <p>Timeline content - Can include any HTML element</p>
            </div>
          </div>
        </div>
        <div className="timeline-header">
          <span className="tag is-medium is-large is-dark">Ergebnismenge</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
