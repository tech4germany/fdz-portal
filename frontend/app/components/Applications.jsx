import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getData } from "./utils/api";
import { STEPS } from "../../../server/const/steps";
import "./Applications.css";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData("/applications");
      setApplications(data.applications);
    };
    fetchData();
  }, []);

  let i = 0;
  const applicationsList = applications.map((application) => {
    i++;
    const status = STEPS.find((step) => step.name === application.status);
    const icon =
      status.type === "waiting"
        ? "fa-hourglass-start"
        : "fa-exclamation-circle";

    return (
      <React.Fragment>
        {i > 1 && <hr></hr>}
        <div key={application._id} className="application">
          <div>
            <Link to={"/applications/" + application._id}>
              {application.name}{" "}
            </Link>
          </div>
          <div className="application-status">
            {status.string}{" "}
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
        {applicationsList}
        <div className="right">
          <Link to="/applications/new">
            <button className="button is-small is-info">
              <span className="icon">
                <i className="fas fa-plus"></i>
              </span>
              {/* <span>Application</span> */}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Applications;
