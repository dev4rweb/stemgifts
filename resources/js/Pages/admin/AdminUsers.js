import React, {useEffect} from 'react';
import s from '../../../sass/pages/AdminMainPage.module.scss'
import m from '../../../sass/pages/AdminPage.module.scss'
import AdminLayout from "../../components/parts/AdminLayout";
import {useDispatch, useSelector} from "react-redux";
import AdminSideBar from "../../components/parts/AdminSideBar";
import AdminTableUsers from "../../components/UI/tables/AdminTableUsers";
import {setSnackMessageAction} from "../../reducers/mainReducer";
import BasePagination from "../../components/BasePagination";

const AdminUsers = ({users, errors}) => {
    const dispatch = useDispatch()
    const stateData = useSelector(state => state.lang)
    console.log('AdminUsers', users)
    console.log('AdminUsers errors', errors)

    useEffect(() => {
        if (errors && errors.error)
            dispatch(setSnackMessageAction(errors.error))
    }, [errors]);

    return (
        <AdminLayout>
            <div className={`container admin-page ${m.adminPage}`}>
                <AdminSideBar/>
                <div className={`container ${s.adminMainPage}`}>
                    <div className="title-wrapper">
                        <p className="admin-title">
                            | {stateData.admin.usersTab[stateData.lang]}
                            - {users.total}
                        </p>
                        <hr/>
                    </div>
                    {
                        users && users.data.length ?
                            <AdminTableUsers users={users.data}/>
                            :
                            <h1 className="text-center">Users not found</h1>
                    }
                    {
                        users && users.links.length ?
                            <div className="d-flex justify-content-center">
                                <BasePagination links={users.links}/>
                            </div>
                            :
                            <div/>
                    }
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminUsers;
