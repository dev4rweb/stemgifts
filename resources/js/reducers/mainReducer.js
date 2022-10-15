import {SET_LOADING, SET_SNACK_MESSAGE} from "../utils/reducerConsts";

const defaultState = {
    loading: false,
    snackMessage: null
}
export default function errorsReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case SET_SNACK_MESSAGE:
            return {
                ...state,
                snackMessage: action.payload
            }
        default:
            return state
    }
};

export const setLoadingAction = isLoading => ({type: SET_LOADING, payload: isLoading})
export const setSnackMessageAction = msg => ({type: SET_SNACK_MESSAGE, payload: msg})
