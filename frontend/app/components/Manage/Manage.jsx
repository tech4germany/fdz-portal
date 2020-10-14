import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getData, sendData } from "../utils/api";
import { STEPS } from "../../../../server/const/steps";
import "./Manage.css";

const Manage = () => {
  const [applications, setApplications] = useState([]);
  const [query, setQuery] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
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
    setSelectedUser(event.target.innerText);
    setQuery({ ...query, user: event.target.id });
  };

  const removeUser = () => {
    setSelectedUser(null);
    setQuery({ ...query, user: undefined });
  };

  return (
    <div className="content-box manage">
      <div className="page-header">Antrags-Management</div>
      <div className="flex list-header">
        <div className="name">Antragsname</div>
        <div className="user">
          User{" "}
          {selectedUser && (
            <button className="button is-small is-rounded" onClick={removeUser}>
              <span>{selectedUser}</span>
              <span className="icon danger">
                <i className="fas fa-times"></i>
              </span>
            </button>
          )}
        </div>
        <div className="status">
          <div className="field">
            <div className="control">
              Status{" "}
              <div className="select is-small">
                <select onChange={filterStatus}>
                  <option value="">Alle</option>
                  <option value="active">Aktive</option>
                  <option value="passive">Passive</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      {applications.map((application) => {
        const step = STEPS.find((step) => step.name === application.status);

        const statusText = step.stringFDZ.includes(":var:")
          ? step.stringFDZ.replace(
              ":var:",
              application.history[application.history.length - 1].variable
            )
          : step.stringFDZ;

        const icon =
          step.type === "waiting"
            ? "fa-exclamation-circle"
            : "fa-hourglass-start";
        return (
          <div key={application._id} className="flex list-entry">
            <div className="name">
              <Link to={"/manage/" + application._id}>{application.name} </Link>
            </div>
            <div
              className="user is-clickable"
              onClick={filterUser}
              id={application.users[0]._id}
            >
              {application.users[0].email}
            </div>
            <div className="status">
              <small>
                <i className={"fa " + icon}></i> {statusText}
              </small>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Manage;
