function createElement(type:string,config:any,children:any){
    delete config.__source;
    delete config.__self;
    delete config.ref;
    delete config.key;
    let props={...config}
    if(arguments.length>3){
        props.children=Array.prototype.slice.call(arguments,2);
    }else{
        props.children=children;
    }
    return {type,props}
}
const React={
    createElement
}
export default React;