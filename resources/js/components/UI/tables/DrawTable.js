import React from 'react';
import s from '../../../../sass/components/modals/ModalDrawWinner.module.scss'
import {useSelector} from "react-redux";

const DrawTable = ({users, canChange, changeOneCandidate}) => {
    const stateData = useSelector(state => state.lang)
    const game = useSelector(state => state.modal.editDrawWinner)
    const style = canChange ?
        {
            color: '#f0f0f0',
            opacity: '.5',
            cursor: 'not-allowed'
        } : {}

    const changeUser = (ev, user) => {
        if (!canChange) {
            changeOneCandidate(user)
        }
        // console.log(user, ' can ', canChange);
    }
    return (
        <table className="table table-striped">
            <tbody>
            {
                users.map((user, index) => {
                    return (
                        <tr key={index}>
                            <th scope="row">#{user.id}</th>
                            <td>{user.name}</td>
                            <td>{user.wallet.points} points</td>
                            <td>
                                {/*<ol>
                                    {
                                        tempUserTasks &&
                                        tempUserTasks.map(task => <li key={task.id}>{task.task}</li>)
                                    }
                                </ol>*/}
                            </td>
                            <td>profile link</td>
                            <td
                                className={s.drawOther}
                                style={style}
                                onClick={event => changeUser(event, user)}>
                                {stateData.admin.createGive.btnDrawOther[stateData.lang]}
                            </td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    );
};

export default DrawTable;
