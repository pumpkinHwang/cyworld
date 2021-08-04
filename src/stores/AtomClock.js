import { createAtom } from 'mobx'
import moment from 'moment'

export default class AtomClock {
    atom
    intervalHandler = null
    currentDateTime

    constructor() {
        // creates an atom to interact with the MobX core algorithm
        this.atom = createAtom(
            // first param: a name for this atom, for debugging purposes
            "AtomClock",
            // second (optional) parameter: callback for when this atom transitions from unobserved to observed.
            () => this.startTicking(),
            // third (optional) parameter: callback for when this atom transitions from observed to unobserved
            // note that the same atom transitions multiple times between these two states
            () => this.stopTicking()
        )
    }

    getTime() {
        // let MobX know this observable data source has been used
        // reportObserved will return true if the atom is currently being observed
        // by some reaction.
        // reportObserved will also trigger the onBecomeObserved event handler (startTicking) if needed
        if (this.atom.reportObserved()) {
            return this.currentDateTime
        } else {
            // apparently getTime was called but not while a reaction is running.
            // So, nobody depends on this value, hence the onBecomeObserved handler (startTicking) won't be fired
            // Depending on the nature of your atom
            // it might behave differently in such circumstances
            // (like throwing an error, returning a default value etc)
            return moment(moment.now())
        }
    }

    tick() {
        this.currentDateTime = moment(moment.now())
        // let MobX know that this data source has changed
        this.atom.reportChanged()
    }

    startTicking() {
        this.tick() // initial tick
        this.intervalHandler = setInterval(
            () => this.tick(),
            1000
        )
    }

    stopTicking() {
        clearInterval(this.intervalHandler)
        this.intervalHandler = null
    }
}