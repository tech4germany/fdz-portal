import { createContainer } from "unstated-next";
import { useState } from "react";

const getApplications = () => {
  const [applications, setApplications] = useState([]);
};

export const ApplicationState = createContainer(getApplications);
