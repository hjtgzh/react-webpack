import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import Iconfont from '@/components/Iconfont';
import styles from './style.less';

const Color: React.FC = () => {
  const [background, setBackground] = useState('#fff');

  function handleChangeComplete(color) {
    setBackground(color.hex);
  }

  return (
    <div className={styles.color}>
      <Iconfont type="icon-Dollar" />
      <SketchPicker
        color={background}
        onChangeComplete={handleChangeComplete}
      />
    </div>
  );
};

export default Color;
