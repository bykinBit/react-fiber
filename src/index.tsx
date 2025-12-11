import React from "./react";
import ReactDOM from "./react-dom/client";

class Counter extends React.Component{
    constructor(props:any){
        super(props);
        this.state={
            list:['A','B','C','D','E','F']
        }
    }
    handleClick=()=>{
        this.setState({
            list:['A','C','E','B','G']
        });
    }
    render(){
        return (
            <div>
                <ul>
                    {
                        this.state.list.map((item:any)=><li key={item}>{item}</li>)
                    }
                </ul>
                <button onClick={this.handleClick}>update</button>
            </div>
        );
    }
}
const element = <Counter/>;
console.log(element);
const DOMRoot = ReactDOM.createRoot(document.getElementById("root"));
DOMRoot.render(element);
