import React from "react"
import { Link } from 'react-router-dom'
import $ from 'jquery'

import Moment from 'moment'
import 'moment/locale/ru'

import Avatar from '../../avatar/avatar'

import './notify.scss'

export default function NotifyModal({toggleStatus, notifyList, onClear, onHide, openedElement}) {
    React.useEffect(() => {
        $(window).on('click', event => {
            if($('.notifyModal').hasClass('notifyModalShow')
                && !$('.notifyModal').is(event.target) && !$('.notifyModal').has(event.target).length
                && !$(openedElement).is(event.target) && !$(openedElement).has(event.target).length) onHide()
        })
    }, [])

    return (
        <div className={`notifyModal ${toggleStatus ? 'notifyModalShow' : ''}`}>
            <div className="header">
                <h1>Уведомления</h1>
                <h2>
                    <a onClick={() => onClear()}>Очистить</a>
                    <Link to="/account/settings/notify">Настройки</Link>
                </h2>
            </div>
            <div className="body">
                {!notifyList.length ? (
                    <div className="empty">
                        <img src='/assets/other/sadSmile.png' alt="Грустное лицо" />
                        <h1>Увы, пока ничего</h1>
                    </div>
                ) : ''}
                {notifyList.map((item, i) => {
                    return (
                        <div key={i} className="notify">
                            <div className="title">{item.title}</div>
                            <div className={`desc ${item.attached && item.attached.photos ? 'wrap' : ''}`}>
                                <div className="text">{item.text}</div>
                                {item.attached ? (
                                    <div className="attached">
                                        {item.attached.avatar ? (<Avatar image={item.attached.avatar.image} size={item.attached.avatar.size} position={item.attached.avatar.position} />) : ''}
                                        {item.attached.photos ? (
                                            <div className="photos">
                                                {item.attached.photos.map((photo, photoid) => { return (<img key={photoid} src={photo} alt="IMG" />) })}
                                            </div>
                                        ) : ''}
                                        {item.attached.photo ? (
                                            <div className="photo">
                                                <img src={item.attached.photo} alt="IMG" />
                                            </div>
                                        ) : ''}
                                    </div>
                                ) : ''}
                            </div>
                            <div className="date">{Moment(item.date).fromNow()}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}