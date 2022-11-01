import React, {useEffect, useState} from 'react';
import '../../../sass/components/taskBlock.scss'
import Task from "./Task";
import {useDispatch} from "react-redux";

const TaskBlock = ({selector, createTaskAction, name, categories}) => {
    const dispatch = useDispatch()
    const [tasks, setTasks] = useState(null)

    // console.log('TaskBlock', selector)

    useEffect(() => {
        if (selector && selector.category_id) {
            categoryHandler({target: {value : selector.category_id}})
        }
    }, [selector]);

    const categoryHandler = e => {
        const curTasks = categories.find(i => i.id == e.target.value)
        if (curTasks) {
            setTasks(curTasks.task_category_items)
            console.log('categoryHandler', tasks)
        } else {
            setTasks(null)
            dispatch(createTaskAction({
                task_category_item_id: 0,
                url: ''
            }))
        }
    };

    return (
        <div className="task-wrapper mb-3">
            <h4>{name}</h4>
            {
                categories.length &&
                <div className="form-control mb-3">
                    <select
                        className="custom-select custom-select-lg w-100"
                        onChange={categoryHandler}
                    >
                        <option value="0">None</option>
                        {
                            categories.map(cat =>
                                <option
                                    key={cat.id}
                                    value={cat.id}
                                    selected={!!(selector && selector.category_id && selector.category_id === cat.id)}
                                >
                                    {cat.title}
                                </option>
                            )
                        }
                    </select>
                </div>
            }
            {
                tasks && tasks.length &&
                <div className="task-block">
                    <div className="radio-choice">
                        {
                            tasks.map(i =>
                                <Task
                                    key={i.id}
                                    task={i}
                                    selector={selector}
                                    createTaskAction={createTaskAction}
                                />
                            )
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default TaskBlock;
