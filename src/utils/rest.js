import request from './request'
import Config from '../env'
import qs from 'qs'
import $ from 'jquery'

const serverURL =
    Config.apiPath || 'https://member-kr.unicity.com/unifoapi/backend/crud'

function toCamelCase(str) {
    return str
        .split(' ')
        .map(function (word, index) {
            // If it is the first word make sure to lowercase all the chars.
            if (index == 0) {
                return word.toLowerCase()
            }
            // If it is not the first word only upper case the first char and lowercase the rest.
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        })
        .join('')
}

export function buildUrl(url, parameters) {
    let _qs = ''
    for (const key in parameters) {
        if (parameters.hasOwnProperty(key)) {
            const value = parameters[key]
            _qs +=
                encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&'
        }
    }
    if (_qs.length > 0) {
        _qs = _qs.substring(0, _qs.length - 1) //chop off last "&"
        url = url + '?' + _qs
    }

    return url
}

/**
 * @description 공통 쿼리 처리 함수
 * @param {*} query
 */
export function query(query) {
    var newQuery = query
    var resultStr = ''

    if (newQuery.data) {
        newQuery.data = JSON.stringify(newQuery.data)
    }
    if (newQuery.where) {
        let arr = []
        for (var k in newQuery.where) {
            arr.push(k + '=?')
            arr.push(newQuery.where[k])
        }

        newQuery.where = arr
    }
    if (true) {
        let _arr = ''
        let index = 0



        for (var k in newQuery) {
            if (newQuery[k] === '') continue

            let _data = undefined
            if (index > 0) _data = '&' + qs.stringify({ [k]: newQuery[k] })
            else _data = qs.stringify({ [k]: newQuery[k] })

            if (!_data) continue

            _arr += _data
            index++
        }
        resultStr = _arr
    }

    return resultStr
}

const changePath = path => {
    let customPath = path

    if (customPath.indexOf('@') != -1) {
        customPath = customPath.replace('@', '_')
    }

    return customPath
}

/**
 * @description type으로 path로 치환하는 함수
 * @param string type
 * @returns {}
    {
        method : "GET" | "POST" | "UPDATE" | "DELETE",
        path : string
    }
 */
export function getPath(type) {
    if (!type) return
    const reg1 = /\b(?!cat\b)[\w\$@\-]+/gm
    var str = type
    str = toCamelCase(str)
    var m

    var arr = []
    while ((m = reg1.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === reg1.lastIndex) {
            reg1.lastIndex++
        }

        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            arr.push(match)
        })
    }

    const reg2 = /[^_]+/gm
    var str = arr[0]
    var m

    var arr = []
    while ((m = reg2.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === reg2.lastIndex) {
            reg2.lastIndex++
        }
        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            arr.push(match)
        })
    }

    var method = arr.shift()
    // . 이 있는 경우에는 Camel 형태로 변경해 준다.
    arr = arr.map(function (item) {
        if (item.indexOf('$') > 0) {
            var itemList = item.toLowerCase().split('$')
            for (var i = 1; i < itemList.length; i++) {
                itemList[i] =
                    itemList[i][0].toUpperCase() + itemList[i].substr(1)
            }
            return itemList.join('')
        } else {
            return item.toLowerCase()
        }
    })

    switch (method) {
        case 'load':
            method = 'POST'
            arr.unshift('encodeall')
            //arr[1] = (arr[1])
            break

        case 'insert':
            method = 'POST'
            arr.unshift('encodecreate')
            //arr[1] = (arr[1])
            break

        case 'update':
            method = 'POST'
            arr.unshift('encodeupdate')
            //arr[1] = (arr[1])
            break
        case 'delete':
            method = 'POST'
            arr.unshift('encodedelete')
            //arr[1] = (arr[1])
            break

        case 'query':
            method = 'POST'
            break

        default:
            // arr.push(method.toLowerCase())
            method = 'GET'
            break
    }
    var path = arr.join('/') //.toLowerCase();

    path = changePath(path)

    return { method, path }
}

/**
 * @description 일반적인 Rest API 호출 시 사용
 * @param {*} path
 * @param {*} params
 */
