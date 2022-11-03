import React from 'react';
import {usePage} from "@inertiajs/inertia-react";
import {useSelector} from "react-redux";
import m from "../../../sass/pages/AdminPage.module.scss";
import UserSidebar from "../../components/parts/UserSidebar";
import s from "../../../sass/pages/AdminMainPage.module.scss";
import UserLayout from "../../components/parts/UserLayout";

const UserAchievements = () => {
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
                    <h1>User Achievements</h1>
                </div>
            </div>
        </UserLayout>
    );
};

export default UserAchievements;
