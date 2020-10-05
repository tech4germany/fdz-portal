import React from "react";
import { Link } from "react-router-dom";

const TimelineMain = (props) => {
  return (
    <header
      className={"timeline-mainstep is-clickable " + props.status}
      onClick={props.collapseDetails}
      id={props.id}
    >
      <div className="timeline-head">
        <div className="timeline-title">{props.title}</div>
        <div className="icon is-small is-clickable collapse" id={props.id}>
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
