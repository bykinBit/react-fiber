import React from "./react";
import ReactDOM from "./react-dom/client";
import { updateQueue } from "./Component";
// function FunctionComponent(props:any){
//     return (<div className="title" style={{color:'red'}}><span>{props.title}</span></div>)
// }
// const element=<FunctionComponent title='world'/>
class ClassComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = { number: 0, age: 16 };
    }
    handleClick = () => {
        updateQueue.isBatchingUpdate=true;
        this.setState({ number: this.state.number + 1 });
        console.log(this.state.number);
        this.setState({ number: this.state.number + 1 });
        console.log(this.state.number);
        setTimeout(() => {
            this.setState({ number: this.state.number + 1 });
            console.log(this.state.number);
            this.setState({ number: this.state.number + 1 });
            console.log(this.state.number);
        }, 1000);
        updateQueue.isBatchingUpdate=false;
        updateQueue.batchUpdate()
        console.log('click Button');
        // this.setState((state:any)=>({
        //     number: state.number + 1
        // }),()=>{
        //     console.log(this.state);

        // });
    };
    clickDiv(){
        console.log('click Div');
        
    }
    clickDivCapture(){
        console.log('click Div capture');
        
    }
    clickButtonCapture(event:any){
        console.log('click button capture');
        event.stopPropagation()
    }
    render() {
        return (
            <div className="title" style={{ color: "red" }} onClick={this.clickDiv} onClickCapture={this.clickDivCapture}>
                <p>number:{this.state.number}</p>
                <p>age:{this.state.age}</p>
                <button onClick={this.handleClick} onClickCapture={this.clickButtonCapture}>点击</button>
            </div>
        );
    }
}
const element = <ClassComponent title="world" />;
console.log(element);

const DOMRoot = ReactDOM.createRoot(document.getElementById("root"));
DOMRoot.render(element);
