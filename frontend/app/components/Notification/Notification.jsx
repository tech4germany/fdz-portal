import React from "react";
import "./Notification.css";

const Notification = (props) => {
  if (!props.notification) return "";
  return (
    <div
      className={"notification " + props.notification.status + " " + props.size}
    >
      <button className="delete" onClick={props.close}></button>
      {props.notification.text}
    </div>
  );
};

export default Notification;
