import {push,pop,peek} from './SchedulerMinHeapOfMine'
let heap:any[] = [];
push(heap,{sortIndex:1});
push(heap,{sortIndex:2});
push(heap,{sortIndex:3});
console.log(peek(heap));
push(heap,{sortIndex:4});
push(heap,{sortIndex:5});
push(heap,{sortIndex:6});
push(heap,{sortIndex:7});
console.log(peek(heap));
pop(heap);
console.log(peek(heap));