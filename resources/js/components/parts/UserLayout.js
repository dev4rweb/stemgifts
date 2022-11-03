import React from 'react';
import {useSelector} from "react-redux";
import SnackMessage from "../SnackMessage";
import Loader from "../Loader";
import UserHeader from "./UserHeader";

const UserLayout = ({children}) => {
    const snackMsg = useSelector(state => state.main.snackMessage)
    const isLoading = useSelector(state => state.main.loading)
    return (
        <main>
            <UserHeader/>
            <article>
                {children}
            </article>
            {snackMsg && <SnackMessage message={snackMsg} hideTime={5000}/>}
            {isLoading && <Loader />}
        </main>
    );
};

export default UserLayout;
