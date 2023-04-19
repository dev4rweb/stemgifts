import React from 'react';
import s from '../../../sass/components/modals/ModalGameDescriptiion.module.scss'
import {setLoadingAction, setSnackMessageAction} from "../../reducers/mainReducer";
import {useDispatch, useSelector} from "react-redux";
import {usePage} from "@inertiajs/inertia-react";
import {Inertia} from "@inertiajs/inertia";
import {userTaskStoreApi} from "../../api/userTasksApi";

const SteamTaskButton = ({task}) => {
    const dispatch = useDispatch()
    const { auth } = usePage().props
    const stateData = useSelector(state => state.lang)

    const clickHandler = e => {
        console.log('clickHandler Steam', task)
        if(auth.user && auth.user.steam_id) {
            dispatch(setLoadingAction(true))
            userTaskStoreApi(task.id)
                .then(res => {
                    if (res.data.success) window.location.href = task.url
                    else dispatch(setSnackMessageAction(res.data.message))
                }).catch(err => dispatch(setSnackMessageAction(err.response.data.message)))
                .finally(() => dispatch(setLoadingAction(false)));
            // localStorage.setItem('steam_wishlist_check', '1')
            // window.location.href = task.url
        } else Inertia.visit('/user-settings')
            //dispatch(setSnackMessageAction(stateData.home.need_create_api[stateData.lang]))
    };

    return (
        <button
            className={s.clipboard}
            onClick={clickHandler}
            style={{
                textDecoration: "none",
                color: "#0a2a95"
            }}
        >
            { task.task }
        </button>
    );
};

export default SteamTaskButton;
