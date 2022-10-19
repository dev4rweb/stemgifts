import {SET_HOME_PAGE} from "../../utils/reducerConsts";

const defaultState = {
    page: 1
}

export default function homeReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_HOME_PAGE:
            return {
                ...state,
                page: action.payload
            }
        default:
            return state
    }
};

export const setHomePaginationPageAction = page => ({type: SET_HOME_PAGE, payload: page})
