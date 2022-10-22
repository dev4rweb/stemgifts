import React from 'react';
import {useSelector} from "react-redux";
import '../../../../sass/components/AdminTable.scss'
import AdminTableCompetitionsItem from "./AdminTableCompetitionsItem";

const AdminTableCompetitions = ({games}) => {
    const stateData = useSelector(state => state.lang)
    return (
        <table className="table table-striped">
            <thead>
            <tr>
                <th scope="col">№</th>
                <th scope="col">{stateData.admin.compPage.table.give[stateData.lang]}</th>
                <th scope="col">{stateData.admin.compPage.table.title[stateData.lang]}</th>
                <th scope="col">{stateData.admin.compPage.table.type[stateData.lang]}</th>
                {/*<th scope="col">{stateData.admin.compPage.table.owner[stateData.lang]}</th>*/}
                <th scope="col">{stateData.admin.compPage.table.created[stateData.lang]}</th>
                <th scope="col">{stateData.admin.compPage.table.status[stateData.lang]}</th>
                <th scope="col"/>
                <th scope="col"/>
                <th scope="col"/>
            </tr>
            </thead>

            <tbody>
            {
                games.map((game, index) =>
                    <AdminTableCompetitionsItem item={game} key={game.id} index={index} />
                )
            }
            </tbody>
        </table>
    );
};

export default AdminTableCompetitions;
