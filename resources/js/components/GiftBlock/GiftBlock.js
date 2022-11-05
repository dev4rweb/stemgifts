import React from 'react';
import "../../../sass/components/GiftBlock.scss"
import GiftBlockItem from "./GiftBlockItem";
import GiftButton from "./GiftButton";

const GiftBlock = ({gifts, gameId}) => {
    return (
        <div className="gift-container">
            <ul className="gift-list">
                {
                    gifts.map((item, index) =>
                        <GiftBlockItem key={item.id} gift={item} index={index} />)
                }
            </ul>
            <GiftButton gameId={gameId} nextNum={gifts.length + 1} />
        </div>
    );
};

export default GiftBlock;
