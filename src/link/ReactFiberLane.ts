export const TotalLanes = 31;

export const NoLanes = 0b00;
export const NoLane = 0b00;
export const SyncLane = 0b01;
export const SyncBatchedLane = 0b10;

export function isSubsetOfLanes(set:number,subset:number){
    return (set & subset)===subset;
}
export function mergeLanes(a:number,b:number){
    return a|b;
}