export function createElement(type:string){
    return document.createElement(type)
}
export function setInitialProperties(domElement:any,tag:any,props:any){
    for(const propKey in props){
        const nextProp=props[propKey];
        if(propKey==='children'){
            if(typeof nextProp==='string'||typeof nextProp==='number'){
                domElement.textContent=nextProp;
            }
        }else if(propKey==='style'){
            for(let stylePropKey in nextProp){
                domElement.style[stylePropKey]=nextProp[stylePropKey];
            }
        }else{
            domElement[propKey]=nextProp;
        }
    }
}
export function diffProperties(domElement:any,tag:string,lastProps:any,nextProps:any){
    let updatePayload:any=null;
    let propKey;
    for(propKey in lastProps){
        if(lastProps.hasOwnProperty(propKey)&&(!nextProps.hasOwnProperty(propKey))){
            (updatePayload=updatePayload||[]).push(propKey,null);
        }
    }
    for(propKey in nextProps){
        const nextProp=nextProps[propKey];
        if(propKey==='children'){
            if(typeof nextProp==='string'||typeof nextProp==='number'){
                if(nextProp!==lastProps[propKey]){
                    (updatePayload=updatePayload||[]).push(propKey,nextProp);
                }
            }
        }else{
            if(nextProp!==lastProps[propKey]){
                (updatePayload=updatePayload||[]).push(propKey,nextProp)
            }
        }
    }
    return updatePayload;
}
export function updateProperties(domElement:any,updatePayload:any){
    for(let i=0;i<updatePayload.length;i+=2){
        const propKey=updatePayload[i];
        const propVal=updatePayload[i+1];
        if(propKey==='children'){
            domElement.textContent=propVal;
        }else{
            domElement.setAttribute(propKey,propVal)
        }
    }
}