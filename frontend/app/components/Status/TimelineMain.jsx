import React from "react";
import { Link } from "react-router-dom";

const TimelineMain = (props) => {
  return (
    <header className={"timeline-mainstep" + props.status}>
      <div className="timeline-head">
        <div className="timeline-title">Testdata</div>
        <div
          className="icon is-small click collapse"
          id="2"
          onClick={props.collapseDetails}
        >
          <i className="fas fa-angle-up" aria-hidden="true" id="icon-2"></i>
        </div>
      </div>
      <div>
        {props.text}
        {/* Please submit a script:{" "}
        <Link to={"/application/" + props.applicationId + "/script"}>
          <button class="button is-info is-inverted is-small">Submit</button>
        </Link> */}
      </div>
    </header>
  );
};

export default TimelineMain;
