import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import "bulma-extensions/bulma-steps/dist/css/bulma-steps.min.css";
import { sendData } from "./utils/api";
import "./Script.css";

class Script extends React.Component {
  constructor(props) {
    super(props);
    this.selectScriptHandler = this.selectScriptHandler.bind(this);
    this.uploadScript = this.uploadScript.bind(this);
    this.confirmScript = this.confirmScript.bind(this);
    this.submitScript = this.submitScript.bind(this);
    this.removeFile = this.removeFile.bind(this);

    this.state = {
      applicationId: this.props.match.params.id,
      step: 1,
      selectedFile: null,
      confirmed: false,
      resultMethod: null,
      title: "",
      content: null,
    };
  }

  selectScriptHandler(event) {
    this.setState({ selectedFile: event.target.files[0] });
  }

  removeFile() {
    this.setState({ selectedFile: null });
  }

  uploadScript() {
    if (!this.state.selectedFile) {
      return;
    }
    this.setState({ loading: true });
    setTimeout(
      function () {
        this.setState({ loading: false });
        this.setState({ step: 2 });
      }.bind(this),
      1500
    );
  }

  getStepClasses(step) {
    if (step === this.state.step) return "step-item is-completed is-info";
    if (step < this.state.step) return "step-item is-completed is-success";
    else return "step-item";
  }

  confirmScript() {
    this.setState({ step: 3 });
    this.setState({ confirmed: true });
  }

  submitScript(resultMethod) {
    this.setState({ resultMethod });
    sendData(`/applications/${this.state.applicationId}/script/fake`, "POST", {
      fileName: this.state.selectedFile.name,
      resultMethod,
    });
    this.setState({ step: 4 });
  }

  render() {
    const step = this.state.step;
    let content;
    if (step === 1) {
      content = (
        <React.Fragment>
          <div className="upload-description">asd</div>
          <div className="file has-name">
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                name="resume"
                onChange={this.selectScriptHandler}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">Skript Datei auswählen</span>
              </span>
              <span className="file-name">
                {this.state.selectedFile && this.state.selectedFile.name}
              </span>
              {this.state.selectedFile && (
                <button
                  className="button is-small remove-file is-danger is-outlined"
                  onClick={this.removeFile}
                >
                  <span className="icon is-small">
                    <i className="fas fa-trash-alt"></i>
                  </span>
                </button>
              )}
              {this.state.loading && (
                <div className="fa-2x spinner">
                  <i className="fas fa-spinner fa-spin"></i>
                </div>
              )}
            </label>
          </div>
          <button
            className="button is-info upload-button"
            onClick={this.uploadScript}
          >
            Hochladen
          </button>
        </React.Fragment>
      );
    } else if (step === 2) {
      content = (
        <React.Fragment>
          <div className="upload-info">
            Es ist wichtig, dass Ihr entwickeltes Skript bereits auf den
            Testdaten geprüft und lauffähig ist um unnötige Wartezeit zu
            vermeiden.
          </div>
          <div className="upload-info-confirm">
            Hiermit versichere ich mein Skript bereits sorgfältig geprüft zu
            haben. Mein Skript habe ich am Testdatensatz laufen lassen und keine
            Fehlermeldung bekommen.
            <br />
            Ich bin mir darüber im klaren, dass ein nicht lauffähiges Skript den
            Datenantragsprozess um mehrere Wochen bis Monate verzögern kann.
          </div>
          <button
            className="button is-info upload-button"
            onClick={this.confirmScript}
          >
            Bestätigen
          </button>
        </React.Fragment>
      );
    } else if (step === 3) {
      content = (
        <React.Fragment>
          <div className="box select-result-box">
            <article className="media">
              <div className="media-content">
                <div className="content">
                  <p>
                    <strong>Komplette Ergebnismenge</strong>
                    <br />
                    <small>
                      <i className="fa fa-hourglass-start"></i> 4 - 6 Wochen
                      Bearbeitungszeit
                    </small>
                    <br />
                    <br />
                    Sie bekommen die komplette geprüfte aggregierte
                    Ergebnismenge zurück.
                    <br />
                    <br />
                    <i>
                      Empfohlen wenn Sie sich sicher sind, dass das Skript
                      vollständig und korrekt ist und die richtigen Daten
                      abfragt
                    </i>
                    <br />
                    <button
                      className="button is-info upload-button"
                      onClick={() => this.submitScript("full")}
                    >
                      Anfordern
                    </button>
                  </p>
                </div>
              </div>
            </article>
          </div>
          <div className="box select-result-box">
            <article className="media">
              <div className="media-content">
                <div className="content">
                  <p>
                    <strong>Teil-Ergebnismenge</strong>
                    <br />
                    <small>
                      <i className="fa fa-hourglass-start"></i> 2 - 3 Wochen
                      Bearbeitungszeit
                    </small>
                    <br />
                    <br />
                    Sie bekommen nur die ersten 20 Zeilen der Ergebnismenge
                    zurück was ermöglicht eine Plausibilitätsprüfung der
                    Ergebnismenge zu machen.
                    <br />
                    <br />
                    <i>
                      Empfohlen wenn Sie noch nicht komplett sicher sind das Ihr
                      Skript korrekt und vollständig ist
                    </i>
                  </p>
                  <button
                    className="button is-info upload-button"
                    onClick={() => this.submitScript("partial")}
                  >
                    Anfordern
                  </button>
                </div>
              </div>
            </article>
          </div>
        </React.Fragment>
      );
    } else if (step === 4) {
      content = (
        <React.Fragment>
          Das Skript {this.state.selectedFile.name} wurde erfolgreich
          eingereicht und es wurde die{" "}
          {this.state.resultMethod === "full"
            ? " komplette Ergebnismenge"
            : "Teil-Ergebnismenge"}{" "}
          beantragt.
          <br />
          <Link to={"/applications/" + this.state.applicationId}>
            <button className="button is-info upload-button">
              Statusübersicht
            </button>
          </Link>
        </React.Fragment>
      );
    }
    return (
      <div className="content-box">
        <div className="wizard-step-bar">
          <ul className="steps">
            <li className={this.getStepClasses(1)}>
              <div className="step-marker">
                <span className="icon">
                  <i className={"fa" + (step > 1 && " fa-check")}></i>
                </span>
              </div>
              <div className="step-details ">
                <p className="step-title">Skript Auswählen</p>
              </div>
            </li>
            <li className={this.getStepClasses(2)}>
              <div className="step-marker">
                <span className="icon">
                  <i className={"fa" + (step > 2 && " fa-check")}></i>
                </span>
              </div>
              <div className="step-details">
                <p className="step-title">Skript Prüfen</p>
              </div>
            </li>
            <li className={this.getStepClasses(3)}>
              <div className="step-marker">
                <span className="icon">
                  <i className={"fa" + (step > 3 && " fa-check")}></i>
                </span>
              </div>
              <div className="step-details">
                <p className="step-title">Ergebnismenge</p>
              </div>
            </li>
            <li className={this.getStepClasses(4)}>
              <div className="step-marker">
                <span className="icon">
                  <i className="fa fa-flag"></i>
                </span>
              </div>
              <div className="step-details">
                <p className="step-title">Zusammenfassung</p>
              </div>
            </li>
          </ul>
        </div>
        {content}
      </div>
    );
  }
}

export default withRouter(Script);
