import { IndeterminateComponent } from './ReactWorkTags'
import { render } from './ReactFiberWorkLoop'
import { useReducer,useState } from './ReactFiberHooks'
// const reducer = (state: any, action: any) => {
//     if (action.type === 'add') {
//         return state + 1;
//     } else {
//         return state;
//     }
// }
//函数组件
function Counter() {
    // const [number, dispatch] = useReducer(reducer, 0);
    const [number,setNumer]=useState(0);
    console.log('number', number);
    const A = {
        type: "div",
        props: {
            onClick: () => setNumer(2),
            children: [number]
        }
    }
    return A
}
debugger
let workInProgress = {
    tag: IndeterminateComponent,
    type: Counter,//此组件的具体类型
    alternate: null,
} as any;
render(workInProgress)

