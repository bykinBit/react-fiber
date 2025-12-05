// src/jsx.d.ts
export { }; // 使文件成为模块，避免全局名冲突

declare global {
    namespace JSX {
        // JSX.Element 可以是任意类型（你可以改成更严格的类型）
        type Element = any;

        // 允许任意内置标签和自定义标签，属性类型也允许任意
        interface IntrinsicElements {
            [elemName: string]: any;
        }

        // 下面几个接口用于类组件 / 属性解析，保守写法为 any
        interface ElementClass {
            render: (...args: any[]) => Element;
            props: any;
        }
        interface ElementAttributesProperty { props: any; }
        interface IntrinsicAttributes { [key: string]: any; }
    }
}
