import { updateContainer } from './ReactFiberReconciler';
import {createFiberRoot} from './ReactFiberRoot';
function render(element:any,container:any){
    let fiberRoot=container.__reactRootContainer;
    if(!fiberRoot){
        fiberRoot=container.__reactRootContainer=createFiberRoot(container);
    }
    console.log(fiberRoot);
    updateContainer(element,fiberRoot)
}
const ReactDOM={
    render
}
export default ReactDOM;