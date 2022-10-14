import React, {useState} from 'react';
import s from '../../../sass/parts/Header.module.scss'
import {InertiaLink} from "@inertiajs/inertia-react";
import {useDispatch, useSelector} from "react-redux";
import {setLang} from "../../reducers/translateReducer";
import ReactFlagsSelect from "react-flags-select";
import steamWhite from '../../../assets/png/steam-icon-white.png'
import { usePage } from '@inertiajs/inertia-react'
import {setModalAuth} from "../../reducers/modalRegister";

const Header = () => {
    const { auth } = usePage().props
    const dispatch = useDispatch()
    const language = useSelector(state => state.lang.lang)
    const stateData = useSelector(state => state.lang)
    const lng = language === 'en' ? 'GB' : 'RU'
    const [selected, setSelected] = useState(lng);

    console.log('Header', auth)

    const changeLanguage = code => {
        let lang = code === "GB" ? 'en' : 'ru'
        setSelected(code)
        dispatch(setLang(lang))
        localStorage.setItem('lang', lang)
    }

    const handleLogin = e => {
        console.log('handleLogin')
        dispatch(setModalAuth(true))
    };

    return (
        <header className={`container ${s.header}`}>
            <h1><InertiaLink href="/">SteamGifts</InertiaLink></h1>
            <ReactFlagsSelect
                countries={["GB", "RU"]}
                selected={selected}
                onSelect={code => changeLanguage(code)}
                selectedSize={30}
                selectButtonClassName={s.langBtn}
            />
            <div className="btn-border">
                {
                    auth.user ?
                        auth.user.is_admin ?
                            <InertiaLink
                                className="btn btn-success"
                                href="/admin-panel"
                            >
                                <img
                                    src={steamWhite}
                                    style={{marginRight: "20px"}}
                                    alt="logo"
                                />
                                {stateData.admin.heading[language]}
                            </InertiaLink>
                            :
                            <InertiaLink
                                className="btn btn-success"
                                href="/user-panel"
                            >
                                <img
                                    src={steamWhite}
                                    style={{marginRight: "20px"}}
                                    alt="logo"
                                />
                                {stateData.user.heading[language]}
                            </InertiaLink>
                        :
                        <InertiaLink
                            className="btn btn-success"
                            href="/login"
                        >
                            <img
                                src={steamWhite}
                                style={{marginRight: "20px"}}
                                alt="logo"
                            />
                            {stateData.loginWith[language]}
                        </InertiaLink>
                }
            </div>
        </header>
    );
};

export default Header;
