import React from 'react';
import {useSelector} from "react-redux";

const UserTableItem = ({game, gifts}) => {
    const stateData = useSelector(state => state.lang)

    const isWinner = () => {
        const isGift = gifts.find(i => i.game_id === game.id)
        if (isGift) return stateData.user.victory[stateData.lang]
        if (game.status === 0) return stateData.user.ongoing[stateData.lang]
        return stateData.user.fail[stateData.lang]
    };

    const getColor = () => {
        const isGift = gifts.find(i => i.game_id === game.id)
        if (isGift || game.status === 0) return '#60d346'
        return '#e72d2d'
    };

    return (
        <tr>
            <th scope="row">#{game.id} </th>
            {/*<td>0</td>*/}
            <td>{game.end_date}</td>
            <td className="text-center">{game.users.length}</td>
            <td className="table-status" style={{color: getColor()}}> {isWinner()} </td>
        </tr>
    );
};

export default UserTableItem;
