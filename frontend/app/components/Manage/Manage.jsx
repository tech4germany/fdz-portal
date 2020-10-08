import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getData, sendData } from "../utils/api";
import { STEPS } from "../../../../server/const/steps";
import "./Manage.css";

const Manage = () => {
  const [applications, setApplications] = useState([]);
  const [query, setQuery] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      console.log(query);
      const data = await sendData("/applications", "POST", { query });
      setApplications(data.applications);
    };
    fetchData();
  }, [query]);

  const filterStatus = (event) => {
    if (event.target.value) setQuery({ ...query, status: event.target.value });
    else setQuery({ ...query, status: undefined });
  };

  const filterUser = (event) => {
    setQuery({ ...query, user: event.target.id });
  };

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
        <div
          className="applications-manage-user is-clickable"
          onClick={filterUser}
          id={application.users[0]._id}
        >
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
          <div className="applications-manage-header-status">
            <div className="field">
              <div className="control">
                Status{" "}
                <div className="select is-small">
                  <select onChange={filterStatus}>
                    <option value="">All</option>
                    <option value="application_unchecked">Aktive</option>
                    <option value="script_needs_update">Passive</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        {applicationsList}
      </div>
    </div>
  );
};

export default Manage;
