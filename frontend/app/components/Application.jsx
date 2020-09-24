import React from "react";
import { useParams } from "react-router-dom";

const Application = () => {
  const applicationId = useParams().id;
  return <React.Fragment>{applicationId}</React.Fragment>;
};

export default Application;
