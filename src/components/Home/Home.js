import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import BestProducts from './BestProducts'
import NewProducts from './NewProducts'

const Home = observer(props => {

    return (
        <>
            main content
            <NewProducts />
            <BestProducts />
            
        </>
    )
})

export default Home
