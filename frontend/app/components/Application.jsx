import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getData } from "./utils/api";
import StatusBar from "./Status/StatusBar";

const Application = () => {
  const [applicationId, setApplicationId] = useState(useParams().id);
  const [application, setApplication] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchData();
  }, [applicationId]);

  const fetchData = async () => {
    const data = await getData(`/applications/${applicationId}`);
    setApplication(data.application);
  };

  const refreshData = () => {
    fetchData();
  };

  return (
    <React.Fragment>
      {application != null && (
        <StatusBar refreshData={refreshData} application={application} />
      )}
    </React.Fragment>
  );
};

export default Application;
