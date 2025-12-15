import React from "./react";
import ReactDOM from "./react-dom/client";

class ClassCounter extends React.PureComponent{
    constructor(props:any){
        super(props);
    }
    render(){
        console.log('ClassCounter render');
        return <div>{this.props.count}</div>
    }
}
function FunctionCounter(props:any){
    console.log('FunctionCounter render');
    return (<div>{props.count}</div>);
}
const MemoFunctionCounter=React.memo(FunctionCounter);
class App extends React.Component{
    state={number:0}
    amountRef=React.createRef();
    handleClick=(_event:any)=>{
        let newNumber=this.state.number+(parseFloat(this.amountRef.current.value));
        this.setState({number:newNumber});
    }
    render(){
        console.log('App render');
        
        return (
            <div>
                <p>number:{this.state.number}</p>
                ClassCounter:<ClassCounter count={this.state.number}/>
                FunctionCounter:<MemoFunctionCounter count={this.state.number}/>
                <input ref={this.amountRef}/>
                <button onClick={this.handleClick}>+</button>
            </div>
        )
    }
}
const element=<App/>
const DOMRoot = ReactDOM.createRoot(document.getElementById("root"));
DOMRoot.render(element);