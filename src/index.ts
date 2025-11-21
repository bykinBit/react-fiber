import React from './react';
import ReactDOM from './react-dom';

const handleDivClick=(event:any)=>{
    console.log('父元素的冒泡');
}
const handleDivClickCapture=()=>{
    console.log('父元素的捕获');
}
const handleButtonClick=(event:any)=>{
    console.log('子元素的冒泡');
}
const handleButtonClickCapture=()=>{
    console.log('子元素的捕获');
}

let element=React.createElement('div',{
    onClick:handleDivClick,
    onClickCapture:handleDivClickCapture
},React.createElement('button',{
    onClick:handleButtonClick,
    onClickCapture:handleButtonClickCapture
},'点击'))
console.log(element)

ReactDOM.render(element,document.getElementById('root'))