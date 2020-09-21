import React from "react";
import "bulma-extensions/bulma-timeline/dist/css/bulma-timeline.min.css";
import "./StatusBar.css";

const StatusBar = () => {
  return (
    <div className="timeline">
      <header className="timeline-header">
        <span className="tag is-medium is-primary">Start</span>
      </header>
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
