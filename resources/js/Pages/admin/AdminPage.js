import React from 'react';
import {Inertia} from "@inertiajs/inertia";

const AdminPage = () => {

    const logoutHandler = e => {
        console.log('logoutHandler')
        Inertia.post('/logout')
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            <button
                className="btn btn-lg btn-primary"
                onClick={logoutHandler}
            >
                Logout
            </button>
        </div>
    );
};

export default AdminPage;
