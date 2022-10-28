import React from 'react';
import s from '../../sass/components/GameCard/GameCard.module.scss'
import fullStar from '../../assets/icons/full-star.png';
import halfStar from '../../assets/icons/star.png';
import steam from '../../assets/icons/steam.png'
import {useDispatch, useSelector} from "react-redux";
import {setGameDescription, setIsAuthModalOpen} from "../reducers/modalReducer";
import {usePage} from "@inertiajs/inertia-react";

const GameCard = ({item}) => {
    const { auth } = usePage().props
    const dispatch = useDispatch()
    const stateData = useSelector(state => state.lang)
    const star = item.is_favorite ? fullStar : halfStar
    const btnText = item && item.is_competition ?
        stateData.home.show_info[stateData.lang] :
        stateData.home.join_giveaway[stateData.lang]

    const handleClick = (e) => {
        dispatch(setGameDescription(item))
        console.log('handleClick', item)
        // dispatch(setIsAuthModalOpen(true))
    }

    return (
        <div className={s.card} style={{backgroundImage: `url(${item.main_image})`}}>
            <div className={s.starBox}><span><img src={star} alt="favorite"/></span></div>
            <div className={s.content}>
                <h3>{item.name}</h3>
                {
                    item.is_competition ?
                        <div className={s.steamBox}>
                            {
                                item.tasks && item.tasks.slice(0, 3).map((item, index) =>
                                    <a key={index} href="#"><img src={steam} alt="steam"/></a>
                                )
                            }
                        </div>
                        :
                        <div/>
                }

                <div className={s.btnBox}>
                    <button
                        className="btn btn-warning"
                        onClick={handleClick}
                    >
                        {btnText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameCard;
