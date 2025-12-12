import React from "./react";
import ReactDOM from "./react-dom/client";
const ThemeContext = React.createContext();
const { Provider, Consumer } = ThemeContext;
const defaultStyle = {
    padding: '10px',
    border: '1px solid red'

}
function Title(_props: any) {
    return (
        <Consumer>
            {
                (contextVal:any) => (
                    <div style={{ ...defaultStyle, border: `2px solid ${contextVal.color}` }}>
                        Title
                    </div>
                )
            }
        </Consumer>
    );
}
class Header extends React.Component {
    static contextType = ThemeContext;
    render() {
        return (
            <div style={{ ...defaultStyle, border: `2px solid ${this.context.color}` }}>
                Header
                <Title />
            </div>
        )
    }
}
function Content(_props: any) {
    return (
        <Consumer>
            {
                (contextVal:any) => (
                    <div style={{ ...defaultStyle, border: `2px solid ${contextVal.color}` }}>
                        Content
                        <button onClick={()=>contextVal.changeColor('red')}>Red</button>
                        <button onClick={()=>contextVal.changeColor('green')}>Green</button>
                    </div>
                )
            }
        </Consumer>
    );
}
class Main extends React.Component {
    static contextType = ThemeContext;
    render() {
        return (
            <div style={{ ...defaultStyle, border: `2px solid ${this.context.color}` }}>
                Main
                <Content />
            </div>
        )
    }
}

class Page extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = { color: 'red' }
    }
    changeColor = (color: any) => {
        this.setState({ color });
    }
    render() {
        const contextVal = { color: this.state.color, changeColor: this.changeColor }
        return (
            <Provider value={contextVal}>
                <div style={{ ...defaultStyle, width: '300px', border: `2px solid ${this.state.color}` }}>
                    <Header />
                    <Main />
                </div>
            </Provider>
        )


    }

}
const element = <Page />;
console.log(element);

const DOMRoot = ReactDOM.createRoot(document.getElementById("root"));
DOMRoot.render(element);