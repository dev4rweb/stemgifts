import React from 'react';
import s from '../../sass/pages/HomePage.module.scss'
import Layout from "../components/parts/Layout";

const HomePage = ({errors}) => {
    console.log('HomePage', errors)
    return (
        <Layout>
            <article className={`${s.homePage}`}>
            </article>
        </Layout>
    );
};

export default HomePage;
