import React from "react";
import { withRouter, Link, Redirect } from "react-router-dom";
import "bulma-extensions/bulma-steps/dist/css/bulma-steps.min.css";
import { getData, sendData } from "./utils/api";
import "./Script.css";
class Script extends React.Component {
  constructor(props) {
    super(props);
    this.selectScriptHandler = this.selectScriptHandler.bind(this);
    this.uploadScript = this.uploadScript.bind(this);
    this.confirmScript = this.confirmScript.bind(this);
    this.submitScript = this.submitScript.bind(this);
    this.removeFile = this.removeFile.bind(this);
    this.goBack = this.goBack.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.abortWizard = this.abortWizard.bind(this);

    this.state = {
      applicationId: this.props.match.params.id,
      application: null,
      submissionType: this.props.match.params.type, // first, update, new
      step: 1,
      selectedFile: null,
      confirmed: false,
      resultMethod: null,
      title: "",
      content: null,
    };
  }

  async componentDidMount() {
    const data = await getData(`/applications/${this.state.applicationId}`);
    this.setState({ application: data.application });
  }

  selectScriptHandler(event) {
    this.setState({ selectedFile: event.target.files[0] });
  }

  abortWizard() {
    window.location.pathname = `/applications/${this.state.applicationId}`;
  }

  removeFile() {
    this.setState({ selectedFile: null });
  }

  goBack() {
    this.setState({ step: this.state.step - 1 });
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
      1000
    );
  }

  toggleModal() {
    const content = document.getElementById(`modal-error`);
    content.classList.toggle("is-active");
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
      let uploadDescription = "";
      switch (this.state.submissionType) {
        case "first":
          uploadDescription =
            "Bitte reichen sie ein Skript ein welches Ihnen die aggregierte Ergebnismenge für Ihren Forschungsantrag zurückgibt";
          break;
        case "update":
          uploadDescription =
            "Die Ausführung Ihres Skriptes hat eine Fehlermeldung produziert. Bitte reichen sie eine neue Version Ihres Skriptes ein";
          break;
        case "new":
          uploadDescription =
            "Wenn die bisher zurückgelieferte Ergebnismenge nicht spezifisch genug ist reichen sie bitte eine neue Version Ihres Skriptes, ein welche die benötigte Ergebnismenge abfragt";
      }
      content = (
        <React.Fragment>
          <div className="upload-description">
            {uploadDescription}{" "}
            {this.state.submissionType === "update" && this.state.application && (
              <React.Fragment>
                <i
                  className={
                    "fa fa-exclamation-circle error-color is-clickable"
                  }
                  onClick={this.toggleModal}
                ></i>
                <div id={"modal-error"} className="modal">
                  <div
                    className="modal-background"
                    onClick={this.toggleModal}
                  ></div>
                  <div className="modal-content">
                    <div className="box">
                      <article className="media">
                        <div className="media-content">
                          <div className="content">
                            <p>
                              {
                                this.state.application.history[
                                  this.state.application.history.length - 2
                                ].message
                              }
                            </p>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                  <button
                    className="modal-close is-large"
                    aria-label="close"
                    onClick={this.toggleModal}
                  ></button>
                </div>
              </React.Fragment>
            )}
          </div>
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
          <Link to={"/applications/" + this.state.applicationId}>
            <button className="button is-danger is-outlined back-button">
              <span className="icon is-small">
                <i className="fas fa-times"></i>
              </span>
            </button>
          </Link>
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
            className="button is-info is-outlined back-button"
            onClick={this.goBack}
          >
            <span className="icon is-small">
              <i className="fas fa-chevron-circle-left"></i>
            </span>
          </button>

          <button
            className="button is-info upload-button"
            onClick={this.confirmScript}
            autoFocus={true}
          >
            Bestätigen
          </button>
          <Link to={"/applications/" + this.state.applicationId}>
            <button className="button is-danger is-outlined back-button">
              <span className="icon is-small">
                <i className="fas fa-times"></i>
              </span>
            </button>
          </Link>
        </React.Fragment>
      );
    } else if (step === 3) {
      content = (
        <React.Fragment>
          <div className="step3-description">
            Wählen sie hier zwischen zwei Möglichen Ergebnismengen aus. Nachdem
            ihr Skript ausgeführt wurde erhalten Sie eine Benachrichtigung per
            E-Mail. Anschließend können Sie eine neues Skript einreichen
          </div>
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
                      autoFocus={true}
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
          <button
            className="button is-info is-outlined back-button"
            onClick={this.goBack}
          >
            <span className="icon is-small">
              <i className="fas fa-chevron-circle-left"></i>
            </span>
          </button>
          <Link to={"/applications/" + this.state.applicationId}>
            <button className="button is-danger is-outlined back-button">
              <span className="icon is-small">
                <i className="fas fa-times"></i>
              </span>
            </button>
          </Link>
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
            {/* <li className={this.getStepClasses(4)}>
              <div className="step-marker">
                <span className="icon">
                  <i className="fa fa-flag"></i>
                </span>
              </div>
              <div className="step-details">
                <p className="step-title">Zusammenfassung</p>
              </div>
            </li> */}
          </ul>
        </div>
        {content}
      </div>
    );
  }
}

export default withRouter(Script);
