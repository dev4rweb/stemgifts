import React from 'react';
import {useSelector} from "react-redux";
import '../../../../sass/components/AdminTable.scss'
import UserTableItem from "./UserTableItem";

const UserTable = ({games}) => {
    const stateData = useSelector(state => state.lang)
    return (
        <table className="table table-striped">
            <thead>
            <tr>
                <th scope="col">{stateData.user.comp[stateData.lang]}</th>
                <th scope="col">{stateData.user.own[stateData.lang]}</th>
                <th scope="col">{stateData.user.dateEnd[stateData.lang]}</th>
                <th scope="col">{stateData.user.amount[stateData.lang]}</th>
                <th scope="col">{stateData.user.res[stateData.lang]}</th>
            </tr>
            </thead>
            <tbody>
            {
                games.map((game, index) =>
                    <UserTableItem game={game} key={index} index={index}/>
                )
            }
            </tbody>
        </table>
    );
};

export default UserTable;
