import React from "./react";
import ReactDOM from "./react-dom/client";

class ScrollList extends React.Component {
    constructor(props:any){
        super(props);
        this.state={messages:[]}
        this.wrapper=React.createRef();
    }
    addMessage=()=>{
        this.setState((state:any)=>({
            messages:[`${state.messages.length}`,...this.state.messages]
        }));
    }
    componentDidMount(){
        this.timerID=setInterval(()=>{
            this.addMessage();
        },1000)
    }
    getSnapshotBeforeUpdate(){
        return {
            prevScrollTop:this.wrapper.current.scrollTop,
            prevScrollHeight:this.wrapper.current.scrollHeight
        }
    }
    componentDidUpdate(prevProps:any,prevState:any,{prevScrollTop,prevScrollHeight}={} as any){
        this.wrapper.current.scrollTop=prevScrollTop+(this.wrapper.current.scrollHeight-prevScrollHeight);
    }
    render(){
        let style={
            height:'100px',
            width:'200px',
            border:'1px solid red',
            overflow:'auto'
        }
        return (
            <div style={style} ref={this.wrapper}>
                {
                    this.state.messages.map((message:any,index:number)=>(
                        <div key={index}>{message}</div>
                    ))
                }
            </div>
        )
    }
}
const element = <ScrollList/>;
console.log(element);

const DOMRoot = ReactDOM.createRoot(document.getElementById("root"));
DOMRoot.render(element);