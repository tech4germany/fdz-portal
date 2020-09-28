import React from "react";
import { Link } from "react-router-dom";

const TimelineItem = (props) => {
  const openModal = () => {
    console.log("trigger mdoal", props.name);
    const content = document.getElementById(`modal-${props.name}`);
    content.classList.toggle("is-active");
  };

  return (
    <div className={"timeline-item " + props.status}>
      <div className={"timeline-marker is-icon " + props.status}>
        {props.icon && <i className={"fa " + props.icon}></i>}
      </div>
      <div className="timeline-content">
        {props.date && (
          <p className="heading">
            {new Date(parseInt(props.date) * 1000).toLocaleDateString("de-DE")}
          </p>
        )}
        <p>
          {props.text}{" "}
          {props.message && (
            <i onClick={openModal} className={"fa fa-envelope click"}></i>
          )}
        </p>
      </div>
      <div id={"modal-" + props.name} className="modal">
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="box">
            <article className="media">
              <div className="media-content">
                <div className="content">
                  <p>{props.message}</p>
                </div>
              </div>
            </article>
          </div>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={openModal}
        ></button>
      </div>
    </div>
  );
};

export default TimelineItem;
