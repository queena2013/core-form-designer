/** 基础组件 */
import input from './base/input.json';
import rangeInput from './base/range-input.json';
import select from './base/select.json';
import radio from './base/radio.json';
import checked from './base/checked.json';
import datePicker from './base/date-picker.json';
import dateRangePicker from './base/date-range-picker.json';
import timePicker from './base/time-picker.json';
import Switch from './base/switch.json';
import cascader from './base/cascader.json';
import treeselect from './base/tree-select.json';
/** 高级组件 */
import asyncSelect from './advance/async-select.json';
import asyncCascader from './advance/async-cascader.json';
import asyncChecked from './advance/async-checked.json';
import asyncRadio from './advance/async-radio.json';
import asyncTreeSelect from './advance/async-tree-select.json';
import debounceSelect from './advance/debounce-select.json';

export default {
  base: [
    input,
    rangeInput,
    radio,
    checked,
    select,
    timePicker,
    datePicker,
    dateRangePicker,
    Switch,
    cascader,
    treeselect,
  ],
  advance: [
    asyncSelect,
    asyncCascader,
    asyncTreeSelect,
    debounceSelect,
    asyncChecked,
    asyncRadio,
  ],
};
