import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import s from '../../../sass/components/ModalLayout.module.scss'
import m from '../../../sass/components/modals/ModalGameDescriptiion.module.scss'
import {setGameDescription} from "../../reducers/modalReducer";
import steam from '../../../assets/png/steam-icon-white.png'
import share from '../../../assets/icons/share.png'
import {TelegramShareButton} from "react-share";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import SwitchGameDescBtn from "../UI/SwitchGameDescBtn";
import {usePage} from "@inertiajs/inertia-react";
import {Inertia} from "@inertiajs/inertia";

const ModalGameDescription = () => {
    const {auth} = usePage().props
    const dispatch = useDispatch()
    const stateData = useSelector(state => state.lang)
    const item = useSelector(state => state.modal.gameDescription)
    const rootClasses = [s.modal]

    if (item) rootClasses.push(s.active)

    const handleClose = (ev) => dispatch(setGameDescription(null))

    const handleClick = e => {
        console.log('handleClick', item)
        dispatch(setGameDescription(null))
        Inertia.post('/user-games', {
            game_id: item.id,
            points: 1
        })
    };

    const btnText = () => {
        if (item && auth.user) {
            if (item.users.length) {
                const participate = item.users.find(i => i.user_id === auth.user.id);
                if (participate) return stateData.home.joined[stateData.lang]
            }
            if (item.is_competition) return stateData.home.join_competition[stateData.lang]
            else return stateData.home.join_giveaway[stateData.lang]
        }
        return ''
    };


    const isDisabled = () => {
        if (item && auth.user) {
            if (item.users.length) {
                const participate = item.users.find(i => i.user_id === auth.user.id)
                console.log('PARTICIPATE', participate)
                return !!participate;
            }
            if (item.is_competition) {
                if (item.tasks.length) {
                    const countTasks = item.tasks.length;
                    /*const countDoneTasks = item.tasks.reduce((total, task) =>
                        total + task.users.find(i => i.user_id === auth.user.id) ? 1 : 0, 0)*/;
                    const countDoneTasks = item.tasks.filter(i => {
                        const userTask = i.users.find(m => m.user_id === auth.user.id && m.is_done === 1)
                        if (userTask) return true
                    });
                    console.log('COUNT DONE', countDoneTasks, countTasks);
                    return countTasks !== countDoneTasks.length;
                } return  false
            }
        }
        return true;
    }

    return (
        <div
            className={rootClasses.join(' ')}
            onClick={handleClose}
            style={{zIndex: 10}}
        >
            <div
                className={`${s.modalBody}  ${s.animate}`}
                onClick={event => event.stopPropagation()}
            >
                <span
                    className={s.close}
                    onClick={handleClose}
                >
                  &times;
              </span>
                <div>
                    {
                        item &&
                        <div className={m.gameDesc}>
                            <p>{item.name}</p>
                            <div className={m.imageBox}>
                                {item.left_image && <img className={m.left} src={item.left_image} alt=""/>}
                                {item.right_image && <img className={m.right} src={item.right_image} alt=""/>}
                                {item.secondary_image && <img className={m.center} src={item.secondary_image} alt=""/>}
                            </div>

                            {item.description && <p className={m.content}>{item.description}</p>}

                            {
                                item.is_competition ?
                                    <p className={m.content}
                                       style={{textAlign: 'left', marginBottom: '10px', paddingLeft: '15px'}}>
                                        {stateData.home.task[stateData.lang]}
                                    </p>
                                    :
                                    <div/>
                            }

                            {
                                item.is_competition ?
                                    <div className={m.links}>
                                        <Tabs>
                                            <TabList className={m.tasks}>
                                                {
                                                    item.tasks && item.tasks.slice(0, 3).map((item, index) =>
                                                        <Tab key={index}><img src={steam}
                                                                              alt="steam"/></Tab>)
                                                }
                                            </TabList>
                                            <div>
                                                {
                                                    item.tasks && item.tasks.slice(0, 3).map((i, index) => {
                                                        return (
                                                            <TabPanel key={index}>
                                                                <div className={m.subscribe}>
                                                                    <p>
                                                                        <span>
                                                                            {i.task}
                                                                        </span>
                                                                        {i.url}
                                                                    </p>
                                                                    <SwitchGameDescBtn
                                                                        task={i}
                                                                        // userTasks={userTasks}
                                                                    />
                                                                </div>
                                                            </TabPanel>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Tabs>
                                    </div>
                                    :
                                    <div/>
                            }

                            <div className={m.btnWrapper}>
                                <TelegramShareButton
                                    url="/"
                                    className={m.share}
                                    title={`Get the key`}
                                >
                                    <img src={share} alt="share"/>
                                </TelegramShareButton>

                                <button
                                    className="btn btn-warning"
                                    disabled={isDisabled()}
                                    onClick={handleClick}
                                >
                                    {btnText()}
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default ModalGameDescription;
