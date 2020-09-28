import React from "react";
import { Link } from "react-router-dom";

const TimelineItem = (props) => {
  return (
    <div className={"timeline-item " + props.status}>
      <div className={"timeline-marker is-icon " + props.status}>
        {props.icon && <i className={"fa " + props.icon}></i>}
      </div>
      <div className="timeline-content">
        <p className="heading">
          {new Date(parseInt(props.date) * 1000).toLocaleDateString("de-DE")}
        </p>
        <p>{props.text}</p>
      </div>
    </div>
  );
};

export default TimelineItem;
