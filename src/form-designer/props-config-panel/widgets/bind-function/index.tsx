/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @iceworks/best-practices/recommend-polyfill */
import MonacoEditor from '@/monaco-editor';
import { babelParse } from '@/tools';
import { decrypt, encrypt } from '@/util';
import { Button, CreateForm } from 'react-core-form';
import { notification } from 'antd';
import { isEmpty } from 'lodash';
import { useRef } from 'react';
import './index.less';

const codeModal = CreateForm.Modal({
  className: 'function-data-modal',
  title: '编写函数',
  drag: true,
  width: 600,
  modalProps: {
    maskClosable: false,
    bodyStyle: {
      padding: 0,
    },
  },
});

export default ({ value, onChange }) => {
  const monacoRef: any = useRef({});
  const onSubmit = async () => {
    try {
      const codeString = monacoRef.current.getValue();
      if (isEmpty(codeString)) {
        notification.error({
          message: '提示',
          description: '函数体不能为空',
        });
        return Promise.reject();
      }
      await new Promise((res) => setTimeout(res, 1000));
      babelParse(codeString);
      onChange(encrypt(codeString));
      notification.success({
        message: '提示',
        description: '更新成功',
        duration: 1,
      });
    } catch (error) {
      notification.error({
        message: '提示',
        description: error.toString(),
      });
      return Promise.reject();
    }
  };
  return (
    <>
      <Button
        type={value ? 'primary' : 'dashed'}
        onClick={() => {
          codeModal.open({
            schema: [
              {
                name: 'codeString',
                type() {
                  return (
                    <div className="function-data-box">
                      <MonacoEditor
                        value={
                          value
                            ? decrypt(value, false)
                            : `function(){

}`
                        }
                        editorMonacoRef={monacoRef}
                        options={{
                          theme: 'vs-dark',
                          minimap: {
                            enabled: false,
                          },
                        }}
                      />
                    </div>
                  );
                },
              },
            ],
            onSubmit,
          });
        }}
      >
        {value ? '已绑定函数' : '点击绑定函数'}
      </Button>
      <Button
        type="link"
        visible={!isEmpty(value)}
        onClick={() => {
          onChange(undefined);
        }}
        confirm={{
          type: 'pop',
          title: '是否确认解除',
        }}
      >
        解绑
      </Button>
    </>
  );
};
