import React, { Component } from 'react'
import { observer } from 'mobx-react';
import { shopStore } from '@Stores/MainStore';

export default @observer class NotFound extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            message: '',
            message2: ''
        }
    }

    back() {
        if (this.state.status === 'completed') {
            this.props.history.push(`/`)
        } else {
            this.props.history.push(`/`)
        }
    }

    render() {
        let alert = 'text-danger'
        return (<div className="offcanvas-wrapper padding-bottom-3x">

            <div className="container">
                <div className="card text-center">
                    <div className="card-body padding-top-2x alert alert-danger">
                        <h5>{this.state.message} {this.state.message2}</h5>
                        <div className="padding-top-1x padding-bottom-1x">
                            <p onClick={() => this.props.history.push(`/`)}>Back</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }


}