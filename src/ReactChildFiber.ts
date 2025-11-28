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
        const clone=createWorkInProgress(oldFiber,pendingProps);
        // clone.index=0;
        clone.sibling=null;
        return clone;

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
    function createChild(returnFiber:any,newChild:any){
        const created=createFiberFromElement(newChild);
        created.return=returnFiber;
        return created;
    }
    function updateElement(returnFiber:any,oldFiber:any,newChild:any){
        if(oldFiber){
            if(oldFiber.type===newChild.type){
                const existing=useFiber(oldFiber,newChild.props);
                existing.return=returnFiber;
                return existing;
            }
        }
        const created=createFiberFromElement(newChild);
        created.return=returnFiber;
        return created;
    }
    function updateSlot(returnFiber:any,oldFiber:any,newChild:any){
        const key=oldFiber?oldFiber.key:null;
        if(newChild.key===key){
            return updateElement(returnFiber,oldFiber,newChild);
        }else{
            return null;
        }

    }
    function placeChild(newFiber:any,lastPlacedIndex:number,newIdx:number){
        newFiber.index=newIdx;
        if(!shouldTrackSideEffects){
            return lastPlacedIndex;
        }
        const current=newFiber.alternate;
        if(current){
            const oldIndex=current.index;
            if(oldIndex<lastPlacedIndex){
                newFiber.flags|=Placement;
                return lastPlacedIndex;
            }else{
                return oldIndex;
            }
        }else{
            newFiber.flags=Placement;
            return lastPlacedIndex;
        }
    }
    function updateFromMap(existingChildren:any,returnFiber:any,newIdx:number,newChild:any){
        const matchedFiber=existingChildren.get(newChild.key||newIdx);
        return updateElement(returnFiber,matchedFiber,newChild);
    }
    function mapRemainingChildren(returnFiber:any,currentFirstChild:any){
        const existingChildren=new Map();
        let existingChild=currentFirstChild;
        while(existingChild){
            let key=existingChild.key||existingChild.index;
            existingChildren.set(key,existingChild);
            existingChild=existingChild.sibling;
        }
        return existingChildren;
    }
    function reconcileChildrenArray(returnFiber:any,currentFirstChild:any,newChildren:any){
        let resultingFirstChild:any=null;
        let previousNewFiber:any=null;
        let oldFiber=currentFirstChild;
        let nextOldFiber:any=null;
        let lastPlacedIndex=0;
        let newIdx=0;
        for(;oldFiber&&newIdx<newChildren.length;newIdx++){
            nextOldFiber=oldFiber.sibling;
            const newFiber=updateSlot(returnFiber,oldFiber,newChildren[newIdx]);
            if(!newFiber)break;
            if(oldFiber&&!newFiber.alternate){
                deleteChild(returnFiber,oldFiber);
            }
            lastPlacedIndex=placeChild(newFiber,lastPlacedIndex,newIdx);
            if(!previousNewFiber){
                resultingFirstChild=newFiber;
            }else{
                previousNewFiber.sibling=newFiber;
            }
            previousNewFiber=newFiber;
            oldFiber=nextOldFiber;
        }
        if(newIdx===newChildren.length){
            deleteRemainingChildren(returnFiber,oldFiber);
            return resultingFirstChild;
        }
        if(!oldFiber){
            for(;newIdx<newChildren.length;newIdx++){
                const newFiber=createChild(returnFiber,newChildren[newIdx]);
                lastPlacedIndex=placeChild(newFiber,lastPlacedIndex,newIdx);
                if(!previousNewFiber){
                    resultingFirstChild=newFiber;
                }else{
                    previousNewFiber.sibling=newFiber;
                }
                previousNewFiber=newFiber;
            }
            return resultingFirstChild;
        }
        const existingChildren=mapRemainingChildren(returnFiber,oldFiber);
        for(;newIdx<newChildren.length;newIdx++){
            const newFiber=updateFromMap(existingChildren,returnFiber,newIdx,newChildren[newIdx]);
            if(newFiber){
                if(newFiber.alternate){
                    existingChildren.delete(newFiber.key||newIdx);
                }
                lastPlacedIndex=placeChild(newFiber,lastPlacedIndex,newIdx);
                if(!previousNewFiber){
                    resultingFirstChild=newFiber;
                }else{
                    previousNewFiber.sibling=newFiber;
                }
                previousNewFiber=newFiber;
            }
        }
        existingChildren.forEach((child:any)=>deleteChild(returnFiber,child));
        return resultingFirstChild;
    }
    function reconcileChildFibers(returnFiber: any, currentFirstChild: any, newChild: any) {
        const isObject = typeof newChild === 'object' && (newChild);
        if (isObject) {
            switch (newChild.$$typeof) {
                case REACT_ELEMENT_TYPE:
                    return placeSingleChild(reconcilSingleElement(returnFiber, currentFirstChild, newChild));
            }
        }
        if(Array.isArray(newChild)){
            return reconcileChildrenArray(returnFiber, currentFirstChild, newChild);
        }
    }

    return reconcileChildFibers;
}

export const reconcileChildFibers = childReconciler(true);
export const mountChildFibers = childReconciler(false);