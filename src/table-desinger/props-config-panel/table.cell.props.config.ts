/**
 * cell的属性配置
 */
import { BindFunction } from '@/form-designer/props-config-panel/widgets';
import { SchemaProps, CreateForm } from 'react-core-form';

const cellDetailFields: SchemaProps[] = [
  {
    type: 'Switch',
    name: 'columnNo',
    valuePropName: 'checked',
    label: '是否设置为自增序号',
  },
  {
    type: 'Input',
    label: '列标签',
    name: 'title',
  },
  {
    type: 'Input',
    label: '列标识',
    name: 'dataIndex',
  },
  {
    type: 'InputNumber',
    label: '列宽度',
    name: 'width',
  },
  {
    type: 'Input',
    label: '列后缀',
    name: 'suffix',
  },
  {
    type: 'BindFunction',
    name: 'render',
    label: '自定义渲染',
  },
  {
    type: 'Switch',
    name: 'ellipsis',
    valuePropName: 'checked',
    label: '超出是否展示...',
  },
  {
    type: 'Switch',
    name: 'copyable',
    valuePropName: 'checked',
    label: '是否支持拷贝文案',
  },
  {
    type: 'Switch',
    name: 'resize',
    valuePropName: 'checked',
    label: '是否可拖拽调整宽度',
  },
  {
    type: 'Switch',
    name: 'useThousandth',
    valuePropName: 'checked',
    label: '是否展示千分位',
  },
  ...[
    {
      type: 'InputNumber',
      name: 'minimumFractionDigits',
      label: '小数点最小位数',
    },
    {
      type: 'InputNumber',
      name: 'maximumFractionDigits',
      label: '小数点最大位数',
    },
  ].map((item) => {
    return {
      ...item,
      effect: ['useThousandth'],
      isShow({ useThousandth }) {
        return useThousandth;
      },
    };
  }),
  {
    type: 'Switch',
    name: 'link',
    valuePropName: 'checked',
    label: '是否展示成链接',
  },
];
/**
 * 列明细信息编辑
 */
const drawerCellForm = CreateForm.Drawer({
  schema: cellDetailFields,
  width: 400,
  widgets: {
    BindFunction,
  },
  drawerProps: {
    mask: false,
    footer: false,
    headerStyle: {
      height: 43.5,
    },
    style: {
      top: 35,
      right: 400,
      height: 'calc(100% - 57px)',
    },
  },
  getPopupContainer: () => {
    return document.querySelector('#table-cell-props-config');
  },
});

const cellFields: SchemaProps<{}>[] = [
  {
    type: 'BlockQuote',
    props: {
      title: '数据列设置',
    },
  },
  {
    type: 'TableList',
    name: 'columns',
    props: {
      actions: [
        {
          key: 'edit',
          label: '修改',
          onClick: (item, onCellChange) => {
            try {
              drawerCellForm.close();
              // eslint-disable-next-line no-empty
            } catch (error) {}
            drawerCellForm.open({
              title: item.title,
              initialValues: item,
              onValuesChange: (v: any) => {
                const k = Object.keys(v)[0];
                onCellChange(v[k], k);
              },
            });
          },
        },
      ],
      columns: [
        {
          title: '列标签',
          dataIndex: 'title',
        },
        {
          title: '列标识',
          dataIndex: 'dataIndex',
        },
      ],
    },
  },
];

export default cellFields;
