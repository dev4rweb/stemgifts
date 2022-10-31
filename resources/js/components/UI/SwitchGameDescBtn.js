import React from 'react';
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import {useDispatch, useSelector} from "react-redux";
import s from '../../../sass/components/modals/ModalGameDescriptiion.module.scss'
import {setSnackMessageAction} from "../../reducers/mainReducer";
import {usePage} from "@inertiajs/inertia-react";
import GoogleTaskButton from "./GoogleTaskButton";
import SteamTaskButton from "./SteamTaskButton";
import TwitterTaskButton from "./TwitterTaskButton";
import DiscordTaskButton from "./DiscordTaskButton";
import FacebookTaskButton from "./FacebookTaskButton";
import InstagramTaskButton from "./InstagramTaskButton";
import RedditTaskButton from "./RedditTaskButton";

const SwitchGameDescBtn = ({task}) => {
    const { auth } = usePage().props
    const dispatch = useDispatch()
    const stateData = useSelector(state => state.lang)

    console.log('SwitchGameDescBtn', task, auth)

    if (task.users.length && auth.user) {
        const userTask = task.users.find(i => i.user_id === auth.user.id)
        if (userTask && userTask.is_done)
            return (
                <button
                    className={s.clipboard}
                    disabled={true}
                    style={{
                        textDecoration: "none",
                        color: "#60b95b"
                    }}
                >
                    {
                        stateData.home.done[stateData.lang]
                    }
                </button>
            )
    }

    if (task.category_id === 1) { // steam
        return (
            <SteamTaskButton task={task} />
        )
    }

    if (task.category_id === 2) { // twitter
        return (
            <TwitterTaskButton task={task} />
        )
    }

    if (task.category_id === 3) { // youtube
        return (
            <GoogleTaskButton task={task} />
        )
    }

    if (task.category_id === 4) { // discord
        return (
            <DiscordTaskButton task={task} />
        )
    }

    if (task.category_id === 5) { // facebook
        return (
            <FacebookTaskButton task={task} />
        )
    }

    if (task.category_id === 6) { // instagram
        return (
            <InstagramTaskButton task={task} />
        )
    }

    if (task.category_id === 7) { // reddit
        return (
            <RedditTaskButton task={task} />
        )
    }

    const copyHandler = e => {
        console.log('copyHandler')
        dispatch(setSnackMessageAction(stateData.home.copied[stateData.lang]))
    };

    return (
        <CopyToClipboard
            onCopy={copyHandler}
            text={task.url}
        >
            <button
                className={s.clipboard}>
                {
                    stateData.home.copy[stateData.lang]
                }
            </button>
        </CopyToClipboard>
    );
};

export default SwitchGameDescBtn;
