import React from 'react';
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import {useDispatch, useSelector} from "react-redux";
import s from '../../../sass/components/modals/ModalGameDescriptiion.module.scss'
import {setSnackMessageAction} from "../../reducers/mainReducer";

const SwitchGameDescBtn = ({task}) => {
    const dispatch = useDispatch()
    const stateData = useSelector(state => state.lang)

    console.log('SwitchGameDescBtn', task)

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
