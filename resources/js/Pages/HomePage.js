import React, {useEffect, useState} from 'react';
import s from '../../sass/pages/HomePage.module.scss'
import Layout from "../components/parts/Layout";
import dots from '../../assets/png/dots.png'
import {useDispatch, useSelector} from "react-redux";
import Timer from "../components/Timer";
import SocialBlock from "../components/SocialBlock";
import {usePage} from "@inertiajs/inertia-react";
import {setLoadingAction, setSnackMessageAction} from "../reducers/mainReducer";
import {Inertia} from "@inertiajs/inertia";
import GameCard from "../components/GameCard";
import Pagination from "../components/Pagination";
import {setHomePaginationPageAction} from "../reducers/pages/homePageReducer";
import LogRegWelcome from "../components/modals/LogRegWelcome";
import ModalLayout from "../components/modals/ModalLayout";
import ModalGameDescription from "../components/modals/ModalGameDescription";
import SponsorGame from "../components/SponsorGame";
import ModalKey from "../components/modals/ModalKey";
import {getWishListApi} from "../api/steamApi";
import {userTaskPatchApi} from "../api/userTasksApi";


const HomePage = ({games, sponsorGame, errors, userTasks}) => {
    const dispatch = useDispatch()
    const pagination = useSelector(state => state.homePage.page)
    const {auth, session} = usePage().props
    console.log('HomePage', errors)
    const stateData = useSelector(state => state.lang)
    const [category, setCategory] = useState('all')
    const [favorite, setFavorite] = useState('all')
    const [search, setSearch] = useState('')
    const [limit, setLimit] = useState(12)
    const [lowLimit, setLowLimit] = useState(12)
    const [middleLimit, setMiddleLimit] = useState(24)
    const [highLimit, setHighLimit] = useState(48)
    const activeTwitterTask = JSON.parse(sessionStorage.getItem('twitterTask'))

    console.log('Twitter ID', session)
    console.log('Twitter Task', activeTwitterTask)

    if (activeTwitterTask && session && session.twitter_id) {
        Inertia.post('/twitter/postTweet', {
            task_id: activeTwitterTask.id,
            message: activeTwitterTask.url
        }, {preserveState: false})
        sessionStorage.removeItem('twitterTask')
    }

    useEffect(() => {
        if (errors && errors.error)
            dispatch(setSnackMessageAction(errors.error))
    }, [errors]);

    useEffect(() => {
        if (auth.user && auth.user.steam_id && userTasks.length) {
            let steamGameId = null
            let checkedUserTask = null
            userTasks.forEach(i => {
                if (!i.is_done && i.task.category_id === 1 && i.task.task_category_item_id === 1) { // steam add wishlist
                    checkedUserTask = i
                    steamGameId = i.task.url.split('/')[4] // steam game id
                }
            });
            console.log('UserTasks', userTasks)
            if (steamGameId) {
                console.log('Need to get wishlist')
                // dispatch(setLoadingAction(true))
                getWishListApi(auth.user.steam_id)
                    .then(res => {
                        if (!res.data.data) dispatch(setSnackMessageAction('Please make you wishlist public'))
                        else {
                            const obj = res.data.data
                            const wishlist = Object.keys(obj).map((key) => {
                                const item = obj[key]
                                item.id = key
                                return item
                            });
                            console.log('RESULT', wishlist)
                            if (wishlist.length) {
                                const foundSteamGame = wishlist.find(i => i.id === steamGameId)
                                if (foundSteamGame) {
                                    checkedUserTask.is_done = true
                                    return userTaskPatchApi(checkedUserTask)
                                } else dispatch(setSnackMessageAction('Your need add game to your wishlist'))
                            } else dispatch(setSnackMessageAction('Your wishlist is empty'))
                        }
                    }).then(res => {
                    if (res.data.success) {
                        dispatch(setSnackMessageAction('Your task is done'))
                        Inertia.visit('/', {preserveState: false})
                    }
                }).catch(err => dispatch(err.response.data.message))
                //.finally(() => dispatch(setLoadingAction(false)));
            }
        }
    }, []);

    const handleIsLogged = e => {
        if (auth.user) dispatch(setSnackMessageAction('What we need to do?'))
        else Inertia.visit('/login')
    };

    const handleSubmit = () => {
        console.log('handleSubmit', category)
        Inertia.visit('/', {
            data: {
                page: pagination,
                category, limit, favorite, search
            },
            preserveState: true,
            preserveScroll: true,
        })
    }

    useEffect(() => {
        handleSubmit()
    }, [category, pagination, limit, favorite, search])

    useEffect(() => {
        console.log('useEffect', window.innerWidth)
        if (window.innerWidth < 1400) {
            setLimit(9)
            setLowLimit(9)
            setMiddleLimit(18)
            setHighLimit(36)
        }
        if (window.innerWidth < 992) {
            setLimit(6)
            setLowLimit(6)
            setMiddleLimit(12)
            setHighLimit(24)
        }
        if (window.innerWidth < 576) {
            setLimit(3)
            setLowLimit(3)
            setMiddleLimit(6)
            setHighLimit(12)
        }
    }, []);

    const categoryHandleSelect = e => {
        e.preventDefault()
        dispatch(setHomePaginationPageAction(1))
        console.log('categoryHandleSelect', e.target.value)
        setCategory(e.target.value)
    }

    const favoriteHandler = e => {
        e.preventDefault()
        dispatch(setHomePaginationPageAction(1))
        console.log('favoriteHandler', e.target.value)
        setFavorite(e.target.value)
    };

    const limitHandlerSelect = e => {
        e.preventDefault()
        dispatch(setHomePaginationPageAction(1))
        console.log('limitHandlerSelect', e.target.value)
        setLimit(e.target.value)
    }

    console.log('games', games)

    return (
        <Layout>
            <article className={`${s.homePage}`}>
                <div className={s.layer}>
                    <img className={s.back} src={dots} alt="canvas"/>
                </div>

                <section className={`container ${s.content}`}>
                    <h2>{stateData.home.header[stateData.lang]}</h2>
                    <Timer/>
                    <SocialBlock/>
                    <button
                        className="btn btn-warning mt-3 mb-5"
                        style={{zIndex: '1'}}
                        onClick={handleIsLogged}
                    >
                        {stateData.home.get_key[stateData.lang]}
                    </button>
                </section>

                {/*https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview*/}
                <div className="d-flex flex-wrap justify-content-center">
                    {/*<a
                        className="btn btn-warning mt-3 mb-5 twitter-share-button"
                       href="https://twitter.com/intent/tweet?text=Hello%20world"
                    >
                        Tweet
                    </a>*/}
                    <a
                        className="btn btn-warning twitter-share-button m-2"
                        href="https://twitter.com/SourceByteGames"
                        target="_blank"
                    >
                        Follow @SourceByteGames
                    </a>
                    <a
                        href="https://twitter.com/messages/compose?recipient_id=3805104374"
                        className="btn btn-warning twitter-share-button m-2"
                        target="_blank"
                        data-screen-name="@furni"
                    >
                        Message @furni
                    </a>
                </div>

                <div className="d-flex flex-wrap justify-content-center">
                    <a
                        className="btn btn-info twitter-share-button m-2"
                        href="/twitter/check-twitter-user"
                        target="_blank"
                    >
                        Check TwitterUser
                    </a>
                    <a
                        href="/twitter/like-post"
                        className="btn btn-info twitter-share-button m-2"
                        target="_blank"
                    >
                        Like Post by API
                    </a>
                    <a
                        href="/twitter/follow-post"
                        className="btn btn-info twitter-share-button m-2"
                        target="_blank"
                    >
                        Follow by API
                    </a>
                    <a
                        href="/twitter/repost-post"
                        className="btn btn-info twitter-share-button m-2"
                        target="_blank"
                    >
                        Repost by API
                    </a>
                    <a
                        href="/twitter/view-post"
                        className="btn btn-info twitter-share-button m-2"
                        target="_blank"
                    >
                        View by API
                    </a>
                </div>

                <section className="container">

                    <div>
                        <form
                            onSubmit={handleSubmit}
                            className="d-flex justify-content-between align-items-center mb-5"
                        >
                            <div
                                className="form-control"
                                style={{maxWidth: '170px'}}
                            >
                                <select
                                    name="category"
                                    className="form-select"
                                    style={{color: '#ffffff'}}
                                    onChange={categoryHandleSelect}
                                >
                                    <option value="all">{stateData.home.select_all[stateData.lang]}</option>
                                    <option value="10">{stateData.home.select_comp[stateData.lang]}</option>
                                    <option value="20">{stateData.home.select_give[stateData.lang]}</option>
                                </select>
                            </div>

                            <div
                                className="form-control"
                                style={{maxWidth: '170px'}}
                            >
                                <select
                                    name="favorite"
                                    className="form-select"
                                    style={{color: '#ffffff'}}
                                    onChange={favoriteHandler}
                                >
                                    <option value="all">{stateData.home.select_all[stateData.lang]}</option>
                                    <option value="10">{stateData.home.select_favorite[stateData.lang]}</option>
                                    <option value="20">{stateData.home.select_not_favorite[stateData.lang]}</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <input
                                    className="form-control"
                                    value={search}
                                    style={{color: '#ffffff'}}
                                    placeholder='searching'
                                    onInput={e => setSearch(e.target.value)}
                                    type="text"
                                />
                            </div>

                            <div
                                className="form-control"
                                style={{maxWidth: '100px'}}
                            >
                                <select
                                    name="limit"
                                    className="form-select"
                                    style={{color: '#ffffff'}}
                                    onChange={limitHandlerSelect}
                                >
                                    <option value={lowLimit}>{lowLimit}</option>
                                    <option value={middleLimit}>{middleLimit}</option>
                                    <option value={highLimit}>{highLimit}</option>
                                </select>
                            </div>
                        </form>
                    </div>

                    {
                        sponsorGame ?
                            <SponsorGame sponsorGame={sponsorGame}/>
                            :
                            <div/>
                    }

                    {
                        games.data.length ?
                            <div className={s.gameContainer}>
                                {
                                    games.data.map(item =>
                                        <div
                                            key={item.id}
                                            className="d-flex justify-content-center align-items-center"
                                        >
                                            <GameCard item={item}/>
                                        </div>
                                    )
                                }
                            </div>
                            :
                            <h2 className="text-center">Not found</h2>
                    }

                    {
                        games.links.length &&
                        <Pagination links={games.links}/>

                    }

                </section>
            </article>
            <ModalLayout>
                <LogRegWelcome/>
            </ModalLayout>
            <ModalGameDescription/>
            <ModalKey/>
        </Layout>
    );
};

export default HomePage;
