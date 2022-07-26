import React from 'react';
import { TableDesigner } from 'react-core-form-designer';
import './index.less';

export default () => {
  return (
    <div className="table-designer-playground">
      <TableDesigner>
        <TableDesigner.RegisterWidgets />
        <TableDesigner.TableCanvas />
        <TableDesigner.PropsConfigPanel />
      </TableDesigner>
    </div>
  );
};
