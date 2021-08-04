import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Checkbox } from 'antd'
import PropTypes from 'prop-types'
import { getCookie, setCookie } from 'react-use-cookie'
import _ from 'lodash'
import history from '@Components/History'
import { BrowserView, MobileView } from 'react-device-detect'
import {
    store,
} from '@Stores/MainStore'
const Popup = ({ type, rows, setRows, loadPopup, ...props }) => {
    return (
        <>
            <BrowserView>
                <Row
                    style={{
                        position: 'fixed',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        top: 0,
                        left: 0,
                        zIndex: 1000000,
                        overflow: 'auto'
                    }}
                    justify={
                        rows.length === 2
                            ? 'space-around'
                            : rows[0].popup_sort === '1'
                            ? 'start'
                            : 'end'
                    }>
                    {rows.length > 0 &&
                        rows.map(item => (
                            <Col
                                key={item.id}
                                style={{
                                    backgroundColor: 'white',
                                    alignSelf: 'center',
                                    marginTop: 30,
                                    marginBottom: 30,
                                    marginLeft:
                                        rows.length === 1
                                            ? rows[0].popup_sort === '1'
                                                ? 80
                                                : null
                                            : null,
                                    marginRight:
                                        rows.length === 1
                                            ? rows[0].popup_sort === '2'
                                                ? 80
                                                : null
                                            : null
                                }}
                                justify="center">
                                <Card
                                    hoverable
                                    title={item.title}
                                    bodyStyle={{ height: 300, width: 300 }}
                                    style={{ textAlign: '-webkit-center' }}
                                    extra={
                                        <a
                                            onClick={() => {
                                                setRows([..._.pull(rows, item)])
                                            }}>
                                            X
                                        </a>
                                    }
                                    actions={[
                                        <Row justify="end">
                                            {item.week_visible_dt === 'y' && (
                                                <Checkbox
                                                    onChange={() => {
                                                        setCookie(
                                                            `popup-${item.id}`,
                                                            true,
                                                            {
                                                                days: 7
                                                            }
                                                        )
                                                        loadPopup()
                                                    }}>
                                                    일주일간 보지 않기
                                                </Checkbox>
                                            )}
                                        </Row>
                                    ]}>
                                    <Row
                                        style={{
                                            overflow: 'scroll',
                                            height: '100%'
                                        }}>
                                        {item.context_type === 'img' ? (
                                            <Col align="center">
                                 
                                            <a
                                                    href={
                                                        !_.isEmpty(item.link) &&
                                                        item.link
                                                    }
                                                    target={
                                                        item.link_type === '2'
                                                            ? '_self'
                                                            : '_blank'
                                                    }>
                                                    <img
                                                        style={{
                                                            objectFit: 'cover'
                                                        }}
                                                        src={item.image_id}
                                                    />
                                                </a>
                                            </Col>
                                        ) : (
                                            <div
                                                style={{
                                                    width: '100%',
                                                    height: '100%'
                                                }}>
                                                <pre style={{ width: '100%' }}>
                                                    {item.context}
                                                </pre>
                                            </div>
                                        )}
                                    </Row>
                                </Card>
                            </Col>
                        ))}
                </Row>
            </BrowserView>
            <MobileView>
                <Row
                    style={{
                        position: 'fixed',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        top: 0,
                        left: 0,
                        zIndex: 1000000,
                        overflow: 'auto'
                    }}
                    justify="center">
                    {rows.length > 0 &&
                        rows.map(item => (
                            <Col
                                key={item.id}
                                style={{
                                    backgroundColor: 'white',
                                    alignSelf: 'center',
                                    marginTop: 30,
                                    marginBottom: 30
                                }}
                                justify="center">
                                <Card
                                    hoverable
                                    title={item.title}
                                    bodyStyle={{ height: 300, width: 300 }}
                                    style={{ textAlign: '-webkit-center' }}
                                    extra={
                                        <a
                                            onClick={() => {
                                                setRows([..._.pull(rows, item)])
                                            }}>
                                            X
                                        </a>
                                    }
                                    actions={[
                                        <Row justify="end">
                                            {item.week_visible_dt === 'y' && (
                                                <Checkbox
                                                    onChange={() => {
                                                        setCookie(
                                                            `popup-${item.id}`,
                                                            true,
                                                            {
                                                                days: 7
                                                            }
                                                        )
                                                        loadPopup()
                                                    }}>
                                                    일주일간 보지 않기
                                                </Checkbox>
                                            )}
                                        </Row>
                                    ]}>
                                    <Row
                                        style={{
                                            overflow: 'scroll',
                                            height: '100%'
                                        }}>
                                        {item.context_type === 'img' ? (
                                            <Col align="center">
                                                <img
                                                    style={{
                                                        objectFit: 'cover'
                                                    }}
                                                    src={item.image_id}
                                                    onClick={() =>
                                                        {
                                                            if(store.isWebview){
                                                                window.ReactNativeWebView.postMessage(JSON.stringify({data: item.link, targetFunc:"redirect"}));
                                                            }else{
                                                                !_.isEmpty(item.link) &&
                                                                history.push(item.link)
                                                            }
                                                        }
                                                    }
                                                />
                                            </Col>
                                        ) : (
                                            <div
                                                style={{
                                                    width: '100%',
                                                    height: '100%'
                                                }}>
                                                <pre style={{ width: '100%' }}>
                                                    {item.context}
                                                </pre>
                                            </div>
                                        )}
                                    </Row>
                                </Card>
                            </Col>
                        ))}
                </Row>
            </MobileView>
        </>
    )
}

export default Popup

Popup.propTypes = {}

Popup.defaultProps = {}
