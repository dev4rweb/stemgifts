import React from 'react';
import '../../../../sass/components/AdminTable.scss'
import {useSelector} from "react-redux";
import {InertiaLink} from "@inertiajs/inertia-react";
import {Inertia} from "@inertiajs/inertia";

const AdminTableUsersItem = ({user, index}) => {
    const stateData = useSelector(state => state.lang)

    const deleteHandler = (e) => {
        console.log('deleteHandler', user)
        Inertia.delete(`/admin-user/${user.id}`)
    };

    return (
        <tr>
            <th scope="row">#{index + 1}</th>
            <td>id{user.id}</td>
            <td>{user.created_at}</td>
            <td>{user.email}</td>
            <td>{user.votes} 42</td>
            <td>789</td>
            <td>789</td>
            <td
                className={`link`}
            >
                <InertiaLink href={`/admin-user/${user.id}`}>{stateData.admin.userPage.link[stateData.lang]}</InertiaLink>
            </td>
            <td className="remove-column">
                <span
                    onClick={deleteHandler}
                >
                    &times;
                </span>
            </td>
        </tr>
    );
};

export default AdminTableUsersItem;