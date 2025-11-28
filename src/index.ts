import React from "./react";
import ReactDOM from "./react-dom";
const root = document.getElementById('root');
const multi5 = document.getElementById('multi5');
const multi5Update = document.getElementById('multi5Update');
multi5.addEventListener('click', () => {
    let el = React.createElement("ul", { key: 'ul' },
        React.createElement('li', { key: 'A' }, 'A'),
        React.createElement('li', { key: 'B', id: 'B' }, 'B'),
        React.createElement('li', { key: 'C', }, 'C'),
        React.createElement('li', { key: 'D', }, 'D'),
        React.createElement('li', { key: 'E', }, 'E'),
        React.createElement('li', { key: 'F', }, 'F'));
    ReactDOM.render(el, root);
})
multi5Update.addEventListener('click', () => {
    let el = React.createElement("ul", { key: 'ul' },
        React.createElement('li', { key: 'A' }, 'A'),
        React.createElement('li', { key: 'C' }, 'C'),
        React.createElement('li', { key: 'E' }, 'E'),
        React.createElement('li', { key: 'B', id: 'B2' }, 'B2'),
        React.createElement('li', { key: 'G' }, 'G'),
        React.createElement('li', { key: 'D' }, 'D')
    );
    ReactDOM.render(el, root);
})
const multi3 = document.getElementById('multi3');
const multi3Update = document.getElementById('multi3Update');
multi3.addEventListener('click', () => {
    let el = React.createElement("ul", { key: 'ul' },
        React.createElement('li', { key: 'A' }, 'A'),
        React.createElement('li', { key: 'B', id: 'B' }, 'B'),
        React.createElement('li', { key: 'C', }, 'C'));
    ReactDOM.render(el, root);
})
multi3Update.addEventListener('click', () => {
    let el = React.createElement("ul", { key: 'ul' },
        React.createElement('li', { key: 'A' }, 'A'),
        React.createElement('li', { key: 'B', id: 'B2' }, 'B2'));
    ReactDOM.render(el, root);
})
const multi2 = document.getElementById('multi2');
const multi2Update = document.getElementById('multi2Update');
multi2.addEventListener('click', () => {
    let el = React.createElement("ul", { key: 'ul' },
        React.createElement('li', { key: 'A' }, 'A'),
        React.createElement('li', { key: 'B', id: 'B' }, 'B'),
        React.createElement('li', { key: 'C', }, 'C'));
    ReactDOM.render(el, root);
})
multi2Update.addEventListener('click', () => {
    let el = React.createElement("ul", { key: 'ul' },
        React.createElement('li', { key: 'A' }, 'A'),
        React.createElement('li', { key: 'B', id: 'B2' }, 'B2'),
        React.createElement('li', { key: 'C' }, 'C'),
        React.createElement('li', { key: 'D' }, 'D'))
    ReactDOM.render(el, root);
})
const multi1 = document.getElementById('multi1');
const multi1Update = document.getElementById('multi1Update');
multi1.addEventListener('click', () => {
    let el = React.createElement("ul", { key: 'ul' },
        React.createElement('li', { key: 'A' }, 'A'),
        React.createElement('li', { key: 'B', id: 'B' }, 'B'),
        React.createElement('li', { key: 'C', id: 'C' }, 'C'));
    ReactDOM.render(el, root);
})
multi1Update.addEventListener('click', () => {
    let el = React.createElement("ul", { key: 'ul' },
        React.createElement('li', { key: 'A' }, 'A'),
        React.createElement('p', { key: 'B', id: 'B2' }, 'B2'),
        React.createElement('li', { key: 'C', id: 'C2' }, 'C2'));
    ReactDOM.render(el, root);
})
const single1 = document.getElementById('single1');
const single1Update = document.getElementById('single1Update');
const single2 = document.getElementById('single2');
const single2Update = document.getElementById('single2Update');
const single3 = document.getElementById('single3');
const single3Update = document.getElementById('single3Update');
const single4 = document.getElementById('single4');
const single4Update = document.getElementById('single4Update');
single4.addEventListener('click', () => {
    let el = React.createElement("ul", { key: 'ul' }, React.createElement('li', { key: 'A' }, 'A'), React.createElement('li', { key: 'B', id: 'B' }, 'B'), React.createElement('li', { key: 'C' }, 'C'));
    ReactDOM.render(el, document.getElementById('root'));
})
single4Update.addEventListener('click', () => {
    let el = React.createElement("ul", { key: 'ul' }, React.createElement('li', { key: 'B', id: 'B2' }, 'B2'));
    ReactDOM.render(el, document.getElementById('root'));
})
single3.addEventListener('click', () => {
    let el = React.createElement("div", { key: "title1", id: "title" }, "title");
    ReactDOM.render(el, document.getElementById('root'));
})
single3Update.addEventListener('click', () => {
    let el = React.createElement("div", { key: "title2", id: "title" }, "title");
    ReactDOM.render(el, document.getElementById('root'));
})
single1.addEventListener('click', () => {
    let el = React.createElement("div", { key: "title", id: "title" }, "title");
    ReactDOM.render(el, document.getElementById('root'));
});
single1Update.addEventListener('click', () => {
    let el = React.createElement("div", { key: "title", id: "title2" }, "title2");
    ReactDOM.render(el, document.getElementById('root'));
});
single2.addEventListener('click', () => {
    let el = React.createElement("div", { key: "title", id: "title" }, "title");
    ReactDOM.render(el, document.getElementById('root'));
})
single2Update.addEventListener('click', () => {
    let el = React.createElement("p", { key: "title", id: "title" }, "title");
    ReactDOM.render(el, document.getElementById('root'));
})