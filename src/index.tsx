import React from "./react";
import ReactDOM from "./react-dom/client";
class MouseTracker extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = { x: 0, y: 0 }
    }
    handleMouseMove = (event: any) => {
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    }
    render() {
        return (
            <div onMouseMove={this.handleMouseMove}>
                {this.props.render(this.state) }
                {/* {this.props.children(this.state)} */}
            </div>
        );
    }
}

function FunctionComponent(props:any){
    return props.render({x:0,y:0})
}


function withMouseTracker(OldComponent:any){
    return class MouseTracker extends React.Component{
        constructor(props:any){
            super(props);
            this.state={x:0,y:0}
        }
        handleMouseMove=(event:any)=>{
            this.setState({
                x:event.clientX,
                y:event.clientY
            });
        }
        render(){
            return (
                <div onMouseMove={this.handleMouseMove}>
                    <OldComponent {...this.state}/>
                </div>
            )
        }
    }
}
function Display(props:any){
    return (
        <div>
            <h1>请移动鼠标</h1>
            <p>当前的鼠标位置是{props.x}:{props.y}</p>
        </div>
    )
}
const NewDisplay=withMouseTracker(Display);
const element = <NewDisplay/>;
// const element = <FunctionComponent render={
//     (value: any) => (
//         <div>
//             <h1>请移动鼠标</h1>
//             <p>当前的鼠标位置是{value.x}:{value.y}</p>
//         </div>
//     )
// }>
// </FunctionComponent>;
// class Button extends React.Component{
//     constructor(props:any){
//         super(props);
//         this.state={name:'button'}
//     }
//     componentDidMount(){
//         console.log('componentDidMount');
//     }
//     render(){
//         return (
//             <button name={this.state.name}>{this.props.title}</button>
//         )
//     }
// }
// function wrapper(OldComponent: typeof React.Component){
//     class NewComponent extends OldComponent{
//         constructor(props:any){
//             super(props);
//             this.state={number:0}
//         }
//         componentDidMount(){
//             console.log('NewComponent componentDidMount');
//             super.componentDidMount();
//         }
//         handleClick=()=>{
//             this.setState({number:this.state.number+1});
//         }
//         render(){
//             let vdom=super.render();
//             let newProps={
//                 ...vdom.props,
//                 ...vdom.state,
//                 onClick:this.handleClick
//             }
//             return React.cloneElement(vdom,newProps,this.state.number);
//         }
//     }
//     return NewComponent;
// }
// const NewButton=wrapper(Button);
// const element = <NewButton title='按钮'/>;


// function withLoading(OldComponent:any){
//     return class extends React.Component{
//         render(){
//             const state={
//                 show(){
//                     console.log('show');

//                 },
//                 hide(){
//                     console.log('hide');

//                 }
//             }
//             return (
//                 <OldComponent {...this.props} {...state}/>
//             );
//         }
//     }
// }
// class Hello extends React.Component{
//     render(){
//         return (
//             <div>
//                 <p>hello</p>
//                 <button onClick={this.props.show}>show</button>
//                 <button onClick={this.props.hide}>hide</button>
//             </div>
//         );
//     }
// }
// const NewHello=withLoading(Hello);
// const element = <MouseTracker>
//     {
//         (value:any)=>(
//             <div>
//                 <h1>请移动鼠标</h1>
//                 <p>当前的鼠标位置是{value.x}:{value.y}</p>
//             </div>
//         )
//     }
// </MouseTracker>;
// console.log(element);

const DOMRoot = ReactDOM.createRoot(document.getElementById("root"));
DOMRoot.render(element);