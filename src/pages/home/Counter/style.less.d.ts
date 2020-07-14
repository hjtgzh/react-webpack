declare namespace StyleLessNamespace {
  export interface IStyleLess {
    asyncButton: string;
    button: string;
    row: string;
    textbox: string;
    value: string;
  }
}

declare const StyleLessModule: StyleLessNamespace.IStyleLess & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleLessNamespace.IStyleLess;
};

export = StyleLessModule;
