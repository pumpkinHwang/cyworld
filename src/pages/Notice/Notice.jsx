import React, { useState, useEffect } from 'react'
import history from '@Components/History'
import { appConfig } from '@Components/config'
import noticeService from '../../services/v2/unishop/notice'
import Table from '../../components/v2/atoms/Table'
import { PaperClipOutlined } from '@ant-design/icons'
import moment from 'moment'
import Search from '@Components/v2/atoms/Search'
import { Row, Col } from 'antd'
import StoreAuth from '@Stores/User/StoreAuth'
import Header from '@Components/v2/header'

const Notice = () => {
    const columns = [
        {
            title: 'NO',
            render: e => e.tableData.id + 1,
            cellStyle: { minWidth: 40 }
        },
        {
            title: '제목',
            // cellStyle: { minWidth: 400, fontWeight: '400' },
            cellStyle: (cell, row) => ({
                minWidth: 400,
                fontWeight: row.top_yn === 'y' ? 'bold' : 400
            }),
            field: 'title'
        },
        {
            title: '첨부',
            render: e => (e.attach_id ? <PaperClipOutlined /> : '-')
        },
        {
            title: '작성일',
            render: e => moment(e.create_dt).format('yyyy-MM-DD')
        }
    ]

    const [rows, setRows] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const loadNotice = async searchValue => {
        const params = {
            type: 'load',
            params: {
                title: searchValue,
                permission: StoreAuth.isAuthorized ? '2' : '1'
            }
        }

        setIsLoading(true)
        const loadResult = await noticeService.query(params)
        if (loadResult && loadResult.success) {
            setRows(loadResult.data)
        }
        setIsLoading(false)
    }

    const changeEditPage = id => {
        history.push(`/notice/${id}`)
        // location.href = `/notice/${id}`
    }

    useEffect(() => {
        loadNotice()
    }, [])

    return (
        <div
            style={{ marginBottom: 25 }}
            className="row justify-content-center">
            <div style={{ maxWidth: '98%' }} className="col-12 col-md-10">
                <Header title="공지사항" />

                <Row
                    className="container"
                    justify="end"
                    style={{ marginTop: 30, marginBottom: 20 }}>
                    <Col style={{ width: '50%' }}>
                        <Search onSearch={e => loadNotice(e)} />
                    </Col>
                </Row>
                <div className="container">
                    <Table
                        columns={columns}
                        data={rows}
                        isLoading={isLoading}
                        pageSizeOptions={[10, 20]}
                        pageSize={10}
                        onRowClick={(e, item) => changeEditPage(item.id)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Notice
