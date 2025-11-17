import {IndeterminateComponent} from './ReactWorkTags'
import {render} from './ReactFiberWorkLoop'
import {useReducer} from './ReactFiberHooks'
const reducer=(state:any,action:any)=>{
    if(action.type==='add'){
        return state+1;
    }else{
        return state;
    }
}
//函数组件
function Counter(){
    const [number,dispatch]=useReducer(reducer,0);
    return (`
        <div onClick={()=>{
        dispatch({type:'add'});
        dispatch({type:'add'});
        dispatch({type:'add'});
        }}></div>
    `)
}
debugger
let workInProgress={
    tag:IndeterminateComponent,
    type:Counter,//此组件的具体类型
    alternate:null,
}
render(workInProgress)
