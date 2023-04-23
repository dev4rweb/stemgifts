import React, {useEffect, useState} from 'react';
import s from '../../../sass/components/modals/ModalDrawWinner.module.scss'
import m from '../../../sass/components/ModalLayout.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {editDrawWinnerAction} from "../../reducers/modalReducer";
import DrawTable from "../UI/tables/DrawTable";
import {Inertia} from "@inertiajs/inertia";

let users = []

const DrawWinner = () => {
    const dispatch = useDispatch()
    const game = useSelector(state => state.modal.editDrawWinner)
    const stateData = useSelector(state => state.lang);
    const [canChange, setCanChange] = useState(true)
    const [candidates, setCandidates] = useState(game.persons)
    const rootClasses = [m.modal]

    if (game) rootClasses.push(m.active)

    const handleClose = e => {dispatch(editDrawWinnerAction(null))}

    function getCandidates() {
        let items = []
        for (let i = 0; i < game.gifts.length; i++) {
            if (users.length > 0) {
                let item = Math.floor(Math.random() * users.length);
                items.push(users[item]);
                users.splice(item, 1);
            } else {
                setCanChange(true)
            }
        }
        items.sort((a,b) => (a.wallet.points < b.wallet.points) ? 1 : ((b.wallet.points < a.wallet.points) ? -1 : 0))
        console.log('getCandidates users', users)
        console.log('getCandidates items', items)
        setCandidates(items)
    }

    useEffect(() => {
        // console.log('useEffect')
        if (game.gifts.length > candidates.length) {
            setCanChange(true)
        } else if (game.gifts.length === candidates.length) {
            setCanChange(true)
        } else {
            setCanChange(false)
            users = candidates
            getCandidates()
        }
    }, []);

    const changeOneCandidate = (user) => {
        // console.log('changeOneCandidate', user)user
        // UPDATE STATE IN ARRAY OBJECT USING SPREAD
        if (users.length > 0) {
            let items = candidates;
            let index = items.indexOf(user)
            let randomItem = Math.floor(Math.random() * users.length)
            let randomUser = users[randomItem]
            if (index !== -1) {
                items[index] = randomUser
                let markers = [...candidates]
                markers[index] = {...markers[index], key: randomUser}
                setCandidates(markers)
                // console.log('markers', markers)
                users.splice(randomItem, 1)
            } else setCanChange(true)
            // console.log('changeOneCandidate', randomUser, ' - ', items);
        } else setCanChange(true)
    };

    const submitHandler = ev => {
        console.log('submitHandler')
        getCandidates()
    };

    const handleFinish = () => {
        console.log('handleFinish candidates', candidates)
        const users = candidates.map(user => user.id)
        const apiObj = {
            game_id: game.id,
            persons: users
        }
        console.log('handleFinish', apiObj)
        Inertia.post('/send-email-winners', apiObj, {preserveState: true})
    };

    return (
        <div
            className={rootClasses.join(' ')}
            onClick={handleClose}
            style={{zIndex: 10}}
        >
            <div
                className={`${m.modalBody}  ${m.animate}`}
                onClick={event => event.stopPropagation()}
            >
                <span
                    className={m.close}
                    onClick={handleClose}
                >
                  &times;
              </span>
                <div>
                    <h5 style={{color: '#fbb527'}}>Draw Winner</h5>
                    <div className={s.modalDrawWinner}>
                        <p>amount of added keys: {game.gifts.length}</p>
                        <div className={s.btnWrapper}>
                            <button
                                className="btn btn-warning w-100"
                                onClick={submitHandler}
                                disabled={canChange}
                            >
                                {stateData.admin.createGive.btnDraw[stateData.lang]}
                            </button>
                        </div>

                        <div className="mt-5 mb-5 text-center">
                            {
                                candidates.length > 0 ?
                                    <DrawTable
                                        users={candidates}
                                        canChange={canChange}
                                        changeOneCandidate={changeOneCandidate}
                                    />
                                    :
                                    <h5>
                                        No one users in this competition
                                    </h5>
                            }
                        </div>

                        <div className={s.btnBox}>
                            <div className={s.btnWrapper}>
                                <div className='outline-radius'>
                                    {/* <InertiaLink
                                    href="/"
                                    // method="post"
                                    as="button"
                                    type="button"
                                    className="btn btn-success w-100 btn-logout btn-draw"
                                >
                                    {stateData.admin.createGive.btnFinishComp[stateData.lang]}
                                </InertiaLink>*/}
                                    <button
                                        className="btn btn-success w-100 btn-logout btn-draw"
                                        onClick={handleFinish}>
                                        {stateData.admin.createGive.btnFinishComp[stateData.lang]}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DrawWinner;
