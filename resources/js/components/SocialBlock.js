import React from 'react';
import s from "../../sass/pages/HomePage.module.scss";
import steam from '../../assets/icons/steam.png'
import face from '../../assets/icons/face.png'
import telegram from '../../assets/icons/telegram.png'
import twitch from '../../assets/icons/twitch.png'
import fb from '../../assets/icons/fb.png'
import {InertiaLink} from "@inertiajs/inertia-react";

const SocialBlock = () => {
    return (
        <div className={s.social}>
            <InertiaLink href="/" target="_blank"><img src={steam} alt="steam"/></InertiaLink>
            <InertiaLink href="/" target="_blank"><img src={face} alt="face"/></InertiaLink>
            <InertiaLink href="/" target="_blank"><img src={telegram} alt="telegram"/></InertiaLink>
            <InertiaLink href="/" target="_blank"><img src={twitch} alt="twitch"/></InertiaLink>
            <InertiaLink href="/" target="_blank"><img src={fb} alt="fb"/></InertiaLink>
        </div>
    );
};

export default SocialBlock;
