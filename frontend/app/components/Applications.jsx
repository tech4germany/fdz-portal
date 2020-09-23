import React, { useState, useEffect } from "react";
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
    return <div key={application}>{application}</div>;
  });
  console.log("render");

  return <div className="application-list">{applicationsList}</div>;
};

export default Applications;
