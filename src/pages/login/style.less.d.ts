declare namespace StyleLessNamespace {
  export interface IStyleLess {
    btnItem: string;
    loginContent: string;
    loginForm: string;
    loginInput: string;
    loginWrap: string;
    logo: string;
    remember: string;
    title: string;
  }
}

declare const StyleLessModule: StyleLessNamespace.IStyleLess & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleLessNamespace.IStyleLess;
};

export = StyleLessModule;
