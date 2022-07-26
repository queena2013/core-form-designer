---
order: 3
title: RegisterWidgets 组件注册层
toc: menu
---

## 默认使用 Form 内置的 widgets

```tsx
import React from 'react';
import { FormDesigner } from 'react-core-form-designer';

export default () => {
  return (
    <FormDesigner>
      <FormDesigner.RegisterWidgets
        style={{
          height: 800,
          width: 300,
          border: '1px solid #f2f2f2',
        }}
        onClick={(item) => {
          console.log('click->', item);
        }}
      />
    </FormDesigner>
  );
};
```

## 安装自定义组件

```tsx
import React from 'react';
import { FormDesigner } from 'react-core-form-designer';
import * as customWidgets from '../widgets';
import customWidgetsPropsConfig from '../widgets/config.json';
import { Space } from 'antd';

export default () => {
  return (
    <FormDesigner>
      <FormDesigner.RegisterWidgets
        customWidgets={customWidgets}
        customWidgetsPropsConfig={customWidgetsPropsConfig}
        style={{
          height: 900,
          width: 300,
          border: '1px solid #f2f2f2',
        }}
      />
    </FormDesigner>
  );
};
```
