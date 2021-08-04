import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from '@Components/dashboard/Dashboard'
import { isCustomerLogin } from '@Components/utils/Customer'

const AclUnionImport = props => {

    return <>
        <Switch>
            {isCustomerLogin() && <Route exact path={`/dashboard`} component={Dashboard} />}
            
        </Switch>
    </>
}

export default AclUnionImport