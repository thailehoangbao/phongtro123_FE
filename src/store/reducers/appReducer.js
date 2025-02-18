import actionTypes from "../actions/actionTypes";
const initState = {
    categories: [],
    prices: [],
    areas: [],
    provinces: [],
    msg: ''
}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.data,
                msg: ''
            }

        case actionTypes.GET_ALL_CATEGORIES_FAIL:
            return {
                ...state,
                categories: [],
                msg: action.data,
            }
        
        case actionTypes.GET_PRICES_SUCCESS:
            return {
                ...state,
                prices: action.data,
                msg: ''
            }
    
        case actionTypes.GET_PRICES_FAIL:
            return {
                ...state,
                prices: [],
                msg: action.data,
            }
        
        case actionTypes.GET_AREAS_SUCCESS:
                return {
                    ...state,
                    areas: action.data,
                    msg: ''
                }
        
        case actionTypes.GET_AREAS_FAIL:
                return {
                    ...state,
                    areas: [],
                    msg: action.data,
                }

        case actionTypes.GET_PROVINCE_SUCCESS:
                    return {
                        ...state,
                        provinces: action.data,
                        msg: ''
                    }
            
        case actionTypes.GET_PROVINCE_FAIL:
                    return {
                        ...state,
                        provinces: [],
                        msg: action.data,
                    }
                
        default: 
            return state;
    }
}

export default appReducer