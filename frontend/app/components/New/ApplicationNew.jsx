import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getData, sendData } from "../utils/api";
import BulmaTagsInput from "bulma-extensions/bulma-tagsinput/dist/js/bulma-tagsinput.min.js";
import "bulma-extensions/bulma-tagsinput/dist/css/bulma-tagsinput.min.css";
import "bulma-extensions/bulma-checkradio/dist/css/bulma-checkradio.min.css";
import "./ApplicationNew.css";

const ApplicationNew = () => {
  useEffect(() => {
    const inputTags = document.getElementById("tagsinput");
    new BulmaTagsInput(inputTags);
    // Not working
    // inputTags.BulmaTagsInput().on("after.add", handleTags(inputTags.items));
  }, []);

  const submitApplication = async () => {
    await sendData(`/applications/new`, "POST", {
      applicationName: document.getElementById("applicationName").value,
      applicationDesc: document.getElementById("applicationDesc").value,
      additionalUser: document.getElementById("tagsinput").value.split(","),
    });

    window.location.pathname = "/applications";
  };

  return (
    <div className="content-box">
      <div className="columns">
        <div className="column is-four-fifths">
          {/* Input */}
          <div className="field">
            <label className="label">Antragsname</label>
            <div className="control has-icons-left">
              <input
                className="input"
                type="text"
                placeholder="Diabetes Prävalenz"
                id="applicationName"
                maxLength="30"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lightbulb"></i>
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Beschreibung</label>
            <div className="control has-icons-left">
              <input
                className="input"
                type="text"
                placeholder="Kurze beschreibung"
                id="applicationDesc"
                maxLength="30"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-clipboard"></i>
              </span>
            </div>
          </div>
          {/* Tags Input */}
          <div className="field">
            <label className="label">Beteiligte Personen</label>
            <div className="control has-icons-left">
              <input
                className="input"
                placeholder="Email eingeben"
                data-selectable="false"
                id="tagsinput"
                type="tags"
              ></input>
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </div>
          </div>

          {/* Dropdown */}
          {/* <div className="field">
            <label className="label">Subject</label>
            <div className="control">
              <div className="select">
                <select>
                  <option>Select dropdown</option>
                  <option>With options</option>
                </select>
              </div>
            </div>
          </div> */}
          {/* Textarea */}
          {/* <div className="field">
            <label className="label">Message</label>
            <div className="control">
              <textarea className="textarea" placeholder="Textarea"></textarea>
            </div>
          </div> */}
          {/* Checkbox */}
          {/* <div className="field">
            <input
              className="is-checkradio"
              id="exampleCheckbox"
              type="checkbox"
              name="exampleCheckbox"
              defaultChecked={false}
            />
            <label htmlFor="exampleCheckbox">Check me</label>
          </div> */}
          {/* Radio buttons */}
          {/* <div className="field">
            <input
              className="is-checkradio"
              id="exampleRadioInline1"
              type="radio"
              name="exampleRadioInline"
              defaultChecked={true}
            />
            <label htmlFor="exampleRadioInline1">Option 1</label>
            <input
              className="is-checkradio"
              id="exampleRadioInline2"
              type="radio"
              name="exampleRadioInline"
              defaultChecked={false}
            />
            <label htmlFor="exampleRadioInline2">Option 2</label>
          </div> */}
          {/* Buttons */}
          <div className="field is-grouped">
            <div className="control">
              <Link to={"/applications"}>
                <button className="button is-outlined is-danger">
                  Abrechen
                </button>
              </Link>
            </div>
            <div className="control">
              <button className="button is-info" onClick={submitApplication}>
                Erstellen
              </button>
            </div>
          </div>
          {/* Messages */}
          {/* <article className="message is-small">
            <div className="message-header">
              <p>Small message</p>
              <button className="delete is-small" aria-label="delete"></button>
            </div>
            <div className="message-body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
              <strong>Pellentesque risus mi</strong>, tempus quis placerat ut,
              porta nec nulla.Nullam gravida purus diam, et dictum{" "}
              <a>felis venenatis</a> efficitur. Aenean ac{" "}
              <em>eleifend lacus</em>, in mollis lectus.
            </div>
          </article> */}
        </div>
      </div>
    </div>
  );
};

export default ApplicationNew;
