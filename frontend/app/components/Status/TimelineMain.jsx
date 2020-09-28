import React from "react";
import { Link } from "react-router-dom";

const TimelineMain = (props) => {
  return (
    <header className={"timeline-mainstep " + props.status}>
      <div className="timeline-head">
        <div className="timeline-title">{props.title}</div>
        <div
          className="icon is-small click collapse"
          id={props.id}
          onClick={props.collapseDetails}
        >
          <i
            className="fas fa-angle-down"
            aria-hidden="true"
            id={"icon-" + props.id}
          ></i>
        </div>
      </div>
      <div>
        {props.text}{" "}
        {props.time && (
          <span className="main-step-time">
            ({props.time} Bearbeitungszeit)
          </span>
        )}
        {props.link && (
          <Link to={props.link}>
            <button className="button is-info is-inverted is-small">
              Einreichen
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default TimelineMain;
