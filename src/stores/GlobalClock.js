import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { reaction } from 'mobx';
import moment from 'moment';
import AtomClock from './AtomClock';
import { clockManager, store, staticFooter } from './MainStore';
import { isSomething } from '../components/utils/Utils';



const atomClock = new AtomClock()

/**
 * @param {object} props
 * @param {string} props.dateFormat
 * @param {string} props.timeFormat
 * @param {string} props.timezone
 */
const GlobalClock = (props) => {

    const [now, setNow] = useState(() => clockManager ? moment(clockManager.now) : moment(moment.now()))
    const [format, setFormat] = useState(() => ``)

    const customizeFormat = (input) => {
        let output = input
        return output
    }

    const updateTime = () => {

        if (store.runningSnapShot === true) {
            setNow(moment(clockManager.now))
        }

        const timezone = props.timezone
        if (isSomething(timezone)) {
            // setNow(moment(clockManager.now).tz(timezone))
            setNow(moment(clockManager.now))
        } else {
            setNow(moment(clockManager.now))
        }
    }

    useEffect(() => {
        setFormat(`${props.timeFormat}`)
        
    }, [props.dateFormat, props.timeFormat])

    useEffect(() => {
        const disposerClock = reaction(
            () => atomClock.getTime(),
            (time) => {
                clockManager.now = moment(time)
                // isOperationHoursMessenger()
                updateTime()
            }
        )

        atomClock.startTicking()
        updateTime()

        return () => {
            disposerClock()
            atomClock.stopTicking()
        }

    }, [])

    return   <div>{customizeFormat(moment(now).format(format))}</div>
}

export default observer(GlobalClock)