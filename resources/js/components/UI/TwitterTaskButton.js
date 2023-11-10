import React from 'react';
import s from '../../../sass/components/modals/ModalGameDescriptiion.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {usePage} from "@inertiajs/inertia-react";
import {setLoadingAction, setSnackMessageAction} from "../../reducers/mainReducer";
import {Inertia} from "@inertiajs/inertia";
import axios from "axios";
import {setGameDescription} from "../../reducers/modalReducer";

const TwitterTaskButton = ({task}) => {
    const dispatch = useDispatch()
    const { auth, appName, session } = usePage().props
    const stateData = useSelector(state => state.lang)

    console.log('TwitterTaskButton', session)
    console.log('TwitterTaskButton Task', task)
    console.log('TwitterTaskButton Auth', auth)

    const clickHandler = e => {
        console.log('clickHandler', session)
        const twitterSession = !!(session && session.twitter_id)
        switch (task.task_category_item_id) {
            case 7: // Post Twitter
                // postTweeterHandler(twitterSession)
                postIntentTweet(twitterSession)
                break
            case 4: // Follow
                followTwitterPost(twitterSession)
                break
            case 5: // Like
                likeTwitterPost(twitterSession)
                break
            case 6: // Repost
                repostTwitterPost(twitterSession)
                break
            case 8: // view post
                viewTwitterPost(twitterSession)
                break
            default:
                notPrepareFunc()
                break
        }
    };

    const likeTwitterPost = isSessionTwitter => {
        console.log('likeTwitterPost isSessionTwitter', isSessionTwitter)
        let twitterUser
        axios.post('/twitter/check-twitter-user')
            .then(res => {
                console.log('checkTwitterUser', res)
                if (res.data.success) {
                    twitterUser = res.data.twitter_response
                    if (twitterUser && twitterUser.favourites_count !== null) {
                        const likesBefore = twitterUser.favourites_count
                        window.open(
                            `${task.url}`,
                            '_blank',
                            'location=yes,height=480,width=640,scrollbars=yes,status=yes'
                        )
                        window.addEventListener('focus', function (){
                            console.log('FOCUS')
                            axios.post('/twitter/liked-post', {task_id: task.id, likes: likesBefore})
                                .then(res => {
                                    console.log('likeIntentTweet api', res)
                                    dispatch(setSnackMessageAction(res.data.message))
                                    if (res.data.success) {
                                        dispatch(setGameDescription(null))
                                        Inertia.reload({preserveState: false})
                                    }
                                }).catch(err => {
                                console.log('likeIntentTweet api err', err)
                                dispatch(setSnackMessageAction('Some thing was wrong'))
                            }).finally(() => {
                                window.removeEventListener('focus', this)
                            });
                        })
                    }
                }
                else dispatch(setSnackMessageAction(res.data.message))
            }).catch(err => {
            console.log('checkTwitterUser', err)
            dispatch(setSnackMessageAction('Server error'))
        }).finally(() => dispatch(setLoadingAction(false)));

    };

    const followTwitterPost = isSessionTwitter => {
        console.log('followTwitterPost isSessionTwitter', isSessionTwitter)
        let twitterUser
        axios.post('/twitter/check-twitter-user')
            .then(res => {
                console.log('checkTwitterUser', res)
                if (res.data.success) {
                    twitterUser = res.data.twitter_response
                    if (twitterUser && twitterUser.friends_count !== null) {
                        const friendsCountBefore = twitterUser.friends_count
                        window.open(
                            `${task.url}`,
                            '_blank',
                            'location=yes,height=480,width=640,scrollbars=yes,status=yes'
                        )
                        window.addEventListener('focus', function (){
                            console.log('FOCUS')
                            axios.post('/twitter/followed-post', {task_id: task.id, friends_count: friendsCountBefore})
                                .then(res => {
                                    console.log('likeIntentTweet api', res)
                                    dispatch(setSnackMessageAction(res.data.message))
                                    if (res.data.success) {
                                        dispatch(setGameDescription(null))
                                        Inertia.reload({preserveState: false})
                                    }
                                }).catch(err => {
                                console.log('likeIntentTweet api err', err)
                                dispatch(setSnackMessageAction('Some thing was wrong'))
                            }).finally(() => {
                                window.removeEventListener('focus', this)
                            });
                        })
                    }
                } else if (res.data.message.includes('SocialTwitter data not found')){
                    window.location.href = '/auth/twitter'
                } else dispatch(setSnackMessageAction(res.data.message))
            }).catch(err => {
            console.log('checkTwitterUser', err)
            dispatch(setSnackMessageAction('Server error'))
        }).finally(() => dispatch(setLoadingAction(false)));
    };

    const repostTwitterPost = isSessionTwitter => {
        console.log('repostTwitterPost isSessionTwitter', isSessionTwitter)
        let twitterUser
        axios.post('/twitter/check-twitter-user')
            .then(res => {
                console.log('checkTwitterUser', res)
                if (res.data.success) {
                    twitterUser = res.data.twitter_response
                    if (twitterUser && twitterUser.friends_count !== null) {
                        const statuses_count_before = twitterUser.statuses_count
                        window.open(
                            `${task.url}`,
                            '_blank',
                            'location=yes,height=480,width=640,scrollbars=yes,status=yes'
                        )
                        window.addEventListener('focus', function (){
                            console.log('FOCUS')
                            axios.post('/twitter/reposted-post',
                                {task_id: task.id, statuses_count: statuses_count_before})
                                .then(res => {
                                    console.log('likeIntentTweet api', res)
                                    dispatch(setSnackMessageAction(res.data.message))
                                    if (res.data.success) {
                                        dispatch(setGameDescription(null))
                                        Inertia.reload({preserveState: false})
                                    }
                                }).catch(err => {
                                console.log('likeIntentTweet api err', err)
                                dispatch(setSnackMessageAction('Some thing was wrong'))
                            }).finally(() => {
                                window.removeEventListener('focus', this)
                            });
                        })
                    }
                }
                else dispatch(setSnackMessageAction(res.data.message))
            }).catch(err => {
            console.log('checkTwitterUser', err)
            dispatch(setSnackMessageAction('Server error'))
        }).finally(() => dispatch(setLoadingAction(false)));
    };

    const viewTwitterPost = isSessionTwitter => {
        console.log('viewTwitterPost isSessionTwitter', isSessionTwitter)
        if (isSessionTwitter) {
            window.open(
                `${task.url}`,
                '_blank',
                'location=yes,height=480,width=640,scrollbars=yes,status=yes'
            );
            window.addEventListener('focus', function (){
                console.log('FOCUS')
                axios.post('/twitter/view-twitter-post',
                    {task_id: task.id})
                    .then(res => {
                        console.log('likeIntentTweet api', res)
                        dispatch(setSnackMessageAction(res.data.message))
                        if (res.data.success) {
                            dispatch(setGameDescription(null))
                            Inertia.reload({preserveState: false})
                        }
                    }).catch(err => {
                    console.log('likeIntentTweet api err', err)
                    dispatch(setSnackMessageAction('Some thing was wrong'))
                }).finally(() => {
                    window.removeEventListener('focus', this)
                });
            })
        } else dispatch(setSnackMessageAction("Need to auth with Twitter"))

    };

    const postIntentTweet = isSessionTwitter => {
        console.log('isSessionTwitter', isSessionTwitter)
        if (isSessionTwitter) {
            console.log('Can post');
            window.open(
                `https://twitter.com/intent/tweet?text=${task.url}`,
                '_blank',
                'location=yes,height=480,width=640,scrollbars=yes,status=yes'
            )
            window.addEventListener('focus', function () {
                console.log('FOCUS')
                axios.post('/twitter/created-post', {task_id: task.id})
                    .then(res => {
                        console.log('postIntentTweet api', res)
                        dispatch(setSnackMessageAction(res.data.message))
                        if (res.data.success) {
                            dispatch(setGameDescription(null))
                            Inertia.reload({preserveState: false})
                        }
                    }).catch(err => {
                    console.log('postIntentTweet api err', err)
                    dispatch(setSnackMessageAction('Some thing was wrong'))
                }).finally(() => window.removeEventListener('focus', this));
            });
        } else {
            console.log('Need to auth before')
            sessionStorage.setItem('twitterTask', JSON.stringify(task))
            window.location.href = '/auth/twitter'
        }
    };

    const postTweeterHandler = isSessionTwitter => {
        // Inertia.post('/twitter/postTweet', {message: task.url }, {preserveState: false})
        if (isSessionTwitter) {
            console.log('Can post');
            Inertia.post('/twitter/postTweet', {
                message: task.url,
                task_id: task.id
            }, {preserveState: false})
        } else {
            console.log('Need to auth before')
            sessionStorage.setItem('twitterTask', JSON.stringify(task))
            window.location.href = '/auth/twitter'
        }
    };

    const checkTwitterUser = () => {
        const twitterSession = !!(session && session.twitter_id)
        console.log('isSessionTwitter', twitterSession)
        let twitterUser = null
        if (twitterSession){
            dispatch(setLoadingAction(true));
            axios.post('/twitter/check-twitter-user')
                .then(res => {
                    console.log('checkTwitterUser', res)
                    if (res.data.success) twitterUser = res.data.twitter_response
                    else dispatch(setSnackMessageAction(res.data.message))
                    return res.data.twitter_response
                }).catch(err => {
                console.log('checkTwitterUser', err)
                dispatch(setSnackMessageAction('Server error'))
            }).finally(() => dispatch(setLoadingAction(false)));
        } else {
            dispatch(setSnackMessageAction('Need to auth before'))
            sessionStorage.setItem('twitterTask', JSON.stringify(task))
            window.location.href = '/auth/twitter'
        }
        return twitterUser
    };

    const notPrepareFunc = () => {

        dispatch(setLoadingAction(true));
        setTimeout(() => {
            dispatch(setLoadingAction(false))
            dispatch(setSnackMessageAction(stateData.home.need_update_api[stateData.lang]))
        }, 1500);
    };

    return (
        <button
            className={`btn ${s.clipboardMod}`}
            onClick={clickHandler}
            style={{
                textDecoration: "none",
                color: "#05acfa"
            }}
        >
            {/*{ task.task }*/}
        </button>
    );
};

export default TwitterTaskButton;
