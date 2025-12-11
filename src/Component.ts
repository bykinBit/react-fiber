import { findDOM, compareTwoVdom } from './react-dom/client'
export let updateQueue = {
    isBatchingUpdate: false,
    updaters: new Set(),
    batchUpdate() {
        updateQueue.isBatchingUpdate=false;
        for (const updater of updateQueue.updaters) {
            (updater as any).updateComponent();
        }
        updateQueue.updaters.clear();
    }
}
class Updater {
    classInstance: any;
    pengingState: any;
    nextProps:any;
    callbacks: any;
    constructor(classInstance: any) {
        this.classInstance = classInstance;
        this.pengingState = []
        this.callbacks = []
    }
    addState(partialState: any, callback: any) {
        this.pengingState.push(partialState);
        if (typeof callback === 'function') {
            this.callbacks.push(callback);
        }
        this.emitUpdate();
    }
    flushCallbacks() {
        if (this.callbacks.length > 0) {
            this.callbacks.forEach((callback: any) => callback())
            this.callbacks.length = 0;
        }
    }
    emitUpdate(nextProps?:any) {
        this.nextProps=nextProps;
        if (updateQueue.isBatchingUpdate) {
            updateQueue.updaters.add(this)
        } else {
            this.updateComponent();
        }

    }
    updateComponent() {
        const { pengingState, classInstance,nextProps } = this;
        if (nextProps||pengingState.length > 0) {
            shouldUpdate(classInstance,nextProps,this.getState());
        }
    }
    getState() {
        const { pengingState, classInstance } = this;
        let { state } = classInstance;
        pengingState.forEach((partialState: any) => {
            if (typeof partialState === 'function') {
                partialState = partialState(state)
            }
            state = { ...state, ...partialState }
        });
        pengingState.length = 0;
        return state;
    }
}
function shouldUpdate(classInstance: any,nextProps:any,nextState: any) {
    let willUpdate=true;
    if(classInstance.shouldComponentUpdate&&(!classInstance.shouldComponentUpdate(nextProps,nextState))){
        willUpdate=false;
    }
    if(willUpdate&&classInstance.UNSAFE_componentWillMount){
        classInstance.UNSAFE_componentWillMount();
    }
    classInstance.state = nextState;
    if(nextProps){
        classInstance.nextProps=nextProps;
    }
    if(willUpdate){
        classInstance.forceUpdate()
    }
}
export class Component {
    [x: string]: any;
    static isReactComponent = true;
    // Subclasses can optionally implement React-like static lifecycle hook
    static getDerivedStateFromProps?: (props: any, state: any) => any;
    props: any;
    state: any;
    context: any;
    updater: any;
    constructor(props: any, context?: any) {
        this.props = props;
        this.context = context;
        this.updater = new Updater(this)
    }
    setState(partialState: any, callback?: any) {
        this.updater.addState(partialState, callback);
    }
    forceUpdate() {
        let oldRenderVdom = this.oldRenderVdom;
        console.log('this.state',this.state);
        
        const { getDerivedStateFromProps } = this.constructor as typeof Component;
        if(getDerivedStateFromProps){
            const newState=getDerivedStateFromProps(this.props,this.state);
            console.log('newState',newState);
            
            if(newState){
                this.state={...this.state,...newState}
            }
        }
        let newRenderVdom = this.render();
        const oldDOM = findDOM(oldRenderVdom);
        compareTwoVdom(oldDOM.parentNode, oldRenderVdom, newRenderVdom);
        this.oldRenderVdom = newRenderVdom;
        this.updater.flushCallbacks()
        if(this.componentDidUpdate){
            this.componentDidUpdate(this.props,this.state);
        }
    }
}