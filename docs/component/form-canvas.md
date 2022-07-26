---
order: 2
title: FormCanvas 核心拖拽层
toc: menu
---

## 基本使用

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { FormDesigner } from 'react-core-form-designer';
import defaultSchema from './schema';

export default () => {
  return (
    <FormDesigner>
      <FormDesigner.FormCanvas
        column={2}
        defaultSchema={defaultSchema}
        defaultSelectKey={defaultSchema[0].key}
        onSchemaSelect={(field) => {
          console.log('onSchemaSelect', field);
        }}
        onSchemaUpdate={(field) => {
          console.log('onSchemaUpdate', field);
        }}
      />
    </FormDesigner>
  );
};
```
