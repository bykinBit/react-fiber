import { createWorkInProgress } from './ReactFiber'
import { beginWork } from './ReactFiberBeginWork'
import { commitDeletion, commitPlacement, commitWork } from './ReactFiberCommitWork';
import { completeWork } from './ReactFiberCompleteWork';
import { Deletion, Placement, PlacementAndUpdate, Update } from './ReactFiberFlags';
let workInProgressRoot: any = null;
let workInProgress: any = null;
export function scheduleUpdateOnFiber(fiber: any) {
    const fiberRoot = markUpdateLaneFromFiberToRoot(fiber);
    performSyncWorkOnRoot(fiberRoot);
}
function performSyncWorkOnRoot(fiberRoot: any) {
    workInProgressRoot = fiberRoot;
    workInProgress = createWorkInProgress(workInProgressRoot.current);
    workLoopSync();
    commitRoot()
}
function workLoopSync() {
    while (workInProgress) {
        performUnitOfWork(workInProgress);
    }
}
function performUnitOfWork(unitOfWork: any) {
    const current = unitOfWork.alternate;
    let next = beginWork(current, unitOfWork);
    unitOfWork.memoizedProps = unitOfWork.pendingProps;
    if (next) {
        workInProgress = next;
    } else {
        completeUnitOfWork(unitOfWork)
    }
}
function completeUnitOfWork(unitOfWork: any) {
    let completedWork = unitOfWork;
    do {
        const current = completedWork.alternate;
        const returnFiber = completedWork.return;
        completeWork(current, completedWork);
        collectEffectList(returnFiber, completedWork)
        const siblingFiber = completedWork.sibling;
        if (siblingFiber) {
            workInProgress = siblingFiber;
            return;
        }
        completedWork = returnFiber;
        workInProgress = completedWork;
    } while (workInProgress);

}
function collectEffectList(returnFiber: any, completedWork: any) {
    if (returnFiber) {
        if (!returnFiber.firstEffect) {
            returnFiber.firstEffect = completedWork.firstEffect;
        }
        if (completedWork.lastEffect) {
            if (returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = completedWork.firstEffect;
            }
            returnFiber.lastEffect = completedWork.lastEffect;
        }
        const flags = completedWork.flags;
        if (flags) {
            if (returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = completedWork;
            } else {
                returnFiber.firstEffect = completedWork;
            }
            returnFiber.lastEffect = completedWork;
        }
    }

}
function commitRoot() {
    const finishedWork = workInProgressRoot.current.alternate;
    workInProgressRoot.finishedWork = finishedWork;
    commitMutationEffects(workInProgressRoot);
}
function getFlags(flags: any) {
    switch (flags) {
        case Placement:
            return '插入';
        case Update:
            return '更新';
        case Deletion:
            return '删除';
        case PlacementAndUpdate:
            return '移动';
        default:
            break;
    }
}
function commitMutationEffects(root: any) {
    const finishedWork = root.finishedWork;
    let nextEffect = finishedWork.firstEffect;
    let effectList = '';
    while (nextEffect) {
        effectList += `(${getFlags(nextEffect.flags)}#${nextEffect.type}#${nextEffect.key})=>`
        const flags = nextEffect.flags;
        let current = nextEffect.alternate;
        if (flags === Placement) {
            commitPlacement(nextEffect);
        } else if (flags === PlacementAndUpdate) {
            commitPlacement(nextEffect);
            nextEffect.flags&=~Placement;
            commitWork(current, nextEffect);
        } else if (flags === Update) {
            commitWork(current, nextEffect);
        } else if (flags === Deletion) {
            commitDeletion(nextEffect);
        }
        nextEffect = nextEffect.nextEffect;
    }
    effectList += 'null';
    console.log(effectList);
    root.current = finishedWork;
}

function markUpdateLaneFromFiberToRoot(sourceFiber: any) {
    let node = sourceFiber;
    let parent = node.parent;
    while (parent) {
        node = parent;
        parent = parent.parent;
    }
    return node.stateNode;
}