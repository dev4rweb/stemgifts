import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {InertiaLink} from "@inertiajs/inertia-react";
import {Inertia} from "@inertiajs/inertia";
import {editDrawWinnerAction} from "../../../reducers/modalReducer";

const AdminTableCompetitionsItem = ({item, index}) => {
    const dispatch = useDispatch()
    const stateData = useSelector(state => state.lang)
    const itemType = item.is_competition  ?
        stateData.admin.compPage.table.give[stateData.lang] :
        stateData.admin.compPage.table.giveaway[stateData.lang]

    let color = '#e72d2d';
    if (item.status === 3) color = '#cd953e';
    if (item.status === 0) color = '#60d346';

    const translateStatus = () => {
        if (item.status === 0) {
            return stateData.admin.compPage.table.active[stateData.lang]
        }
        if (item.status === 3) {
            return stateData.admin.compPage.table.del[stateData.lang]
        }
        if (item.status === 1) {
            return stateData.admin.compPage.table.play[stateData.lang]
        }
        if (item.status === 2) {
            return stateData.admin.compPage.table.moder[stateData.lang]
        }
    };

    const editHandler = e => {
        console.log('editHandler', item)
    };
    const drawHandler = e => {
        console.log('drawHandler', item)
        dispatch(editDrawWinnerAction(item))
    };
    const removeHandler = e => {
        console.log('removeHandler', item)
        Inertia.patch(`admin-games/${item.id}`,{
            status: 3
        })
    };


    return (
        <tr>
            <th scope="row">{index + 1}</th>
            <th scope="row">#{item.id}</th>
            <th scope="row">{item.name}</th>
            <th scope="row">{itemType}</th>
            {/*<td>id/!*{item.owner}*!/1</td>*/}
            <td>
                {item.end_date}
            </td>

            <td
                className={`table-status `}
                style={{color: color}}
            >
                {translateStatus()}
            </td>
            <td
                className="grey-text"
                onClick={editHandler}
            >
                <InertiaLink
                    href={`/admin-games/${item.id}`}
                >
                    {stateData.admin.compPage.table.edit[stateData.lang]}
                </InertiaLink>
            </td>
            <td
                className="grey-text"
                onClick={drawHandler}
            >
                {stateData.admin.compPage.table.draw[stateData.lang]}
            </td>
            <td
                className="grey-text"
                onClick={removeHandler}
            >
                {stateData.admin.compPage.table.remove[stateData.lang]}
            </td>
        </tr>
    );
};

export default AdminTableCompetitionsItem;
