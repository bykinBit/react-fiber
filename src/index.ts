let style={color: 'green', fontSize: '16px',border: '1px solid black',margin: '10px'};

const A={
    type:'div',
    key:'A',
    props:{
        style,
        children:[
            {
                type:'div',
                key:'B1',
                props:{
                    style,
                    children:[]
                }
            },
            {
                type:'div',
                key:'B2',
                props:{
                    style,
                    children:[]
                }
            }
        ]
    }
} as any;

let workInProgress:any=null;
const TAG_ROOT='TAG_ROOT';
const TAG_HOST='TAG_HOST';
const Placement='Placement';
let root=document.getElementById('root');
let rootFiber={
    tag:TAG_ROOT,
    key:'Root',
    stateNode:root,
    props:{
        children:[A]
    }
}
workInProgress=rootFiber;
function workLoop(){
    while(workInProgress){
        workInProgress=perfromanceUnitOfWork(workInProgress);
    }
    console.log(rootFiber);
    commitRoot(rootFiber);
    
}
function commitRoot(rootFiber:any){
    let currentEffect=rootFiber.firstEffect;
    while(currentEffect){
        let flags=currentEffect.flags;
        switch(flags){
            case Placement:
                commitPlacement(currentEffect);
                break;
            default:
                break;
        }
        currentEffect=currentEffect.nextEffect;
    }
}
function commitPlacement(currentEffect:any){
    let parentNode=currentEffect.return.stateNode;
    parentNode.appendChild(currentEffect.stateNode);
}
function perfromanceUnitOfWork(workInProgress:any){
    beginWork(workInProgress);
    if(workInProgress.child){
        return workInProgress.child;
    }
    while(workInProgress){
        completeUnitOfWork(workInProgress);
        if(workInProgress.sibling){
            return workInProgress.sibling;
        }
        workInProgress=workInProgress.return;
    }
    return null;
}
function completeUnitOfWork(workInProgress:any){
    console.log('completeUnitOfWork',workInProgress.key);
    let stateNode:any=null;
    switch(workInProgress.tag){
        case TAG_HOST:
            stateNode=createStateNode(workInProgress);
            break;
    }
    makeEffectList(workInProgress);
}
function makeEffectList(completedWork:any){
    let returnFiber=completedWork.return;
    if(returnFiber){
        if(!returnFiber.firstEffect){
            returnFiber.firstEffect=completedWork.firstEffect;
        }
        if(completedWork.lastEffect){
            if(returnFiber.lastEffect){
                returnFiber.lastEffect.nextEffect=completedWork.firstEffect;
            }
            returnFiber.lastEffect=completedWork.lastEffect;
        }
        if(completedWork.flags){
            if(returnFiber.lastEffect){
                returnFiber.lastEffect.nextEffect=completedWork
            }else{
                returnFiber.firstEffect=completedWork;
            }
            returnFiber.lastEffect=completedWork;
        }
    }
}
function createStateNode(fiber:any){
    if(fiber.tag===TAG_HOST){
        let stateNode=document.createElement(fiber.type);
        fiber.stateNode=stateNode;
    }
    return fiber.stateNode;
}
//开始工作
function beginWork(workInProgress:any){
    console.log('beginWork',workInProgress.key);
    let nextChildren=workInProgress.props.children;
    return reconcileChildren(workInProgress,nextChildren);
}
function reconcileChildren(returnFiber:any,nextChildren:any){
    let previousNewFiber:any=null;
    let firstChildFiber:any=null;
    for(let nextIndex=0;nextIndex<nextChildren.length;nextIndex++){
        let newFiber=createFiber(nextChildren[nextIndex]);
        newFiber.flags=Placement;
        newFiber.return=returnFiber;
        if(!firstChildFiber){
            firstChildFiber=newFiber;
        }else{
            previousNewFiber.sibling=newFiber;
        }
        previousNewFiber=newFiber;
        // if(!previousNewFiber){
        //     firstChildFiber=newFiber;
        // }else{
        //     previousNewFiber.sibling=newFiber;
        // }
    }
    returnFiber.child=firstChildFiber;
    return firstChildFiber;
}
function createFiber(element:any){
    return {
        tag:TAG_HOST,//原生dom节点
        type:element.type,
        key:element.key,
        props:element.props
    } as any;
}
workLoop();