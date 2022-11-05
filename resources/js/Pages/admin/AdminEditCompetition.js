import React, {createRef, useEffect, useState} from 'react';
import s from '../../../sass/pages/CreatePage.module.scss'
import m from '../../../sass/pages/AdminPage.module.scss'
import {setSnackMessageAction} from "../../reducers/mainReducer";
import {useDispatch, useSelector} from "react-redux";
import {Inertia} from "@inertiajs/inertia";
import AdminSideBar from "../../components/parts/AdminSideBar";
import {Switch} from "@material-ui/core";
import AttachFilesBlock from "../../components/AttachFilesBlock";
import AdminLayout from "../../components/parts/AdminLayout";
import TaskContainer from "../../components/Tasks/TaskContainer";
import {
    setCreateTaskOneAction,
    setCreateTaskThreeAction,
    setCreateTaskTwoAction
} from "../../reducers/pages/createCompetitionReducer";
import GiftBlock from "../../components/GiftBlock/GiftBlock";

const AdminEditCompetition = ({item, categories, errors}) => {
    const dispatch = useDispatch()
    const stateData = useSelector(state => state.lang)
    const taskOneSelector = useSelector(state => state.createCompetition.createTaskOne)
    const taskTwoSelector = useSelector(state => state.createCompetition.createTaskTwo)
    const taskThreeSelector = useSelector(state => state.createCompetition.createTaskThree)
    const [req, setReq] = useState(null)
    let requireField = createRef();

    const dateFormat = date => {
        if (date) {
            let parts = date.split('-');
            const d = new Date(parts[2], parts[1] - 1, parts[0])
            let month = '' + (d.getMonth() + 1)
            let day = '' + d.getDate()
            let year = d.getFullYear()

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }
        return ''
    };

    const [game, setGame] = useState({
        name: item.name || '',
        description: item.description || '',
        is_competition: item.is_competition || false,
        status: item.status || 0,
        start_date: dateFormat(item.start_date) || '',
        end_date: dateFormat(item.end_date) || '',
        main_image: item.main_image || '',
        secondary_image: item.secondary_image || '',
        left_image: item.left_image || '',
        right_image: item.right_image || '',
        is_favorite: item.is_favorite || false,
        is_sponsored: item.is_sponsored || false,
        tasks: item.tasks || [],
        gifts: item.gifts || []
    })
    console.log('AdminEditCompetition item', item)
    console.log('AdminEditCompetition game', game)
    console.log('AdminEditCompetition categories', categories)
    console.log('AdminEditCompetition err', errors.error)

    useEffect(() => {
        if (errors && errors.error) {
            dispatch(setSnackMessageAction(errors.error));
            setGame({
                ...game,
                ['gifts'] : item.gifts || []
            })
        }
    }, [errors]);

    useEffect(() => {
        if (item.tasks.length) {
            dispatch(setCreateTaskOneAction(item.tasks[0]))
            if (item.tasks.length === 2) {
                dispatch(setCreateTaskTwoAction(item.tasks[1]))
            }
            if (item.tasks.length >= 3) {
                dispatch(setCreateTaskTwoAction(item.tasks[1]))
                dispatch(setCreateTaskThreeAction(item.tasks[2]))
            }
        }
    }, [item.tasks]);

    const switchHandler = e => {
        console.log('switchHandler', e.target.checked)
        setGame({...game, ['is_competition']: !game.is_competition})
    };

    const handleChange = (e) => {
        e.preventDefault()
        const key = e.target.id;
        const value = e.target.value
        if (key === 'name') setReq(null)
        setGame(values => ({
            ...values,
            [key]: value,
        }));
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log('handleSubmit', game)

        if (!game.name.trim()) {
            console.log('handleSubmit need to focus')
            requireField.current.focus()
            setReq('Required field')
        } else {
            const newTasks = []
            if(taskOneSelector && taskOneSelector.task_category_item_id)
                newTasks.push(taskOneSelector)
            if(taskTwoSelector && taskTwoSelector.task_category_item_id)
                newTasks.push(taskTwoSelector)
            if(taskThreeSelector && taskThreeSelector.task_category_item_id)
                newTasks.push(taskThreeSelector)
            game.tasks_new = newTasks
            Inertia.patch(`/admin-games/${item.id}`, game)
        }
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
                                    style={{color: '#ffffff'}}
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
                                    style={{color: '#ffffff'}}
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
                            ref={requireField}
                            value={game.name}
                            onChange={handleChange}
                            placeholder={stateData.admin.createGive.name[stateData.lang]}
                        />
                        {req && <div style={{color: '#ff0000'}}>{req}</div>}
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

                    <div className={s.giftBox}>
                        {
                            game.gifts.length &&
                                <div>
                                    <h2>Keys</h2>
                                    <GiftBlock gifts={game.gifts} gameId={item.id}/>
                                </div>

                        }
                    </div>

                    {
                        game.is_competition ?
                            <TaskContainer categories={categories}/>
                            :
                            <div/>
                    }

                    <div className={s.btnWrapper}>
                        <button
                            className="btn btn-warning w-100 mt-3"
                            onClick={handleSubmit}
                        >
                            {stateData.admin.createGive.btnUpdate[stateData.lang]}
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminEditCompetition;
