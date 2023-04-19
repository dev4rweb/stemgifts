import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import AdminLayout from "../../components/parts/AdminLayout";
import m from "../../../sass/pages/AdminPage.module.scss";
import AdminSideBar from "../../components/parts/AdminSideBar";
import s from "../../../sass/pages/AdminMainPage.module.scss";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import {setLoadingAction} from "../../reducers/mainReducer";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
        },
    },
    input: {
        '& input, label': {
            color: 'white',
            fontFamaly: 'Montserrat, sans-serif'
        },
        '& label.Mui-focused': {
            color: '#9a9a9a',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#9a9a9a',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#b6c4d2',
            },
            '&:hover fieldset': {
                borderColor: '#9a9fbe',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#9a9a9a',
            },
        },
    },
    cbx: {
        color: 'white',
        '&$checked': {
            color: 'white',
        },
        '& .MuiCheckbox-root': {
            color: 'white'
        }
    },
    button: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        borderColor: '#fdfdfd',
        color: '#fdfdfd',
        fontFamily: [
            'Montserrat',
            'sans-serif',
        ].join(','),
        '&:hover': {
            borderColor: '#6f7bb6',
            color: '#6f7bb6',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    }
}));
// https://socialiteproviders.com/Steam/#add-provider-event-listener
// https://laravel.com/docs/8.x/socialite
// https://youtu.be/9FKBKoWg-lQ?t=754

//https://www.youtube.com/watch?v=rfHX-Hecu3k
//https://github.com/invisnik/laravel-steam-auth
// https://developer.valvesoftware.com/wiki/Steam_Web_API#Interfaces_and_method

// Steam ID: 76561199127510163 my
// Steam ID: 76561199075954850 Nikodem
// 4280EC36D1A4C1670BB67C1B48633AC9
// https://store.steampowered.com/wishlist/profiles/76561199075954850/wishlistdata/
// https://store.steampowered.com/wishlist/id/76561199127510163/wishlistdata/
// http://steamcommunity.com/id/76561199075954850/wishlist/
// http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=<your_api_key>&steamid=76561199127510163&include_appinfo=1&include_played_free_games=1
// http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=4280EC36D1A4C1670BB67C1B48633AC9&steamid=76561199127510163&include_appinfo=1&include_played_free_games=1
//  http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=4280EC36D1A4C1670BB67C1B48633AC9&steamids=76561197960435530

