import { Fragment, Component } from 'react'
import { Route, Redirect as DomRedirect } from 'react-router-dom'
import { observer } from 'mobx-react'
import history from '../../History'
import { enrollStore, shopStore, store } from '@Stores/MainStore'
// Pages
import News from '../../news/News'
import Media from '../../media/Media'
// import Genealogy from '../../genealogy/Genealogy';

import Commission from '../../commission/V2/CommissionPage'
import Seminar from '../../seminar/V2/Seminar'
import Report from '../../report/Report'

import DigitalMemberCard from '../../profile/V2/DigitalMemberCard'

import Download from '../../Download'
import Information from '../../Information'
import BiosLifeAir from '../../singlepage/BiosLifeAir'
import BiosLifeForm from '../../singlepage/BiosLifeForm'
import BiosLifeInfo from '../../singlepage/BiosLifeInfo'
import HealthCheck from '../../singlepage/HealthCheck'
import ResultPage from '../../singlepage/ResultPage'
import HealthCheckResult from '../../singlepage/HealthCheckResult'
import HealthCheckCancel from '../../singlepage/HealthCheckCancel'
import MarketingArtworks from '../../pages/Korea/Downloads/Downloads'

import OrderHistory from '../../OrderHistory/OrderHistory'
import Genealogy from '../../genealogy/Genealogy'
import ChangePassword from '../../ChangePassword/ChangePassword'
import Seminars from '@Components/SeminarsV2/Seminars'
import BMI from '@Components/BMI/BMI'
import Spinner from '@Spinner'

