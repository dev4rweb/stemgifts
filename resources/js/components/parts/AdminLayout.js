import React from 'react';
import AdminHeader from "./AdminHeader";
import {useSelector} from "react-redux";
import SnackMessage from "../SnackMessage";

const AdminLayout = ({children}) => {
    const snackMsg = useSelector(state => state.main.snackMessage)
    return (
        <main className='admin-panel'>
            <AdminHeader/>
            <article>
                {children}
            </article>
            {snackMsg && <SnackMessage message={snackMsg} hideTime={5000}/>}
        </main>
    );
};

export default AdminLayout;
