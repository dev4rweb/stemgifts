import React from 'react';
import leftX from "../../../assets/png/leftX.png";
import rightX from "../../../assets/png/rightX.png";
import Header from "./Header";
import Footer from "./Footer";
import {useSelector} from "react-redux";
import SnackMessage from "../SnackMessage";

const Layout = ({children}) => {
    const snackMsg = useSelector(state => state.main.snackMessage)
    let isVisible = window.innerWidth < 1700 ? "none" : 'block';

    return (
        <>
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
            <img className="leftX" src={leftX} alt="decor" style={{display: isVisible}}/>
            <img className="rightX" src={rightX} alt="decor" style={{display: isVisible}}/>
            {snackMsg && <SnackMessage message={snackMsg} hideTime={5000}/>}
        </>
    );
};

export default Layout;
