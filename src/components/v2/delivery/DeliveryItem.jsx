import React from 'react'
import {
    Form,
    Select,
    InputNumber,
    Switch,
    Radio,
    Slider,
    Button,
    Upload,
    Rate,
    Checkbox,
    Row,
    Col,
    Card
} from 'antd'
import {
    DeleteOutlined,
    StarOutlined,
    StarFilled,
    CheckCircleTwoTone
} from '@ant-design/icons'
import './index.css'

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
}

const DeliveryItem = ({ data, index, updateDelivery, deleteDelivery }) => {
    const columns = [
        { label: '이름', value: 'fullName' },
        {
            label: '주소',
            value: 'address',
            cell: obj => {
                return obj.address1 + ' ' + obj.address2
            }
        },
        { label: '우편번호', value: 'zipcode' },
        { label: '이메일', value: 'email' },
        { label: '전화번호', value: 'phone' }
    ]

    const buttonSize = '22px'
    return (
        <div className="col-md-6" style={{ marginTop: index > 1 ? 10 : 0 }}>
            <Card bodyStyle={{ padding: 5 }}>
                <Form
                    name="validate_other"
                    {...formItemLayout}
                    initialValues={{
                        ['input-number']: 3,
                        ['checkbox-group']: ['A', 'B'],
                        rate: 3.5
                    }}>
                    {columns.map(item => {
                        return (
                            <Form.Item
                                label={item.label}
                                style={{ marginBottom: 0 }}>
                                <span className="ant-form-text">
                                    {!item.hasOwnProperty('cell')
                                        ? data[item.value]
                                        : item.cell(data)}
                                </span>
                            </Form.Item>
                        )
                    })}
                </Form>

                <div
                    style={{
                        display: 'flex',
                        position: 'absolute',
                        top: 8,
                        right: 8
                    }}>
                    <Button
                        shape="circle"
                        style={{
                            borderWidth: 0
                        }}
                        onClick={updateDelivery}>
                        {Number(data.setmain) === 1 ? (
                            <StarFilled
                                style={{
                                    fontSize: buttonSize,
                                    color: '#0da9ef'
                                }}
                            />
                        ) : (
                            <StarOutlined style={{ fontSize: buttonSize }} />
                        )}
                    </Button>

                    <Button
                        shape="circle"
                        style={{
                            borderWidth: 0
                        }}
                        onClick={deleteDelivery}>
                        <DeleteOutlined style={{ fontSize: buttonSize }} />
                    </Button>
                </div>
            </Card>
        </div>
    )
}

DeliveryItem.propTypes = {}
DeliveryItem.defaultProps = {
    data: {}
}

export default DeliveryItem
