import React from 'react';
import {useSelector} from "react-redux";

const LogRegWelcome = () => {
    const stateData = useSelector(state => state.lang)
    return (
        <h4
            className="mt-3"
            style={{textAlign: 'center'}}
        >
            {stateData.modalIsLogged.please[stateData.lang]}
            <a href="/login">
                <strong>
                    {stateData.modalIsLogged.auth[stateData.lang]}
                </strong>
            </a>
            {stateData.modalIsLogged.or[stateData.lang]}
            <a href="/register">
                <strong>
                    {stateData.modalIsLogged.register[stateData.lang]}
                </strong>
            </a>
        </h4>
    );
};

export default LogRegWelcome;
