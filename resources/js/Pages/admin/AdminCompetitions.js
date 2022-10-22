import React, {useEffect} from 'react';
import s from '../../../sass/pages/AdminMainPage.module.scss'
import m from '../../../sass/pages/AdminPage.module.scss'
import AdminLayout from "../../components/parts/AdminLayout";
import {useDispatch, useSelector} from "react-redux";
import AdminSideBar from "../../components/parts/AdminSideBar";
import AdminTableCompetitions from "../../components/UI/tables/AdminTableCompetitions";
import BasePagination from "../../components/BasePagination";
import {setSnackMessageAction} from "../../reducers/mainReducer";

const AdminCompetitions = ({games, errors}) => {
    const dispatch = useDispatch()
    const stateData = useSelector(state => state.lang)
    console.log('AdminCompetitions', games)

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
                            | {stateData.admin.competitionTab[stateData.lang]}
                              - {games.total}
                        </p>
                        <hr/>
                    </div>

                    <div
                        className={`${s.item} ${s.orange}`}
                    >
                        <p>
                            {stateData.admin.compPage.give[stateData.lang]}
                        </p>
                        <span>
                            {games.data.filter(i => i.status === 0).length}
                        </span>
                    </div>

                    {
                        games && games.data.length ?
                            <AdminTableCompetitions games={games.data} />
                            :
                            <h1 className="text-center">Games not found</h1>
                    }

                    {
                        games && games.links.length ?
                            <div className="d-flex justify-content-center">
                                <BasePagination links={games.links}/>
                            </div>
                            :
                            <div/>
                    }
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminCompetitions;
