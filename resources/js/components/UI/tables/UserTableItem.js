import React from 'react';

const UserTableItem = ({game}) => {
    return (
        <tr>
            <th scope="row">#{game.id} </th>
            <td>0</td>
            <td>{game.end_date}</td>
            <td>{game.users.length}</td>
            <td className="table-status"> winner </td>
        </tr>
    );
};

export default UserTableItem;
