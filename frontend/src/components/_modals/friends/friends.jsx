import React from "react"
import { Link } from 'react-router-dom'
import $ from 'jquery'

import OnlineStatus from "../../../modules/onlineStatus"
import Avatar from '../../avatar/avatar'

import './friends.scss'

import { RiSettings6Fill } from 'react-icons/ri'
import { IoAddCircle } from 'react-icons/io5'
import { RiMessageFill } from 'react-icons/ri'
import { IoCube } from 'react-icons/io5'

export default function FriendsModal({ 
    toggleStatus,
    openedElement,

    friendsList = [[], []], typeCount = [0, 0, 0],

    onHide,
    onFriendAccept = () => {},
    onFriendInvited = () => {},

    hideAction = false,
    hideAwait = false,
    hideAll = false,

    invite = false,
    teamAccounts = []
}) {
    React.useEffect(() => {
        $(window).on('click', event => {
            if($('.friendsModal').hasClass('friendsModalShow')
                && !$('.friendsModal').is(event.target) && !$('.friendsModal').has(event.target).length
                && !$(openedElement).is(event.target) && !$(openedElement).has(event.target).length) onHide()
        })
    }, [])
    const [ type, setType ] = React.useState(0)

    return (
        <div className={`friendsModal ${toggleStatus ? 'friendsModalShow' : ''}`}>
            <div className="header">
                <div onClick={() => setType(0)} className={`type ${!type ? 'selected' : ''}`}>
                    <div>
                        <h1>Онлайн</h1>
                        <button className="btn">{typeCount[0].toLocaleString()}</button>
                    </div>
                </div>
                {hideAll ? '' : (
                    <Link onClick={() => onHide()} to="/account/friends" className='type'>
                        <div>
                            <h1>Все</h1>
                            <button className="btn">{typeCount[1].toLocaleString()}</button>
                        </div>
                    </Link>
                )}
                {hideAwait ? '' : (
                    <div onClick={() => setType(1)} className={`type ${type === 1 ? 'selected' : ''}`}>
                        <div>
                            <h1>Заявки</h1>
                            <button className="btn">{typeCount[2].toLocaleString()}</button>
                        </div>
                    </div>
                )}
            </div>
            <div className="bodyWrapper">
                <div className="bodyWrap" style={{transform: `translateX(${type * -100}%)`}}>
                    <div className="body">
                        {!friendsList[0].length ? (
                            <div className="empty">
                                <img src='/assets/other/sadSmile.png' alt="Грустное лицо" />
                                <h1>Увы, пока ничего</h1>
                            </div>
                        ) : ''}
                        {friendsList[0].map((item, i) => {
                            return (
                                <div className="friend">
                                    <div className="split">
                                        <Link onClick={() => onHide()} to={`/account/${item.link}`}>
                                            <Avatar online={true} image={item.avatar.image} size={item.avatar.size} position={item.avatar.position} />
                                        </Link>
                                        <div className="desc">
                                            <Link onClick={() => onHide()} to={`/account/${item.link}`} className="username link">
                                                <h1>{item.username}</h1>
                                                {item.isBot ? (<span className="bot"></span>) : ''}
                                                {item.isVerified ? (<span className="verified"></span>) : ''}
                                            </Link>
                                            <div className="info">
                                                <OnlineStatus status={item.status} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="split">
                                        {invite ? 
                                            item.isInTeam || (item.status && item.status.type === 'playmatch') ? (
                                                <button onClick={() => onFriendInvited(i)} title={`Друг уже ${(item.status && item.status.type === 'playmatch') ? 'играет' : 'в тиме'}`} className="btn blocked">Пригласить</button>
                                            ) : (<button onClick={() => onFriendInvited(i)} className={`btn ${teamAccounts.findIndex(elem => elem.id === item.id) !== -1 ? 'blocked' : ''}`}>{teamAccounts.findIndex(elem => elem.id === item.id) === -1 ? 'Пригласить' : 'Отправлено'}</button>)
                                        : ''}
                                        {hideAction ? '' : (
                                            <div className="action">
                                                <button className="main btn transparent icon">
                                                    <RiSettings6Fill />
                                                </button>

                                                <section>
                                                    {!item.isInTeam ? (
                                                        <button title="Добавить в группу" className="btn transparent icon">
                                                            <IoAddCircle />
                                                        </button>
                                                    ) : ''}
                                                    <button title="Отправить сообщение" className="btn transparent icon">
                                                        <RiMessageFill />
                                                    </button>
                                                    {(item.status && item.status.type === 'playmatch') ? (
                                                        <Link to={`/match/${item.status.matchid}`} title="Смотреть за игрой" className="btn transparent icon">
                                                            <IoCube />
                                                        </Link>
                                                    ) : ''}
                                                </section>
                                            </div>
                                        )}
                                    </div>
                                </div>    
                            )
                        })}
                    </div>
                    <div className="body">
                        {!friendsList[1].length ? (
                            <div className="empty">
                                <img src='/assets/other/sadSmile.png' alt="Грустное лицо" />
                                <h1>Увы, пока ничего</h1>
                            </div>
                        ) : ''}
                        {friendsList[1].map((item, i) => {
                            return (
                                <div className="friend">
                                    <div className="split">
                                        <Link onClick={() => onHide()} to={`/account/${item.link}`}>
                                            <Avatar online={true} image={item.avatar.image} size={item.avatar.size} position={item.avatar.position} />
                                        </Link>
                                        <div className="desc">
                                            <Link onClick={() => onHide()} to={`/account/${item.link}`} className="link username">
                                                <h1>{item.username}</h1>
                                                {item.isBot ? (<span className="bot"></span>) : ''}
                                                {item.isVerified ? (<span className="verified"></span>) : ''}
                                            </Link>
                                            <div className="action-i">
                                                {/* {!acceptStatus ? (
                                                    <>
                                                        <button onClick={() => onFriendAccept(i, true, false)} className="btn">Принять</button>
                                                        <button onClick={() => setAcceptStatus(true)} className="btn">Отклонить</button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <h1>Это спам?</h1>
                                                        <button onClick={() => onFriendAccept(i, false, true)} className="btn">Да</button>
                                                        <button onClick={() => onFriendAccept(i, false, false)} className="btn">Нет</button>
                                                    </>
                                                )} */}

                                                <button onClick={() => onFriendAccept(i, true)} className="btn">Принять</button>
                                                <button onClick={() => onFriendAccept(i, false)} className="btn">Отклонить</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>    
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}