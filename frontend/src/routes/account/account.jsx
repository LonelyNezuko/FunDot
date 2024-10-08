import React from 'react'
import $ from 'jquery'
import {
    useParams,
    Link,
    useLocation,
    useNavigate
} from 'react-router-dom'
import Cookies from 'universal-cookie'
import countryParser from '@ejarnutowski/country-parser'

import moment from 'moment'
import 'moment/locale/ru'

import './account.scss'

import AccountLandingHeader from './landing_header'
import AccountLandingBodyStats from './landing_body_stats'

import Error404Page from '../404/404'

import News from '../../components/news/news'
import { Rank } from '../../components/rank/rank'

import Avatar from '../../components/avatar/avatar'
import Modal from '../../components/_modals/index/index'

import notify from '../../modules/notify'

import { FaGamepad } from 'react-icons/fa'
import { IoMdStats } from 'react-icons/io'
import { FaUserFriends } from 'react-icons/fa'
import { GiBestialFangs } from 'react-icons/gi'

import { BiDotsVerticalRounded } from 'react-icons/bi'
import { IoMdPersonAdd } from 'react-icons/io'
import { MdOutlineBlock } from 'react-icons/md'
import { MdReportProblem } from 'react-icons/md'
import { AiOutlineUserDelete } from 'react-icons/ai'

import { FiUpload } from 'react-icons/fi'



export default function AccountPage() {
    React.useMemo(() => { document.title = "FunDot - Аккаунт" })
    const cookies = new Cookies()

    const [ landingHeader, setLandingHeader ] = React.useState(true)
    const [ landingBody, setLandingBody ] = React.useState(true)

    const location = useLocation()
    const params = useParams()
    const navigate = useNavigate()

    const [ account, setAccount ] = React.useState({})
    const [ header, setHeader ] = React.useState({})

    const [ isBlocked, setIsBlocked ] = React.useState(0)

    const [ notfound, setNotfound ] = React.useState(false)

    React.useEffect(() => {
        setNotfound(false)

        setLandingBody(true)
        if(!header.id || !params['*'].length) setLandingHeader(true)

        let id = params.id
        if(!id)return navigate('/')

		const jwt = cookies.get('jsonwebtoken')
		if(!jwt)return window.location = '/signin'

		$.ajax({
			url: `/api/user/account/${params.id}`,
            type: "get",
			headers: { jwt }
		}).done(results => {
            if(results.type === 'error') {
                if(results.statusCode === 401)return window.location = '/signin'

                if(results.message === 'Account not found') setNotfound(true)
                else {
                    notify('Упс. Кажется где-то ошибка (подробнее в консоли)')
                    console.log(results)
                }
            }
            else {
			    setAccount(results.message)
                setHeader(results.message)

                setLandingBody(false)
                setLandingHeader(false)
            }
		}).fail(err => {
			notify('Упс. Кажется где-то ошибка (подробнее в консоли)')
		})
	}, [params])

    return (
        <div id="account">
            {notfound ? (<Error404Page />) : (
                <>
                    {landingHeader ? (<AccountLandingHeader />) : (
                        <AccountPageHeader account={header} isBlocked={isBlocked} />
                    )}

                    {isBlocked ? (
                        <div className="accountBlocked">
                            <div className="wrap">
                                <MdOutlineBlock />
                                {isBlocked === 1 ? (
                                    <>
                                        <h1>Вы заблокировали данного игрока и не можете просматривать его страницу</h1>
                                        <button className="btn">Разблокировать</button>
                                    </>
                                ) : (<h1>Данный игрок заблокировал Вас, поэтому Вы не можете просматривать его страницу</h1>)}
                            </div>
                        </div>
                    ) : ''}

                    {(!params['*'].length && !isBlocked) ? 
                        landingBody ? (<AccountLandingBodyStats />) : (<AccountPageHome account={account} />)
                    : ''}
                </>
            )}
        </div>
    )
}


