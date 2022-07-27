/* eslint-disable no-await-in-loop */
import { babelParse } from '@/tools';
import { cloneDeep, decrypt, getCleanCloneSchema } from '@/util';
/**
 * 克隆一份
 */
export const getStandardSchema = (scurce = {}) => {
  const schema: any = cloneDeep(scurce);
  const searchSchema = getCleanCloneSchema(
    [schema.searchSchema],
    'const searchSchema = ',
  );
  const tableSchema = getCleanCloneSchema(
    [schema.tableSchema],
    'const tableSchema = ',
  );
  return `${searchSchema}\n${tableSchema}`;
};

/** 模型转换给Table */
export const parseTableSchema = (values: any = {}) => {
  // 过滤undefined
  values.tools = values.tools?.filter((i) => i);
  /** 分页组装 */
  if (values.pagination && values.pageSize) {
    values.paginationConfig = {
      pageSize: values.pageSize,
    };
  }
  /** rowOperations 组装 */
  values.rowOperations = {
    showMore: values.showMore,
    width: values.width,
    title: '操作',
    fixed: 'right',
    menus: () => {
      return (
        values.menus
          ?.filter((i) => i)
          .map((menu) => {
            if (menu.confirm) {
              menu.confirm = {
                title: '提示',
                content: menu.content,
              };
            }
            return menu;
          }) || []
      );
    },
  };
  /**
   * 函数的解析
   */
  if (values.request) {
    try {
      values.request = babelParse(decrypt(values.request, false));
    } catch (error) {
      console.log('request 解析异常->', error);
    }
  }
  if (values.toolsClick) {
    try {
      values.toolsClick = babelParse(decrypt(values.toolsClick, false));
    } catch (error) {
      console.log('toolsClick 解析异常->', error);
    }
  }
  if (values.rowOperationsClick) {
    try {
      values.rowOperationsClick = babelParse(
        decrypt(values.rowOperationsClick, false),
      );
    } catch (error) {
      console.log('rowOperationsClick 解析异常->', error);
    }
  }
  /** 删除无效属性 */
  delete values.showMore;
  delete values.width;
  delete values.pageSize;
  return values;
};
