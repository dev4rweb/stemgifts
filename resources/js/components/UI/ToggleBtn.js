import React from 'react';
import '../../../sass/components/ToggleBtn.scss'
import {useSelector} from "react-redux";

const ToggleBtn = ({game, setGame}) => {
    const stateData = useSelector(state => state.lang)

    const handleClick = (ev) => {
        // console.log('handleClick name', ev.target.name.includes('giveaway'))
        // console.log('handleClick value', ev.target.checked)
        // console.log('handleClick value', ev.target.checked ? 1 : 0)
        if (ev.target.name.includes('giveaway')) {
            setGame({
                ...game,
                ['is_competition']: !ev.target.checked ? 1 : 0
            })
        } else {
            setGame({
                ...game,
                ['is_competition']: ev.target.checked ? 1 : 0
            })
        }
        // console.log('handleClick', game)
    };

    return (
        <div className="toggle-box">
            <div className={`custom-control custom-switch`}>
                <input
                    type="checkbox"
                    className="custom-control-input"
                    id={`customSwitch${game.id}`}
                    checked={!game.is_competition}
                    onChange={handleClick}
                    name="giveaway"
                />
                <label
                    className="custom-control-label"
                    htmlFor={`customSwitch${game.id}`}
                >
                    <span className="toggle-placeholder"
                    >
                        {stateData.admin.createGive.give[stateData.lang]}
                    </span>
                </label>
            </div>
            <div className={`custom-control custom-switch`}>
                <input
                    type="checkbox"
                    className="custom-control-input"
                    id={`customSwitch${game.id + 1}`}
                    checked={game.is_competition}
                    onChange={handleClick}
                    name="competition"
                />
                <label
                    className="custom-control-label"
                    htmlFor={`customSwitch${game.id + 1}`}
                >
                    <span className="toggle-placeholder"
                    >
                        {stateData.admin.createGive.typeGive[stateData.lang]}
                    </span>
                </label>
            </div>

        </div>
    );
};

export default ToggleBtn;
