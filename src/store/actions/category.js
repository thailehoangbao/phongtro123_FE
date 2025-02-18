import actionTypes from './actionTypes'
import { apiGetCategories } from '../../services/category'

export const getCategories = () => async (dispatch) => {
    try {
        const response = await apiGetCategories()
        if(response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_ALL_CATEGORIES_SUCCESS,
                data: response.data
            })
        } else {
            dispatch({
                type: actionTypes.GET_ALL_CATEGORIES_FAIL,
                data: response.data.msg
            })
        }
    } catch (error) { 
        dispatch({
            type: actionTypes.GET_ALL_CATEGORIES_FAIL,
            data: null
        })
    }
}