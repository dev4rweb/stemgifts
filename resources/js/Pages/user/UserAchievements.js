import React, {useEffect} from 'react';
import {usePage} from "@inertiajs/inertia-react";
import {useDispatch, useSelector} from "react-redux";
import m from "../../../sass/pages/AdminPage.module.scss";
import UserSidebar from "../../components/parts/UserSidebar";
import s from "../../../sass/pages/AdminMainPage.module.scss";
import UserLayout from "../../components/parts/UserLayout";
import {setSnackMessageAction} from "../../reducers/mainReducer";

const UserAchievements = ({gifts, errors}) => {
    const { auth } = usePage().props
    const dispatch = useDispatch()
    const stateData = useSelector(state => state.lang)

    console.log('UserAchievements gifts', gifts)

    useEffect(() => {
        if (errors && errors.error)
            dispatch(setSnackMessageAction(errors.error))
    }, [errors]);

    return (
        <UserLayout>
            <div className={`container admin-page ${m.adminPage}`}>
                <UserSidebar/>
                <div className={`container ${s.adminMainPage}`}>
                    <div className="title-wrapper">
                        <p className="admin-title">| {stateData.admin.mainWin[stateData.lang]} points - {auth.user.votes}</p>
                        <hr/>
                    </div>

                    <div>
                        {
                            gifts.length ?
                                <ul className="list-group">
                                    {
                                        gifts.map((item, i) =>
                                            <li
                                                key={item.id}
                                                className="list-group-item"
                                            >
                                                {i + 1}. {item.gift_key}
                                            </li>)
                                    }
                                </ul>
                                :
                                <h1>You have no any keys</h1>
                        }
                    </div>

                </div>
            </div>
        </UserLayout>
    );
};

export default UserAchievements;
