import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getData } from "../utils/api";
import { STEPS } from "../../../../server/const/steps";
import "./Manage.css";

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
    const step = STEPS.find((step) => step.name === application.status);

    const statusText = step.stringFDZ.includes(":var:")
      ? step.stringFDZ.replace(
          ":var:",
          application.history[application.history.length - 1].variable
        )
      : step.stringFDZ;

    const icon =
      step.type === "waiting" ? "fa-exclamation-circle" : "fa-hourglass-start";
    return (
      <div key={application._id} className="application">
        <div className="applications-manage-name">
          <Link to={"/manage/" + application._id}>{application.name} </Link>
        </div>
        <div className="applications-manage-user">
          {application.users[0].email}
        </div>
        <div className="applications-manage-status">
          <small>
            <i className={"fa " + icon}></i> {statusText}
          </small>
        </div>
      </div>
    );
  });

  return (
    <div className="content-box">
      <div className="application-list">
        <div className="application app-header">
          <div className="applications-manage-header-name">Antragsname</div>
          <div className="applications-manage-header-user">User</div>
          <div className="applications-manage-header-status">Status</div>
        </div>
        {applicationsList}
      </div>
    </div>
  );
};

export default Manage;
