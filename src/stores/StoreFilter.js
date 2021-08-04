import { getCountry } from '@Components/GlobalHelpers'
import Raven from '@Raven'
import { makeAutoObservable, observable, reaction } from 'mobx'
import StoreAuth from './User/StoreAuth'

class StoreFilter {
    showAll = true
    sortByOv = false
    showActiveLeg = false
    showCpv = true
    showApv = true
    showFsb = true

    view = 'dashboard'
    initialFilter = false
    isChanged = false
    filterItem = 'items'
    resetItem = false
    cache = false
    age = 1
    firstInit = false
    colSpan = 3

    init(filterFromStore) {
        this.showAll = filterFromStore.showAll
        this.sortByOv = filterFromStore.sortByOv
        this.view = filterFromStore.view
        this.showActiveLeg = filterFromStore.showActiveLeg
    }

    save() {
        this.selectItemsToRender()

        const defaultFilters = {
            showAll: this.getShowAll,
            sortByOv: this.getSortByOv,
            view: this.getView,
            showActiveLeg: this.getShowActiveLeg,
            showFsb: this.showFsb
        }
        if (getCountry() === 'japan') {
            defaultFilters.showCpv = this.getShowCpv
            defaultFilters.showApv = this.getShowApv
        }

        return this.saveFilter(defaultFilters)
    }

    get getShowAll() {
        return this.showAll
    }

    setShowAll(value, setChange = true) {
        if (this.showAll !== value) {
            this.setIsChanged(true)
        }
        this.showAll = value
        if (setChange) {
            this.save()
        }
    }

    get getView() {
        return this.view
    }
    setView(value, setChange = true) {
        this.view = value
        if (setChange) {
            this.save()
        }
    }

    get getSortByOv() {
        return this.sortByOv
    }

    setSortByOv(value, setChange = true) {
        if (this.sortByOv !== value) {
            this.setIsChanged(true)
        }
        this.sortByOv = value
        if (setChange) {
            this.save()
        }
    }

    get getShowActiveLeg() {
        return this.showActiveLeg
    }

    setShowActiveLeg(value, setChange = true) {
        if (this.showActiveLeg !== value) {
            this.setIsChanged(true)
        }
        this.showActiveLeg = value
        if (setChange) {
            this.save()
        }
    }

    get getShowFsb() {
        return this.showFsb
    }

    setShowFsb(value, setChange = true) {
        if (this.showFsb !== value) {
            this.setIsChanged(true)
        }
        this.showFsb = value
        if (setChange) {
            this.save()
        }
    }

    get getIsChanged() {
        return this.isChanged
    }

    setIsChanged(value) {
        this.firstInit === false
            ? (this.isChanged = value)
            : (this.firstInit = true)
    }

    get getResetItem() {
        return this.resetItem
    }

    setResetItem(value) {
        return (this.resetItem = value)
    }

    get getCache() {
        return this.cache
    }

    setCache(value) {
        return (this.cache = value)
    }

    get getAge() {
        return this.age
    }

    setAge(value) {
        this.age = value
    }

    get getInitialFilter() {
        return this.initialFilter
    }

    setInitialFilter(value) {
        this.initialFilter = value
    }

    get getFilterItems() {
        return this.filterItem
    }

    setFilterItem(value) {
        this.filterItem = value
    }

    get getShowCpv() {
        return this.showCpv
    }

    setShowCpv(value, setChange = true) {
        if (this.showCpv !== value) {
            this.setIsChanged(true)
        }
        this.showCpv = value
        if (setChange) {
            this.save()
        }
    }

    get getShowApv() {
        return this.showApv
    }

    setShowApv(value, setChange = true) {
        if (this.showApv !== value) {
            this.setIsChanged(true)
        }
        this.showApv = value
        if (setChange) {
            this.save()
        }
    }

    setValues(values) {
        Object.keys(values).map(v => {
            this[v] = values[v]
        })
    }

    selectItemsToRender() {
        if (this.getShowAll === true && this.getSortByOv === false) {
            this.setFilterItem('items')
        } else if (this.getShowAll === false && this.getSortByOv === false) {
            this.setFilterItem('itemsHideZero')
        } else if (this.getShowAll === true && this.getSortByOv === true) {
            this.setFilterItem('itemsSortOV')
        } else if (this.getShowAll === false && this.getSortByOv === true) {
            this.setFilterItem('itemsSortOVWithHideZero')
        }
    }


    ColSpan(isMobile) {
        let defaultColSpan = this.colSpan

        let tempColSpan = 0
        if (this.showActiveLeg === true) {
            tempColSpan += 1
        }

        return defaultColSpan + tempColSpan
    }

    constructor() {
        makeAutoObservable(this, {
            isChanged: observable
        })
    }
}

export const storeFilter = new StoreFilter()

// const privateStore = new PrivateStore()
