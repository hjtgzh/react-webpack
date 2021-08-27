/*
 * @文件描述: sql编辑器组件
 * @公司: cloudwise
 * @作者: janko
 * @Date: 2021-04-09 14:23:31
 * @LastEditors: janko
 * @LastEditTime: 2021-08-27 16:57:57
 */
import React from 'react';
// sql编辑器
import AceEditor from 'react-ace';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/ext-language_tools';

import styles from './style.less';

export default function SqlEditor(props) {
  return (
    <AceEditor
      {...props}
      className={styles['sql-editor']}
      placeholder="请输入sql语句"
      mode="mysql"
      highlightActiveLine={true}
      showPrintMargin={false}
      theme="xcode"
      fontSize={14}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
      }}
    />
  );
}

// export default forwardRef((props, ref) => {
//   const sqlEditorRef = useRef(null);

//   useImperativeHandle(ref, () => ({
//     getValue: () => {
//       return sqlEditorRef.current.editor.getValue();
//     },
//     setValue: (value) => {
//       sqlEditorRef.current.editor.setValue(value);
//     },
//   }));

//   return (
//     <AceEditor
//       {...props}
//       ref={sqlEditorRef}
//       className={styles['sql-editor']}
//       placeholder="请输入sql语句"
//       mode="mysql"
//       highlightActiveLine={true}
//       showPrintMargin={false}
//       theme="xcode"
//       fontSize={14}
//       name="UNIQUE_ID_OF_DIV"
//       editorProps={{ $blockScrolling: true }}
//       setOptions={{
//         enableBasicAutocompletion: true,
//         enableLiveAutocompletion: true,
//         enableSnippets: true,
//       }}
//     />
//   );
// });
