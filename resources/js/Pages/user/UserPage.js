import React, {useEffect} from 'react';
import s from '../../../sass/pages/AdminMainPage.module.scss'
import m from '../../../sass/pages/AdminPage.module.scss'
import '../../../sass/pages/UserPage.scss'
import UserLayout from "../../components/parts/UserLayout";
import UserSidebar from "../../components/parts/UserSidebar";
import {useDispatch, useSelector} from "react-redux";
import {usePage} from "@inertiajs/inertia-react";
import {setSnackMessageAction} from "../../reducers/mainReducer";
import UserTable from "../../components/UI/tables/UserTable";

const UserPage = ({games, gifts, errors}) => {
    const { auth } = usePage().props
    const dispatch = useDispatch()
    const stateData = useSelector(state => state.lang)

    console.log('UserPage Games', games)
    console.log('UserPage gifts', gifts)

    useEffect(() => {
        if (errors && errors.error)
            dispatch(setSnackMessageAction(errors.error))
    }, [errors]);

    return (
        <UserLayout>
            <div className={`container user-page ${m.adminPage}`}>
                <UserSidebar/>
                <div className={`container ${s.adminMainPage}`}>
                    <div className="title-wrapper">
                        <p className="admin-title">| {stateData.admin.mainTab[stateData.lang]} points - 100</p>
                        <hr/>
                    </div>

                    <div className="user-statistic">
                        <div className="user-stat-item stat-orange">
                            <p>{stateData.user.part[stateData.lang]} </p>
                            <span>{games.length}</span>
                        </div>
                        <div className="user-stat-item stat-green">
                            <p>{stateData.user.wins[stateData.lang]} </p>
                            <span>{gifts.length}</span>
                        </div>
                        <div className="user-stat-item stat-blue">
                            <p>{stateData.user.pend[stateData.lang]} </p>
                            <span>
                                {games.filter(i => i.status === 0).length}
                            </span>
                        </div>
                    </div>

                    <div>
                        {
                            games.length ?
                                <UserTable games={games} gifts={gifts}/>
                                :
                                <h3>Take part!</h3>
                        }
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default UserPage;
