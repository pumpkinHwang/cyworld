import { Fragment } from 'react';
import { Route, Redirect as DomRedirect } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { store, shopStore, enrollStore } from '@Stores/MainStore';
import history from '@History';
// Shopping/Home
import HealthCheck from '../../singlepage/HealthCheck';
import HealthCheckResult from '../../singlepage/HealthCheckResult';
import HealthCheckCancel from '../../singlepage/HealthCheckCancel';
import BiosLifeForm from '../../singlepage/BiosLifeForm';
import BiosLifeInfo from '../../singlepage/BiosLifeInfo';
// Pages
import Download from "../../Download"
import Information from "../../Information"
import BiosLifeAir from '../../singlepage/BiosLifeAir';
import ResultPage from '../../singlepage/ResultPage';

import './style.css';

import Spinner from '@Spinner';

const AclPublic = observer(props => {

    return (

        <Fragment>

            {/* START SPECIAL PAGE */}
            <Route exact path={'/bioslifeair'} component={BiosLifeAir} />

            <Route exact path={"/bioslifeair/warranty/registration"} render={(props) => {

                return (
                    <BiosLifeForm
                        history={history}
                        store={store}
                        currentPage={props.currentPage}
                        changeCurrentPage={(page, menuForce) => props.changeCurrentPage(page, menuForce)}
                    />
                )
            }} />
            <Route exact path={"/bioslifeair/warranty/product-information"} render={(props) => {

                return (
                    <BiosLifeInfo
                        history={history}
                        store={store}
                        currentPage={props.currentPage}
                        changeCurrentPage={(page, menuForce) => props.changeCurrentPage(page, menuForce)}
                    />
                )
            }} />
            <Route exact path={'/warranty-success'} render={(props) => {

                return (
                    <ResultPage
                        history={history}
                        store={store}
                        quickNavNext={shopStore.quickNavNext}
                        currentPage={props.currentPage}
                        changeCurrentPage={(page, menuForce) => props.changeCurrentPage(page, menuForce)}

                    />
                )
            }} />
            {/* END OF SPECIAL PAGE */}

            <Route exact path={"/digital-member-card"} render={(props) => {
                return (
                    <DomRedirect to={'/'} push />
                )
            }
            } />

            <Route exact path={"/singlepage/ResultPage"} render={(props) => {
                return (
                    <ResultPage
                        history={history}
                        store={store}
                        quickNavNext={shopStore.quickNavNext}
                        currentPage={props.currentPage}
                        changeCurrentPage={(page, menuForce) => props.changeCurrentPage(page, menuForce)}
                    />
                )
            }} />

            <Route exact path={"/download"} render={(props) => {
                return (
                    <Download
                        history={history}
                        store={store}
                        currentPage={props.currentPage}
                        changeCurrentPage={(page, menuForce) => props.changeCurrentPage(page, menuForce)}
                    />
                )
            }} />
            <Route exact path={"/information"} render={(props) => {
                return (
                    <Information
                        history={history}
                        store={store}
                        currentPage={props.currentPage}
                        changeCurrentPage={(page, menuForce) => props.changeCurrentPage(page, menuForce)}
                        setInitialLanguage={(lang) => props.setInitialLanguage(lang)}
                    />
                )
            }} />
            <Route exact path={"/information/:lang"} render={(props) => {

                return (
                    <Information
                        history={history}
                        store={store}
                        currentPage={props.currentPage}
                        changeCurrentPage={(page, menuForce) => props.changeCurrentPage(page, menuForce)}
                        setInitialLanguage={(lang) => props.setInitialLanguage(lang)}
                    />
                )
            }} />
            <Route exact path={"/healthcheck"} render={(props) => {


                return (
                    <HealthCheck
                        history={history}
                        store={store}
                        quickNavNext={shopStore.quickNavNext}
                        currentPage={props.currentPage}
                        changeCurrentPage={(page, menuForce) => props.changeCurrentPage(page, menuForce)}
                    />
                )

            }} />
            <Route exact path={'/healthcheck-success'} render={(props) => {

                return (
                    <HealthCheckResult
                        history={history}
                        store={store}
                        quickNavNext={shopStore.quickNavNext}
                        currentPage={props.currentPage}
                        changeCurrentPage={(page, menuForce) => props.changeCurrentPage(page, menuForce)}

                    />
                )
            }} />
            <Route exact path={'/healthcheck-cancel'} render={(props) => {

                return (
                    <HealthCheckCancel
                        history={history}
                        store={store}
                        quickNavNext={shopStore.quickNavNext}
                        currentPage={props.currentPage}
                        changeCurrentPage={(page, menuForce) => props.changeCurrentPage(page, menuForce)}
                    />
                )
            }} />

           
        </Fragment>
    )
})

export default AclPublic