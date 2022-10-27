import React, {createRef} from 'react';
import '../../../sass/components/UI/InputAttach.scss'
import {useDispatch} from "react-redux";
import {setLoadingAction, setSnackMessageAction} from "../../reducers/mainReducer";

const InputAttachFile = ({game, setGame, inputName}) => {
    const dispatch = useDispatch()
    let btn = createRef();

    const changeHandlerInput = e => {
        e.preventDefault()
        // console.log('changeHandlerInput')
        setGame({
            ...game,
            [inputName]: e.target.value
        })
    };

    const changeHandler = e => {
        e.preventDefault()
        // console.log('changeHandler', e.target.value)

        const fd = new FormData();
        fd.set('image', e.target.files[0])

        dispatch(setLoadingAction(true))
        axios.post('/file-upload', fd)
            .then(res => {
                // console.log(res)
                if (res.data.success) {
                    let filePath = res.data.filepath
                    setGame({
                        ...game,
                        [inputName]: filePath
                    })
                } else dispatch(setSnackMessageAction(res.data.message))
            }).catch(err => {
            console.log('changeHandler err', err)
            dispatch(setSnackMessageAction(err.response.message))
        }).finally(() => dispatch(setLoadingAction(false)));
    };

    const uploadFile = e => {
        // console.log('uploadFile')
        btn.current.click();
    };

    return (
        <div className="input-attach">
            <input
                type="text"
                name={inputName}
                value={game[inputName]}
                autoComplete="off"
                onChange={changeHandlerInput}
                placeholder="file link"
                className="text-field"
            />
            <input
                type="file"
                ref={btn}
                onChange={changeHandler}
                className="attach-file"
            />
            <button
                className="btn-add"
                onClick={uploadFile}
            >
                Choose file
            </button>
        </div>
    );
};

export default InputAttachFile;
