import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { Row, Col, Spin, Pagination } from 'antd'
import Select from '@Components/v2/atoms/Select'
import Search from '@Components/v2/atoms/Search'
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import StoreAuth from '@Stores/User/StoreAuth'
import categoryService from '@Services/v2/unishop/category'
import faqService from '@Services/v2/unishop/faq'
import _ from 'lodash'
import { PaperClipOutlined } from '@ant-design/icons'
import fileSaver from 'file-saver'
import Header from '@Components/v2/header'
import { storeBowser } from '@Stores/StoreBowser'

const FAQ = observer(props => {
    const pageSize = 10

    const [ctgOption, setCtgOption] = useState([])
    const [category, setCategory] = useState('')
    const [searchValue, setSearchValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [rows, setRows] = useState([])
    const [pageNo, setPageNo] = useState(1)
    const [initRows, setInitRows] = useState([])

    // FAQ 분류 조회
    const loadCategory = async searchValue => {
        //분류 조회
        const searchParams = {
            gb: 'load',
            params: {
                type: 'F'
            }
        }

        const ctgList = await categoryService.query(searchParams)
        let optionData = ctgList.data
        let option = [{ label: '전체', value: '' }]

        if (optionData) {
            optionData.forEach(element => {
                option.push({
                    label: element.category,
                    value: element.id.toString()
                })
            })
        }

        setCtgOption(option)
    }

    // FAQ 조회
    const loadFAQ = async () => {
        //테이블 조회
        const params = {
            type: 'load',
            params: {
                title: searchValue,
                permission: StoreAuth.isAuthorized ? '2' : '1',
                category: category
            }
        }
        setIsLoading(true)
        const loadResult = await faqService.query(params)
        if (loadResult && loadResult.data) {
            setInitRows(loadResult.data)
            const rowData = _.slice(
                loadResult.data,
                (pageNo - 1) * pageSize,
                pageNo * pageSize
            )

            setRows(rowData)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        loadCategory()
        loadFAQ()
    }, [])

    useEffect(() => {
        loadFAQ()
    }, [pageNo])

    useEffect(() => {
        
        loadFAQ()
    }, [category])

    return (
        
            <div style={{ marginBottom: 25 }} className="row justify-content-center">
                <div style={{ maxWidth: '98%' }} className="col-12 col-md-10">
                    <Header title="FAQ" />

                    <Row className="search-wrapper">
                        <Col
                            sm={24}
                            md={3}
                            style={{ height: 50, marginRight: 10 }}>
                            <div style={{ width: 'calc(100%-10px)' }}>
                                <Select
                                    type="permission"
                                    options={ctgOption}
                                    value={category}
                                    onChange={e => {setPageNo(1) ; setCategory(e)}}
                                />
                            </div>
                        </Col>
                        <Col
                            sm={24}
                            md={6}
                            style={{ height: 50, marginRight: 10 }}>
                            <div style={{ width: 'calc(100%-10px)' }}>
                                <Search onSearch={e => loadFAQ()} onChange={e => setSearchValue(e)}/>
                            </div>
                        </Col>
                    </Row>

                    <Row justify="center" style={{ marginTop: 20 }}>
                        <div className="custom-table" style={{ width: '100%' }}>
                            <Spin spinning={isLoading}>
                                {rows.map(data => {
                                    return (
                                        <Accordion key={data.title + data.id}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                                key={data.title + data.id}>
                                                <Typography
                                                    style={{ fontSize: 15 }}>
                                                    {'[' +
                                                        data.category_name +
                                                        ']  ' +
                                                        data.title}
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography
                                                    style={{ fontSize: 13 }}
                                                    component={'span'}>
                                                    <Row
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection: 'row'
                                                        }}>
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html:
                                                                    data.contents
                                                            }}></div>
                                                    </Row>

                                                    <Row
                                                        style={{
                                                            marginTop: 30,
                                                            display: 'flex',
                                                            alignItems: 'center'
                                                        }}>
                                                        {!_.isEmpty(data) &&
                                                            data.s3_url && (
                                                                <>
                                                                    <a
                                                                        style={{
                                                                            color:
                                                                                'blue'
                                                                        }}
                                                                        onClick={() =>{
                                                                            if(storeBowser.isAppOSAndroid() || storeBowser.isAppOSiOS()){
                                                                                window.ReactNativeWebView.postMessage(JSON.stringify({type : 'fileDownload', data}));
                                                                            }else{
                                                                                fileSaver(
                                                                                    data.s3_url,
                                                                                    data.original_file_name
                                                                                )
                                                                            }
                                                                        }
                                                                        }>
                                                                        {
                                                                            data.original_file_name
                                                                        }
                                                                    </a>
                                                                    <PaperClipOutlined />
                                                                </>
                                                            )}
                                                    </Row>
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    )
                                })}
                                {_.isEmpty(rows) && (
                                    <Row
                                        style={{
                                            width: '100%',
                                            height: 250,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                        데이터가 존재하지 않습니다.
                                    </Row>
                                )}
                            </Spin>
                            <Row justify="center" style={{ marginTop: 20 }}>
                                <Pagination
                                    pageSize={pageSize}
                                    onChange={pageNo => setPageNo(pageNo)}
                                    total={initRows.length}
                                    pageSizeOptions={[10]}
                                    current={pageNo}
                                />
                            </Row>
                        </div>
                    </Row>
                </div>
            </div>
        
    )
})

export default FAQ
