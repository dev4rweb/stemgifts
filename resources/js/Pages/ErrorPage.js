import React from 'react';
import s from '../../sass/pages/ErrorPage.module.scss'
import {InertiaLink} from "@inertiajs/inertia-react";

const ErrorPage = () => {
    return (
        <div className={s.errorPage}>
            <h1>404</h1>
            <InertiaLink
                href={'/'}
            >
                Goto Home
            </InertiaLink>
        </div>
    );
};

export default ErrorPage;
