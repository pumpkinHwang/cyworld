import React, { useEffect, useReducer } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

const RemoteStorage = () => { }

export function useStorage(storage = '') {

    const [state, dispatch] = useReducer(reducer, {});

    function reducer(state, action) {
        switch (action.type) {
            case 'localStorage':
                return AsyncStorage;
            case 'remoteStorage':
                return RemoteStorage;
            default:
                throw new Error();
        }
    }


    const getDataFromStorage = (key) => {
        
    }

    // const setDataToStorage = (key, value) => {
    //     switch (storage) {
    //         case 'asyncStorage': setToAsyncStorage(key, value)
    //         break;
    //         case ''
    //     }
    // }

    // const getDataFromStore = (key) => {

    // }


    // const setToAsyncStorage = async (key, value) => {
    //     try {
    //         await AsyncStorage.setItem(key, value)
    //     } catch (e) {
    //         // saving error
    //     }
    // }

    // const getDataFromAsyncStorage = async (key) => {
    //     try {
    //         const value = await AsyncStorage.getItem(key)
    //         if (value !== null) {
    //             return value
    //         }
    //     } catch (e) {
    //         return e
    //     }
    // }


    // return [setDataToStorage, getDataFromStore]
}


