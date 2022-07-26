# 低码相关组件

## FormDesigner 表单设计器

```tsx
import React, { useRef } from 'react';
import { FormDesigner } from 'react-core-form-designer';

export default () => {
  const formDesignerRef: any = useRef({});
  return (
    <FormDesigner ref={formDesignerRef}>
      <FormDesigner.RegisterWidgets />
      <FormDesigner.FormCanvas />
      <FormDesigner.PropsConfigPanel />
    </FormDesigner>
  );
};
```

## TableDesigner 表格设计器

```tsx
import React from 'react';
import { TableDesigner } from 'react-core-form-designer';

export default () => {
  return (
    <TableDesigner>
      <TableDesigner.RegisterWidgets />
      <TableDesigner.TableCanvas />
      <TableDesigner.PropsConfigPanel />
    </TableDesigner>
  );
};
```