function AccountPageHeader({ isBlocked, account }) {
    const params = useParams()
    
    // const [ avatar, setAvatar ] = React.useState({
    //     image: '/assets/avatars/default.png',
    //     size: 100,
    //     position: { x: 0, y: 0 }
    // })
    // const [ background, setBackground ] = React.useState({
    //     image: 'https://rare-gallery.com/uploads/posts/955295-anime-anime-girls-digital-art-artwork-2D-portrait.jpg',
    //     position: { x: 0, y: 0 }
    // })

    return (
        <header className="header">
            <div className="accountBG" style={{backgroundImage: `url(${account.background.image})`, top: account.background.position.y + '%', left: account.background.position.x + '%'}}></div>
            <div className="wrapper">
                <div className="accountAvatar" style={{marginBottom: !isBlocked ? '' : '14px'}}>
                    <Avatar image={account.avatar.image} size={account.avatar.size} position={account.avatar.position} type="megabig" code={!isBlocked ? (
                            <Link to={`?image=${account.avatar.image}`} className="accountAvatarHover"></Link>
                        ) : ''
                    } />
                    <div className="wrap" style={{transform: isBlocked ? 'none' : 'translateX(16px)'}}>
                        <div className="title">
                            <h1>
                                {account.username}
                                
                                {account.isVerified ? (<span className="verified color"></span>) : ''}
                                {account.isBot ? (<span className="bot color"></span>) : ''}
                            </h1>
                            <h2>{account.signature}</h2>
                        </div>
                        {!isBlocked ? (
                            <button className="btn icon focus manage">
                                <BiDotsVerticalRounded />

                                <div className="menu">
                                    <button className="btn icontext left focus">
                                        <IoMdPersonAdd />
                                        Подписаться
                                    </button>
                                    {/* <button className="btn icon focus" data-alt="Отписаться">
                                        <AiOutlineUserDelete />
                                    </button> */}
                                    <button className="btn icontext left focus">
                                        <MdOutlineBlock />
                                        Заблокировать
                                    </button>
                                    <Link to={`?report=${params.id}`} className="btn icontext left focus">
                                        <MdReportProblem />
                                        Жалоба
                                    </Link>
                                </div>
                            </button>
                        ) : ''}
                    </div>
                </div>
                {!isBlocked ? (
                    <div className="nav">
                        <Link className={`item ${!params['*'].length && 'selected'}`} to={`/account/${params.id}`}>
                            <IoMdStats />
                            Статистика
                        </Link>
                        <Link className={`item ${params['*'].indexOf('games') !== -1 && 'selected'}`} to={`/account/${params.id}/games`}>
                            <FaGamepad />
                            Игры
                        </Link>
                        <Link className={`item ${params['*'].indexOf('subs') !== -1 && 'selected'}`} to={`/account/${params.id}/subs`}>
                               <FaUserFriends />
                            Друзья и сабы
                            <h4>23 592</h4>
                        </Link>
                        <Link className={`item ${params['*'].indexOf('highlights') !== -1 && 'selected'}`} to={`/account/${params.id}/highlights`}>
                            <GiBestialFangs />
                            Хайлайты
                        </Link>
                        <span className={`item ${params['*'].indexOf('stream') !== -1 && 'selected'} stream blocked`}>Стрим</span>
                    </div>
                ) : ''}
            </div>
            <div className="bg"></div>
        </header>
    )
}
function AccountPageHome({ account }) {
    const [ news, setNews ] = React.useState([
        { author: {
            id: 1,
            username: 'LonelyNezuko',
            avatar: { image: 'https://i.ibb.co/2cgHpWC/nezu5-2.jpg', size: 100, position: { x: 0, y: 0 } },
            verified: true
        }, date: new Date(), body: {
            text: 'Делаю новости, а чем вы занимаетесь?',
            attached: [
                { type: 'img', src: 'https://aniyuki.com/wp-content/uploads/2021/05/aniyuki-nezuko-91.jpg' }
            ]
        }, feedback: [ 128, 3, 0, 252 ], userInfo: {
            like: true,
            dislike: false,
            view: false,
            subscribed: false
        }, hidden: false, blocked: false, ageLimit: false, isPin: false, forSubs: false, forFriends: false,
        comments: [], tags: '#job #news' },
        { author: {
            id: 1,
            username: 'LonelyNezuko',
            avatar: { image: 'https://static.displate.com/857x1200/displate/2019-09-04/04e658831fcb7ec9958f496c029cccd2_93f63c496c402fa7ace55ddd3b26bdf8.jpg', size: 200 },
            verified: true
        }, date: new Date(), body: {
            text: 'Привет, это первая новость здесь. Поставь лайк :)',
            attached: [
                { type: 'img', src: 'https://i.pinimg.com/736x/5a/c0/76/5ac07656d8527a0a2fb2379081cea082.jpg' },
                { type: 'img', src: 'https://i.pinimg.com/originals/33/07/b5/3307b5f5c95d8062907ac945972fdadb.jpg' },
                { type: 'img', src: 'https://aniyuki.com/wp-content/uploads/2021/05/aniyuki-nezuko-50.jpg' },
            ]
        }, feedback: [ 128, 3, 0, 252 ], userInfo: {
            like: true,
            dislike: false,
            view: false,
            subscribed: false
        }, hidden: false, blocked: false, ageLimit: false, isPin: true, forSubs: true,
        comments: [
            { author: {
                id: 1,
                username: 'LonelyNezuko',
                avatar: { image: 'https://i.ibb.co/2cgHpWC/nezu5-2.jpg', size: 100, position: { x: 0, y: 0 } },
                verified: true
            }, body: { text: 'Привет, это я, твой единственный подпищек', attached: {} }, date: new Date(), feedback: [0, 0], userInfo: { like: false, dislike: false }, answers: [
                { author: {
                    id: 1,
                    username: 'LonelyNezuko',
                    avatar: { image: 'https://i.ibb.co/2cgHpWC/nezu5-2.jpg', size: 100, position: { x: 0, y: 0 } },
                    verified: true
                }, body: { text: 'Да, я знаю, спасибо', attached: {} }, date: new Date(), feedback: [0, 0], userInfo: { like: false, dislike: false } },
                { author: {
                    id: 1,
                    username: 'LonelyNezuko',
                    avatar: { image: 'https://i.ibb.co/2cgHpWC/nezu5-2.jpg', size: 100, position: { x: 0, y: 0 } },
                    verified: true
                }, body: { text: 'Да, я знаю, спасибо', attached: {} }, date: new Date(), feedback: [0, 0], userInfo: { like: false, dislike: false } }
            ] },
            { author: {
                id: 1,
                username: 'LonelyNezuko',
                avatar: { image: 'https://i.ibb.co/2cgHpWC/nezu5-2.jpg', size: 100, position: { x: 0, y: 0 } },
                verified: true
            }, body: { text: 'Привет, это я, твой единственный подпищек', attached: {} }, date: new Date(), feedback: [0, 0], userInfo: { like: false, dislike: false }, answers: [] }
        ], tags: '#top official tournaments' },
    ])
    const [ socials, setSocials ] = React.useState({
        vk: 'myangelnezuko',
        telegram: 'myangelnezuko',
        facebook: '',
        instagram: '',
        twitter: '',
        tiktok: '',
        youtube: '',
        twitch: ''
    })
    const [ steam, setSteam ] = React.useState('myangelnezuko')

    return (
        <div className="home">
            <section className="section">
                <Rank rpp={account.rpp} />
                <div className="stats">
                    <h1 className="title">
                        Основная статистика
                        <Link to="/settings/account">редактировать</Link>
                    </h1>
                    <div className="wrap">
                        <div className="about">
                            <h1>Обо мне</h1>
                            <div>
                                {account.about}
                            </div>
                        </div>
                        <div className="main">
                            <section className="country">
                                <h1>Страна</h1>
                                <span>
                                    <img src={`https://flagsapi.com/${account.country}/shiny/64.png`} />
                                    {countryParser.getName(account.country)}
                                </span>
                            </section>
                            <section className="regdate">
                                <h1>Дата регистрации</h1>
                                <span>
                                    {moment(account.createDate).format('DD.MM.YYYY')}
                                </span>
                            </section>
                            <section className="steam">
                                <h1>Steam</h1>
                                <span>
                                    <Link target="_blank" to={`https://steamcommunity.com/id/${steam}`} className="link color">LonelyNezuko</Link>
                                </span>
                            </section>
                            <section className="social">
                                <h1>Соц. сети</h1>
                                <span>
                                    {socials.vk.length ? (
                                        <Link target="_blank" to={`https://vk.com/${socials.vk}`}>
                                            <img src="/assets/socials/vk.png" alt="VKontakte" />
                                        </Link>
                                    ) : (
                                        <div>
                                            <img src="/assets/socials/vk.png" alt="VKontakte" />
                                        </div>    
                                    )}
                                    {socials.telegram.length ? (
                                        <Link target="_blank" to={`https://t.me/${socials.telegram}`}>
                                            <img src="/assets/socials/telegram.png" alt="Telegram" />
                                        </Link>
                                    ) : (
                                        <div>
                                            <img src="/assets/socials/telegram.png" alt="Telegram" />
                                        </div>    
                                    )}
                                    {socials.facebook.length ? (
                                        <Link target="_blank" to={`https://facebook.com/${socials.facebook}`}>
                                            <img src="/assets/socials/facebook.png" alt="facebook" />
                                        </Link>
                                    ) : (
                                        <div>
                                            <img src="/assets/socials/facebook.png" alt="facebook" />
                                        </div>    
                                    )}
                                    {socials.instagram.length ? (
                                        <Link target="_blank" to={`https://instagram.com/${socials.instagram}`}>
                                            <img src="/assets/socials/instagram.png" alt="instagram" />
                                        </Link>
                                    ) : (
                                        <div>
                                            <img src="/assets/socials/instagram.png" alt="instagram" />
                                        </div>    
                                    )}
                                    {socials.twitter.length ? (
                                        <Link target="_blank" to={`https://twitter.com/${socials.twitter}`}>
                                            <img src="/assets/socials/twitter.png" alt="twitter" />
                                        </Link>
                                    ) : (
                                        <div>
                                            <img src="/assets/socials/twitter.png" alt="twitter" />
                                        </div>    
                                    )}
                                    {socials.tiktok.length ? (
                                        <Link target="_blank" to={`https://tiktok.com/@${socials.tiktok}`}>
                                            <img src="/assets/socials/tiktok.png" alt="tiktok" />
                                        </Link>
                                    ) : (
                                        <div>
                                            <img src="/assets/socials/tiktok.png" alt="tiktok" />
                                        </div>    
                                    )}
                                    {socials.youtube.length ? (
                                        <Link target="_blank" to={`https://youtube.com/@${socials.youtube}`}>
                                            <img src="/assets/socials/youtube.png" alt="youtube" />
                                        </Link>
                                    ) : (
                                        <div>
                                            <img src="/assets/socials/youtube.png" alt="youtube" />
                                        </div>    
                                    )}
                                    {socials.twitch.length ? (
                                        <Link target="_blank" to={`https://twitch.tv/${socials.twitch}`}>
                                            <img src="/assets/socials/twitch.png" alt="twitch" />
                                        </Link>
                                    ) : (
                                        <div>
                                            <img src="/assets/socials/twitch.png" alt="twitch" />
                                        </div>    
                                    )}
                                </span>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section">
                <News addform={true} title='Новости' account={true} news={news} id="accountNews" />
            </section>
        </div>
    )
}