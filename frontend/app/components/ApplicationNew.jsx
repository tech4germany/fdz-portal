import React from "react";
import "bulma-extensions/bulma-checkradio/dist/css/bulma-checkradio.min.css";
import "./ApplicationNew.css";

const Home = () => {
  return (
    <div className="content-box">
      <div className="columns">
        <div className="column is-four-fifths">
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
          {/* Messages */}
          <article className="message is-small">
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
          </article>
        </div>
      </div>
    </div>
  );
};

export default Home;
