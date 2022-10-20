import React from 'react';
import AdminHeader from "./AdminHeader";

const AdminLayout = ({children}) => {
    return (
        <main className='admin-panel'>
            <AdminHeader/>
            <article>
                {children}
            </article>
        </main>
    );
};

export default AdminLayout;
