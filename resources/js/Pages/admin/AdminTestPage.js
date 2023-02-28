import React from 'react';
import {useSelector} from "react-redux";
import AdminLayout from "../../components/parts/AdminLayout";
import m from "../../../sass/pages/AdminPage.module.scss";
import AdminSideBar from "../../components/parts/AdminSideBar";
import s from "../../../sass/pages/AdminMainPage.module.scss";

//https://www.youtube.com/watch?v=rfHX-Hecu3k
//https://github.com/invisnik/laravel-steam-auth
const AdminTestPage = () => {
    const stateData = useSelector(state => state.lang)
    return (
        <AdminLayout>
            <div className={`container admin-page ${m.adminPage}`}>
                <AdminSideBar/>
                <div className={`container ${s.adminMainPage}`}>
                    <div className="title-wrapper">
                        <p className="admin-title">| {stateData.admin.testPage[stateData.lang]}</p>
                        <hr/>
                    </div>
                    <h1>{stateData.admin.testPage[stateData.lang]}</h1>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminTestPage;
