import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Input } from 'antd'
import PropTypes from 'prop-types'
import { RetweetOutlined } from '@ant-design/icons'

const Search = ({ value, onChange, onSearch, onReset, disabled, ...props }) => {
    const [initValue, setInitValue] = useState(value)

    useEffect(() => {
        onChange(value)
        setInitValue(value)
    }, [value])

    const searchHandler = () => {
        if (onSearch) onSearch(initValue)
    }

    const resetHandler = () => {
        setInitValue('')
        if (onReset) {
            onReset('')
        }
    }

    const onChangeHandler = e => {
        setInitValue(e)
        onChange(e)
    }

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
            <Input.Search
                style={{ height: 40, borderRadius: 30, minWidth: 100 }}
                onPressEnter={searchHandler}
                onChange={e => onChangeHandler(e.target.value)}
                onSearch={searchHandler}
                value={initValue}
                disabled={disabled}
                autoComplete="off"
                placeholder="검색"
            />
            {/* <Button
          style={{ minWidth: 100, height: '100%', borderRadius: 30, backgroundColor: 'gray', color: 'white', marginLeft: 5 }}
          onClick={() => searchHandler()}
          disabled={disabled}>
          검색
        </Button>
        <Button
          style={{ minWidth: 40, height: 40, borderRadius: 200, backgroundColor: '#2033ff', marginLeft: 5 }}
          onClick={() => resetHandler()}
          icon={<RetweetOutlined style={{ color: 'white' }} />}
          disabled={disabled}
        /> */}
        </div>
    )
}

export default Search

Search.propTypes = {
    /** 검색 이벤트  */
    onSearch: PropTypes.func,
    /** 변경 이벤트  */
    onChange: PropTypes.func,
    /** 초기화 이벤트  */
    onReset: PropTypes.func,
    /** 기본값 */
    value: PropTypes.string,
    /** 셀렉트 비활성화 */
    disabled: PropTypes.bool
}

Search.defaultProps = {
    onSearch: () => {},
    onChange: () => {},
    onReset: () => {},
    value: undefined,
    disabled: false
}
