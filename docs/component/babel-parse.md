---
order: 5
title: 使用 babelParse 转译
toc: menu
---

## 基本使用

```tsx
/**
 * background: '#fff'
 */
import React from 'react';
import { Form } from 'react-core-form';
import { getTools } from 'react-core-form-designer';

const schema = `export default {
  column: 2,
  schema: [
    {
      type: "RadioGroup",
      label: "单选组",
      name: "RadioGroup_8337223429",
      props: {
        options: [
          {
            label: "选项1",
            value: 1,
          },
          {
            label: "选项2",
            value: 2,
          },
          {
            label: "选项3",
            value: 3,
          },
        ],
      },
    },
    {
      type: "Input",
      label: "输入框",
      name: "Input_6297551106",
      visible: function ({ RadioGroup_8337223429 }) {
        return RadioGroup_8337223429 === 2;
      },
      effect: ["RadioGroup_8337223429"],
    },
    {
      type: "DatePicker",
      label: "时间框",
      name: "TimePicker_5680070776",
      props: {
        onChange: function (values) {
          console.log(values);
        },
      },
    },
    {
      type: "AsyncSelect",
      label: "异步选择框",
      name: "AsyncSelect_3710941469",
      props: {
        options: function () {
          return [
            {
              label: "测试",
              value: 1,
            },
          ];
        },
      },
    },
  ],
};
`;
export default () => {
  const { babelParse } = getTools();
  return <Form {...babelParse(schema, '')} />;
};
```
