declare namespace StyleLessNamespace {
  export interface IStyleLess {
    handleBt: string;
    'layout-side': string;
    logo: string;
    'logo-small': string;
    'site-layout-content': string;
    'site-layout-header': string;
    trigger: string;
  }
}

declare const StyleLessModule: StyleLessNamespace.IStyleLess & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleLessNamespace.IStyleLess;
};

export = StyleLessModule;
