/// <reference lib="dom" />

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
  
  interface Element extends React.ReactElement<any, any> {}
}

declare module 'react/jsx-runtime' {
  export function jsx(type: any, props: any, key?: any): any;
  export function jsxs(type: any, props: any, key?: any): any;
  export function Fragment(props: { children?: any }): any;
}

declare namespace React {
  interface ReactElement<P = any, T = any> {
    type: T;
    props: P;
    key: string | null;
  }
}

