import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { sendData } from "./utils/api";
import "./Script.css";

const Script = () => {
  const [applicationId, setApplicationId] = useState(useParams().id);
  const [step, setStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const selectScriptHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    document.getElementById("file-name").innerText = event.target.files[0].name;
  };
  const uploadScript = () => {
    console.log("uploading script");
    setLoading(true);
    setTimeout(function () {
      setLoading(false);
      setStep(2);
      console.log("done");
    }, 4000);
  };

  return (
    <div className="content-box">
      <div className="file has-name">
        <label className="file-label">
          <input
            className="file-input"
            type="file"
            name="resume"
            onChange={selectScriptHandler}
          />
          <span className="file-cta">
            <span className="file-icon">
              <i className="fas fa-upload"></i>
            </span>
            <span className="file-label">Choose a file…</span>
          </span>
          <span className="file-name" id="file-name"></span>
        </label>
      </div>
      {loading && "uploading file"}
      <button
        className="button is-info is-outlined upload-button"
        onClick={uploadScript}
      >
        Hochladen
      </button>
    </div>
  );
};

export default Script;
