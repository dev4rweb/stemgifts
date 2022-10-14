import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import mainReducer from './mainReducer'
import translateReducer from "./translateReducer";
import modalReducer from "./modalRegister";

const rootReducer = combineReducers({
    main: mainReducer,
    lang: translateReducer,
    modal: modalReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
