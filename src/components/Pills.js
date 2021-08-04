import React, { Component } from 'react'
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

const Pills = observer(
    class Pills extends Component {
        constructor(props) {
            super(props)
            this.state = {
                show: '',
                nameSelected: this.props.selected,
                showList: ''
            }
        }

        componentDidMount() {
            document.addEventListener('mousedown', (e) => this.handleMouseEvents(e));
        }

        componentWillUnmount() {
            document.removeEventListener('mousedown', (e) => this.handleMouseEvents(e));
        }

        componentDidUpdate(prevProps, prevState) {
            if (this.state.show === 'show') {
                const elm = document.getElementById('dropdown-items')
                if (elm) {
                    const targetToScroll = document.getElementById(`rank-${this.props.selected}`)
                    if (targetToScroll) {
                        elm.scrollTo(0, targetToScroll.offsetTop)
                    }
                }
            }
        }

        findPosition(obj) {
            var curtop = 0;
            if (obj.offsetParent) {
                do {
                    curtop += obj.offsetTop;
                } while (obj = obj.offsetParent);

                return [curtop];
            }
        }

        handleMouseEvents(event) {

            if (this.state.show === '' && event.target.dataset !== undefined) {
                if (event.target.dataset.box === 'dropdown-box') {
                    if (event.target.dataset.name === this.props.name) {
                        this.setState({
                            show: 'show',
                            showList: 'show'
                        })
                    }
                } else {

                    this.setState({
                        show: '',
                        showList: ''
                    })
                }
            } else {
                this.onSelectedItem(event)
            }

        }


        onSelectedItem(event) {
            this.setState({
                show: 'show',
                showList: 'show'
            })
            //console.log(event.target.dataset)

            if (this.props.disableValue) {
                if (this.props.disableValue == event.target.dataset.value) {
                    this.setState({
                        show: '',
                        showList: ''
                    })
                    return
                }
            }
            if (event.target.dataset.box === 'dropdown-menu') {
                this.setState({
                    show: 'show',
                    showList: 'show'
                })

            } else if (event.target.dataset.box === 'dropdown-box') {
                this.setState({
                    show: '',
                    showList: ''
                })

            } else {
                this.setState({
                    show: '',
                    showList: ''
                })
            }

            if (event.target.dataset.code !== undefined) {
                this.props.setBankCode(event.target.dataset.code)
            }

            if (event.target.dataset.bankcode !== undefined) {
                this.props.setBankNameCode(event.target.dataset.bankcode)
            }

            if (event !== undefined && event.target.dataset !== undefined) {

                if (event.target.dataset.value !== undefined) {
                    let dataset = event.target.dataset
                    this.props.onSelected({
                        name: dataset.name,
                        value: dataset.value
                    })
                    this.setState({
                        nameSelected: dataset.value
                    })

                }

            }

            // this.setState({
            //     show: '',
            //     showList: ''
            // })

        }


        render() {
            if (this.props.type === 'button') {

                let dropdownStyle = { position: 'absolute', transform: "translate3d(0px, 39px, 0px)", top: '0px', right: '0px', left: '0px', width: 250, willChange: 'transform' }

                if (this.props.dropdownStyle && Object.keys(this.props.dropdownStyle).length > 0) {
                    Object.keys(this.props.dropdownStyle).map((v, k) => {
                        dropdownStyle[v] = this.props.dropdownStyle[v]
                    })
                }

                return (
                    <div className={`btn-group pills${this.props.noMargin ? ' m-0' : ''}`}
                        data-box="dropdown-box"
                        data-name={this.props.name}
                        style={this.props.groupStyles}
                        id={this.props.name}
                    >
                        <button className={`btn btn-outline-primary dropdown-toggle${this.props.noMargin ? ' m-0' : ''} btn-pills`}
                            type="button"
                            style={this.props.styles ? this.props.styles : {}}
                            data-box="dropdown-box"
                            data-name={this.props.name}
                            data-toggle={this.state.show ? 'dropdown-toggle' : ''} aria-expanded={this.state.show ? "true" : "false"}
                            disabled={this.props.disabled}>
                            {this.props.items.map((v, k) => {
                                if ((v.value === this.props.selected)) {
                                    return (<span key={k} data-name={this.props.name} data-box="dropdown-box">{v.name}</span>)
                                }
                            })}
                        </button>
                        <div className={`dropdown-menu ` + this.state.show + ` disabled-` + this.props.disabled}
                            x-placement="bottom-start"
                            data-box="dropdown-menu"
                            data-name={this.props.name}
                            style={dropdownStyle}
                            id="dropdown-items">
                            {this.props.items.map((v, k) => {
                                let disabled = (v.value == this.props.disableValue) ? " disabled" : ""
                                return (<a key={k} onClick={(e) => this.onSelectedItem(e)} data-box="dropdown-box"
                                    className={`dropdown-item${disabled} ${v.value === this.props.selected ? 'text-bold link-color' : ''}`} id={`rank-${v.value}`}  data-itemname={v.name} data-name={this.props.name} data-value={v.value} >{v.name}</a>)
                            })}
                        </div>
                    </div>)
            } else if (this.props.type === 'buttonWarranty') {
                return (<div className="btn-group pills " data-box="dropdown-box" data-name={this.props.name} style={{ width: '100%' }}>
                    <button className="btn btn-outline-primary dropdown-toggle" type="button"
                        style={this.props.styles ? this.props.styles : {}}
                        data-box="dropdown-box"
                        data-name={this.props.name}
                        data-toggle={this.state.show ? 'dropdown-toggle' : ''} aria-expanded={this.state.show ? "true" : "false"}
                        disabled={this.props.disabled}>
                        {this.props.items.map((v, k) => {
                            if ((v[Object.keys(v)[0]] === this.props.selected)) {
                                return (<span key={k} data-name={this.props.name} data-box="dropdown-box">{v[Object.keys(v)[1]]}</span>)
                            }
                        })}

                    </button>
                    <div className={`dropdown-menu ` + this.state.show + ` disabled-` + this.props.disabled}
                        x-placement="bottom-start"
                        data-box="dropdown-menu"
                        data-name={this.props.name}
                        style={{ position: 'absolute', transform: "translate3d(0px, 39px, 0px)", top: '0px', right: '0px', left: '0px', willChange: 'transform', ...this.props.dropdownStyle }}>
                        {this.props.items.map((v, k) => {
                            let disabled = (v.value == this.props.disableValue) ? " disabled" : ""
                            return (<a key={k} onClick={(e) => this.onSelectedItem(e)} data-box="dropdown-box"
                                className={"dropdown-item" + disabled} data-itemname={v.name} data-name={this.props.name} data-value={v[Object.keys(v)[0]]} >{v[Object.keys(v)[1]]
                                }</a>)
                        })}
                    </div>
                </div>)
            } else if (this.props.type === 'buttonBank') {
                return (<div className="btn-group pills " data-box="dropdown-box" data-name={this.props.name} style={{ width: '100%' }}>
                    <button className="btn btn-outline-primary dropdown-toggle" type="button"
                        style={this.props.styles ? this.props.styles : {}}
                        data-box="dropdown-box"
                        data-name={this.props.name}
                        data-toggle={this.state.show ? 'dropdown-toggle' : ''} aria-expanded={this.state.show ? "true" : "false"}
                        disabled={this.props.disabled}>
                        {this.props.items.map((v, k) => {
                            if ((v.value === this.props.selected)) {
                                return (<span key={k} data-name={this.props.name} data-box="dropdown-box">{v.name}</span>)
                            }
                        })}

                    </button>
                    <div className={`dropdown-menu ` + this.state.show + ` disabled-` + this.props.disabled}
                        x-placement="bottom-start"
                        data-box="dropdown-menu"
                        data-name={this.props.name}
                        style={{ position: 'absolute', transform: "translate3d(0px, 39px, 0px)", top: '0px', right: '0px', left: '0px', willChange: 'transform', ...this.props.dropdownStyle }}>
                        {this.props.items.map((v, k) => {
                            let disabled = (v.value == this.props.disableValue) ? " disabled" : ""
                            return (<a key={k} onClick={(e) => this.onSelectedItem(e)} data-box="dropdown-box"
                                className={"dropdown-item" + disabled} data-itemname={v.name} data-name={this.props.name} data-value={v.value} data-code={v.code} data-bankcode={v.bankcode} >{v.name}</a>)
                        })}
                    </div>
                </div>)
            } else {
                return (<ul className="nav nav-pills">
                    <li className={this.state.show + ` nav-item dropdown`}>
                        <a className="nav-link dropdown-toggle" name={this.props.name}
                            onMouseEnter={(e) => this.handleMouseEnterAndOut(e)}
                            onMouseOut={(e) => this.handleMouseEnterAndOut(e)}>
                            {this.props.items.map((v, k) => {
                                if (v.value === parseInt(this.props.selected) && this.state.nameSelected === '') {
                                    return v.name
                                }
                            })}
                            {this.state.nameSelected !== '' && this.state.nameSelected}
                        </a>
                        <div className={this.state.show + ` dropdown-menu`}
                            x-placement="bottom-start"
                            style={{ position: 'absolute', transform: "translate3d(0px, 39px, 0px)", top: '0px', left: '0px', willChange: 'transform', ...this.props.dropdownStyle }}>
                            {this.props.items.map((v, k) => {
                                return (<a key={k} className="dropdown-item" data-itemname={v.name} data-name={this.props.name} data-value={v.value} >{v.name}</a>)
                            })}
                        </div>
                    </li>
                </ul>)
            }
        }
    }
)

Pills.propTypes = {
    items: PropTypes.array.isRequired,
    name: PropTypes.string,
    type: PropTypes.string,
    selected: PropTypes.string,
    styles: PropTypes.object,
    noMargin: PropTypes.bool,
    groupStyles: PropTypes.object,
    onSelected: PropTypes.func.isRequired
}

Pills.defaultProps = {
    styles: {},
    noMargin: false,
    groupStyles: { width: '100%' },
    onSelected: () => { }
}

export default Pills