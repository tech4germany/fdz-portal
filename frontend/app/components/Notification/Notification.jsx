import React from "react";
import "./Notification.css";

const Notification = (props) => {
  if (props.notification === null) return "";
  return (
    <div
      className={"notification " + props.notification.status + " " + props.size}
    >
      {props.close && (
        <button className="delete" onClick={props.close}></button>
      )}
      {props.notification.text}
    </div>
  );
};

export default Notification;
