import React from "./react";
import ReactDOM from "./react-dom/client";

function TextInput(props:any,forwardRef:any) {
    return (
        <input ref={forwardRef}/>
    )
}
const ForwardTextInput=React.forwardRef(TextInput);
class Form extends React.Component {
    constructor(props: any) {
        super(props);
        this.ref = React.createRef();
    }
    getFocus = () => {
        this.ref.current.focus();
    }
    render() {
        return (
            <div>
                <ForwardTextInput ref={this.ref} />
                <button onClick={this.getFocus}>获得焦点</button>
            </div>
        )
    }
}
// class TextInput extends React.Component {
//     constructor(props: any) {
//         super(props);
//         this.ref = React.createRef()
//     }
//     getFocus = () => {
//         this.ref.current.focus()
//     }
//     render() {
//         return (
//             <input ref={this.ref} />
//         );
//     }
// }
// class Form extends React.Component {
//     constructor(props: any) {
//         super(props);
//         this.ref=React.createRef();
//     }
//     getFocus = () => {
//         this.ref.current.getFocus();
//     }
//     render() {
//         return (
//             <div>
//                 <TextInput ref={this.ref} />
//                 <button onClick={this.getFocus}>获得焦点</button>
//             </div>
//         )
//     }
// }
// class Sum extends React.Component {
//     constructor(props: any) {
//         super(props)
//         this.a = React.createRef();
//         this.b = React.createRef();
//         this.c = React.createRef();
//     }
//     add = () => {
//         this.c.current.value = this.a.current.value + this.b.current.value;
//     }
//     render() {
//         return (
//             <div>
//                 <input ref={this.a} />+<input ref={this.b} /><button onClick={this.add}>=</button><input ref={this.c} />
//             </div>
//         )
//     }
// }
const element = <Form />;
console.log(element);

const DOMRoot = ReactDOM.createRoot(document.getElementById("root"));
DOMRoot.render(element);
