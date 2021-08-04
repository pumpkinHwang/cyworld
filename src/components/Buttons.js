import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { isMobile } from './GlobalHelpers';

export default class Buttons extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount(){
        if (isMobile()) {
            ReactDOM.findDOMNode(this.domRef).scrollLeft = 30
        }
    }

    multipleSelectButton = () => {
        return (<div></div>)
    }

    singleSelectButton = () => {

        let btnSelected = ''
        let btnSelectedClass = ''
        return (<div className="scrollable text-center" style={{margin:'0 auto'}} ref={re => { this.domRef = re }}>
        {this.props.data.map((v, k) => {
            if(v.value === this.props.selected) {
                btnSelected = "btn-primary"
                btnSelectedClass = "step-indicator icon-circle-check"
            } else {
                btnSelected = "btn-outline-secondary"
                btnSelectedClass = ""
            }

            return (<button key={k} className={"btn th-shipping-dropdown " + btnSelected}  onClick={() => this.props.onButtonClicked(v)}>
            <span className={btnSelectedClass}></span> {v.name}</button>)
        }) }
        </div>)
    }

    render() {
        if(this.props.multiple === undefined) {
            return this.singleSelectButton()
        }
    }

}