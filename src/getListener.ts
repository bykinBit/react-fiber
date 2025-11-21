import { getFiberCurrentPropsFromNode } from "./ReactDomComponentTree";
export default function getListener(fiberInstance:any,registrationName:any){
    const stateNode=fiberInstance.stateNode;
    const props=getFiberCurrentPropsFromNode(stateNode);
    const listener=props[registrationName];
    return listener;
}