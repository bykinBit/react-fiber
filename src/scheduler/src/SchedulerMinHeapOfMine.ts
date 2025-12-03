export function push(heap: any[], node: any) {
    const index = heap.length;
    heap.push(node);
    siftUp(heap, node, index);
}
export function peek(heap: any[]) {
    return heap.length === 0 ? null : heap[0];
}
export function pop(heap: any[]) {
    if (heap.length === 0) {
        return null;
    }
    const first=heap[0];
    if(first!==undefined){
        const last=heap.pop();
        if(last!==first){
            heap[0]=last;
            siftDown(heap,last,0);
        }
    }else{
        return null;
    }
    return first;
}
function siftDown(heap: any[], node: any, i: number) {
    let index=i;
    const length=heap.length;
    while(index<length){
        const leftIndex=(index+1)*2-1;
        const left=heap[leftIndex];
        const rightIndex=leftIndex+1;
        const right=heap[rightIndex];
        if(left!==undefined&&compare(left,node)<0){
            if(right!==undefined&&compare(right,left)<0){
                heap[index]=right;
                heap[rightIndex]=node;
                index=rightIndex;
            }else{
                heap[index]=left;
                heap[leftIndex]=node;
                index=leftIndex;
            }
        }else if(right!==undefined&&compare(right,node)<0){
            heap[index]=right;
            heap[rightIndex]=node;
            index=rightIndex;
        }else{
            return;
        }
    }
}
function siftUp(heap: any[], node: any, i: number) {
    let index = i;
    while (true) {
        const parentIndex = (index - 1) >>> 1;
        const parent = heap[parentIndex];
        if (parent !== undefined && compare(parent, node) > 0) {
            heap[parentIndex] = node;
            heap[index] = parent;
            index = parentIndex;
        } else {
            return;
        }
    }
}
function compare(a: any, b: any) {
    const diff = a.sortIndex - b.sortIndex;
    return diff;
}