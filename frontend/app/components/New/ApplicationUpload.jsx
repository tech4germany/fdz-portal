import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getData, sendData } from "../utils/api";
import AntragPDF from "../../assets/antrag-fdz.pdf";
import "./ApplicationUpload.css";

const ApplicationUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [applicationId, setApplicationId] = useState(useParams().id);
  const [loading, setLoading] = useState(false);

  const uploadApplication = async () => {
    setLoading(true);
    setTimeout(function () {
      setLoading(false);
    }, 1000);

    await sendData(`/applications/${applicationId}/upload`, "POST", {
      fileName: setSelectedFile.name,
    });
    window.location.pathname = "/applications";
  };

  const selectFileHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="content-box">
      <div className="application-upload">
        <div className="header">Antrag einreichen</div>
        {/* First step */}
        <div className="notification">
          <div className="">
            Hier können sie das aktuelle Antragsformular herunterladen:
          </div>
          <div className="button-container">
            <a target="_blank" href={AntragPDF}>
              <button className="button">
                <span className="icon">
                  <i className="fas fa-cloud-download-alt"></i>
                </span>
                <span>Antrag</span>
              </button>
            </a>
          </div>
        </div>
        <hr />
        {/* Second step */}
        <div className="notification">
          <div className="">
            Nachdem Sie Antrag ausgefüllt haben, laden Sie ihn bitte hier hoch.
            Dadurch können wir schnellstmöglich mit der Bearbeitung starten:
          </div>
          <div className="button-container">
            <div className="file has-name is-info">
              <label className="file-label">
                <input
                  className="file-input"
                  type="file"
                  name="resume"
                  onChange={selectFileHandler}
                />
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload"></i>
                  </span>
                  <span className="file-label">Datei auswählen</span>
                </span>
                <span className="file-name">
                  {selectedFile && selectedFile.name}
                </span>
                {selectedFile && (
                  <button
                    className="button is-small remove-file is-danger is-outlined"
                    onClick={removeFile}
                  >
                    <span className="icon is-small">
                      <i className="fas fa-trash-alt"></i>
                    </span>
                  </button>
                )}
              </label>
            </div>
          </div>
        </div>
        <hr />
        {/* Third step */}
        <div className="notification">
          <div className="">
            Schicken Sie uns den unterschriebenen Antrag zu, um die diesen zu
            verifizieren:
          </div>
          <div className="address">
            <b>Anschrift:</b>
            <br />
            Bundesinstitut für Arzneimittel und Medizinprodukte (BfArM)
            <br />
            Waisenhausgasse 36-38a
            <br />
            50676 Köln
          </div>
        </div>
        {/* Buttons */}
        <div className="field is-grouped">
          <div className="control">
            <Link to={"/applications/" + applicationId}>
              <button className="button is-outlined is-danger">
                Abbrechen
              </button>
            </Link>
          </div>
          <div className="control submit-button">
            <button
              className="button is-info"
              onClick={uploadApplication}
              disabled={!!!selectedFile}
            >
              Einreichen
            </button>
          </div>
          {loading && (
            <div className="fa-2x spinner">
              <i className="fas fa-spinner fa-spin"></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationUpload;
