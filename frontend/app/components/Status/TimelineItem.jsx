import React from "react";
import { Link } from "react-router-dom";

const TimelineItem = (props) => {
  const toggleModal = () => {
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
          <p className="timeline-item-header">
            {props.time
              ? props.time + " Bearbeitungszeit"
              : new Date(props.date).toLocaleDateString("de-DE")}
          </p>
        )}
        <div>
          {props.text}{" "}
          {props.link && (
            <Link to={props.link}>
              <button className="button is-info is-outlined is-small">
                Einreichen
              </button>
            </Link>
          )}
          {props.message && (
            <i
              onClick={toggleModal}
              className={"far fa-envelope click message-icon"}
            ></i>
          )}
        </div>
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
          onClick={toggleModal}
        ></button>
      </div>
    </div>
  );
};

export default TimelineItem;
