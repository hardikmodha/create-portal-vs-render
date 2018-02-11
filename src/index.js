import React from "react";
import { render, createPortal } from "react-dom";
import { PropTypes } from "prop-types";

const mainContainer = document.getElementById("root");
const portalContainer = document.getElementById("another-root");
const anotherContainer = document.getElementById("another-container");

const childStyle = {
  margin: "0px",
  padding: "10px",
  border: "1px solid black"
};

class HelloFromPortal extends React.Component {
  render() {
    return (
      <div>
        <div
          onClick={() => {
            alert("My parent should know that I was clicked!");
          }}
          style={childStyle}
        >
          I am rendered through a Portal. Click here to confirm this with my
          Parent!
          <h5>
            My Parent has said, {this.context.parentSecret} (Context Value)
          </h5>
        </div>
      </div>
    );
  }
}

class AmISameAsPortal extends React.Component {
  render() {
    return (
      <div
        onClick={() => {
          alert("Now, My parent should know that I was clicked!");
        }}
        style={childStyle}
      >
        Am I Same As Portal? Click to Find out!
        <h5>My Parent has said, {this.context.parentSecret || "No Context"}</h5>
      </div>
    );
  }
}

class HelloReact extends React.Component {
  getChildContext() {
    return { parentSecret: "Not a Flame Thrower! :P" };
  }

  render() {
    return (
      <div>
        <h1>Hello Portals!</h1>
        <div
          onClick={() => {
            alert(
              "YES! My child is rendered through Portal. Click event on it was propagated to me!"
            );
          }}
        >
          {createPortal(<HelloFromPortal />, portalContainer)}
        </div>
        <div
          onClick={() => {
            // This will not be displayed.
            alert("My child is not time-traveling through portal! :(");
          }}
        >
          {render(<AmISameAsPortal />, anotherContainer)}
        </div>
      </div>
    );
  }
}

HelloReact.childContextTypes = {
  parentSecret: PropTypes.string
};

HelloFromPortal.contextTypes = {
  parentSecret: PropTypes.string
};

AmISameAsPortal.contextTypes = {
  parentSecret: PropTypes.string
};

render(<HelloReact />, mainContainer);
