import React from 'react';
import s from '../../../sass/pages/AdminPage.module.scss'
import management from '../../../assets/icons/management.svg'
import managementOrange from '../../../assets/icons/management-hover.svg'
import trophy from '../../../assets/icons/trophy.svg'
import trophyOrange from '../../../assets/icons/trophy-hover.svg'
import profile from '../../../assets/icons/user.svg'
import profileOrange from '../../../assets/icons/user-hover.svg'
import {InertiaLink, usePage} from "@inertiajs/inertia-react";
import {useDispatch, useSelector} from "react-redux";
import {setLang} from "../../reducers/translateReducer";
import steam from "../../../assets/png/steam-icon-white.png";
import logout from "../../../assets/icons/logout-blue.png";

const AdminSideBar = () => {
    const { auth } = usePage().props
    const dispatch = useDispatch()
    const stateData = useSelector(state => state.lang)
    const language = localStorage.getItem('lang') ?? "en"
    if (!stateData) dispatch(setLang(language))
    const sidebarData = [
        {
            id: 1,
            url: '/admin-panel',
            icon: management,
            activeIcon: managementOrange,
            name: stateData.admin.mainTab[stateData.lang]
        },
        {
            id: 2,
            url: '/admin-competitions',
            icon: trophy,
            activeIcon: trophyOrange,
            name: stateData.admin.competitionTab[stateData.lang]
        },
        {
            id: 3,
            url: '/admin-users',
            icon: profile,
            activeIcon: profileOrange,
            name: stateData.admin.usersTab[stateData.lang]
        },
        {
            id: 4,
            url: '/admin-test-page',
            icon: management,
            activeIcon: managementOrange,
            name: stateData.admin.testPage[stateData.lang]
        },
    ]
    const isActiveItem = url => !!window.location.href.includes(url);

    console.log('AdminSideBar', auth)

    return (
        <ul className={s.navigation}>
            {
                sidebarData.map(item =>
                    <li
                        className={`${s.item} ${isActiveItem(item.url) && s.active}`}
                        key={item.id}
                    >
                        <InertiaLink
                            href={item.url}
                            style={{color: isActiveItem(item.url) ? '#fbb527' : '#fdfdfd'}}
                            className={`${s.item} ${isActiveItem(item.url) && s.active}`}
                        >
                            {
                                isActiveItem(item.url) ?
                                    <img src={item.activeIcon} width="23px" alt=""/>
                                    :
                                    <img src={item.icon} width="23px" alt=""/>
                            }
                            {item.name}
                        </InertiaLink>
                    </li>
                )
            }
            <li className={s.btnWrapper}>
                <div className='outline-radius'
                >
                    <InertiaLink
                        href="/logout"
                        method="post"
                        as="button"
                        type="button"
                        className="btn btn-success w-100 btn-logout"
                    >
                            <span>
                                <img src={steam} alt="icon"/>
                            </span>
                        {auth.user.name}
                        <img src={logout} alt="icon"/>
                    </InertiaLink>
                </div>
            </li>
        </ul>
    );
};

export default AdminSideBar;
