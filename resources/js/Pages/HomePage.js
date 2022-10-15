import React from 'react';
import s from '../../sass/pages/HomePage.module.scss'
import Layout from "../components/parts/Layout";
import dots from '../../assets/png/dots.png'
import {useDispatch, useSelector} from "react-redux";
import Timer from "../components/Timer";
import SocialBlock from "../components/SocialBlock";
import {usePage} from "@inertiajs/inertia-react";
import {setSnackMessageAction} from "../reducers/mainReducer";
import {Inertia} from "@inertiajs/inertia";

const HomePage = ({errors}) => {
    const dispatch = useDispatch()
    const { auth } = usePage().props
    console.log('HomePage', errors)
    const stateData = useSelector(state => state.lang)

    const handleIsLogged = e => {
        if (auth.user) dispatch(setSnackMessageAction('What we need to do?'))
        else Inertia.visit('/login')
    };

    return (
        <Layout>
            <article className={`${s.homePage}`}>
                <div className={s.layer}>
                    <img className={s.back} src={dots} alt="canvas"/>
                </div>

                <section className={`container ${s.content}`}>
                    <h2>{stateData.home.header[stateData.lang]}</h2>
                    <Timer />
                    <SocialBlock />
                    <button
                        className="btn btn-warning mt-3 mb-5"
                        style={{zIndex: '1'}}
                        onClick={handleIsLogged}
                    >
                        {stateData.home.get_key[stateData.lang]}
                    </button>
                </section>
            </article>
        </Layout>
    );
};

export default HomePage;
