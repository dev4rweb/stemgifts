import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import s from '../../../sass/components/ModalLayout.module.scss'
import m from '../../../sass/components/modals/ModalGameDescriptiion.module.scss'
import {setGameDescription} from "../../reducers/modalReducer";

const ModalGameDescription = () => {
    const dispatch = useDispatch()
    const stateData = useSelector(state => state.lang)
    const item = useSelector(state => state.modal.gameDescription)
    const rootClasses = [s.modal]

    if (item) {
        rootClasses.push(s.active)
    }

    const handleClose = (ev) => {
        dispatch(setGameDescription(null))
    };

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
                    {
                        item &&
                        <div className={m.gameDesc}>
                            <p>{item.name}</p>
                            <div className={m.imageBox}>
                                {item.left_image && <img className={m.left} src={item.left_image} alt=""/>}
                                {item.right_image && <img className={m.right} src={item.right_image} alt=""/>}
                                {item.secondary_image && <img className={m.center} src={item.secondary_image} alt=""/>}
                            </div>

                            {item.description && <p className={m.content}>{item.description}</p>}

                            {
                                item.is_competition ?
                                    <p className={m.content}
                                       style={{textAlign: 'left', marginBottom: '10px', paddingLeft: '15px'}}>
                                        {stateData.home.task[stateData.lang]}
                                    </p>
                                    :
                                    <div/>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default ModalGameDescription;
