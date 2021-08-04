import React, { useState, useReducer, useEffect } from 'react'
import $ from 'jquery'
import Axios from 'axios'

export const createToken = (baId, now = new Date()) => {
    const date = now.getUTCDate()
    const weekDay = now.getUTCDay() + 1
    const modeWeekDay = (date % weekDay) + 1
    const hash = baId.toString()
        .split("")
        .map(c => parseInt(c) % modeWeekDay)
        .join("")
    return `${hash}${weekDay}${date}`
}

const dataFetchReducer = (state, action) => {

    switch (action.type) {
        case 'FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            };
        case 'FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        default:
            throw new Error();
    }
}

export const useDataApi = (initialUrl, initialData, initialMethod, initialHeaders) => {
    const [url, setUrl] = useState(initialUrl);
    const [method, setMethod] = useState(initialMethod || 'GET')
    const [forceLoad, setForceLoad] = useState(false)
    const headers = {
        'Content-Type': 'application/json',
        'authorization-hydra': `Bearer ${sessionStorage.getItem('customerToken')}`,
        'authorization-ushop': 'Bearer tVxbmKcjme'
    }



    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        isError: false,
        data: null
    });

    useEffect(() => {

        let didCancel = false;

        const fetchData = async () => {
            dispatch({ type: 'FETCH_INIT' });

            const configs = {
                method: method,
                url: url,
                headers: headers
            }

            configs[method.toUpperCase() === 'GET' ? 'params' : 'data'] = initialData

            Axios(url, { method: method, params: initialData, headers: headers })
                .then((response) => {
                    dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
                }).catch((response) => {
                    dispatch({ type: 'FETCH_FAILURE', payload: response });
                })
        };

        if (url || forceLoad !== false) {
            fetchData()
        }

        return () => {
            didCancel = true;
        };
    }, [url, forceLoad]);

    return [state, setUrl, setForceLoad];
}

