import React from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'

import Moment from 'moment'
import 'moment/locale/ru'

import Avatar from '../../avatar/avatar'
import OnlineStatus from '../../../modules/onlineStatus'

import './messenger.scss'

import { RiMessageFill } from 'react-icons/ri'

import { HiDotsVertical } from 'react-icons/hi'

import { FaRegSmileWink } from 'react-icons/fa'
import { IoSend } from 'react-icons/io5'

import { IoCheckmark } from 'react-icons/io5'
import { IoCheckmarkDone } from 'react-icons/io5'

import { ImCheckmark } from 'react-icons/im'

export default function Messenger() {
    const CONFIG = require('../../../config.json')

    const [ account, setAccount ] = React.useState({
        username: 'LonelyNezuko',
        id: 1,
        link: 'lonelynezuko',
        isVerified: true,
        isBot: false,
        avatar: { image: 'https://static.displate.com/857x1200/displate/2019-09-04/04e658831fcb7ec9958f496c029cccd2_93f63c496c402fa7ace55ddd3b26bdf8.jpg', size: 200 },
        background: { image: 'https://rare-gallery.com/uploads/posts/955295-anime-anime-girls-digital-art-artwork-2D-portrait.jpg' },
        status: {
            type: 'afk'
        },
        isInTeam: {
            teamid: 258173,
            team: {}
        }
    },)

    const [ toggle, setToggle ] = React.useState(false)
    React.useEffect(() => {
        $(window).on('click', event => {
            if($('.messenger .menu').hasClass('show')
                && !$('.messenger .menu').is(event.target) && !$('.messenger .menu').has(event.target).length
                && !$('.messenger .openclick').is(event.target) && !$('.messenger .openclick').has(event.target).length) setToggle(false)
        })
    }, [])

    const [ dialogs, setDialogs ] = React.useState([
        {
            id: 1,
            type: 'personal',
            accounts: [
                {
                    username: 'LonelyNezuko',
                    id: 1,
                    link: 'lonelynezuko',
                    isVerified: true,
                    isBot: false,
                    avatar: { image: 'https://static.displate.com/857x1200/displate/2019-09-04/04e658831fcb7ec9958f496c029cccd2_93f63c496c402fa7ace55ddd3b26bdf8.jpg', size: 200 },
                    background: { image: 'https://rare-gallery.com/uploads/posts/955295-anime-anime-girls-digital-art-artwork-2D-portrait.jpg' },
                    status: {
                        type: 'afk'
                    },
                    isInTeam: {
                        teamid: 258173,
                        team: {}
                    }
                },
                { username: 'Bot', id: 2, link: 'bot', isVerified: false, isBot: true, avatar: { image: 'https://cdn.dribbble.com/users/1708653/screenshots/5355337/libe2.png', size: 200, position: {x: -40, y: 0} }, status: { type: 'watchmatch', matchid: 2758272 } },
            ],
            lastMessage: {
                date: 1672597885000,
                text: 'Привет, ты подписан на нас, друг? Если нет, то срочно подписывайся. Здесь ты узнаешь все, что проиходит на данной площадке!',
                type: 'message',
                owner: { username: 'Bot', id: 2, link: 'bot', isVerified: false, isBot: true, avatar: { image: 'https://cdn.dribbble.com/users/1708653/screenshots/5355337/libe2.png', size: 200, position: {x: -40, y: 0} }, status: { type: 'watchmatch', matchid: 2758272 } },
            },
            unread: 23,
            messages: [
                {
                    id: 1,
                    owner: { username: 'Bot', id: 2, link: 'bot', isVerified: false, isBot: true, avatar: { image: 'https://cdn.dribbble.com/users/1708653/screenshots/5355337/libe2.png', size: 200, position: {x: -40, y: 0} }, status: { type: 'watchmatch', matchid: 2758272 } },
                    date: 1672597885000, readers: [2], text: 'Привет, ты подписан на нас, друг? Если нет, то срочно подписывайся. Здесь ты узнаешь все, что проиходит на данной площадке!'
                }
            ]
        },
        {
            id: 2,
            type: 'personal',
            accounts: [
                {
                    username: 'LonelyNezuko',
                    id: 1,
                    link: 'lonelynezuko',
                    isVerified: true,
                    isBot: false,
                    avatar: { image: 'https://static.displate.com/857x1200/displate/2019-09-04/04e658831fcb7ec9958f496c029cccd2_93f63c496c402fa7ace55ddd3b26bdf8.jpg', size: 200 },
                    background: { image: 'https://rare-gallery.com/uploads/posts/955295-anime-anime-girls-digital-art-artwork-2D-portrait.jpg' },
                    status: {
                        type: 'afk'
                    },
                    isInTeam: {
                        teamid: 258173,
                        team: {}
                    }
                },
                { username: 'User 3', id: 5, link: 'id5', isVerified: false, isBot: false, avatar: { image: 'https://fanibani.ru/images/wp-content/uploads/2021/02/image186-32.jpg' }, status: { type: 'playmatch', matchid: 58295727, gameName: 'Dota 2' } },
            ],
            lastMessage: {
                date: new Date(),
                text: 'Хай, как дела?',
                type: 'message',
                owner: {
                    username: 'LonelyNezuko',
                    id: 1,
                    link: 'lonelynezuko',
                    isVerified: true,
                    isBot: false,
                    avatar: { image: 'https://static.displate.com/857x1200/displate/2019-09-04/04e658831fcb7ec9958f496c029cccd2_93f63c496c402fa7ace55ddd3b26bdf8.jpg', size: 200 },
                    background: { image: 'https://rare-gallery.com/uploads/posts/955295-anime-anime-girls-digital-art-artwork-2D-portrait.jpg' },
                    status: {
                        type: 'afk'
                    },
                    isInTeam: {
                        teamid: 258173,
                        team: {}
                    }
                }
            },
            unread: 1,
        },
        {
            id: 3,
            type: 'team',
            name: 'team_LonelyNezuko',
            accounts: [
                {
                    username: 'LonelyNezuko',
                    id: 1,
                    link: 'lonelynezuko',
                    isVerified: true,
                    isBot: false,
                    avatar: { image: 'https://static.displate.com/857x1200/displate/2019-09-04/04e658831fcb7ec9958f496c029cccd2_93f63c496c402fa7ace55ddd3b26bdf8.jpg', size: 200 },
                    background: { image: 'https://rare-gallery.com/uploads/posts/955295-anime-anime-girls-digital-art-artwork-2D-portrait.jpg' },
                    status: {
                        type: 'afk'
                    },
                    isInTeam: {
                        teamid: 258173,
                        team: {}
                    }
                },
                { username: 'User 3', id: 5, link: 'id5', isVerified: false, isBot: false, avatar: { image: 'https://fanibani.ru/images/wp-content/uploads/2021/02/image186-32.jpg' }, status: { type: 'playmatch', matchid: 58295727, gameName: 'Dota 2' } },
                { username: 'User 4', id: 6, link: 'id6', isVerified: false, isBot: false, avatar: { image: 'https://coolsen.ru/wp-content/uploads/2021/12/160-20211222_191732.jpg', size: 200, position: { x: -50, y: 0 } }, status: { type: '' } },
                { username: 'User 2', id: 4, link: 'id4', isVerified: false, isBot: false, avatar: { image: 'https://gas-kvas.com/uploads/posts/2023-01/1673362466_gas-kvas-com-p-anime-risunki-amino-23.jpg' } }
            ],
            lastMessage: {
                date: new Date(),
                text: 'Привет, ты подписан на нас, друг? Если нет, то срочно подписывайся. Здесь ты узнаешь все, что проиходит на данной площадке!',
                type: 'message',
                owner: { username: 'User 2', id: 4, link: 'id4', isVerified: false, isBot: false, avatar: { image: 'https://gas-kvas.com/uploads/posts/2023-01/1673362466_gas-kvas-com-p-anime-risunki-amino-23.jpg' } }
            },
            unread: 1
        },
        {
            id: 4,
            type: 'group',
            group: { link: 'bomj' },
            name: 'Мы бомжи и гордимся этим',
            avatar: { image: 'https://phonoteka.org/uploads/posts/2021-05/1622057773_15-phonoteka_org-p-bomzh-art-krasivo-18.jpg', size: 170, position: { x: -40, y: 0 } },
            accounts: [
                {
                    username: 'LonelyNezuko',
                    id: 1,
                    link: 'lonelynezuko',
                    isVerified: true,
                    isBot: false,
                    avatar: { image: 'https://static.displate.com/857x1200/displate/2019-09-04/04e658831fcb7ec9958f496c029cccd2_93f63c496c402fa7ace55ddd3b26bdf8.jpg', size: 200 },
                    background: { image: 'https://rare-gallery.com/uploads/posts/955295-anime-anime-girls-digital-art-artwork-2D-portrait.jpg' },
                    status: {
                        type: 'afk'
                    },
                    isInTeam: {
                        teamid: 258173,
                        team: {}
                    }
                },
                { username: 'User 3', id: 5, link: 'id5', isVerified: false, isBot: false, avatar: { image: 'https://fanibani.ru/images/wp-content/uploads/2021/02/image186-32.jpg' }, status: { type: 'playmatch', matchid: 58295727, gameName: 'Dota 2' } },
                { username: 'User 4', id: 6, link: 'id6', isVerified: false, isBot: false, avatar: { image: 'https://coolsen.ru/wp-content/uploads/2021/12/160-20211222_191732.jpg', size: 200, position: { x: -50, y: 0 } }, status: { type: '' } },
                { username: 'User 2', id: 4, link: 'id4', isVerified: false, isBot: false, avatar: { image: 'https://gas-kvas.com/uploads/posts/2023-01/1673362466_gas-kvas-com-p-anime-risunki-amino-23.jpg' } }
            ],
            lastMessage: {
                date: new Date(),
                text: 'Кто не бомж, тот лох',
                type: 'message',
                owner: { username: 'User 2', id: 4, link: 'id4', isVerified: false, isBot: false, avatar: { image: 'https://gas-kvas.com/uploads/posts/2023-01/1673362466_gas-kvas-com-p-anime-risunki-amino-23.jpg' } }
            },
            unread: 1,
        }
    ])
    const [ dialogSelected, setDialogSelected ] = React.useState(-1)

    return (
        <section className="messenger new" data-new="998">
            <button onClick={() => setToggle(!toggle)} className="openclick btn icon transparent">
                <RiMessageFill />
            </button>

            <div className={`menu ${toggle ? 'show' : ''}`}>
                <div className="dialogs">
                    {dialogs.map((item, i) => {
                        return (<Dialog key={i} dialog={item} account={account} isDialogSelected={dialogSelected === i ? true : false} onClick={() => setDialogSelected(i)} />)
                    })}
                </div>
                <div className="body">
                    {dialogSelected === -1 ? '' : (<Messages dialog={dialogs[dialogSelected]} account={account} />)}
                </div>
            </div>
        </section>
    )
}


