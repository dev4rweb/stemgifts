import React from 'react';
import s from '../../../sass/pages/AdminMainPage.module.scss'
import m from '../../../sass/pages/AdminPage.module.scss'
import {Inertia} from "@inertiajs/inertia";
import {useSelector} from "react-redux";
import AdminLayout from "../../components/parts/AdminLayout";
import AdminSideBar from "../../components/parts/AdminSideBar";

const AdminPage = ({countUsers, activeGames, moderationGames}) => {
    const stateData = useSelector(state => state.lang)

    return (
        <AdminLayout>
            <div className={`container admin-page ${m.adminPage}`}>
                <AdminSideBar/>
                <div className={`container ${s.adminMainPage}`}>
                    <div className="title-wrapper">
                        <p className="admin-title">| {stateData.admin.mainTab[stateData.lang]}</p>
                        <hr/>
                    </div>

                    <div
                        className={`${s.item} ${s.green}`}
                    >
                        <p>
                            {stateData.admin.mainPage.register[stateData.lang]}
                        </p>
                        <span>
                    {countUsers}
                </span>
                    </div>

                    <div
                        className={`${s.item} ${s.orange}`}
                    >
                        <p>
                            {stateData.admin.mainPage.give[stateData.lang]}
                        </p>
                        <span>
                    {activeGames}
                </span>
                    </div>

                    <div
                        className={`${s.item} ${s.red}`}
                    >
                        <p>
                            {stateData.admin.mainPage.moder[stateData.lang]}
                        </p>
                        <span> {moderationGames} </span>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminPage;
