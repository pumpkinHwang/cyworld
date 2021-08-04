import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { getParameterByName } from "./GlobalHelpers";

@observer class Information extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    componentWillMount(){
        window.scrollTo(0,0)
        let langParam = window.location.pathname 
        langParam = langParam.split('/')
        if(langParam[3] !== undefined) {
            this.props.setInitialLanguage(langParam[3].toUpperCase())
        }
    }

    render() {

        return (
        
        <div>
            <div className="page-title">
                <div className="container text-center">
                    <h1>{this.props.store.language.information_header}</h1>
                </div>
            </div>
            <div className="container">
            <div className="row justify-content-center">
            <div className="col-12 col-md-8">
                <div className="information">
                <h3>{this.props.store.language.information_msg1}</h3>
                <p>{this.props.store.language.information_msg2}</p>
                <ol>
                    <li>{this.props.store.language.information_msg3} <a href="http://bit.ly/2N0ECr3" download>{this.props.store.language.information_download}</a></li>
                    <li>{this.props.store.language.information_msg4} <a href="http://bit.ly/2zv3940" download>{this.props.store.language.information_download}</a></li>
                    <li>{this.props.store.language.information_msg5}</li>
                    <li>{this.props.store.language.information_msg6}</li>
                    <li>{this.props.store.language.information_msg7}
                    </li>
                </ol>
                        
                <p>{this.props.store.language.information_msg8}:</p>
                <ul className="mb-5">
                    <li>{this.props.store.language.information_msg9}</li>
                    <li>{this.props.store.language.information_msg10}</li>
                    {this.props.store.language.language === 'EN' && <li>{this.props.store.language.information_msg11}</li>}
                </ul>
     
                </div>
            </div>
            </div>
            </div>
        </div>
        );
    }
}

export default Information;
