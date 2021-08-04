import { makeAutoObservable } from 'mobx'
import { lowerCase } from '@Utils/String'
import { defaults, someOf } from '@Utils/Utils'
import { throatBoolean, throatString } from './ConfigsHeader'
import findKey from 'lodash/findKey';
import get from 'lodash/get';
import * as K from './Keywords'
import StoreCountry from '@Stores/StoreCountry'

class StoreConfigCountry {
    
    /** Get current country from current location path name.
     * @example
     * // URI: https://ushop.unicity.com/korea
     * console.log(`Current country: ${Country.path}`)
     * // Current country: thailand
     * @return {string}
    */
    get path() {
        return 'korea'
    } 

    // Offline Production
    Offline = []

    /** List of all country we have. */
    Available = [
        K.Korea
    ]

    NumeralFormat = {
        [K.Korea]: {
            numeralFormat: '0,0',
            numeralDecimalFormat: '0,0'
        }
    }

    Code2 = {
        [K.Thailand]: 'TH',
        [K.Malaysia]: 'MY',
        [K.Singapore]: 'SG',
        [K.Philippines]: 'PH',
        [K.Indonesia]: 'ID',
        [K.Australia]: 'AU',
        [K.Newzealand]: 'NZ',
        [K.Japan]: 'JP',
        [K.Vietnam]: 'VN',
        [K.Hongkong]: 'HK',
        [K.Korea]: 'KR',
        [K.MENA]: 'ME',
        [K.Myanmar]: 'MM',
        [K.Cambodia]: 'KH',
        [K.Laos]: 'LA',
        [K.Taiwan]: 'TW'
    }

    Code3 = {
        [K.Thailand]: 'THA',
        [K.Malaysia]: 'MYS',
        [K.Singapore]: 'SGP',
        [K.Philippines]: 'PHL',
        [K.Indonesia]: 'IDN',
        [K.Australia]: 'AUS',
        [K.Newzealand]: 'NZL',
        [K.Japan]: 'JPN',
        [K.Vietnam]: 'VNM',
        [K.Hongkong]: 'HKG',
        [K.Korea]: 'KOR',
        [K.MENA]: 'MDE',
        [K.Myanmar]: 'MMR',
        [K.Cambodia]: 'KHM',
        [K.Laos]: 'LAO',
        [K.Taiwan]: 'TWN'
    }

    CodeX = {
        [K.Malaysia]: 'XMY',
        [K.Philippines]: 'XPH',
        [K.Indonesia]: 'XID',
        [K.Australia]: 'XAU',
        [K.Newzealand]: 'XNZ',
        [K.Japan]: 'XJP',
        [K.Hongkong]: 'XHK',
        [K.Korea]: 'XKR',
        [K.MENA]: 'XME',
    }

    Formal = {
        [K.Thailand]: 'Thailand',
        [K.Malaysia]: 'Malaysia',
        [K.Singapore]: 'Singapore',
        [K.Philippines]: 'Philippines',
        [K.Indonesia]: 'Indonesia',
        [K.Australia]: 'Australia',
        [K.Newzealand]: 'New Zealand',
        [K.Japan]: 'Japan',
        [K.Korea]: 'Korea',
        [K.Vietnam]: 'Vietnam',
        [K.Hongkong]: 'Hong Kong',
        [K.Myanmar]: 'Myanmar',
        [K.Cambodia]: 'Cambodia',
        [K.Laos]: 'Laos',
        [K.Taiwan]: 'Taiwan'
    }

    Paths = {
        [K.Thailand]: 'thailand',
        [K.Malaysia]: 'malaysia',
        [K.Singapore]: 'singapore',
        [K.Philippines]: 'philippines',
        [K.Indonesia]: 'indonesia',
        [K.Australia]: 'australia',
        [K.Newzealand]: 'newzealand',
        [K.Japan]: 'japan',
        [K.Korea]: 'korea',
        [K.Vietnam]: 'vietnam',
        [K.Hongkong]: 'hongkong',
        [K.Myanmar]: 'myanmar',
        [K.Cambodia]: 'cambodia',
        [K.Laos]: 'laos',
        [K.Taiwan]: 'taiwan'
    }

    PascalCase = {
        [K.Thailand]: 'Thailand',
        [K.Malaysia]: 'Malaysia',
        [K.Singapore]: 'Singapore',
        [K.Philippines]: 'Philippines',
        [K.Indonesia]: 'Indonesia',
        [K.Australia]: 'Australia',
        [K.Newzealand]: 'NewZealand',
        [K.Japan]: 'Japan',
        [K.Hongkong]: 'HongKong',
        [K.Korea]: 'Korea',
        [K.Vietnam]: 'Vietnam',
        [K.Myanmar]: 'Myanmar',
        [K.Cambodia]: 'Cambodia',
        [K.Laos]: 'Laos',
        [K.Taiwan]: 'Taiwan'
    }

