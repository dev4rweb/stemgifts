import {CREATE_TASK_ONE, CREATE_TASK_THREE, CREATE_TASK_TWO} from "../../utils/reducerConsts";

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
}

export default function createCompetitionReducer(state = defaultState, action) {
    switch (action.type) {
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

export const setCreateTaskOneAction = task => ({type: CREATE_TASK_ONE, payload: task})
export const setCreateTaskTwoAction = task => ({type: CREATE_TASK_TWO, payload: task})
export const setCreateTaskThreeAction = task => ({type: CREATE_TASK_THREE, payload: task})
