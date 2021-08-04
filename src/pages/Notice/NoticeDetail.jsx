import React, { useState, useEffect } from 'react'
import history from '@Components/History'
import { appConfig } from '@Components/config'
import noticeService from '../../services/v2/unishop/notice'
import Table from '../../components/v2/atoms/Table'
import { PaperClipOutlined } from '@ant-design/icons'
import moment from 'moment'
import Search from '@Components/v2/atoms/Search'
import { Row, Col, Divider } from 'antd'
import fileSaver from 'file-saver'
import Button from '@Components/v2/atoms/Button'
import _ from 'lodash'
import { BrowserView, MobileView, TabletView } from 'react-device-detect'
import { storeBowser } from '@Stores/StoreBowser'
import PinchToZoom from 'react-pinch-and-zoom';

const NoticeDetail = props => {
    const [editType, setEditType] = useState('id')
    const [detail, setDetail] = useState([])
    const [title, setTitle] = useState('')
    const [permission, setPermission] = useState('')
    const [attachFile, setAttachFile] = useState([])
    const [imageFile, setImageFile] = useState([])
    const [imageSrc, setImageSrc] = useState({})
    const [createDt, setCreateDt] = useState('')
    const [context, setContext] = useState('')

    const changeEditPage = () => {
        history.push(`/notice`)
    }

    const loadDetail = async id => {
        const params = {
            type: 'detail',
            params: {
                id
            }
        }

        const loadResult = await noticeService.query(params)
        if (loadResult && loadResult.success) {
            console.log(loadResult.data[0])

            setDetail(loadResult.data[0])
            setTitle(loadResult.data[0].title)
            setPermission(loadResult.data[0].permission)
            setImageSrc(loadResult.data[0].image_id)
            setAttachFile(loadResult.data[0].attach_id)
            setImageFile(loadResult.data[0].image_id)
            setCreateDt(loadResult.data[0].create_dt)
            setContext(loadResult.data[0].context)
        }
    }

    useEffect(() => {
        if (props.match && props.match.params.id) {
            const { id } = props.match.params
            setEditType(id)
            if (id !== 'new' && _.isNumber(_.toNumber(id))) {
                loadDetail(id)
            }
        }
    }, [])

    return (
        <div
            style={{ marginBottom: 25 }}
            className="row justify-content-center">
            <div style={{ maxWidth: '98%' }} className="col-12 col-md-10">
                <Row style={{ marginTop: 30 }}>
                    <Col span={18} align="left">
                        {title}
                    </Col>
                    <Col span={6} align="right">
                        {moment(createDt).format('yyyy-MM-DD')}
                    </Col>
                </Row>
                <Divider dashed />
                <Row
                    style={{
                        width: '100%',
                        minHeight: 300,
                        justifyContent: 'center'
                    }}>
                    <Col>
                        <Row>
                            {imageSrc && (
                                <>
                                    <BrowserView>
                                        <img src={imageSrc} 
                                        style={{width: '860px'}}
                                        />
                                    </BrowserView>
                                    
                                    <MobileView>

                                        <PinchToZoom>
                                            <img
                                                    src={imageSrc}
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                />
                                        </PinchToZoom>

                                        
                                    </MobileView>
                                </>
                            )}
                        </Row>
                        {/* <Row>{context}</Row> */}
                    </Col>
                </Row>
                <Row
                    style={{
                        marginTop: 30,
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                    {!_.isEmpty(detail) && detail.s3_url && (
                        <>
                            <a
                                style={{ color: 'blue', marginRight: 10 }}
                                onClick={() =>
                                    {
                                        if(storeBowser.isAppOSAndroid() || storeBowser.isAppOSiOS()){
                                                                                window.ReactNativeWebView.postMessage(JSON.stringify({type : 'fileDownload', data : detail}));
                                                                            }else{
                                                                                fileSaver(
                                                                                    detail.s3_url,
                                                                                    detail.attach_original_file_name
                                                                                )
                                                                            }
                                    }
                                }>
                                {detail.attach_original_file_name}
                            </a>
                            <PaperClipOutlined />
                        </>
                    )}
                </Row>
                <Divider dashed />
                <Row justify="center" style={{ marginTop: 30 }}>
                    <Button type="list" onClick={() => changeEditPage()} />
                </Row>
            </div>
        </div>
    )
}

export default NoticeDetail
