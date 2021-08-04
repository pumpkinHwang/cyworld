/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import PropTypes from 'prop-types'
import { Spin } from 'antd'
import './Table.scss'

const Table = ({
    columns,
    data,
    isLoading,
    pageSizeOptions,
    pageSize,
    paging,
    sorting,
    ...props
}) => {
    return (
        <div className="custom-table" style={{ width: '100%' }}>
            <Spin spinning={isLoading}>
                <MaterialTable
                    options={{
                        headerStyle: {
                            textAlign: 'center',
                            // backgroundColor: '#03274c',
                            backgroundColor: '#f8f8f8',
                            fontWeight: 'bold',
                            // color: 'white'
                            color: 'black'
                        },
                        search: false,
                        showTitle: false,
                        toolbar,
                        pageSize,
                        pageSizeOptions,
                        paging,
                        title: false,
                        toolbar: false,
                        sorting
                    }}
                    style={{ width: '100%', borderLeft: 'none' }}
                    columns={columns}
                    data={data}
                    {...props}
                />
            </Spin>
        </div>
    )
}

export default Table

Table.propTypes = {
    /** 컬럼 정의  */
    // eslint-disable-next-line react/forbid-prop-types
    columns: PropTypes.array.isRequired,
    /** 데이터  */
    // eslint-disable-next-line react/forbid-prop-types
    data: PropTypes.array.isRequired,
    /** 로딩중 */
    isLoading: PropTypes.bool,
    /** 페이지네이션 */
    paging: PropTypes.bool,
    /** 컬럼 정렬 */
    sorting: PropTypes.bool
}

Table.defaultProps = {
    // eslint-disable-next-line react/default-props-match-prop-types
    columns: undefined,
    // eslint-disable-next-line react/default-props-match-prop-types
    data: undefined,
    isLoading: false,
    paging: true,
    sorting: false
}
