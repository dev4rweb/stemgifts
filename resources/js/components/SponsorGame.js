import React from 'react';
import s from '../../sass/components/SponsorGame.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {usePage} from "@inertiajs/inertia-react";
import {setIsAuthModalOpen, setModalKey} from "../reducers/modalRegister";

const SponsorGame = ({sponsorGame}) => {
    const { auth } = usePage().props
    const dispatch = useDispatch()
    const stateData = useSelector(state => state.lang)

    console.log('SponsorGame', sponsorGame)

    const takeKeyHandler = e => {
        // console.log('takeKeyHandler')
        if (auth.user) {
            dispatch(setModalKey(true))
        } else
            dispatch(setIsAuthModalOpen(true))
    };

    return (
        <div className="mb-5">
            <div
                className={s.sponsorCard}
                style={{backgroundImage: `url(${sponsorGame.main_image})`}}
            >
                <div className={s.content}>
                    <h3>{sponsorGame.name}</h3>
                    <a href="/">
                        {stateData.admin.userPage.link[stateData.lang]}
                    </a>
                </div>
                <button
                    className="btn btn-success"
                    onClick={takeKeyHandler}
                >
                    {stateData.home.get_key[stateData.lang]}
                </button>
            </div>
        </div>
    );
};

export default SponsorGame;
