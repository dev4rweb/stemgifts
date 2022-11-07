import React from 'react';
import "../../../sass/components/GiftBlock.scss"
import GiftBlockItem from "./GiftBlockItem";
import GiftButton from "./GiftButton";
import {useSelector} from "react-redux";

const GiftBlock = ({gifts, gameId}) => {
    const keys = useSelector(state => state.createCompetition.gifts)
    console.log('GiftBlock', keys)
    return (
        <div className="gift-container pe-3">
            <ul className="gift-list">
                {
                    gameId ?
                        gifts.map((item, index) =>
                            <GiftBlockItem key={item.id} gift={item} index={index}/>)
                        :
                        keys.map((item, index) =>
                            <GiftBlockItem key={index} gift={item} index={index}/>)
                }
            </ul>
            <GiftButton gameId={gameId} nextNum={gifts.length + 1}/>
        </div>
    );
};

export default GiftBlock;
