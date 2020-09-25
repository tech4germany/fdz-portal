import React from "react";
import { Link } from "react-router-dom";

const TimelineItem = (props) => {
  const makerClasses = props.status;
  return (
    <div className={"timeline-item " + props.status}>
      <div className={"timeline-marker is-icon " + props.status}>
        {props.status === "done" && <i className="fa fa-check"></i>}
      </div>
      <div className="timeline-content">
        <p className="heading">{props.date}</p>
        <p>{props.text}</p>
      </div>
    </div>
  );
};

export default TimelineItem;
