import React from "./react";
import ReactDOM from "./react-dom";

let el = React.createElement("div", { key: "title", id: "title" }, "title");
ReactDOM.render(el,document.getElementById('root'));