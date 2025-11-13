import { Component } from './ReactBaseClasses';
import { batchedUpdates } from './ReactFiberWorkLoop';
class Counter extends Component {
    state = {
        number: 0
    }
    handleClick = (event: any) => {
        this.setState({ number: this.state.number + 1 })
        console.log('setState1', this.state.number);
        this.setState({ number: this.state.number + 1 })
        console.log('setState2', this.state.number);
        setTimeout(() => {
            batchedUpdates(() => {
                this.setState({ number: this.state.number + 1 })
                console.log('setState3', this.state.number);
                this.setState({ number: this.state.number + 1 })
                console.log('setState4', this.state.number);
            })

        })
    }
    render() {
        console.log('render', this.state);

        return (
            `<div>
                <p>{this.state.number}</p>
                <button onClick={this.handleClick}>+</button>
            </div>`
        )
    }
}
export default Counter;