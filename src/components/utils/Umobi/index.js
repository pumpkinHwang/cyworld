import './Style/Style.scss';
import MobiInput from './Component/Input/Input';
import MobiSelect from './Component/Select/Select';
import { observer } from 'mobx-react-lite';

const Umobi = props => <></>

/** Custom Select component from Mobiscroll Select.
 * @param {object} props
 * @param {string} props.wrapperCls
 * @param {boolean} props.disabled
 * @param {boolean} props.password
 * @param {boolean} props.autoComplete
 * @param {'text'|'password'|'email'|'number'|'tel'} props.htmlType
 * @param {string} props.value
 */
const Input = props => <MobiInput {...props} />
/** Custom Select component from Mobiscroll Select.
 * @param {object} props
 * @param {string} props.wrapperCls
 * @param {boolean} props.disabled
 * @param {boolean} props.dropdown
 * @param {boolean} props.filter
 * @param {boolean} props.touchUi
 * @param {string} props.setText
 * @param {string} props.cancelText
 */
const Select = props => <MobiSelect {...props} />

Umobi.Input = Input
Umobi.Select = Select

export default Umobi
export { Input, Select }