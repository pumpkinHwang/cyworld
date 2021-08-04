import first from 'lodash/first';
import pull from 'lodash/pull';

export const getPathnameCountry = () => first(pull(window.location.pathname.split('/'), ''))