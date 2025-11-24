import { updateContainer } from './ReactFiberReconciler';
import {createFiberRoot} from './ReactFiberRoot';
function render(element:any,container:any){
    let fiberRoot=createFiberRoot(container);
    console.log(fiberRoot);
    updateContainer(element,fiberRoot)
}
const ReactDOM={
    render
}
export default ReactDOM;