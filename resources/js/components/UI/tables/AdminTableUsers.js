import React from 'react';
import {useSelector} from "react-redux";
import '../../../../sass/components/AdminTable.scss'
import AdminTableUsersItem from "./AdminTableUsersItem";

const AdminTableUsers = ({users}) => {
    const stateData = useSelector(state => state.lang)
    return (
        <table className="table table-striped">
            <thead>
            <tr>
                <th scope="col">№</th>
                <th scope="col">Id</th>
                <th scope="col">{stateData.admin.userPage.date[stateData.lang]}</th>
                <th scope="col">{stateData.admin.userPage.email[stateData.lang]}</th>
                <th scope="col">{stateData.admin.userPage.votes[stateData.lang]}</th>
                <th scope="col">{stateData.admin.userPage.give[stateData.lang]}</th>
                <th scope="col">{stateData.admin.userPage.part[stateData.lang]}</th>
                <th scope="col">{stateData.admin.userPage.link[stateData.lang]}</th>
                <th scope="col"/>
            </tr>
            </thead>
            <tbody>
            {
                users.map((user, index) =>
                    <AdminTableUsersItem
                        key={user.id}
                        user={user}
                        index={index}
                    />
                )
            }
            </tbody>
        </table>
    );
};

export default AdminTableUsers;
