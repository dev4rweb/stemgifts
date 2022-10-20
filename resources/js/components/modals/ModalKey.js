import React from 'react';
import s from "../../../sass/components/ModalLayout.module.scss";
import m from "../../../sass/components/modals/ModalKey.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {setModalKey} from "../../reducers/modalReducer";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import {setSnackMessageAction} from "../../reducers/mainReducer";

const ModalKey = () => {
    const dispatch = useDispatch()
    const visible = useSelector(state => state.modal.modalKey)
    const rootClasses = [s.modal]

    const value = '5896-7896-4445-128896-25'
    const stateData = useSelector(state => state.lang)

    if (visible) rootClasses.push(s.active)

    const handleClose = e => dispatch(setModalKey(false))

    return (
        <div
            className={rootClasses.join(' ')}
            onClick={handleClose}
            style={{zIndex: 10}}
        >
            <div
                className={`${s.modalBody}  ${s.animate}`}
                onClick={event => event.stopPropagation()}
            >
                <span
                    className={s.close}
                    onClick={handleClose}
                >
                  &times;
              </span>
                <div>
                    <div>
                        <p>{stateData.home.cong[stateData.lang]}</p>
                        <div className={m.modalKey}>
                            <span>{value}</span>
                            <CopyToClipboard text={value}>
                                <button
                                    onClick={e => dispatch(setSnackMessageAction('Copied!'))}
                                >
                                    {stateData.home.copy[stateData.lang]}
                                </button>
                            </CopyToClipboard>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalKey;
