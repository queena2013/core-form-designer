/* eslint-disable */
const { transform } = require('babel-standalone');
const antd = require('antd');
const react = require('react');
const axios = require('axios');
const moment = require('moment');
const formlib = require('react-core-form');
const presets = ['es2015', 'stage-0', 'react'];

const safeEval = (code: string) => {
  return Function(code)();
};

class BabelCompile {
  scope: any = {};
  exports = {};
  constructor(scope = {}) {
    this.scope = {
      ...scope,
      react,
      moment,
      axios,
      antd,
      'react-core-form': formlib,
    };
  }
  require = (key: string) => {
    if (this.scope[key] === undefined) throw new Error(`${key} is not define`);
    return this.scope[key];
  };
  excuteCode = (code: string): any => {
    const res: any = {
      isError: false,
      error: '',
      exports: {},
    };
    try {
      const es5 = transform(code, {
        presets,
      }).code;
      const transfromCode = transform(
        `(require, exports) => {
          ${es5};
        }`,
        {
          presets,
        },
      ).code;
      // 在解析的es5中 注入 return 用 safeEval 执行
      const parseCode = transfromCode
        .replace('"use strict";\n\n(', '"use strict";\n\n return (')
        .replace("'use strict';\n\n(", "'use strict';\n\n return (");
      safeEval(parseCode).call(null, this.require, this.exports);
      res.exports = this.exports;
    } catch (error) {
      console.log('catch transform error:', error);
      throw error;
    }
    return res;
  };
}
export default BabelCompile;
