import { isProduction } from '@Configs/ConfigsHeader'
import { isString } from './Utils'
import { devTools } from '../../stores/MainStore';
import c from 'ansi-colors';
import { DateTime } from 'luxon';

// ** --------- Log control functions --------- ** //
const HEADER_DEVLOG     = '[LOG]'
const HEADER_DEVLOGW    = '[WATCHER]'
const HEADER_DEVLOGE    = '[ERROR]'
const HEADER_DEVLOGN    = '[NOTICE]'
const HEADER_DEVLOGTIME = '[TIMER]'

/** Return `true` if ***not*** a Production stage, Simulating live or forced app to show logs. */
export function isValidToLog() {
    return isProduction() ? devTools.isShowDevLog : isProduction() === false
}

/** **[LOG]** 
 * Log control function for the ***General Purpose*** messages. This method is mimic `console.log` method,
 * but it always disabled on live production plus the unique prefix string. 
 * @see DevelopmentTools - If you want to enabled on live production.
 * @param {*} messages any string messages, object, array, etc.
 */
export function logi(...messages) {
    if (isValidToLog() === false) return
    let i = -1, l = messages.length, args = [], fn = 'console.log("' + c.blue(`${HEADER_DEVLOG}`) + ' %s' + '", args)'
    while (++i < l) args.push('args[' + i + ']')
    fn = new Function('args', fn.replace(/args/, args.join(',')))
    fn(messages)
}

/** **[14:30:00]** 
 * Log control function for the timestamp messages. This method is mimic `console.log` method,
 * but it always disabled on live production plus the unique prefix string. 
 * @see DevelopmentTools - If you want to enabled on live production.
 * @param {*} messages any string messages, object, array, etc.
 */
export function logn(...messages) {
    if (isValidToLog() === false) return
    const d = `[${DateTime.local().toFormat('HHmmssSSS')}]`
    let i = -1, l = messages.length, args = [], fn = 'console.log("' + c.green(`${d}`) + ' %s' + '", args)'
    while (++i < l) args.push('args[' + i + ']')
    fn = new Function('args', fn.replace(/args/, args.join(',')))
    fn(messages)
}

/** **[WATCHER]** 
 * Log control function for ***Watchers*** which triggered by `autorun` method. This method is mimic `console.log` method,
 * but it always disabled on live production plus the unique prefix string. 
 * @see DevelopmentTools - If you want to enabled on live production.
 * @param {*} messages any string messages, object, array, etc.
 */
export function logw(...messages) {
    if (isValidToLog() === false) return
    let i = -1, l = messages.length, args = [], fn = 'console.log("' + c.magenta(`${HEADER_DEVLOGW}`) + ' %s' + '", args)'
    while (++i < l) args.push('args[' + i + ']')
    fn = new Function('args', fn.replace(/args/, args.join(',')))
    fn(messages)
}

/** **[ERROR]** 
 * Log control function for the ***Error*** messages. This method is mimic `console.log` method,
 * but it always disabled on live production plus the unique prefix string. 
 * @see DevelopmentTools - If you want to enabled on live production.
 * @param {*} messages any string messages, object, array, etc.
 */
export function loge(...messages) {
    if (isValidToLog() === false) return
    let i = -1, l = messages.length, args = [], fn = 'console.log("' + c.red(`${HEADER_DEVLOGE}`) + ' %s' + '", args)'
    while (++i < l) args.push('args[' + i + ']')
    fn = new Function('args', fn.replace(/args/, args.join(',')))
    fn(messages)
}

/** **[Information Table]** 
 * Log control function which generated readable ***Table*** from `Object` or `Array`. This method is mimic `console.table` method. 
 * An output will be wrapped with `console.groupCollapsed` which can be specified label at the first index of method's arguments.
 * This method always disabled even on the development stage.
 * @see DevelopmentTools - If you want to enabled this log.
 * @param {*} object object or array. If you want to change group label, specified first index with string.
 */
export function logsys(...messages) {
    // if (devTools.isShowInfoLog === false) return
    let i = -1, l = messages.length, args = [], fn = 'console.table(args)'
    let label = 'logsys'
    if (isString(messages[0])) {
        label = messages[0]
        messages.shift()
    }
        
    while (++i < l) args.push('args[' + i + ']')
    fn = new Function('args', fn.replace(/args/, args.join(',')))
    console.groupCollapsed(label)
    fn(messages)
    console.groupEnd()
}

export function lognum(number) {
    if (isValidToLog() === false) return
    logi(number)
}

export function logtime(label) {
    if (isValidToLog() === false) return {
        start: () => {}, end: () => {}
    }
    const tag = `${c.bgYellow(HEADER_DEVLOGTIME)} ${label}`
    return {
        start: () => console.time(tag),
        end: () => console.timeEnd(tag)
    }
}

/** Log control function, could be disable on live production. Create dash line, the number of dash depend on x multiply with 5. */
export function loghr(x) {
    let line = ''
    for (let i = 0; i < x; i++) {
        line += '-----'
    }
    logi(line)
}
// -------------------------------------------------