function Messages({ dialog, account }) {
    function returnPreview() {
        let text = ''
        let preview = {
            avatar: { image: '' },
            name: '',
            link: ''
        }

        if(dialog.type === 'personal') {
            if(!preview.name.length) {
                const user = dialog.accounts.find(elem => elem.id !== account.id)
                if(user) preview = {
                    avatar: user.avatar,
                    name: user.username,
                    link: '/account/' + user.link,
    
                    isBot: user.isBot,
                    isVerified: user.isVerified,

                    status: user.status
                }
            }
        }
        if(dialog.type === 'team') {
            if(!preview.name.length) {
                const user = dialog.accounts[0]
                if(user) preview = {
                    avatar: user.avatar,
                    name: dialog.name || 'team_' + user.username
                }
            }
        }
        if(dialog.type === 'group') {
            if(!preview.name.length) {
                preview = {
                    avatar: dialog.avatar,
                    name: dialog.name,
                    link: '/groups/' + dialog.group.link
                }
            }
        }

        return { preview }
    }
    const noAnswerType = {
        'banned': 'Вы не можете отправить сообщение, поскольку пользователь заблокировал Вас.',
        'youbanned': 'Вы не можете отправить сообщение, посколько Вы заблокировали данного пользователя.',
        'nofriend': 'Чтобы отправить сообщение данному пользователю - будьте его другом.',
        '*': 'Вы не можете отправить данному пользователю сообщение'
    }

    return (
        <>
            <div className="header">
                <section className="section">
                    {dialog.type === 'peronal' || dialog.type === 'group' ? (
                        <Link to={returnPreview().preview.link}>
                            <Avatar online={true} image={returnPreview().preview.avatar.image} size={returnPreview().preview.avatar.size} position={returnPreview().preview.avatar.position} />
                        </Link>
                    ) : (
                        <Avatar online={true} image={returnPreview().preview.avatar.image} size={returnPreview().preview.avatar.size} position={returnPreview().preview.avatar.position} />
                    )}
                    <div className="subdesc">
                        {dialog.type === 'peronal' || dialog.type === 'group' ? (
                            <Link to={returnPreview().preview.link} className="link username">
                                <h1>{returnPreview().preview.name}</h1>
                                {returnPreview().preview.isVerified ? (<span className="verified"></span>) : ''}
                                {returnPreview().preview.isBot ? (<span className="bot"></span>) : ''}
                            </Link>
                        ) : (
                            <div className="username">
                                <h1>{returnPreview().preview.name}</h1>
                                {returnPreview().preview.isVerified ? (<span className="verified"></span>) : ''}
                                {returnPreview().preview.isBot ? (<span className="bot"></span>) : ''}
                            </div>
                        )}
                        {dialog.type === 'personal' ? (
                            <div className="text">
                                <span className="opacity">
                                    <OnlineStatus status={returnPreview().preview.status} />
                                </span>
                            </div>
                        ) : ''}
                    </div>
                </section>
                <section className="section">
                    <button className="btn icon focus">
                        <HiDotsVertical />
                    </button>
                </section>
            </div>
            <div className="messages">
                {dialog.messages ? dialog.messages.map((item, i) => {
                    return (
                        <div className={`message ${item.owner.id === account.id ? 'invert' : ''}`}>
                            <div className="wrapper">
                                <div className="left">
                                    <Link to={`/account/${item.owner.link}`}>
                                        <Avatar online={true} image={item.owner.avatar.image} size={item.owner.avatar.size} position={item.owner.avatar.position} />
                                    </Link>
                                </div>
                                <div className="right">
                                    <div className="text">
                                        {item.text}
                                    </div>
                                    <div className="bottom">
                                        <div className="date">{parseInt(Moment(item.date).format('YYYY')) === parseInt(Moment(new Date()).format('YYYY'))
                                            ? Moment(item.date).calendar({
                                                sameDay: 'HH:MM',
                                                sameElse: 'Do MMM'
                                            }) : Moment(item.date).format('DD.MM.YYYY')}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="choiced">
                                <ImCheckmark />
                            </div>
                        </div>
                    )
                }) : ''}
            </div>
            <div className="form">
                {dialog.noAnswer ? (
                    <div className="ban">
                        {noAnswerType[dialog.noAnswer] || `Вы не можете отправить данному пользователю сообщение (${dialog.noAnswer})`}
                    </div>
                ) : (
                    <>
                        <div className="action">
                            <button className="btn icon transparent">
                                <FaRegSmileWink />
                            </button>
                        </div>
                        <input type="text" placeholder="Напишите сообщение..." />
                        <div className="send">
                            <button className="btn icon transparent">
                                <IoSend />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

function Dialog({ dialog, account, isDialogSelected, onClick }) {
    const CONFIG = require('../../../config.json')

    function returnPreview() {
        let text = ''
        let preview = {
            avatar: { image: '' },
            name: '',
            link: ''
        }

        if(!dialog.isTyping && dialog.lastMessage.owner.id === account.id) {
            let tempText = dialog.lastMessage.text
            
            tempText = ('Вы: ' + dialog.lastMessage.text).substring(0, CONFIG.maxDialogsSubStringLength).replace('Вы: ', '')
            if(('Вы:' + dialog.lastMessage.text).length > CONFIG.maxDialogsSubStringLength) tempText += '...'
    
            text = (
                <>
                    <h1>Вы: </h1>
                    <span>{tempText}</span>
                </>
            )
        }
    
        
        if(dialog.type === 'personal') {
            if(!preview.name.length) {
                const user = dialog.accounts.find(elem => elem.id !== account.id)
                if(user) preview = {
                    avatar: user.avatar,
                    name: user.username,
                    link: '/account/' + user.link,
    
                    isBot: user.isBot,
                    isVerified: user.isVerified
                }
            }

            if(!text) {
                if(dialog.isTyping && dialog.isTyping.id !== account.id) text = (<span className="color">печатает...</span>)
                else {
                    let tempText = dialog.lastMessage.text
                    
                    tempText = dialog.lastMessage.text.substring(0, CONFIG.maxDialogsSubStringLength)
                    if(dialog.lastMessage.text.length > CONFIG.maxDialogsSubStringLength) tempText += '...'
    
                    text = (<span>{tempText}</span>)
                }
            }
        }
        if(dialog.type === 'team') {
            if(!preview.name.length) {
                const user = dialog.accounts[0]
                if(user) preview = {
                    avatar: user.avatar,
                    name: dialog.name || 'team_' + user.username
                }
            }
        }
        if(dialog.type === 'group') {
            if(!preview.name.length) {
                preview = {
                    avatar: dialog.avatar,
                    name: dialog.name,
                    link: '/groups/' + dialog.group.link
                }
            }
        }

        if((dialog.type === 'team' || dialog.type === 'group') && !text) {
            let tempText = dialog.lastMessage.text

            tempText = (dialog.lastMessage.owner.username + ': ' + dialog.lastMessage.text).substring(0, CONFIG.maxDialogsSubStringLength).replace(dialog.lastMessage.owner.username + ': ', '')
            if((dialog.lastMessage.owner.username + ': ' + dialog.lastMessage.text).length > CONFIG.maxDialogsSubStringLength) tempText += '...'
    
            text = (
                <>
                    <h1>{dialog.lastMessage.owner.username + ': '}</h1>
                    <span>{tempText}</span>
                </>
            )
        }

        return { preview, text }
    }

    return (
        <div onClick={() => onClick()} className={`dialog ${isDialogSelected ? 'selected' : ''}`}>
            <div className="left">
                {dialog.type === 'personal' || dialog.type === 'group' ? (
                    <Link to={returnPreview().preview.link}>
                        <Avatar online={true} image={returnPreview().preview.avatar.image} size={returnPreview().preview.avatar.size} position={returnPreview().preview.avatar.position} />
                    </Link>
                ) : (
                    <Avatar online={true} image={returnPreview().preview.avatar.image} size={returnPreview().preview.avatar.size} position={returnPreview().preview.avatar.position} />
                )}
            </div>
            <div className="info">
                <div className="name">
                    {dialog.type === 'personal' || dialog.type === 'group' ? (
                        <Link to={returnPreview().preview.link} className="link username">
                            <h1>{returnPreview().preview.name}</h1>
                            {returnPreview().preview.isVerified ? (<span className="verified"></span>) : ''}
                            {returnPreview().preview.isBot ? (<span className="bot"></span>) : ''}
                        </Link>    
                    ) : (
                        <div className="username">
                            <h1>{returnPreview().preview.name}</h1>
                            {returnPreview().preview.isVerified ? (<span className="verified"></span>) : ''}
                            {returnPreview().preview.isBot ? (<span className="bot"></span>) : ''}
                        </div>
                    )}
                    <div className="date">{parseInt(Moment(dialog.lastMessage.date).format('YYYY')) === parseInt(Moment(new Date()).format('YYYY'))
                        ? Moment(dialog.lastMessage.date).calendar({
                            sameDay: 'HH:MM',
                            sameElse: 'Do MMM'
                        }) : Moment(dialog.lastMessage.date).format('DD.MM.YYYY')}</div>
                </div>
                <div className="subdesc">
                    <div className="text">
                        {returnPreview().text}
                    </div>
                    {dialog.unread > 0 ? (<div className="new" data-new={dialog.unread > 99 ? '99+' : dialog.unread}></div>) : ''}
                </div>
            </div>
        </div>
    )
}