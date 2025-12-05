// Minimal base class to mirror React.Component shape for TS JSX checks
export class Component {
    static isReactComponent = true;
    props: any;
    state: any;
    context: any;

    constructor(props: any, context?: any) {
        this.props = props;
        this.context = context;
    }

    // No-op stubs to satisfy structural typing used by JSX
    setState(partialState: any) {
        this.state = { ...this.state, ...partialState };
    }

    forceUpdate() {
        /* intentionally empty */
    }
}