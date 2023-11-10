import React from 'react';
import s from "../../../sass/components/ModalLayout.module.scss";
import m from "../../../sass/components/modals/ModalKey.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {setModalGetKey} from "../../reducers/modalReducer";

const GetKeyModal = () => {
    const dispatch = useDispatch()
    const visible = useSelector(state => state.modal.getKeyModal)
    const rootClasses = [s.modal]

    if (visible) rootClasses.push(s.active)

    const handleClose = e => dispatch(setModalGetKey(false))

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
                    <p className='text-center mt-5'>TEST</p>
                </div>
            </div>
        </div>
    );
};

export default GetKeyModal;