export const requestAsync = (type, params, isForm = false) => {
    return new Promise(async function (resolve, reject) {
        var requestURL = undefined
        const { method, path } = getPath(type)
        params = query(params)

        let options = {
            credentials: 'include',
            headers: {
                Accept: '*/*',
                'content-type': 'application/x-www-form-urlencoded'
            },
            method
        }

        if (method == 'GET') {
            requestURL = buildUrl(serverURL + '/' + path, params)
        } else {

            requestURL = serverURL + '/' + (path=='sql'?'sql':path)
            options.url = requestURL

            if (isForm) {
                const formData = new FormData()

                for (var k in params) {
                    if (k === 'files') {
                        const files = params[k]
                        for (var _k in files) {
                            let fileUri = files[_k].uri
                            let uriParts = fileUri.split('.')
                            let fileType = uriParts[uriParts.length - 1]

                            formData.append(_k, {
                                uri: fileUri,
                                name: `photo.${fileType}`,
                                type: `image/${fileType}`
                            })
                        }
                        options.headers['content-type'] = 'multipart/form-data'
                    } else {

                        formData.append(k,  params[k])
                    }
                }

                options.data = formData
            } else {

                options.data = params
            }

            options.headers['content-type'] =
                'application/x-www-form-urlencoded'
        }

        if (process.env !== 'production') {
            // console.log('#### api call : ', requestURL);
            // console.log('#### api options : ', options);
        }
        request(requestURL, options)
            .then(res => {
                var data = undefined
                if (res.data) data = res.data
                resolve(data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

/**
 * @description aws file upload Rest API 호출 시 사용
 * @param {*} path
 * @param {*} params
 */
export const requestFileAsync = (path, params) => {
    return new Promise(async function (resolve, reject) {
        var requestURL = path
        const method = 'POST'
        let options = {
            credentials: 'include',
            headers: {
                Accept: '*/*'
                // 'content-type': 'application/json',
            },
            method
        }

        options.data = params
        console.log('requestURL ', requestURL)
        console.log('options ', options)
        request(requestURL, options)
            .then(res => {
                console.log('res : ', res)

                resolve(res)
            })
            .catch(error => {
                console.log('error : ', error)
                reject(error)
            })
    })
}

export const requestKakaoAsync = (path, method, params, isForm = false) => {
    return new Promise(async function (resolve, reject) {
        const kakaoUrl = ''
        var requestURL = undefined
        params = query(params)
        //const { method, path } = getPath(type);

        let options = {
            credentials: 'include',
            headers: {
                Accept: '*/*',
                'content-type':
                    'application/x-www-form-urlencoded;charset=utf-8'
            },
            method
        }
        if (params.Authorization) {
            options.headers['Authorization'] = 'Bearer ' + params.Authorization
            delete params.Authorization
        }

        if (method == 'GET') {
            requestURL = buildUrl(kakaoUrl + path, params)
        } else {
            requestURL = kakaoUrl + path
            options.url = requestURL

            if (isForm) {
                const formData = new FormData()

                for (var k in params) {
                    formData.append(k, params[k])
                }

                options.data = formData
            } else options.data = qs.stringify(params)

            options.headers['content-type'] =
                'application/x-www-form-urlencoded;charset=utf-8'
        }

        if (
            process.env !== 'production' &&
            requestURL.indexOf('action=getAlarmConfirmList') === -1
        ) {
            console.log('#### api call : ', requestURL)
            console.log('#### api options : ', options)
        }
        request(requestURL, options)
            .then(res => {
                var data = undefined
                if (res.data) data = res.data
                resolve(data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export const requestPayAsync = (path, method, params, isForm = false) => {
    return new Promise(async function (resolve, reject) {
        const unifoApi = Config.payApiPath
        var requestURL = undefined

        let options = {
            credentials: 'include',
            headers: {
                Accept: '*/*',
                'content-type': 'application/json'
            },
            method
        }

        if (method == 'GET') {
            requestURL = buildUrl(unifoApi + path, params)
        } else {
            requestURL = unifoApi + path
            options.url = requestURL

            if (isForm) {
                const formData = new FormData()

                for (var k in params) {
                    formData.append(k, params[k])
                }

                options.data = formData
            } else options.data = params
        }

        if (
            process.env !== 'production' &&
            requestURL.indexOf('action=getAlarmConfirmList') === -1
        ) {
            console.log('#### api call : ', requestURL)
            console.log('#### api options : ', options)
        }
        request(requestURL, options)
            .then(res => {
                var data = undefined
                if (res.data) data = res.data
                resolve(data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export const _post = (url, body, configs, isForm = false) => {
    let resultEndpoint = ''
    if (url.search('http') !== -1) {
        resultEndpoint = url
    } else {
        //resultEndpoint = `${APIEndpoint}/${url}`
        resultEndpoint = `https://member-calls2-dev.unicity.com/${url}`
    }

    const options = {
        method: 'POST',
        url: resultEndpoint,
        data: JSON.stringify(body),
        async: true,
        ...configs
    }

    console.log(options)

    return new Promise((resolve, reject) => {
        $.ajax(options)
            .done(response => {
                if (isString(response)) {
                    if (isJSON(response)) {
                        response = JSON.parse(response)
                    }
                }
                resolve(response)
            })
            .fail((xhr, textStatus, errorThrown) => {
                const { responseJSON } = xhr
                reject(responseJSON)
            })
    })
}
