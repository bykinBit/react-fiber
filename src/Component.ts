import { findDOM, compareTwoVdom } from './react-dom/client'
export let updateQueue = {
    isBatchingUpdate: false,
    updaters: new Set(),
    batchUpdate() {
        for (const updater of updateQueue.updaters) {
            (updater as any).updateComponent();
        }
        updateQueue.updaters.clear();
    }
}
class Updater {
    classInstance: any;
    pengingState: any;
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
    emitUpdate() {
        if (updateQueue.isBatchingUpdate) {
            updateQueue.updaters.add(this)
        } else {
            this.updateComponent();
        }

    }
    updateComponent() {
        const { pengingState, classInstance } = this;
        if (pengingState.length > 0) {
            shouldUpdate(classInstance, this.getState());
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
function shouldUpdate(classInstance: any, nextState: any) {
    classInstance.state = nextState;
    classInstance.forceUpdate()
}
export class Component {
    [x: string]: any;
    static isReactComponent = true;
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
        let newRenderVdom = this.render();
        const oldDOM = findDOM(oldRenderVdom);
        compareTwoVdom(oldDOM.parentNode, oldRenderVdom, newRenderVdom);
        this.oldRenderVdom = newRenderVdom;
        this.updater.flushCallbacks()
    }
}