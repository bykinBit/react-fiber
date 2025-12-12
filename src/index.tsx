import React from "./react";
import ReactDOM from "./react-dom/client";

class Counter extends React.Component {
    static defaultProps = {
        name: 'hello'
    }
    constructor(props: any) {
        super(props);
        this.state = { number: 0 }
        console.log('Counter 1.constructor');
    }
    UNSAFE_componentWillMount() {
        console.log('Counter 2.componentWillMount');
    }
    handleClick = () => {
        this.setState({ number: this.state.number + 1 })
    }
    shouldComponentUpdate(nextProps: any, nextState: any) {
        console.log('Counter 5.shouldComponentUpdate');
        return true;
        // return nextState.number % 2 === 0;
    }
    UNSAFE_componentWillUpdate() {
        console.log('Counter 6.componentWillUpdate');
    }
    componentDidUpdate() {
        console.log('Counter 7.componentDidUpdate');
    }
    render() {
        console.log('Counter 3.render');
        return (
            <div>
                <p>number:{this.state.number}</p>
                <ChildCounter count={this.state.number} />
                {/* {
                    this.state.number===4?null:<ChildCounter count={this.state.number}/>
                } */}
                <button onClick={this.handleClick}>+</button>
            </div>
        )
    }
    componentDidMount() {
        console.log('Counter 4.componentDidMount');
    }
}
function FunctionCounter(props: any) {
    return (
        <div>{props.count}</div>
    )
}
class ChildCounter extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = { number: 0 }
    }
    UNSAFE_componentWillReceiveProps(newProps: any) {
        console.log('ChildCounter 4.UNSAFE_componentWillReceiveProps');
    }
    UNSAFE_componentWillMount() {
        console.log('ChildCounter 1.UNSAFE_componentWillMount');
    }
    shouldComponentUpdate(nextProps: any, nextState: any) {
        return true;
        // console.log('ChildCounter 5.UNSAFE_componentWillMount');
        // return nextProps.count%3===0;
    }
    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        const { count } = nextProps;
        if (count % 2 === 0) {
            return { number: count * 2 }
        } else {
            return { number: count * 3 }
        }
    }
    render() {
        console.log('ChildCounter 2.render',this.state.number)
        return (
            <p>childCount:{this.state.number}</p>
        );
    }
    componentDidMount() {
        console.log('ChildCounter 3.componentDidMount');
    }
    UNSAFE_componentWillUnmount() {
        console.log('ChildCounter 6.UNSAFE_componentWillUnmount');
    }
}
const element = <Counter/>;
console.log(element);

const DOMRoot = ReactDOM.createRoot(document.getElementById("root"));
DOMRoot.render(element);