import React, {useEffect, useState} from 'react';
import s from '../../../sass/components/UI/RadioItem.module.scss'
import {useDispatch, useSelector} from "react-redux";

const Task = ({task, selector, createTaskAction}) => {
    const dispatch = useDispatch()
    const [url, setUrl] = useState('')

    const checkHandler = () => {
        dispatch(createTaskAction({
            task_category_items_id: task.id,
            url: url
        }))
        console.log('checkHandler', task)
        console.log('checkHandler selector', selector)
    };

    const urlHandler = e => {
        setUrl(e.target.value)
        dispatch(createTaskAction({
            task_category_items_id: task.id,
            url: e.target.value
        }))
    };


    return (
        <div
            key={task.id}
            className={s.radioItem}
        >
            <div className={s.optionsContainer}>
                <div className={s.option}>
                    <div
                        className={s.radioBtn}
                        onClick={checkHandler}
                    >
                        <span
                            style={{
                                backgroundColor: ` ${selector.task_category_items_id === task.id ? "#2b2f4c" : "#3d4266"} `
                            }}
                        />
                    </div>
                    <p className={s.optionTask}>
                        {task.title}
                    </p>

                    <input
                        type="url"
                        className="custom-input option-input"
                        placeholder="https://steamgifts/"
                        value={url}
                        onChange={urlHandler}
                    />
                </div>
            </div>
        </div>
    );
};

export default Task;
