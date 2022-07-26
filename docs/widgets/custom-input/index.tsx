import React from 'react';
import './index.less';

export default (props) => {
  return (
    <div>
      自定义组件
      <input {...props} />
    </div>
  );
};
