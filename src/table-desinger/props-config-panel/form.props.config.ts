/**
 * Form的属性配置
 */
import { SchemaProps } from 'react-core-form';

const fields: SchemaProps<{
  path: string;
}>[] = [
  {
    type: 'RadioGroup',
    name: 'column',
    label: '占据列数',
    props: {
      optionType: 'button',
      options: [
        {
          label: '1列',
          value: 1,
        },
        {
          label: '2列',
          value: 2,
        },
        {
          label: '3列',
          value: 3,
        },
        {
          label: '4列',
          value: 4,
        },
      ],
    },
  },
  {
    type: 'RadioGroup',
    name: 'layout',
    label: '布局方式',
    props: {
      optionType: 'button',
      options: [
        {
          label: 'inline',
          value: 'inline',
        },
        {
          label: 'vertical',
          value: 'vertical',
        },
        {
          label: 'horizontal',
          value: 'horizontal',
        },
      ],
    },
  },
  {
    type: 'RadioGroup',
    name: 'size',
    label: '尺寸大小',
    props: {
      optionType: 'button',
      options: [
        {
          label: 'small',
          value: 'small',
        },
        {
          label: 'middle',
          value: 'middle',
        },
        {
          label: 'large',
          value: 'large',
        },
      ],
    },
  },
  {
    type: 'Switch',
    name: 'toolReverse',
    valuePropName: 'checked',
    label: '查询按钮位置互换',
  },
  {
    type: 'Switch',
    name: 'defaultExpand',
    valuePropName: 'checked',
    label: '默认展开更多',
  },
  {
    type: 'Switch',
    name: 'clearInitialValuesOnReset',
    valuePropName: 'checked',
    label: '清空是否保留默认值',
  },
  {
    type: 'Switch',
    name: 'hidden',
    valuePropName: 'checked',
    label: '是否隐藏查询条件',
  },
];

export default fields;
