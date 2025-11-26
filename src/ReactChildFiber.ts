import { Deletion, Placement } from "./ReactFiberFlags";
import { REACT_ELEMENT_TYPE } from "./ReactSymbols";
import { createFiberFromElement, createWorkInProgress } from './ReactFiber';

function childReconciler(shouldTrackSideEffects: boolean) {
    function deleteChild(returnFiber: any, childToDelete: any) {
        if(!shouldTrackSideEffects){
            return;
        }
        const lastEffect=returnFiber.lastEffect;
        if(lastEffect){
            lastEffect.nextEffect=childToDelete;
            returnFiber.lastEffect=childToDelete;
        }else{
            returnFiber.firstEffect=returnFiber.lastEffect=childToDelete;
        }
        childToDelete.nextEffect=null;
        childToDelete.flags=Deletion;
    }
    function useFiber(oldFiber:any,pendingProps:any){
        return createWorkInProgress(oldFiber,pendingProps);
    }
    function deleteRemainingChildren(returnFiber:any,childToDelete:any){
        while(childToDelete){
            deleteChild(returnFiber,childToDelete);
            childToDelete=childToDelete.sibling;
        }
    }
    function reconcilSingleElement(returnFiber: any, currentFirstChild: any, element: any) {
        let key = element.key;
        let child = currentFirstChild;
        while (child) {
            if (child.key === key) {
                if(child.type===element.type){
                    deleteRemainingChildren(returnFiber,child.sibling);//复用当前的，剩余的全删除
                    const existing=useFiber(child,element.props);
                    existing.return=returnFiber;
                    return existing;

                }else{
                    deleteRemainingChildren(returnFiber,child);
                    break;
                }
            } else {
                deleteChild(returnFiber, child);
            }
            child=child.sibling;
        }
        const created = createFiberFromElement(element);
        created.return = returnFiber;
        return created;
    }
    function placeSingleChild(newFiber: any) {
        if (shouldTrackSideEffects && !newFiber.alternate) {
            newFiber.flags = Placement;
        }
        return newFiber;
    }
    function reconcileChildFibers(returnFiber: any, currentFirstChild: any, newChild: any) {
        const isObject = typeof newChild === 'object' && (newChild);
        if (isObject) {
            switch (newChild.$$typeof) {
                case REACT_ELEMENT_TYPE:
                    return placeSingleChild(reconcilSingleElement(returnFiber, currentFirstChild, newChild));
            }
        }
    }

    return reconcileChildFibers;
}

export const reconcileChildFibers = childReconciler(true);
export const mountChildFibers = childReconciler(false);