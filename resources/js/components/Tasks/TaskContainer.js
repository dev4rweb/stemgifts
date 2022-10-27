import React from 'react';
import s from '../../../sass/pages/CreatePage.module.scss'
import {useSelector} from "react-redux";
import TaskBlock from "./TaskBlock";
import {
    setCreateTaskOneAction,
    setCreateTaskThreeAction,
    setCreateTaskTwoAction
} from "../../reducers/pages/createCompetitionReducer";

const TaskContainer = ({categories}) => {
    const stateData = useSelector(state => state.lang)
    const taskOneSelector = useSelector(state => state.createCompetition.createTaskOne)
    const taskTwoSelector = useSelector(state => state.createCompetition.createTaskTwo)
    const taskThreeSelector = useSelector(state => state.createCompetition.createTaskThree)

    // console.log('AdminCreateCompetition', categories)
    return (
        <div className={s.tasksBlock}>
            <p>{stateData.admin.createGive.cond[stateData.lang]}</p>
            <div className={s.tasks}>
                {
                    categories.length &&
                        <div className="w-100">
                            <TaskBlock
                                name={'Task one'}
                                categories={categories}
                                selector={taskOneSelector}
                                createTaskAction={setCreateTaskOneAction}
                            />

                            <TaskBlock
                                name={'Task two'}
                                categories={categories}
                                selector={taskTwoSelector}
                                createTaskAction={setCreateTaskTwoAction}
                            />

                            <TaskBlock
                                name={'Task three'}
                                categories={categories}
                                selector={taskThreeSelector}
                                createTaskAction={setCreateTaskThreeAction}
                            />
                        </div>
                }
            </div>
        </div>
    );
};

export default TaskContainer;
