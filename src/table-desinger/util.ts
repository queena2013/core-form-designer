/* eslint-disable no-await-in-loop */
import { cloneDeep, getCleanCloneSchema } from '@/util';
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
  /** tools 组装 */
  if (values.useRefresh) {
    values.tools.push({
      type: 'Refresh',
    });
  }
  if (values.useFilterColumns) {
    values.tools.push({
      type: 'FilterColumns',
    });
  }
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
  /** 删除无效属性 */
  delete values.useRefresh;
  delete values.useFilterColumns;
  delete values.showMore;
  delete values.width;
  delete values.pageSize;
  return values;
};
