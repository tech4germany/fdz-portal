import React from "react";
import "bulma-extensions/bulma-checkradio/dist/css/bulma-checkradio.min.css";
import "./ApplicationNew.css";

const Home = () => {
  return (
    <div className="form">
      <div className="columns">
        <div className="column is-two-fifths">
          {/* Input */}
          <div className="field">
            <label className="label">Name</label>
            <div className="control has-icons-left">
              <input className="input" type="text" placeholder="Text input" />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </div>
          </div>
          {/* Dropdown */}
          <div className="field">
            <label className="label">Subject</label>
            <div className="control">
              <div className="select">
                <select>
                  <option>Select dropdown</option>
                  <option>With options</option>
                </select>
              </div>
            </div>
          </div>
          {/* Textarea */}
          <div className="field">
            <label className="label">Message</label>
            <div className="control">
              <textarea className="textarea" placeholder="Textarea"></textarea>
            </div>
          </div>
          {/* Checkbox */}
          <div className="field">
            <input
              className="is-checkradio"
              id="exampleCheckbox"
              type="checkbox"
              name="exampleCheckbox"
              defaultChecked={false}
            />
            <label htmlFor="exampleCheckbox">Check me</label>
          </div>
          {/* Radio buttons */}
          <div className="field">
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
          </div>
          {/* Buttons */}
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link">Submit</button>
            </div>
            <div className="control">
              <button className="button is-link is-light">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;