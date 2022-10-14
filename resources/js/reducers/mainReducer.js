import {SET_LOADING} from "../utils/reducerConsts";

const defaultState = {
    loading: false
}
export default function errorsReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state
    }
};

export const setLoadingAction = isLoading => ({type: SET_LOADING, payload: isLoading})
