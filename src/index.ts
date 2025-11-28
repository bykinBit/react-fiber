import React from "./react";
import ReactDOM from "./react-dom";
const single1=document.getElementById('single1');
const single1Update=document.getElementById('single1Update');
const single2=document.getElementById('single2');
const single2Update=document.getElementById('single2Update');
const single3=document.getElementById('single3');
const single3Update=document.getElementById('single3Update');
const single4=document.getElementById('single4');
const single4Update=document.getElementById('single4Update');
single4.addEventListener('click',()=>{
    let el=React.createElement("ul", {key:'ul'}, React.createElement('li',{key:'A'},'A'),React.createElement('li',{key:'B',id:'B'},'B'),React.createElement('li',{key:'C'},'C'));
    ReactDOM.render(el,document.getElementById('root'));
})
single4Update.addEventListener('click',()=>{
    let el=React.createElement("ul", {key:'ul'}, React.createElement('li',{key:'B',id:'B2'},'B2'));
    ReactDOM.render(el,document.getElementById('root'));
})
single3.addEventListener('click',()=>{
    let el=React.createElement("div", { key: "title1", id: "title" }, "title");
    ReactDOM.render(el,document.getElementById('root'));
})
single3Update.addEventListener('click',()=>{
    let el=React.createElement("div", { key: "title2", id: "title" }, "title");
    ReactDOM.render(el,document.getElementById('root'));
})
single1.addEventListener('click',()=>{
    let el=React.createElement("div", { key: "title", id: "title" }, "title");
    ReactDOM.render(el,document.getElementById('root'));
});
single1Update.addEventListener('click',()=>{
    let el=React.createElement("div", { key: "title", id: "title2" }, "title2");
    ReactDOM.render(el,document.getElementById('root'));
});
single2.addEventListener('click',()=>{
    let el=React.createElement("div", { key: "title", id: "title" }, "title");
    ReactDOM.render(el,document.getElementById('root'));
})
single2Update.addEventListener('click',()=>{
    let el=React.createElement("p", { key: "title", id: "title" }, "title");
    ReactDOM.render(el,document.getElementById('root'));
})