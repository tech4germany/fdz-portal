import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getData } from "./utils/api";
import "./Applications.css";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData("/applications");
      console.log(data);
      setApplications(data.applications);
    };
    fetchData();
  }, []);

  const applicationsList = applications.map((application) => {
    console.log("map");
    return (
      <div key={application._id} className="application">
        <div>
          <Link to={"/application/" + application._id}>
            {application.name}{" "}
          </Link>
        </div>
        <div className="application-status">{application.status}</div>
      </div>
    );
  });
  console.log("render");

  return (
    <React.Fragment>
      <div className="application-list">
        {applicationsList}
        <div className="right">
          <Link to="/application/new">
            <button className="button">
              <span className="icon">
                <i className="fas fa-plus"></i>
              </span>
              {/* <span>Application</span> */}
            </button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Applications;
