declare namespace StyleLessNamespace {
  export interface IStyleLess {
    'content-title': string;
    editor: string;
    'editor-wrapper': string;
    'output-content': string;
  }
}

declare const StyleLessModule: StyleLessNamespace.IStyleLess & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleLessNamespace.IStyleLess;
};

export = StyleLessModule;
