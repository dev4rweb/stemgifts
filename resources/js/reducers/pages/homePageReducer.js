import {GAME_DESC_NOTIFICATION, SET_HOME_PAGE} from "../../utils/reducerConsts";

const defaultState = {
    page: 1,
    gameDescNotification: 'You need to finish at least one task to take part in the competition.'
}

export default function homeReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_HOME_PAGE:
            return {
                ...state,
                page: action.payload
            }
        case GAME_DESC_NOTIFICATION:
            return {
                ...state,
                gameDescNotification: action.payload
            }
        default:
            return state
    }
};

export const setHomePaginationPageAction = page => ({type: SET_HOME_PAGE, payload: page})
export const setGameDescNotificationAction = message => ({type: GAME_DESC_NOTIFICATION, payload: message})
