import React from "./react";
import ReactDOM from "./react-dom";
const single1=document.getElementById('single1');
const single1Update=document.getElementById('single1Update');
single1.addEventListener('click',()=>{
    let el=React.createElement("div", { key: "title", id: "title" }, "title");
    ReactDOM.render(el,document.getElementById('root'));
});
single1Update.addEventListener('click',()=>{
    let el=React.createElement("div", { key: "title", id: "title2" }, "title2");
    ReactDOM.render(el,document.getElementById('root'));
});