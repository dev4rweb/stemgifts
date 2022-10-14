import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {InertiaLink} from "@inertiajs/inertia-react";
import {useDispatch, useSelector} from "react-redux";
import {Inertia} from "@inertiajs/inertia";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
        },
    },
    input: {
        '& input, label': {
            color: 'white',
            fontFamaly: 'Montserrat, sans-serif'
        },
        '& label.Mui-focused': {
            color: '#9a9a9a',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#9a9a9a',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#b6c4d2',
            },
            '&:hover fieldset': {
                borderColor: '#9a9fbe',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#9a9a9a',
            },
        },
    },
    cbx: {
        color: 'white',
        '&$checked': {
            color: 'white',
        },
        '& .MuiCheckbox-root': {
            color: 'white'
        }
    },
    button: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        // backgroundColor: '#0063cc',
        borderColor: '#fdfdfd',
        color: '#fdfdfd',
        fontFamily: [
            'Montserrat',
            'sans-serif',
        ].join(','),
        '&:hover': {
            // backgroundColor: '#0069d9',
            borderColor: '#6f7bb6',
            color: '#6f7bb6',
            // boxShadow: 'none',
        },
        /*'&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
        },*/
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    }
}));

const RegisterPage = ({errors}) => {
    const classes = useStyles();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [error, setError] = useState(null)

    useEffect(() => {
        console.log('useEffect', errors)
        setError(errors)
    }, [errors]);

    const submitHandler = (e) => {
        e.preventDefault()
        Inertia.post('/register', {
            name, email, password,
            password_confirmation: passwordConfirm
        })
    }

    return (
        <div
            className="container"
            style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <h1><InertiaLink href="/">Giveaway</InertiaLink></h1>
            <h3>Register</h3>
            <form
                className={classes.root}
                autoComplete="off"
                onSubmit={submitHandler}
            >

                <div className="mb-3">
                    <TextField
                        id="standard-basic-name"
                        label="Name"
                        type="text"
                        variant="outlined"
                        className={classes.input}
                        value={name}
                        onChange={event => setName(event.target.value)}
                        onInput={e => setError(null)}
                        required
                    />
                    {
                        error && error.name &&
                            <div style={{color: '#ff0000'}}>
                                {error.name}
                            </div>
                    }
                </div>
                <div className="mb-3">
                    <TextField
                        id="standard-basic-email"
                        label="Email"
                        type="email"
                        variant="outlined"
                        className={classes.input}
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        onInput={e => setError(null)}
                        required
                    />
                    {
                        error && error.email &&
                            <div style={{color: '#ff0000'}}>
                                {error.email}
                            </div>
                    }
                </div>
                <div className="mb-3">
                    <TextField
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        variant="outlined"
                        autoComplete="current-password"
                        className={classes.input}
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        onInput={e => setError(null)}
                        required
                    />
                    {
                        error && error.password &&
                            <div style={{color: '#ff0000'}}>
                                {error.password}
                            </div>
                    }
                </div>
                <div className="mb-3">
                    <TextField
                        id="standard-password-input-confirm"
                        label="Confirm password"
                        type="password"
                        variant="outlined"
                        className={classes.input}
                        autoComplete="current-password"
                        value={passwordConfirm}
                        onChange={event => setPasswordConfirm(event.target.value)}
                        onInput={e => setError(null)}
                        required
                    />
                    {
                        error && error.password_confirmation &&
                            <div style={{color: '#ff0000'}}>
                                {error.password_confirmation}
                            </div>
                    }
                </div>

                <Button
                    variant="outlined"
                    className={classes.button}
                    type="submit"
                >
                    Register
                </Button>
            </form>
            <InertiaLink
                href={'/login'}
            >
                or Login
            </InertiaLink>

            <div>
                <InertiaLink href={'/privacy-policy'}>Privacy Policy</InertiaLink>
            </div>

        </div>
    );
};

export default RegisterPage;