const AclFull = observer(
    class AclFull extends Component {
        constructor(props) {
            super(props)
        }

        render() {
            return (
                <Fragment>
                    {/* Routes for everyone */}
                    <Route exact path="/seminars" component={Seminars} />
                    {/* Routes for authorized users */}
                    <Route
                        exact
                        path="/orderhistory"
                        component={OrderHistory}
                    />
                    <Route
                        exact
                        path="/orderhistory/:id"
                        component={OrderHistory}
                    />

                    {/* START SPECIAL PAGE */}
                    <Route
                        exact
                        path={'/bioslifeair'}
                        component={BiosLifeAir}
                    />

                    <Route
                        exact
                        path={'/digital-member-card'}
                        component={DigitalMemberCard}
                    />

                    <Route
                        exact
                        path={'/warranty-success'}
                        render={props => {
                            store.match = props
                            return (
                                <ResultPage
                                    history={history}
                                    store={store}
                                    quickNavNext={
                                        this.props.shopStore.quickNavNext
                                    }
                                    changeCurrentPage={(page, menuForce) =>
                                        this.props.changeCurrentPage(
                                            page,
                                            menuForce
                                        )
                                    }
                                />
                            )
                        }}
                    />
                    <Route
                        exact
                        path={'/healthcheck-success'}
                        render={props => {
                            store.match = props
                            return (
                                <HealthCheckResult
                                    history={history}
                                    store={store}
                                    quickNavNext={
                                        this.props.shopStore.quickNavNext
                                    }
                                    changeCurrentPage={(page, menuForce) =>
                                        this.props.changeCurrentPage(
                                            page,
                                            menuForce
                                        )
                                    }
                                />
                            )
                        }}
                    />
                    <Route
                        exact
                        path={'/healthcheck-cancel'}
                        render={props => {
                            store.match = props
                            return (
                                <HealthCheckCancel
                                    history={history}
                                    store={store}
                                    quickNavNext={
                                        this.props.shopStore.quickNavNext
                                    }
                                    changeCurrentPage={(page, menuForce) =>
                                        this.props.changeCurrentPage(
                                            page,
                                            menuForce
                                        )
                                    }
                                />
                            )
                        }}
                    />

                    <Route
                        exact
                        path={'/marketing_artworks'}
                        component={MarketingArtworks}
                    />

                    <Route
                        exact
                        path={'/download'}
                        render={props => {
                            store.match = props
                            return (
                                <Download
                                    history={history}
                                    store={store}
                                    changeCurrentPage={(page, menuForce) =>
                                        this.props.changeCurrentPage(
                                            page,
                                            menuForce
                                        )
                                    }
                                />
                            )
                        }}
                    />

                    <Route
                        exact
                        path={'/bioslifeair/warranty/registration'}
                        render={props => {
                            store.match = props
                            return (
                                <BiosLifeForm
                                    history={history}
                                    store={store}
                                    changeCurrentPage={(page, menuForce) =>
                                        this.props.changeCurrentPage(
                                            page,
                                            menuForce
                                        )
                                    }
                                />
                            )
                        }}
                    />
                    <Route
                        exact
                        path={'/bioslifeair/warranty/product-information'}
                        render={props => {
                            store.match = props
                            return (
                                <BiosLifeInfo
                                    history={history}
                                    store={store}
                                    changeCurrentPage={(page, menuForce) =>
                                        this.props.changeCurrentPage(
                                            page,
                                            menuForce
                                        )
                                    }
                                />
                            )
                        }}
                    />
                    <Route
                        exact
                        path={'/HealthCheck'}
                        render={props => {
                            store.match = props
                            return (
                                <HealthCheck
                                    history={history}
                                    store={store}
                                    changeCurrentPage={(page, menuForce) =>
                                        this.props.changeCurrentPage(
                                            page,
                                            menuForce
                                        )
                                    }
                                />
                            )
                        }}
                    />
                    <Route
                        exact
                        path={'/information'}
                        render={props => {
                            store.match = props
                            return (
                                <Information
                                    history={history}
                                    store={store}
                                    changeCurrentPage={(page, menuForce) =>
                                        this.props.changeCurrentPage(
                                            page,
                                            menuForce
                                        )
                                    }
                                    setInitialLanguage={lang =>
                                        this.props.setInitialLanguage(lang)
                                    }
                                />
                            )
                        }}
                    />
                    <Route
                        exact
                        path={'/information/:lang'}
                        render={props => {
                            store.match = props
                            return (
                                <Information
                                    history={history}
                                    store={store}
                                    changeCurrentPage={(page, menuForce) =>
                                        this.props.changeCurrentPage(
                                            page,
                                            menuForce
                                        )
                                    }
                                    setInitialLanguage={lang =>
                                        this.props.setInitialLanguage(lang)
                                    }
                                />
                            )
                        }}
                    />

                    <Route
                        exact
                        path={'/news'}
                        render={props => {
                            store.match = props
                            return (
                                <News
                                    store={store}
                                    history={history}
                                    seminarData={this.props.seminarData}
                                    changeCurrentPage={(page, menuForce) =>
                                        this.props.changeCurrentPage(
                                            page,
                                            menuForce
                                        )
                                    }
                                />
                            )
                        }}
                    />

                    <Route
                        exact
                        path={'/media'}
                        render={props => {
                            store.match = props
                            return (
                                <Media
                                    store={store}
                                    history={history}
                                    seminarData={this.props.seminarData}
                                    changeCurrentPage={(page, menuForce) =>
                                        this.props.changeCurrentPage(
                                            page,
                                            menuForce
                                        )
                                    }
                                />
                            )
                        }}
                    />

                    <Route
                        exact
                        path={`/genealogy/:view`}
                        component={Genealogy}
                    />
                    <Route
                        exact
                        path={`/genealogy/:view/:id`}
                        component={Genealogy}
                    />
                    <Route
                        exact
                        path={`/genealogy/:view/:id/:period/:leg`}
                        component={Genealogy}
                    />

                    <Route
                        exact
                        path={'/commission'}
                        render={props => {
                            store.match = props
                            return <Commission />
                        }}
                    />
                    <Route
                        exact
                        path={'/seminar'}
                        render={props => {
                            store.match = props
                            return (
                                <Seminar
                                    store={store}
                                    history={history}
                                    seminarData={this.props.seminarData}
                                    changeCurrentPage={(page, menuForce) =>
                                        this.props.changeCurrentPage(
                                            page,
                                            menuForce
                                        )
                                    }
                                />
                            )
                        }}
                    />
                    <Route
                        exact
                        path={'/reports'}
                        render={props => {
                            store.match = props
                            return (
                                <Report
                                    store={store}
                                    setInitialLanguage={lang =>
                                        this.props.setInitialLanguage(lang)
                                    }
                                    history={history}
                                    changeCurrentPage={(page, menuForce) =>
                                        this.props.changeCurrentPage(
                                            page,
                                            menuForce
                                        )
                                    }
                                />
                            )
                        }}
                    />

                    <Route
                        exact
                        path={'/change-password'}
                        component={ChangePassword}
                    />

                    <Route exact path="/bmi" component={BMI} />
                </Fragment>
            )
        }
    }
)

export default AclFull
