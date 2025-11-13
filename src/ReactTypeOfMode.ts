export type TypeOfMode = number;
//legacy模式，同步渲染模式
export const NoMode = /*                         */ 0b0000000;
//concurrent模式，异步渲染模式
export const ConcurrentMode = /*                 */ 0b0000001;