    MarketingCode = {
        [K.Thailand]: '66',
        [K.Malaysia]: '60',
        [K.Singapore]: '65',
        [K.Philippines]: '63',
        [K.Indonesia]: '62',
        [K.Australia]: '61',
        [K.Newzealand]: '64',
        [K.Japan]: '81',
        [K.Vietnam]: '84',
        [K.Hongkong]: '85',
        [K.Korea]: '82',
        [K.Myanmar]: '95',
        [K.Cambodia]: '55',
        [K.Laos]: '56',
        [K.Taiwan]: '88'
    }

    Currency = {
        [K.Thailand]: 'THB',
        [K.Malaysia]: 'MYR',
        [K.Singapore]: 'SGD',
        [K.Philippines]: 'PHP',
        [K.Indonesia]: 'IDR',
        [K.Australia]: 'AUD',
        [K.Newzealand]: 'NZD',
        [K.Japan]: 'JPY',
        [K.Vietnam]: 'VND',
        [K.Hongkong]: 'HKD',
        [K.Korea]: 'KRW',
        [K.Myanmar]: 'MMK',
        [K.Cambodia]: 'KHR',
        [K.Laos]: 'LAK',
    }

    Capital = {
        [K.Thailand]: 'Bangkok', 
        [K.Hongkong]: '中西區' // Central & Western District // (no localization)
    }

