import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getData } from "./utils/api";
import { STEPS } from "../../../server/const/steps";
import "./Applications.css";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [unfetched, setUnfetched] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        var data = await getData("/applications");
      } catch {
        setOffline(true);
        return;
      }
      setApplications(data.applications);
      setUnfetched(false);
    };
    fetchData();
  }, []);

  const timestampToString = (timestap) => {
    const date = new Date(timestap);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const timeString = day + "." + month;
    return timeString;
  };

  let i = 0;

  const applicationsList = applications.map((application) => {
    i++;
    const statusTemplate = STEPS.find(
      (step) => step.name === application.status
    );
    const stepVariable =
      application.history[application.history.length - 1].variable;
    const statusText = statusTemplate.string.includes(":var:")
      ? statusTemplate.string.replace(":var:", stepVariable)
      : statusTemplate.string;
    const icon =
      statusTemplate.type === "waiting"
        ? "fa-hourglass-start"
        : "fa-exclamation-circle";
    const statusDate = timestampToString(
      application.history[application.history.length - 1].date
    );
    return (
      <div className="entry" key={i}>
        {i > 1 && <hr />}
        <div key={application._id} className="flex">
          <div className="name">
            <Link to={"/applications/" + application._id}>
              {application.name}
            </Link>
          </div>
          <div className="status">
            <span className="date">{statusDate}</span>:{" "}
            <small>
              <i className={"fa " + icon}></i>
            </small>{" "}
            {statusText}
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className="content-box applications">
      <div className="page-header">Antragsübersicht</div>
      <div className="flex list-header">
        <div className="name">Antragsname</div>
        <div className="status">Status</div>
      </div>
      {offline
        ? "Server offline"
        : applicationsList.length !== 0 || unfetched
        ? applicationsList
        : "Es sind noch keine Anträge vorhanden"}
      <div className="new">
        <Link to="/applications/new">
          <button className="button is-small is-info">
            <span className="icon">
              <i className="fas fa-plus"></i>
            </span>
            <span>Neuer Antrag</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Applications;
