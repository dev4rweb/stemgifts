import React from 'react';
import s from '../../../sass/components/modals/ModalGameDescriptiion.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {usePage} from "@inertiajs/inertia-react";
import {setLoadingAction, setSnackMessageAction} from "../../reducers/mainReducer";
import {Inertia} from "@inertiajs/inertia";

const TwitterTaskButton = ({task}) => {
    const dispatch = useDispatch()
    const { auth, appName, session } = usePage().props
    const stateData = useSelector(state => state.lang)

    console.log('TwitterTaskButton', session)
    console.log('TwitterTaskButton Task', task)

    const clickHandler = e => {
        console.log('clickHandler', session)
        const twitterSession = !!(session && session.twitter_id)
        switch (task.task_category_item_id) {
            case 7: // Post Twitter
                postTweeterHandler(twitterSession)
                break
            default:
                notPrepareFunc()
                break
        }
    };

    const postTweeterHandler = isSessionTwitter => {
        // Inertia.post('/twitter/postTweet', {message: task.url }, {preserveState: false})
        if (isSessionTwitter) {
            console.log('Can post');
            Inertia.post('/twitter/postTweet', {
                message: task.url,
                task_id: task.id
            }, {preserveState: false})
        } else {
            console.log('Need to auth before')
            sessionStorage.setItem('twitterTask', JSON.stringify(task))
            window.location.href = '/auth/twitter'
        }
    };

    const notPrepareFunc = () => {

        dispatch(setLoadingAction(true));
        setTimeout(() => {
            dispatch(setLoadingAction(false))
            dispatch(setSnackMessageAction(stateData.home.need_update_api[stateData.lang]))
        }, 1500);
    };

    return (
        <button
            className={`btn ${s.clipboardMod}`}
            onClick={clickHandler}
            style={{
                textDecoration: "none",
                color: "#05acfa"
            }}
        >
            {/*{ task.task }*/}
        </button>
    );
};

export default TwitterTaskButton;
