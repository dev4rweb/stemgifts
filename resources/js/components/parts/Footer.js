import React from 'react';
import s from '../../../sass/parts/Footer.module.scss'
import {InertiaLink} from "@inertiajs/inertia-react";
import {useSelector} from "react-redux";

const Footer = () => {
    const stateData = useSelector(state => state.lang)
    return (
        <footer className={s.footer}>
            <div className={`container ${s.wrapper}`}>
                <div className={s.left}>
                    <div className={s.logo}>
                        <h4><a href="/">Giveaway</a></h4>
                        <p>All rights reserved</p>
                    </div>
                    <nav className={s.menu}>
                        <ul>
                            <li>
                                <InertiaLink
                                    href="/faq"
                                >
                                    F.A.Q.
                                </InertiaLink>
                            </li>
                            <li><InertiaLink href="/affiliate-program">{stateData.footer.af_program[stateData.lang]}</InertiaLink></li>
                            <li><InertiaLink href="/contacts">{stateData.footer.contacts[stateData.lang]}</InertiaLink></li>
                        </ul>
                    </nav>
                </div>
                <div className={s.right}>
                    <a href="mailto:support@steamgifts.com">support@steamgifts.com</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
