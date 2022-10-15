import React, {useEffect, useState} from 'react';
import s from '../../sass/components/Timer.module.scss'
import {useSelector} from "react-redux";

const Timer = () => {
    const stateData = useSelector(state => state.lang);
    const [distance, setDistance] = useState(null);
    const time = `December 31, 2022 00:00:25`;
    const countDownDate = new Date(time).getTime();

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            setDistance((countDownDate - now));
            // console.log('This will run every second!', countDownDate);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // let days = Math.floor(props.distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    function splitNumber(number) {
        let output = [];
        if (number > 9) {
            let sNumber = number.toString();
            for (let i = 0; i < sNumber.length; i++) {
                output.push(sNumber.charAt(i));
            }
        } else {
            output.push('0');
            output.push(number.toString());
        }
        return output;
    }

    return (
        <div className={s.timer}>
            <p className={s.clock}>
                <b>{splitNumber(hours)[0]}</b> <b>{splitNumber(hours)[1]}</b>
                <span>:</span>
                <b>{splitNumber(minutes)[0]}</b> <b>{splitNumber(minutes)[1]}</b>
                <span>:</span>
                <b>{splitNumber(seconds)[0]}</b> <b>{splitNumber(seconds)[1]}</b>
            </p>
            <p className={s.sign}>
                <span>{stateData.home.clock.hour[stateData.lang]}</span>
                <span>{stateData.home.clock.minute[stateData.lang]}</span>
                <span>{stateData.home.clock.second[stateData.lang]}</span>
            </p>
        </div>
    )
};

export default Timer;
