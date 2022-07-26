/* eslint-disable */
import BabelCompile from './babel-compile';

const babel = new BabelCompile();
/**
 * useBabel
 */
export const babelParse = (code: string, prefix = 'export default ') => {
  try {
    const res = babel.excuteCode(`${prefix}${code.replaceAll('↵', '')}`);
    if (!res?.isError) {
      return res?.exports.default;
    } else {
      throw res?.error;
    }
  } catch (error) {
    console.log('catch parse error:', error);
    throw error;
  }
};

export default (config?: any) => {
  return {
    babelParse,
    BabelCompile,
  };
};
