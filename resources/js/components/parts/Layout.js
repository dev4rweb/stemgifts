import React from 'react';
import leftX from "../../../assets/png/leftX.png";
import rightX from "../../../assets/png/rightX.png";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({children}) => {
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
        </>
    );
};

export default Layout;
