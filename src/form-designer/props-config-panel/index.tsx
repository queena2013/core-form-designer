import { Form } from 'react-core-form';
import { useContext, useState } from 'react';
import { Empty, Segmented } from 'antd';
import ItemPropsConfig from './item.props.config';
import FormPropsConfig from './form.props.config';
import { isEmpty, recursionFind } from '@/util';
import { BindFunction, JsonData } from './widgets';
import { Ctx } from '@/form-designer/store';
import { debounce } from 'lodash';
import './index.less';

export interface PropsConfigPanelTypes {
  props: any; // 组件描述
  propsConfig: Array<any>; // 属性配置
  onPropsConfigUpdate: Function; // 配置改变返回新的配置
  /** 设置防抖时间 */
  debounceTime?: number;
  style?: any; //
}

export default ({
  props = {},
  propsConfig = [],
  style = {},
  onPropsConfigUpdate = () => {},
  debounceTime = 100,
}: PropsConfigPanelTypes) => {
  const ctx: any = useContext(Ctx); // 拿到ctx
  const [compontentType, setCompontentType]: any = useState('表单项配置');
  if (!isEmpty(props)) {
    ctx.selectSchema = {
      props,
    };
  } else if (ctx.selectSchema && ctx.widgets) {
    propsConfig = ctx.widgets.__originalConfig__?.find(
      (widget) => widget.type === ctx.selectSchema.type,
    )?.propsConfig;
    /** 更新 schema */
    onPropsConfigUpdate = (values, type) => {
      if (type === 'item') {
        // 更新 selectSchema
        ctx.selectSchema = { ...ctx.selectSchema, ...values };
        ctx.setSelectSchema({ ...ctx.selectSchema });
      }
      if (type === 'widget') {
        // 更新 schemaProps
        ctx.selectSchema.props = { ...ctx.selectSchema.props, ...values };
        ctx.setSelectSchema({ ...ctx.selectSchema });
      }
      // 更新 schema
      const newSchema = recursionFind(ctx.schema, ctx.selectSchema.key);
      Object.assign(newSchema, ctx.selectSchema);
      ctx.setSchema([...ctx.schema]);
    };
  }
  /** 防抖0.1s */
  const onFormValuesChange = debounce((_, values) => {
    ctx.setFormProps?.(values);
    onPropsConfigUpdate({ ...values }, 'form');
  }, debounceTime);
  /** 防抖0.1s */
  const onItemValuesChange = debounce((_, values) => {
    onPropsConfigUpdate({ ...values }, 'item');
  }, debounceTime);
  /** 防抖0.1s */
  const onWidgetValuesChange = debounce((_, values) => {
    const key = Object.keys(_)[0];
    if (['columns'].includes(key) && Array.isArray(values[key])) {
      values[key] = values[key].map((item) => {
        if (item === undefined) {
          item = {};
        }
        return item;
      });
    }
    onPropsConfigUpdate({ ...values }, 'widget');
  }, debounceTime);
  // TODO 没有考虑 FieldSet
  const onMount = ({ setSchemaByName }) => {
    const options = ctx.schema
      ?.filter(
        (item) =>
          item.key !== ctx.selectSchema.key && item.type !== 'BlockQuote',
      ) // 过滤自己
      .map((schema) => {
        return {
          label: schema.label,
          value: schema.name,
        };
      });
    setSchemaByName('effect', {
      props: {
        options,
      },
    });
  };
  return (
    <div
      className="props-config-panel"
      style={style}
      key={ctx.selectSchema?.key}
    >
      {isEmpty(ctx.selectSchema) ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="请选择需要设置的表单项"
          className="form-canvas-empty"
        />
      ) : (
        <>
          <div className="props-config-panel-header">
            <Segmented
              onChange={setCompontentType}
              value={compontentType}
              options={['表单配置', '表单项配置', '子部件配置']}
            />
          </div>
          <div
            className="props-config-panel-body"
            style={{
              display: compontentType === '表单配置' ? 'block' : 'none',
            }}
          >
            <Form
              widgets={{
                BindFunction,
              }}
              schema={FormPropsConfig}
              initialValues={ctx.formProps}
              onValuesChange={onFormValuesChange}
            />
          </div>
          <div
            className="props-config-panel-body"
            style={{
              display: compontentType === '表单项配置' ? 'block' : 'none',
            }}
          >
            <Form
              widgets={{
                BindFunction,
              }}
              onMount={onMount}
              schema={ItemPropsConfig}
              initialValues={ctx.selectSchema || {}}
              onValuesChange={onItemValuesChange}
            />
          </div>
          <div
            className="props-config-panel-body"
            style={{
              display: compontentType === '子部件配置' ? 'block' : 'none',
            }}
          >
            <Form
              widgets={{
                BindFunction,
                JsonData,
              }}
              schema={propsConfig}
              initialValues={ctx.selectSchema?.props || {}}
              onValuesChange={onWidgetValuesChange}
            />
          </div>
        </>
      )}
    </div>
  );
};