    CodeToName = {
        'AF': 'Afghanistan',
        'AX': 'Aland Islands',
        'AL': 'Albania',
        'DZ': 'Algeria',
        'AS': 'American Samoa',
        'AD': 'Andorra',
        'AO': 'Angola',
        'AI': 'Anguilla',
        'AQ': 'Antarctica',
        'AG': 'Antigua And Barbuda',
        'AR': 'Argentina',
        'AM': 'Armenia',
        'AW': 'Aruba',
        'AU': 'Australia',
        'AT': 'Austria',
        'AZ': 'Azerbaijan',
        'BS': 'Bahamas',
        'BH': 'Bahrain',
        'BD': 'Bangladesh',
        'BB': 'Barbados',
        'BY': 'Belarus',
        'BE': 'Belgium',
        'BZ': 'Belize',
        'BJ': 'Benin',
        'BM': 'Bermuda',
        'BT': 'Bhutan',
        'BO': 'Bolivia',
        'BA': 'Bosnia And Herzegovina',
        'BW': 'Botswana',
        'BV': 'Bouvet Island',
        'BR': 'Brazil',
        'IO': 'British Indian Ocean Territory',
        'BN': 'Brunei Darussalam',
        'BG': 'Bulgaria',
        'BF': 'Burkina Faso',
        'BI': 'Burundi',
        'KH': 'Cambodia',
        'CM': 'Cameroon',
        'CA': 'Canada',
        'CV': 'Cape Verde',
        'KY': 'Cayman Islands',
        'CF': 'Central African Republic',
        'TD': 'Chad',
        'CL': 'Chile',
        'CN': 'China',
        'CX': 'Christmas Island',
        'CC': 'Cocos (Keeling) Islands',
        'CO': 'Colombia',
        'KM': 'Comoros',
        'CG': 'Congo',
        'CD': 'Congo, Democratic Republic',
        'CK': 'Cook Islands',
        'CR': 'Costa Rica',
        'CI': 'Cote D\'Ivoire',
        'HR': 'Croatia',
        'CU': 'Cuba',
        'CY': 'Cyprus',
        'CZ': 'Czech Republic',
        'DK': 'Denmark',
        'DJ': 'Djibouti',
        'DM': 'Dominica',
        'DO': 'Dominican Republic',
        'EC': 'Ecuador',
        'EG': 'Egypt',
        'SV': 'El Salvador',
        'GQ': 'Equatorial Guinea',
        'ER': 'Eritrea',
        'EE': 'Estonia',
        'ET': 'Ethiopia',
        'FK': 'Falkland Islands (Malvinas)',
        'FO': 'Faroe Islands',
        'FJ': 'Fiji',
        'FI': 'Finland',
        'FR': 'France',
        'GF': 'French Guiana',
        'PF': 'French Polynesia',
        'TF': 'French Southern Territories',
        'GA': 'Gabon',
        'GM': 'Gambia',
        'GE': 'Georgia',
        'DE': 'Germany',
        'GH': 'Ghana',
        'GI': 'Gibraltar',
        'GR': 'Greece',
        'GL': 'Greenland',
        'GD': 'Grenada',
        'GP': 'Guadeloupe',
        'GU': 'Guam',
        'GT': 'Guatemala',
        'GG': 'Guernsey',
        'GN': 'Guinea',
        'GW': 'Guinea-Bissau',
        'GY': 'Guyana',
        'HT': 'Haiti',
        'HM': 'Heard Island & Mcdonald Islands',
        'VA': 'Holy See (Vatican City State)',
        'HN': 'Honduras',
        'HK': 'Hong Kong',
        'HU': 'Hungary',
        'IS': 'Iceland',
        'IN': 'India',
        'ID': 'Indonesia',
        'IR': 'Iran, Islamic Republic Of',
        'IQ': 'Iraq',
        'IE': 'Ireland',
        'IM': 'Isle Of Man',
        'IL': 'Israel',
        'IT': 'Italy',
        'JM': 'Jamaica',
        'JP': 'Japan',
        'JE': 'Jersey',
        'JO': 'Jordan',
        'KZ': 'Kazakhstan',
        'KE': 'Kenya',
        'KI': 'Kiribati',
        'KR': 'Korea',
        'KW': 'Kuwait',
        'KG': 'Kyrgyzstan',
        'LA': 'Lao People\'s Democratic Republic',
        'LV': 'Latvia',
        'LB': 'Lebanon',
        'LS': 'Lesotho',
        'LR': 'Liberia',
        'LY': 'Libyan Arab Jamahiriya',
        'LI': 'Liechtenstein',
        'LT': 'Lithuania',
        'LU': 'Luxembourg',
        'MO': 'Macao',
        'MK': 'Macedonia',
        'MG': 'Madagascar',
        'MW': 'Malawi',
        'MY': 'Malaysia',
        'MV': 'Maldives',
        'ML': 'Mali',
        'MT': 'Malta',
        'MH': 'Marshall Islands',
        'MQ': 'Martinique',
        'MR': 'Mauritania',
        'MU': 'Mauritius',
        'YT': 'Mayotte',
        'MX': 'Mexico',
        'FM': 'Micronesia, Federated States Of',
        'MD': 'Moldova',
        'MC': 'Monaco',
        'MN': 'Mongolia',
        'ME': 'Montenegro',
        'MS': 'Montserrat',
        'MA': 'Morocco',
        'MZ': 'Mozambique',
        'MM': 'Myanmar',
        'NA': 'Namibia',
        'NR': 'Nauru',
        'NP': 'Nepal',
        'NL': 'Netherlands',
        'AN': 'Netherlands Antilles',
        'NC': 'New Caledonia',
        'NZ': 'New Zealand',
        'NI': 'Nicaragua',
        'NE': 'Niger',
        'NG': 'Nigeria',
        'NU': 'Niue',
        'NF': 'Norfolk Island',
        'MP': 'Northern Mariana Islands',
        'NO': 'Norway',
        'OM': 'Oman',
        'PK': 'Pakistan',
        'PW': 'Palau',
        'PS': 'Palestinian Territory, Occupied',
        'PA': 'Panama',
        'PG': 'Papua New Guinea',
        'PY': 'Paraguay',
        'PE': 'Peru',
        'PH': 'Philippines',
        'PN': 'Pitcairn',
        'PL': 'Poland',
        'PT': 'Portugal',
        'PR': 'Puerto Rico',
        'QA': 'Qatar',
        'RE': 'Reunion',
        'RO': 'Romania',
        'RU': 'Russian Federation',
        'RW': 'Rwanda',
        'BL': 'Saint Barthelemy',
        'SH': 'Saint Helena',
        'KN': 'Saint Kitts And Nevis',
        'LC': 'Saint Lucia',
        'MF': 'Saint Martin',
        'PM': 'Saint Pierre And Miquelon',
        'VC': 'Saint Vincent And Grenadines',
        'WS': 'Samoa',
        'SM': 'San Marino',
        'ST': 'Sao Tome And Principe',
        'SA': 'Saudi Arabia',
        'SN': 'Senegal',
        'RS': 'Serbia',
        'SC': 'Seychelles',
        'SL': 'Sierra Leone',
        'SG': 'Singapore',
        'SK': 'Slovakia',
        'SI': 'Slovenia',
        'SB': 'Solomon Islands',
        'SO': 'Somalia',
        'ZA': 'South Africa',
        'GS': 'South Georgia And Sandwich Isl.',
        'ES': 'Spain',
        'LK': 'Sri Lanka',
        'SD': 'Sudan',
        'SR': 'Suriname',
        'SJ': 'Svalbard And Jan Mayen',
        'SZ': 'Swaziland',
        'SE': 'Sweden',
        'CH': 'Switzerland',
        'SY': 'Syrian Arab Republic',
        'TW': 'Taiwan',
        'TJ': 'Tajikistan',
        'TZ': 'Tanzania',
        'TH': 'Thailand',
        'TL': 'Timor-Leste',
        'TG': 'Togo',
        'TK': 'Tokelau',
        'TO': 'Tonga',
        'TT': 'Trinidad And Tobago',
        'TN': 'Tunisia',
        'TR': 'Turkey',
        'TM': 'Turkmenistan',
        'TC': 'Turks And Caicos Islands',
        'TV': 'Tuvalu',
        'UG': 'Uganda',
        'UA': 'Ukraine',
        'AE': 'United Arab Emirates',
        'GB': 'United Kingdom',
        'US': 'United States',
        'UM': 'United States Outlying Islands',
        'UY': 'Uruguay',
        'UZ': 'Uzbekistan',
        'VU': 'Vanuatu',
        'VE': 'Venezuela',
        'VN': 'Vietnam',
        'VG': 'Virgin Islands, British',
        'VI': 'Virgin Islands, U.S.',
        'WF': 'Wallis And Futuna',
        'EH': 'Western Sahara',
        'YE': 'Yemen',
        'ZM': 'Zambia',
        'ZW': 'Zimbabwe'
    }

