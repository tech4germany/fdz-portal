import React from "react";
import "./Notification.css";

const Notification = (props) => {
  const closeNotification = () => {
    props.close(null);
  };

  if (props.notification === null) return "";
  return (
    <div
      className={
        "notification is-primary " +
        props.notification.status +
        " " +
        props.size
      }
    >
      <button className="delete" onClick={closeNotification}></button>
      {props.notification.text}
    </div>
  );
};

export default Notification;
