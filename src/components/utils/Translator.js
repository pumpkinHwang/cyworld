
import debounce from 'lodash/debounce';


const update = (languageCode) => {

}

/** @param {string} languageCode specified language code. */
export const updateTranslation = debounce(update, 500, { leading: true })
