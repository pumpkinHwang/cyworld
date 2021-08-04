import React, { Component } from 'react';

class Progress extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    // Example:
    // <Progress
    //     sections={
    //         [{name: "Cart", status: true},{name: "Summary", status: true},{name: "Complete", status: false}]
    //     }
    // />

    render() {
        var sections = this.props.sections.map((b, i) => {
            if (i === this.props.sections.length - 1) {
                if (b.status) {
                    let borderColor = ""
                    if (this.props.sections.length - 1 !== i) {
                        if (this.props.sections[i + 1].status) {
                            borderColor = "fix-triangle"
                        }
                    }
                    return (
                        <div key={i} className="new-progress-steps new-progress-steps-active">
                            <div className="new-progress-text-cell">
                                <div className="new-progress-text">
                                    {b.name}
                                </div>
                            </div>
                            <div className={"new-progress-triangle new-progress-triangle-active last-complete-triangle" + borderColor}>
                                {this.props.sections.length - 1 !== i &&
                                    this.props.sections[i + 1].status &&
                                    <div className="new-progress-inner-triangle">

                                    </div>
                                }
                                {this.props.sections.length - 1 !== i &&
                                    this.props.sections[i + 1].status &&
                                    <div className="new-progress-inner-second-triangle">

                                    </div>
                                }
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div key={i} className="new-progress-steps">
                            <div className="new-progress-text-cell">
                                <div className="new-progress-text-black">
                                    {b.name}
                                </div>
                            </div>
                        </div>
                    )
                }
            }
            if (b.status) {
                let borderColor = ""
                if (this.props.sections.length - 1 !== i) {
                    if (this.props.sections[i + 1].status) {
                        borderColor = "fix-triangle"
                    }
                }
                return (
                    <div key={i} className="new-progress-steps new-progress-steps-active">
                        <div className="new-progress-text-cell">
                            <div className="new-progress-text">
                                {b.name}
                            </div>
                        </div>
                        <div className={"new-progress-triangle new-progress-triangle-active " + borderColor}>
                            {this.props.sections.length - 1 !== i &&
                                this.props.sections[i + 1].status &&
                                <div className="new-progress-inner-triangle">

                                </div>
                            }
                            {this.props.sections.length - 1 !== i &&
                                this.props.sections[i + 1].status &&
                                <div className="new-progress-inner-second-triangle">

                                </div>
                            }
                        </div>
                    </div>
                )
            }
            if (i === 0) {
                let borderColor = ""
                if (this.props.sections[i + 1].status) {
                    borderColor = "fix-triangle"
                }
                return (
                    <div key={i} className="new-progress-steps new-progress-steps-active">
                        <div className="new-progress-text-cell">
                            <div className="new-progress-text">
                                {b.name}
                            </div>
                        </div>
                        <div className={"new-progress-triangle new-progress-triangle-active " + borderColor}>

                        </div>
                    </div>
                )
            } else {
                return (
                    <div key={i} className="new-progress-steps">
                        <div className="new-progress-text-cell">
                            <div className="new-progress-text-black">
                                {b.name}
                            </div>
                        </div>
                        <div className="new-progress-triangle">
                            <div className="new-progress-inner-triangle">

                            </div>
                        </div>
                    </div>
                )
            }
        });
        return (
            <div className="new-progress-container">
                {sections}
            </div>
        )
    }
}

export default Progress;
