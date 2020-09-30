import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getData } from "../utils/api";
import { STEPS } from "../../../../server/const/steps";
import "./Manage.css";
import Application from "../Application";

const Manage = () => {
  const [applications, setApplications] = useState([]);
  const [query, setQuery] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData("/applications");
      setApplications(data.applications);
    };
    fetchData();
  }, [query]);

  const applicationsList = applications.map((application) => {
    const status = STEPS.find((step) => step.name === application.status);
    console.log(application);
    const icon =
      status.type === "waiting"
        ? "fa-hourglass-start"
        : "fa-exclamation-circle";
    return (
      <div key={application._id} className="application">
        <div>
          <Link to={"/manage/" + application._id}>{application.name} </Link>
        </div>
        <div className="application-status">
          {status.string}{" "}
          <small>
            <i className={"fa " + icon}></i>
          </small>
        </div>
        <div className="application-user">{application.user.email}</div>
      </div>
    );
  });

  return (
    <div className="content-box">
      <div className="application-list">
        <div key="header-applications" className="application app-header">
          <div>Antragsname</div>
          <div className="app-header-status">Status</div>
          <div className="app-header-status">User</div>
        </div>
        {applicationsList}
      </div>
    </div>
  );
};

export default Manage;