    constructor() {
        makeAutoObservable(this)
    }

    /** Get country path by country code 2.
     * @return (e.g. thailand, hongkong, newzealand) */
    getPathByCode2(code2) {
        return get(this.Paths, findKey(this.Code2, code2), undefined)
    }

    /** Get country path by country code 3.
     * @return (e.g. thailand, hongkong, newzealand) */
    getPathByCode3(code3) {
        return get(this.Paths, findKey(this.Code3, code3), undefined)
    }

    getFormalByCode2(code2) {
        return get(this.Formal, findKey(this.Code2, code2), undefined)
    }

    getFormalByCode3(code3) {
        return get(this.Formal, findKey(this.Code3, code3), undefined)
    }

    getCode2ByPath(path) {
        return get(this.Code2, path, undefined)
    }

    getCode3ByPath(path) {
        return get(this.Code3, path, undefined)
    }

    

    /** Get country code as ISO 3166-1 alpha-2 code. 
     * @return (e.g. **TH**, **AU**, **NZ**) */
    getCode2(lowercase = false) {
        const r = throatString(this.Code2)
        return lowercase ? lowerCase(StoreCountry.Country2) : StoreCountry.Country2
    }
    /** Get country code as ISO 3166-1 alpha-3 code. 
     * @return (e.g. **JPN**, **AUS**, **NZL**) */
    getCode3(lowercase = false) {
        const r = throatString(this.Code3)
        return lowercase ? lowerCase(StoreCountry.Country3) : StoreCountry.Country3
    }

    /** Get a lowercase with non-space output of country. 
     * @return (e.g. thailand, indonesia, newzealand) */
    getPath() { return throatString(this.Paths) }
    /** An alias version for `Country.getPath()` method.
     *
     * Get a lowercase with non-space output of country. 
     * @return (e.g. thailand, indonesia, newzealand) */
    getCountry() { return StoreCountry.country.country }




    getCurrency()       { return throatString(this.Currency) }
    getCapital()        { return throatString(this.Capital) }
    getMarkingCode()    { return throatString(this.MarketingCode) }
    getOffline()        { return throatBoolean(this.Offline) }

    isMatchedCountry(expectancy = [])  { 
        return someOf(this.getCode2(), expectancy)
    }

    // * Check current country / support compiling order
    isThailand()        { return core.path === K.Thailand }
    isSingapore()       { return core.path === K.Singapore }
    isPhilippines()     { return core.path === K.Philippines }
    isJapan()           { return core.path === K.Japan }
    isIndonesia()       { return core.path === K.Indonesia }
    isVietnam()         { return core.path === K.Vietnam }
    isHongKong()        { return core.path === K.Hongkong }
    isTaiwan()          { return core.path === K.Taiwan }
    isKorea()           { return core.path === K.Korea }
    isMalaysia()        { return core.path === K.Malaysia }
    isAustralia()       { return core.path === K.Australia }
    isNewZealand()      { return core.path === K.Newzealand }
}

const core = new StoreConfigCountry()
/** Country store and configs. */
export const Country = core