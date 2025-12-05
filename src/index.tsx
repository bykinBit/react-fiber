import React from "./react";
import ReactDOM from "./react-dom/client";
// function FunctionComponent(props:any){
//     return (<div className="title" style={{color:'red'}}><span>{props.title}</span></div>)
// }
// const element=<FunctionComponent title='world'/>
class ClassComponent extends React.Component{
    render(){
        return (<div className="title" style={{color:'red'}}><span>{this.props.title}</span></div>)
    }
}
const element=<ClassComponent title='world'/>
console.log(element);

const DOMRoot=ReactDOM.createRoot(document.getElementById('root'));
DOMRoot.render(element);
