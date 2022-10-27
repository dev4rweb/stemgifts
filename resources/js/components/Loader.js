import React from 'react';
import s from '../../sass/components/Loader.module.scss'

const Loader = () => {
    return (
        <div className={s.loader}>
            <div className="spinner-border text-success" role="status">
                <span className="visually-hidden"/>
            </div>
        </div>
    );
};

export default Loader;
