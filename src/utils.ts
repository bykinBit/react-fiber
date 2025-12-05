import { REACT_TEXT } from "./constant";
export function wrapToVdom(element: any) {
    return (typeof element === 'string' || typeof element === "number") ? { type: REACT_TEXT, props: element } : element;
}