import React from 'react';
import "../../../sass/components/GiftBlock.scss"
import {Inertia} from "@inertiajs/inertia";
import {useDispatch} from "react-redux";
import {removeGiftAction} from "../../reducers/pages/createCompetitionReducer";

const GiftBlockItem = ({gift, index}) => {
    const dispatch = useDispatch()

    const removeKeyHandler = e => {
        console.log('removeKeyHandler', gift)
        if (gift.id)
            Inertia.delete(`/gifts/${gift.id}`, {preserveScroll: true})
        else dispatch(removeGiftAction(gift.gift_key))
    };

    return (
        <li className="gift-list-item">
            <span>#{index + 1}</span>
            {
                gift.user_id ?
                    <p style={{color: '#9a9a9a'}}>{gift.gift_key}</p>
                    :
                    <p>{gift.gift_key}</p>
            }
            {
                gift.user_id ?
                    <span className="used-key">-</span>
                    :
                    <span className="remove-key" onClick={removeKeyHandler}>&times;</span>
            }
        </li>
    );
};

export default GiftBlockItem;
