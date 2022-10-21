import React from 'react';
import s from '../../../sass/pages/AdminMainPage.module.scss'
import m from '../../../sass/pages/AdminPage.module.scss'
import AdminLayout from "../../components/parts/AdminLayout";
import {useSelector} from "react-redux";
import AdminSideBar from "../../components/parts/AdminSideBar";

const AdminCreateCompetition = () => {
    const stateData = useSelector(state => state.lang)

    return (
        <AdminLayout>
            <div className={`container admin-page ${m.adminPage}`}>
                <AdminSideBar/>
                <div className={`container ${s.adminMainPage}`}>
                    <div className="title-wrapper">
                        <p className="admin-title">| {stateData.admin.createGive.title[stateData.lang]}</p>
                        <hr/>
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
};

export default AdminCreateCompetition;
