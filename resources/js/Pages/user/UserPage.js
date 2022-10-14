import React from 'react';
import {Inertia} from "@inertiajs/inertia";

const UserPage = () => {
    const logoutHandler = e => {
        console.log('logoutHandler')
        Inertia.post('/logout')
    };

    return (
        <div>
            <h1>User Panel</h1>
            <button
                className="btn btn-lg btn-primary"
                onClick={logoutHandler}
            >
                Logout
            </button>
        </div>
    );
};

export default UserPage;
