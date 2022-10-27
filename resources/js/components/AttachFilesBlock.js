import React from 'react';
import s from '../../sass/pages/CreatePage.module.scss'
import {useSelector} from "react-redux";
import InputAttachFile from "./UI/InputAttachFile";

const AttachFilesBlock = ({game, setGame}) => {
    const stateData = useSelector(state => state.lang)
    return (
        <div className={s.attachFile}>
            <p className={s.attachTitle}>{stateData.admin.createGive.primImg[stateData.lang]}</p>
            <InputAttachFile
                game={game}
                setGame={setGame}
                inputName={'main_image'}
            />
            <p className={s.attachTitle}>{stateData.admin.createGive.secImg[stateData.lang]}</p>
            <InputAttachFile
                game={game}
                setGame={setGame}
                inputName={'secondary_image'}
            />
            <p className={s.attachTitle}>{stateData.admin.createGive.leftImg[stateData.lang]}</p>
            <InputAttachFile
                game={game}
                setGame={setGame}
                inputName={'left_image'}
            />
            <p className={s.attachTitle}>{stateData.admin.createGive.rightImg[stateData.lang]}</p>
            <InputAttachFile
                game={game}
                setGame={setGame}
                inputName={'right_image'}
            />
        </div>
    );
};

export default AttachFilesBlock;
