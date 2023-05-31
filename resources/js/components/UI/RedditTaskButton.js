import React from 'react';
import s from '../../../sass/components/modals/ModalGameDescriptiion.module.scss'
import {setLoadingAction, setSnackMessageAction} from "../../reducers/mainReducer";
import {useDispatch, useSelector} from "react-redux";
import {usePage} from "@inertiajs/inertia-react";

const RedditTaskButton = ({task}) => {
    const dispatch = useDispatch()
    const { auth } = usePage().props
    const stateData = useSelector(state => state.lang)

    const clickHandler = e => {
        console.log('clickHandler')
        dispatch(setSnackMessageAction(stateData.home.need_create_api[stateData.lang]))
    };

    return (
        <button
            className={`btn ${s.clipboardMod}`}
            onClick={clickHandler}
            style={{
                textDecoration: "none",
                color: "#f83d05"
            }}
        >
            {/*{ task.task }*/}
        </button>
    );
};

export default RedditTaskButton;
