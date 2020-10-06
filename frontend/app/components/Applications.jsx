import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getData } from "./utils/api";
import { STEPS } from "../../../server/const/steps";
import "./Applications.css";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [unfetched, setUnfetched] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData("/applications");
      setApplications(data.applications);
      setUnfetched(false);
    };
    fetchData();
  }, []);

  let i = 0;

  const applicationsList = applications.map((application) => {
    i++;
    const statusString = STEPS.find((step) => step.name === application.status)
      .string;
    const stepVariable =
      application.history[application.history.length - 1].variable;
    const statusText = statusString.includes(":var:")
      ? statusString.replace(":var:", stepVariable)
      : statusString;
    const icon =
      status.type === "waiting"
        ? "fa-hourglass-start"
        : "fa-exclamation-circle";

    return (
      <React.Fragment key={i}>
        {i > 1 && <hr />}
        <div key={application._id} className="application">
          <div>
            <Link to={"/applications/" + application._id}>
              {application.name}{" "}
            </Link>
          </div>
          <div className="application-status">
            {statusText}{" "}
            {/* <small>
              <i className={"fa " + icon}></i>
            </small> */}
          </div>
        </div>
      </React.Fragment>
    );
  });
  return (
    <div className="content-box">
      <div className="application-list">
        <div key="header-applications" className="application app-header">
          <div>Antragsname</div>
          <div className="app-header-status">Status</div>
        </div>
        {applicationsList.length !== 0 || unfetched
          ? applicationsList
          : "Es sind noch keine Anträge vorhanden"}
        <div className="right">
          <Link to="/applications/new">
            <button className="button is-small is-info">
              <span className="icon">
                <i className="fas fa-plus"></i>
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Applications;
