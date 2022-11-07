import React, {useState} from 'react';
import '../../../sass/components/UI/InputAttach.scss'
import '../../../sass/components/UI/GiftButton.scss'
import {Inertia} from "@inertiajs/inertia";
import {useDispatch} from "react-redux";
import {addGiftAction} from "../../reducers/pages/createCompetitionReducer";

const GiftButton = ({gameId, nextNum}) => {
    const dispatch = useDispatch()
    const [gift, setGift] = useState('')

    const createGiftHandler = e => {
        e.preventDefault()
        if (gameId) {
            const giftObj = {
                gift_key: gift,
                game_id: gameId
            };
            console.log('createGiftHandler', giftObj);
            Inertia.post('/gifts', giftObj, {preserveScroll: true});
        } else {
            dispatch(addGiftAction({gift_key: gift, user_id: null}))
        }

        setGift('');
    };

    return (
        <div className="gift-button">
            <span>#{nextNum}</span>
            <form onSubmit={createGiftHandler} className="input-attach">
                <input
                    type="text"
                    className="text-field"
                    style={{color: '#ffffff'}}
                    value={gift}
                    onChange={event => setGift(event.target.value)}
                    required
                />
                <button
                    className="btn-plus"
                    type="submit"
                >
                    +
                </button>
            </form>
        </div>
    );
};

export default GiftButton;
