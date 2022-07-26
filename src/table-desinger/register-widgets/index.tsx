import { Ctx } from '@/table-desinger/store';
import RegisterWidgets from '@/form-designer/register-widgets';
import innerWidgets from '../config';

export default (props) => {
  return (
    <RegisterWidgets
      context={Ctx}
      {...props}
      innerWidgets={innerWidgets}
      customWidgets={{}}
      customWidgetsPropsConfig={[]}
    />
  );
};
