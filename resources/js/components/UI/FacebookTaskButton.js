import React from 'react';
import s from '../../../sass/components/modals/ModalGameDescriptiion.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {usePage} from "@inertiajs/inertia-react";
import {setLoadingAction, setSnackMessageAction} from "../../reducers/mainReducer";

const FacebookTaskButton = ({task}) => {
    const dispatch = useDispatch()
    const { auth } = usePage().props
    const stateData = useSelector(state => state.lang)

    const clickHandler = e => {
        console.log('clickHandler')
        dispatch(setLoadingAction(true))
        setTimeout(() => {
            dispatch(setLoadingAction(false))
            dispatch(setSnackMessageAction(stateData.home.need_update_api[stateData.lang]))
        }, 1500);
    };

    return (
        <button
            className={s.clipboard}
            onClick={clickHandler}
            style={{
                textDecoration: "none",
                color: "#05faf2"
            }}
        >
            { task.task }
        </button>
    );
};

export default FacebookTaskButton;
