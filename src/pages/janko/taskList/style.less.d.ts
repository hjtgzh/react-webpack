declare namespace StyleLessNamespace {
  export interface IStyleLess {
    column: string;
    columnContent: string;
    columnContentActive: string;
    columnTitle: string;
    container: string;
    issue: string;
    issueDragging: string;
  }
}

declare const StyleLessModule: StyleLessNamespace.IStyleLess & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleLessNamespace.IStyleLess;
};

export = StyleLessModule;
