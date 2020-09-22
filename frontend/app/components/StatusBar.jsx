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

  return (
    <div className="timeline">
      <header className="timeline-header">
        <span className="tag is-medium is-primary">
          <span className="timeline-header-text">Start</span>
          <span className="icon is-small" id="1" onClick={collapseDetails}>
            <i className="fas fa-angle-up" aria-hidden="true" id="icon-1"></i>
          </span>
        </span>
      </header>
      <div className="timeline-item is-hidden" id="row-spacer-1"></div>
      <div id="content-1">
        <div className="timeline-item">
          <div className="timeline-marker"></div>
          <div className="timeline-content">
            <p className="heading">January 2016</p>
            <p>Timeline content - Can include any HTML element</p>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-marker is-image is-32x32">
            <img src="https://bulma.io/images/placeholders/32x32.png" />
          </div>
          <div className="timeline-content">
            <p className="heading">February 2016</p>
            <p>Timeline content - Can include any HTML element</p>
          </div>
        </div>
      </div>
      <header className="timeline-header">
        <span className="tag is-primary">2017</span>
      </header>
      <div className="timeline-item">
        <div className="timeline-marker is-icon">
          <i className="fa fa-flag"></i>
        </div>
        <div className="timeline-content">
          <p className="heading">March 2017</p>
          <p>Timeline content - Can include any HTML element</p>
        </div>
      </div>
      <div className="timeline-header">
        <span className="tag is-medium is-primary">End</span>
      </div>
    </div>
  );
};

export default StatusBar;
