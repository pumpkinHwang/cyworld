import { observer } from 'mobx-react-lite';
import { Select as MobiscrollSelect, Input as MobiscrollInput } from '@mobiscroll/react';
import { defaults, trim } from '@Utils/Utils';

/** Custom Select component from Mobiscroll Select.
 * @param {*} props
 * @param {string} props.wrapperCls
 * @param {boolean} props.disabled
 * @param {boolean} props.dropdown
 * @param {boolean} props.filter
 * @param {boolean} props.touchUi
 * @param {string} props.setText
 * @param {string} props.cancelText
 */
const Select = observer(props => {

    const { 
        wrapperCls, disabled, group, dropdown, maxWidth, height, 
        display, touchUi, filter, filterPlaceholderText, 
        onSelected, onSet, onCancel, onChange, onItemTap,
        ...restProps 
    } = props

    const localOnCancel = (_, inst) => {
        if (onCancel) {
            onCancel(_, inst)
        }
    }

    const localOnSet = (_, inst) => {
        if (onSelected) {
            onSelected(inst.getVal(true))
        }
        if (onSet) {
            onSet(inst.getVal(true))
        }
    }

    const localOnChange = (_, inst) => {
        if (onChange) {
            onChange(_, inst)
        }
    }

    const localOnItemTap = (_, inst) => {
        if (onItemTap) {
            onItemTap(_, inst)
        }
    }

    return (
        <div className={trim(`mobi-select ${defaults(wrapperCls, '')} ${disabled ? 'disabled' : ''}`)}>
            <MobiscrollSelect 
                disabled={disabled !== undefined ? disabled : false} 
                display={display !== undefined ? display : 'center'}
                touchUi={touchUi !== undefined ? touchUi : false}
                filter={filter !== undefined ? filter : true}
                filterPlaceholderText={filterPlaceholderText !== undefined ? filterPlaceholderText : ''}
                height={height !== undefined ? height : 40} 
                maxWidth={maxWidth !== undefined ? maxWidth : 400} 
                onItemTap={localOnItemTap}
                onChange={localOnChange}
                onCancel={localOnCancel}
                onSet={localOnSet}
                {...restProps}>
                <MobiscrollInput dropdown={dropdown ? dropdown : true} inputStyle="box"/>
            </MobiscrollSelect>
        </div>
    )
})

export default Select 