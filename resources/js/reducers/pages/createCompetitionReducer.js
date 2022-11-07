import {ADD_GIFT, CREATE_TASK_ONE, CREATE_TASK_THREE, CREATE_TASK_TWO, REMOVE_GIFT} from "../../utils/reducerConsts";

const defaultState = {
    createTaskOne: {
        task_category_item_id: 0,
        url: ''
    },
    createTaskTwo: {
        task_category_item_id: 0,
        url: ''
    },
    createTaskThree: {
        task_category_item_id: 0,
        url: ''
    },
    gifts: []
}

export default function createCompetitionReducer(state = defaultState, action) {
    switch (action.type) {
        case ADD_GIFT: {
            return {
                ...state,
                gifts: [...state.gifts, action.payload]
            }
        }
        case REMOVE_GIFT: {
            return {
                ...state,
                gifts: state.gifts.filter(i => i.gift_key !== action.payload)
            }
        }
        case CREATE_TASK_ONE:
            return {
                ...state,
                createTaskOne: action.payload
            }
        case CREATE_TASK_TWO:
            return {
                ...state,
                createTaskTwo: action.payload
            }
        case CREATE_TASK_THREE:
            return {
                ...state,
                createTaskThree: action.payload
            }
        default:
            return state
    }
};

export const addGiftAction = gift => ({type: ADD_GIFT, payload: gift})
export const removeGiftAction = gift_key => ({type: REMOVE_GIFT, payload: gift_key})
export const setCreateTaskOneAction = task => ({type: CREATE_TASK_ONE, payload: task})
export const setCreateTaskTwoAction = task => ({type: CREATE_TASK_TWO, payload: task})
export const setCreateTaskThreeAction = task => ({type: CREATE_TASK_THREE, payload: task})
