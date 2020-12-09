import React from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import styles from './style.less';

export default class BasicDemo extends React.Component {
  state = {
    editorState: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>'), // 设置编辑器初始内容
    outputHTML: '<p></p>',
  };

  isLivinig = false;

  componentDidMount() {
    this.isLivinig = true;
    // 3秒后更改编辑器内容
    setTimeout(this.setEditorContentAsync, 3000);
  }

  componentWillUnmount() {
    this.isLivinig = false;
  }

  handleChange = (editorState) => {
    this.setState({
      editorState: editorState,
      outputHTML: editorState.toHTML(),
    });
  };

  setEditorContentAsync = () => {
    this.isLivinig &&
      this.setState({
        editorState: BraftEditor.createEditorState('<p>你好，<b>世界!</b><p>'),
      });
  };

  render() {
    const { editorState, outputHTML } = this.state;

    return (
      <div className={styles.editor}>
        <div className={styles['editor-wrapper']}>
          <BraftEditor value={editorState} onChange={this.handleChange} />
        </div>
        <div className={styles['content-title']}>输出内容</div>
        <div className={styles['output-content']}>{outputHTML}</div>
      </div>
    );
  }
}
