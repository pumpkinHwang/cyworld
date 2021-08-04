import { reaction } from 'mobx';
import { devTools, store, storeManager, shopStore } from './MainStore';
import Scroll from 'react-scroll';

var scroll = Scroll.animateScroll;



reaction(() => shopStore.quickNavNext,
    isChanged => {
        let elem = document.getElementById('ref-' + shopStore.quickNavNext);
        if (elem) {
            const scrollTo = /a-to-z/.test(window.location.pathname) ? 50 : 140
            let amount = elem.offsetTop + scrollTo - 40
            scroll.scrollTo(amount);
            shopStore.quickNavNextAfter = shopStore.quickNavNext
        }
    }
)


