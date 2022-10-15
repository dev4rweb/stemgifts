import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {useDispatch} from "react-redux";
import {setSnackMessageAction} from "../reducers/mainReducer";

const SnackMessage = ({message = '', hideTime = 5000}) => {
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return
        dispatch(setSnackMessageAction(null))
        setOpen(false)
    }

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                autoHideDuration={hideTime}
                onClose={handleClose}
                message={message}
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small"/>
                    </IconButton>
                }
            />
        </div>
    );
};

export default SnackMessage;
