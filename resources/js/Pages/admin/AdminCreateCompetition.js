import React, {useState} from 'react';
import s from '../../../sass/pages/CreatePage.module.scss'
import m from '../../../sass/pages/AdminPage.module.scss'
import AdminLayout from "../../components/parts/AdminLayout";
import {useSelector} from "react-redux";
import AdminSideBar from "../../components/parts/AdminSideBar";
import {Switch} from "@material-ui/core";
import AttachFilesBlock from "../../components/AttachFilesBlock";

const AdminCreateCompetition = ({errors}) => {
    const stateData = useSelector(state => state.lang)
    const [game, setGame] = useState({
        name: '',
        description: '',
        is_competition: false,
        status: 0,
        start_date: '',
        end_date: '',
        main_image: '',
        secondary_image: '',
        left_image: '',
        right_image: '',
        is_favorite: false,
        is_sponsored: false,
    })

    const switchHandler = e => {
        console.log('switchHandler', e.target.checked)
        setGame({...game, ['is_competition']: !game.is_competition})
    };

    const handleChange = (e) => {
        e.preventDefault()
        const key = e.target.id;
        const value = e.target.value
        setGame(values => ({
            ...values,
            [key]: value,
        }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log('handleSubmit')
    };

    return (
        <AdminLayout>
            <div className={`container admin-page ${m.adminPage}`}>
                <AdminSideBar/>
                <div className={`container ${s.createPage}`}>
                    <div className="title-wrapper">
                        <p className="admin-title">| {stateData.admin.createGive.title[stateData.lang]}</p>
                        <hr/>
                    </div>
                    <p className={s.taskP}>{stateData.admin.createGive.subTitle[stateData.lang]}</p>

                    <div className={s.inputBox}>
                        <div className={s.toggleBox}>
                            <label className="me-3">
                                {/*https://www.npmjs.com/package/react-switch*/}
                                <Switch
                                    onChange={switchHandler}
                                    checked={game.is_competition === false}
                                />
                                <span>
                                    {stateData.admin.createGive.give[stateData.lang]}
                                </span>
                            </label>
                            <label>
                                <Switch
                                    onChange={switchHandler}
                                    checked={game.is_competition === true}
                                />
                                <span>
                                    {stateData.admin.createGive.typeGive[stateData.lang]}
                                </span>
                            </label>
                        </div>

                        <div className={s.calendarBox}>
                            <div className="form-group">
                                <label htmlFor="start_date">
                                    {stateData.admin.createGive.start[stateData.lang]}
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="start_date"
                                    value={game.start_date}
                                    onChange={handleChange}
                                />
                            </div>


                            <div className="form-group">
                                <label htmlFor="end_date">
                                    {stateData.admin.createGive.end[stateData.lang]}
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="end_date"
                                    value={game.end_date}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={s.titleBox}>
                        <input
                            type="text"
                            className="custom-input"
                            id='name'
                            value={game.name}
                            onChange={handleChange}
                            placeholder={stateData.admin.createGive.name[stateData.lang]}
                            required
                        />
                    </div>

                    <div className={s.description}>
                        <textarea
                            name="description"
                            id="description"
                            value={game.description}
                            onChange={handleChange}
                            className="custom-textarea"
                            placeholder={stateData.admin.createGive.desc[stateData.lang]}
                        />
                    </div>

                    <AttachFilesBlock
                        game={game}
                        setGame={setGame}
                    />

                    {
                        game.is_competition ?
                            <div>Task container</div>
                            :
                            <div/>
                    }
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminCreateCompetition;
