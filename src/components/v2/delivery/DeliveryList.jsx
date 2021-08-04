import React from 'react'
import DeliveryItem from './DeliveryItem'
import PropTypes from 'prop-types'
import { Button } from 'antd'

const DeliveryList = ({ data, showInfo, updateDelivery, deleteDelivery }) => {
    const [state, setState] = React.useState({
        btnHover: false
    })
    return (
        <div className="row">
            {data &&
                data.map((delivery, index) => {
                    return (
                        <DeliveryItem
                            data={delivery}
                            index={index}
                            updateDelivery={() => updateDelivery(delivery.id)}
                            deleteDelivery={() => deleteDelivery(delivery.id)}
                        />
                    )
                })}

            { (     //data.length < 10 &&
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 40,
                        marginBottom: 40
                    }}>
                    <Button
                        // shape="circle"
                        length={data.length}
                        onClick={showInfo}
                        onMouseOver={() =>
                            setState({ ...state, btnHover: true })
                        }
                        onMouseLeave={() =>
                            setState({ ...state, btnHover: false })
                        }
                        // className={state.btnHover ? 'edit-button-hover' : 'edit-button'}
                        style={{
                            cursor: 'pointer',
                            backgroundColor: '#0da9ef',
                            padding: 20,
                            paddingLeft: 50,
                            paddingRight: 50,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: '#fff',
                            fontSize: 16,
                            borderRadius: 20
                        }}>
                        배송지 추가
                    </Button>
                </div>
            )}
        </div>
    )
}

DeliveryList.propTypes = {
    data: PropTypes.object,
    handleAddDelivery: PropTypes.func
}
DeliveryList.defaultProps = {
    data: [],
    handleAddDelivery: () => {}
}

export default DeliveryList
