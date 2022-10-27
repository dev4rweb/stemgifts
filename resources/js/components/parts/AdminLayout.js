import React from 'react';
import AdminHeader from "./AdminHeader";
import {useSelector} from "react-redux";
import SnackMessage from "../SnackMessage";
import Loader from "../Loader";

const AdminLayout = ({children}) => {
    const snackMsg = useSelector(state => state.main.snackMessage)
    const isLoading = useSelector(state => state.main.loading)

    return (
        <main className='admin-panel'>
            <AdminHeader/>
            <article>
                {children}
            </article>
            {snackMsg && <SnackMessage message={snackMsg} hideTime={5000}/>}
            {isLoading && <Loader />}
        </main>
    );
};

export default AdminLayout;
