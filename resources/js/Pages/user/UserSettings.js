import React from 'react';
import {usePage} from "@inertiajs/inertia-react";
import {useSelector} from "react-redux";
import m from "../../../sass/pages/AdminPage.module.scss";
import UserSidebar from "../../components/parts/UserSidebar";
import s from "../../../sass/pages/AdminMainPage.module.scss";
import UserLayout from "../../components/parts/UserLayout";

const UserSettings = () => {
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
                    {
                        auth.user.steam_id ?
                            <h2>Steam ID - { auth.user.steam_id}</h2>
                            :
                            <div className="m-3 d-flex justify-content-center">
                                <a
                                    className="btn btn-success"
                                    href={'/auth/steam'}
                                >
                                    Attach an account from steam
                                </a>
                            </div>
                    }
                    {
                        auth.user.twitter_id ?
                            <h2>Twitter ID - { auth.user.twitter_id}</h2>
                            :
                            <div className="m-3 d-flex justify-content-center">
                                <a
                                    className="btn btn-info"
                                    href={'/auth/twitter'}
                                >
                                    Attach an account from steam
                                </a>
                            </div>
                    }
                </div>
            </div>
        </UserLayout>
    );
};

export default UserSettings;
