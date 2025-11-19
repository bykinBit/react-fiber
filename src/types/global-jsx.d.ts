// 最小 JSX 类型声明，便于在 .tsx 中写 JSX
declare namespace JSX {
    type Element = any;
    interface IntrinsicElements {
      // 添加你需要支持的原生标签（或使用 index signature）
      div: any;
      span: any;
      button: any;
      // 若不想一个个列，使用下面的宽松声明（不安全）：
      // [elemName: string]: any;
    }
    interface ElementClass {}
    interface ElementAttributesProperty { props: {}; }
    interface ElementChildrenAttribute { children: {}; }
  }