// https://partner.steamgames.com/doc/webapi/IPlayerService
// https://api.steampowered.com/IPlayerService/GetBadges/v1/?key=4280EC36D1A4C1670BB67C1B48633AC9&steamid=76561199075954850
// https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=4280EC36D1A4C1670BB67C1B48633AC9&steamid=76561199075954850
// GET https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=4280EC36D1A4C1670BB67C1B48633AC9&steamid=76561199075954850
// https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=4280EC36D1A4C1670BB67C1B48633AC9&steamid=76561199075954850&include_appinfo=true&include_played_free_games=true
const AdminTestPage = () => {
    const apiKey = '4280EC36D1A4C1670BB67C1B48633AC9'
    const classes = useStyles();
    const dispatch = useDispatch()
    const [steamId, setSteamId] = useState('76561199075954850')
    const [error, setError] = useState(null)
    const [gameError, setGameError] = useState(null)
    const [games, setGames] = useState([])
    const [players, setPlayers] = useState([])
    const [profile_id, setProfileId] = useState('LordTV')

    const stateData = useSelector(state => state.lang)

    const getDataSteamHandler = e => {
        e.preventDefault()
        console.log('getDataSteamHandler')
        dispatch(setLoadingAction(true))
        axios.post(`/api/steam-user-data`, {steam_id: steamId})
            .then(res => {
                console.log('getDataSteamHandler res', res)
                if (res.data.success) setPlayers(res.data.data.response.players)
            }).catch(err => {
            console.error('getDataSteamHandler err', err.response.data)
            setError(err.response.data.message)
        }).finally(() => dispatch(setLoadingAction(false)));
    };

    const getUserGames = e => {
        e.preventDefault()
        console.log('getUserGames')
        dispatch(setLoadingAction(true))
        axios.post(`/api/steam-user-games`, {profile_id})
            .then(res => {
                console.log('getUserGames res', res)
                if (res.data.success) {
                    if (!res.data.data) setGameError('User not found. Try again later')
                    else {
                        const obj = res.data.data
                        // const result = Object.keys(obj).map((key) => [Number(key), obj[key]])
                        const result = Object.keys(obj).map((key) => obj[key])
                        // console.log('RESULT', result)
                        setGames(result)
                    }
                } else setGameError(res.data.message)
            }).catch(err => {
            console.error('getUserGames err', err.response.data)
            setGameError(err.response.data.message)
        }).finally(() => dispatch(setLoadingAction(false)));
    };

    return (
        <AdminLayout>
            <div className={`container admin-page ${m.adminPage}`}>
                <AdminSideBar/>
                <div className={`container ${s.adminMainPage}`}>
                    <div className="title-wrapper">
                        <p className="admin-title">| {stateData.admin.testPage[stateData.lang]}</p>
                        <hr/>
                    </div>
                    <div>

                        <h1>{stateData.admin.testPage[stateData.lang]}</h1>
                        {/*<a className="btn btn-info" href="/auth/steam">Login with Steam</a>*/}
                        <form
                            className={classes.root}
                            autoComplete="off"
                            onSubmit={getDataSteamHandler}
                        >
                            <div className="mb-3">
                                <TextField
                                    id="standard-basic"
                                    className={classes.input}
                                    label="Steam ID"
                                    name="steamId"
                                    type="text"
                                    variant="outlined"
                                    value={steamId}
                                    onChange={event => setSteamId(event.target.value)}
                                    onInput={e => setError(null)}
                                    required
                                />
                                {
                                    error &&
                                    <div style={{color: '#ff0000'}}>
                                        {error}
                                    </div>
                                }
                            </div>

                            <Button
                                variant="outlined"
                                // color="primary"
                                className={classes.button}
                                type="submit"
                            >
                                Get Profile Data
                            </Button>

                        </form>
                        {
                            players.length ? players.map((player, index) => {
                                return (
                                    <div key={index}>
                                        <div>
                                            <img src={player.avatarfull} className="me-3" alt="avatar"/>
                                            <span>Name: <b>{player.personaname}</b></span>
                                        </div>
                                        <div>
                                            <p>communityvisibilitystate: {player.communityvisibilitystate}</p>
                                            <p>profilestate: {player.profilestate}</p>
                                            <a href={player.profileurl}>profileurl</a>
                                            <p>steamid - {player.steamid}</p>
                                            <p>timecreated - {player.timecreated}</p>
                                        </div>
                                    </div>
                                )
                            }) : ''
                        }

                        <h3>Getting user games</h3>
                        <form
                            className={classes.root}
                            autoComplete="off"
                            onSubmit={getUserGames}
                        >
                            <div className="mb-3">
                                <TextField
                                    id="standard-basic"
                                    className={classes.input}
                                    label="Username or Profile ID"
                                    type="text"
                                    variant="outlined"
                                    value={profile_id}
                                    onChange={event => setProfileId(event.target.value)}
                                    onInput={e => setGameError(null)}
                                    required
                                />
                                {
                                    gameError &&
                                    <div style={{color: '#ff0000'}}>
                                        {gameError}
                                    </div>
                                }
                            </div>

                            <Button
                                variant="outlined"
                                // color="primary"
                                className={classes.button}
                                type="submit"
                            >
                                Get User Games
                            </Button>

                        </form>

                        <ul>
                            {
                                games.length ? games.map((game, index) => {
                                    return (
                                        <li key={index}>
                                            <h4>{game.type} {game.name}</h4>
                                            <div dangerouslySetInnerHTML={{__html: game.platform_icons}} />
                                            <p>
                                                Win - {game.win} <br/>
                                                Release - {game.release_string}, <br/>
                                                Reviews - {game.review_score} / {game.reviews_percent}% / {game.reviews_total}
                                            </p>
                                        </li>
                                    )
                                }) : ''
                            }
                        </ul>

                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminTestPage;
