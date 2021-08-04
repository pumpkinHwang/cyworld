import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Row, Col } from 'antd';
import { newGetProducts } from '../../services/Network';
import _ from 'lodash'
import Raven from '@Raven'
import StoreUser from '@Stores/User/StoreUser'
import StoreAuth from '@Stores/User/StoreAuth';
import infoSign from '@Assets/info-sign.svg';

const BestProducts = observer(props => {
    
    const [rows, setRows] = useState([])

    const loadData = async () => {

        const status = StoreUser.getShortStatus()
        const allow = 'shop'
        const res = await Raven.getProductSourceV2({ allow, status })
        let { items = [] } = res
        items = items.filter(val => val.is_best)
        setRows(items);
    }


    useEffect(() => {
        loadData()
    }, []);


    return (
        <div className="container" style={{padding: 0}}>
            {!_.isEmpty(rows) && 
                <div>
                    <Row justify="center" style={{ marginTop: 20, width: '100%' }} className="padding-top-2x">
                        <Col className="text-center">
                            <h3 className="mb-30">베스트 상품</h3>
                        </Col>
                    </Row>
                    <Row className="mb-30">
                        {rows.map((data, i) => {
                                return (
                                            <Col className="col-12 col-sm-6 col-md-6 col-lg-3 mb-2" key={i}>
                                                <div className="product-card">
                                                    <div className="product-image">
                                                        <div className="product-thumb">
                                                            <img className="img-fluid max-height-160" src={data.image_url} alt="Product" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="clearfix"></div>
                                                        <div className="caption">
                                                            <h3 className="product-title">
                                                                <a className="wrap-text">
                                                                    {data.item_name['native']} 
                                                                </a>
                                                            </h3>
                                                            {StoreAuth.isAuthorized && <h4 className="product-price">
                                                                {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원
                                                            </h4>}
                                                        </div>
                                                        
                                                        {!StoreAuth.isAuthorized && <div className="product-buttons">                       
                                                            {data.item_link !== '' && 
                                                                <a href={data.item_link} target="_blank" className='btn btn-info bottom-click-button-copy bottom-click-button-space'>제품상세</a>
                                                            }
                                                        </div>}

                                                    </div>
                                                </div>
                                            </Col>
                                        )
                                    }
                            )
                        }
                    </Row>
                </div>
            }
        </div>
        
    )
});

export default BestProducts