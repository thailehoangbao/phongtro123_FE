import checkExpiration from "../../ultis/Common/checkExpiration";
import actionTypes from "../actions/actionTypes";
const initStatea = {
    posts: [],
    msg: '',
    count: 0,
    newPosts: [],
    postOfcurrent: [],
    postOffilter: [],
    dataEdit: {}
}

const postReducer = (state=initStatea,action) => {
    switch (action.type) {
        case actionTypes.GET_POSTS:
        case actionTypes.GET_POSTS_LIMIT:
            
            return {
                ...state,
                posts: action.posts || [],
                msg: action.msg || '',
                count: action.count || 0
            };
            
        case actionTypes.GET_NEW_POST:
            
            return {
                ...state,
                msg: action.msg || '',
                newPosts: action.newPosts || []
            };
        
        case actionTypes.GET_POSTS_ADMIN:
            return {
                ...state,
                postOfcurrent: action.posts || [],
                msg: action.msg || '',
                count: action.count || 0
            }
        case actionTypes.EDIT_DATA:
            return {
                ...state,
                dataEdit: action.dataEdit || {}
            }

        case actionTypes.CLEAR_EDIT_DATA:
                return {
                    ...state,
                    dataEdit: {}
                }
        case actionTypes.FILTER_POSTS_ADMIN:
            let data = [...state.postOfcurrent]
            return {
                ...state,
                postOffilter: data.filter(item => checkExpiration(item.overviews.expired) === action.value )
            }
        default:
            return state;
    }
}

export default postReducer