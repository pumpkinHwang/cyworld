import React from 'react'
import PropTypes from 'prop-types'
import { LinkOutlined } from '@ant-design/icons'

const Table = ({ columns, data }) => {
    return (
        <div className="row" style={{ overflow: 'scroll' }}>
            <table className="lsb-data order-detail-table">
                <thead>
                    <tr>
                        {columns.map(item => {
                            return (
                                <th
                                    className="table-head lsb-table-header"
                                    style={{}}>
                                    {item.header}
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.length > 0 &&
                        data.map((item, index) => {
                            const component = () => {}
                            return (
                                <tr key={index}>
                                    {columns.map(column => {
                                        if (column.cell)
                                            return column.cell(column, item)

                                        const accessor = column.accessor
                                        const type =
                                            column.type !== undefined
                                                ? column.type
                                                : ''

                                        const getData = () => {
                                            if (type !== '') {
                                                if (type === 'a') {
                                                    return (
                                                        <a
                                                            style={{
                                                                textDecoration:
                                                                    'underline'
                                                            }}>
                                                            {item[accessor]}
                                                        </a>
                                                    )
                                                } else if (type === 'link') {
                                                    return item[accessor] ===
                                                        'Y' ? (
                                                        <LinkOutlined
                                                            style={{
                                                                color: '#000'
                                                            }}
                                                        />
                                                    ) : (
                                                        '-'
                                                    )
                                                }
                                            } else {
                                                return item[accessor]
                                            }
                                        }

                                        return <td>{getData()}</td>
                                    })}
                                </tr>
                            )
                        })}
                    {
                        // this.renderRows(this.state.orderDataSource)
                    }
                </tbody>
            </table>
        </div>
    )
}

Table.propTypes = {
    columns: PropTypes.object
}

Table.defaultProps = {
    columns: [],
    data: []
}

export default Table
