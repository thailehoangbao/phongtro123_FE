import actionTypes from './actionTypes'
import { apiGetAreas, apiGetPrice, apiGetProvinces } from '../../services/app'

export const getPrices = () => async (dispatch) => {
    try {
        const response = await apiGetPrice()
        if(response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_PRICES_SUCCESS,
                data: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_PRICES_FAIL,
                msg: response.data.msg,
                data: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PRICES_FAIL,
            data: null
        })
    }
}

export const getAreas = () => async (dispatch) => {
    try {
        const response = await apiGetAreas()
        if(response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_AREAS_SUCCESS,
                data: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_AREAS_FAIL,
                msg: response.data.msg,
                data: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_AREAS_FAIL,
            data: null
        })
    }
}

export const getProvinces = () => async (dispatch) => {
    try {
        const response = await apiGetProvinces()
        if(response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_PROVINCE_SUCCESS,
                data: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_PROVINCE_FAIL,
                msg: response.data.msg,
                data: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PROVINCE_FAIL,
            data: null
        })
    }
}