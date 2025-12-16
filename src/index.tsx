import React, { useReducer,useContext,useState,useEffect,useLayoutEffect,useRef,useImperativeHandle } from "./react";
import ReactDOM from "./react-dom/client";
function Child(props:any,forwardRef:any){
    const inputRef=useRef(null);
    const [count,setCount]=useState(0);
    useImperativeHandle(forwardRef,()=>({
        myFocus(){
            inputRef.current.focus()
        }
    }));
    return (
        <div>
            <input type="text" ref={inputRef}/>
            <p>Child:{count}</p>
            <button onClick={()=>setCount(count+1)}>+</button>
        </div>
    )
}
const ForwardChild=React.forwardRef(Child);
function Parent(){
    const [number,setNumber]=useState(0);
    const inputRef=useRef(null);
    const getFocus=()=>{
        inputRef.current.myFocus();
        // inputRef.current.focus()
    }
    return (
        <div>
            <ForwardChild ref={inputRef}/>
            <button onClick={getFocus}>Get Focus</button>
            <p>{number}</p>
            <button onClick={()=>{setNumber(number+1)}}>+</button>
        </div>
    );
}
const element=<Parent/>
// function Animation(){
//     const ref=useRef();
//     const styleObj={
//         width:'100px',
//         height:'100px',
//         borderRadius:'50%',
//         backgroundColor:'red'
//     }
//     useLayoutEffect(()=>{
//         ref.current.style.transform='translate(500px)';
//         ref.current.style.transition='all 500ms'
//     });
//     return (
//         <div style={styleObj} ref={ref}></div>
//     )
// }
// const element=<Animation/>;
// function Counter(){
//     const [number,setNumber]=useState(0);
//     useEffect(()=>{
//         console.log('Start setInterval');
//         const timer=setInterval(()=>{
//             console.log('tick');
//             setNumber((number:number)=>number+1);
//         },1000);
//         return ()=>{
//             console.log('Destory setInterval');
//             clearInterval(timer);            
//         }
//     });
//     return (
//         <div>{number}</div>
//     )
// }
// const CounterContext=React.createContext();
// function reducer(state={number:0},action:any){
//     switch(action.type){
//         case 'ADD':
//             return {number:state.number+1}
//         case 'MINUS':
//             return {number:state.number-1}
//         default:
//             return state;
//     }
// }
// function Counter(){
//     // Provider stores an object; destructure accordingly
//     const {state,dispatch}=useContext(CounterContext);
//     return (
//         <div>
//             <p>{state.number}</p>
//             <button onClick={()=>dispatch({type:'ADD'})}>+</button>
//             <button onClick={()=>dispatch({type:'MINUS'})}>-</button>
//         </div>
//     );
// }
// function App(){
//     const [state,dispatch]=useReducer(reducer,{number:100});
//     return (
//         <CounterContext.Provider value={{state,dispatch}}>
//             <Counter/>
//         </CounterContext.Provider>
//     )
// }
// function Child(props: any) {
//     console.log('Child render');
//     return (
//         <button onClick={props.handleClick}>{props.data.number}</button>
//     )
// }
// const MemoChild=React.memo(Child);
// function App() {
//     console.log('App render');
//     const [name, setName] = useState('hello');
//     const [number, setNumber] = useState(0);
//     let data = useMemo(() => ({ number }), [number]);
//     const handleClick = useCallback(() => setNumber(number + 1), [number]);
//     return (
//         <div>
//             <input type="text" value={name} onChange={(event: any) => setName(event.target.value)} />
//             <MemoChild data={data} handleClick={handleClick} />
//         </div>
//     )
// }
// function App(){
//     const [number,setNumber]=React.useState(0);
//     const handleClick=()=>setNumber((state:any)=>state+1);
//     const [number2,setNumber2]=React.useState(0);
//     const handleClick2=()=>setNumber2(number2+1);
//     return (
//         <div>
//             <p>{number}</p>
//             <button onClick={handleClick}>+</button>
//             <p>{number2}</p>
//             <button onClick={handleClick2}>+</button>
//         </div>
//     )
// }
// const element = <Counter />
const DOMRoot = ReactDOM.createRoot(document.getElementById("root"));
DOMRoot.render(element);