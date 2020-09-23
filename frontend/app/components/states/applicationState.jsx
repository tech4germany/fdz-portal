import { createContainer } from "unstated-next";
import { useState, useEffect } from "react";
import { getData } from "../utils/api";

const getApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    setApplications(getData("/applications"));
  }, []);
};

export const ApplicationState = createContainer(getApplications);
