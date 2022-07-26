/* eslint-disable @iceworks/best-practices/recommend-polyfill */
import MonacoEditor from '@/monaco-editor';
import { notification } from 'antd';
import './index.less';

export default ({ value, onChange }) => {
  return (
    <div className="json-data-box">
      <MonacoEditor
        id="datasource"
        value={JSON.stringify(value, null, 2)}
        options={{
          theme: 'vs-dark',
          lineNumbers: false,
          minimap: {
            enabled: false,
          },
        }}
        onSave={(code: string) => {
          try {
            const options = JSON.parse(code.replaceAll?.('\n', ''));
            onChange(options);
            notification.success({
              message: '提示',
              description: '数据源已更新',
            });
          } catch (error) {
            notification.warning({
              message: '提示',
              description: '不符合标准的JSON格式',
            });
          }
        }}
      />
    </div>
  );
};
