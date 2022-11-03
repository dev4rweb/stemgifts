import React from 'react';
import s from '../../../sass/pages/AdminMainPage.module.scss'
import m from '../../../sass/pages/AdminPage.module.scss'
import UserLayout from "../../components/parts/UserLayout";
import UserSidebar from "../../components/parts/UserSidebar";
import {useSelector} from "react-redux";
import {usePage} from "@inertiajs/inertia-react";

const UserPage = () => {
    const { auth } = usePage().props
    const stateData = useSelector(state => state.lang)

    return (
        <UserLayout>
            <div className={`container admin-page ${m.adminPage}`}>
                <UserSidebar/>
                <div className={`container ${s.adminMainPage}`}>
                    <div className="title-wrapper">
                        <p className="admin-title">| {stateData.admin.mainTab[stateData.lang]} points - {auth.user.votes}</p>
                        <hr/>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default UserPage;
