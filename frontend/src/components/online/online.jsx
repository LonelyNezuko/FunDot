import React from "react"
import { Link } from 'react-router-dom'

import './online.scss'

import OnlineStatus from "../../modules/onlineStatus"
import Avatar from '../avatar/avatar'

export default function Online() {
    const [ online, setOnline ] = React.useState([
        { username: 'LonelyNezuko', id: 'lonelynezuko', isVerified: true, isBot: false, avatar: {
            image: 'https://i.ibb.co/2cgHpWC/nezu5-2.jpg',
            size: 100,
            position: { x: 0, y: 0 }
        }, status: { type: 'Наелся и спит' } },
        { username: 'bot', id: '123', isVerified: false, isBot: true, avatar: { image: 'https://cdn.dribbble.com/users/1708653/screenshots/5355337/libe2.png', size: 200, position: {x: -40, y: 0} }, status: { type: 'watchmatch', matchid: 2758272 } },
        { username: 'User', id: '2561', isVerified: false, isBot: false, avatar: { image: 'https://gas-kvas.com/uploads/posts/2023-01/1673362466_gas-kvas-com-p-anime-risunki-amino-23.jpg' }, status: { type: 'playmatch', matchid: 58295727, gameName: 'Dota 2' } },
        { username: 'User 2', id: '231331', isVerified: false, isBot: false, avatar: { image: 'https://gas-kvas.com/uploads/posts/2023-01/1673362466_gas-kvas-com-p-anime-risunki-amino-23.jpg' }, status: { type: 'Бугагага' } }
    ])
    const [ allOnline, setAllOnline ] = React.useState(85729382)

    return (
        <div id="online">
            <header>
                <h1>Онлайн</h1>
                <span>{allOnline.toLocaleString()} чел.</span>
            </header>
            <section className="list">
                {online.map((item, i) => {
                    return (<Link to={`/account/${item.id}`} className="item">
                        <Avatar image={item.avatar.image} type='min' size={item.avatar.size} position={item.avatar.position} />
                        <h1>
                            {item.username}

                            {item.isVerified ? (<span className="verified"></span>) : ''}
                            {item.isBot ? (<span className="bot"></span>) : ''}

                            <OnlineStatus status={item.status} />
                        </h1>
                    </Link>)
                })}
            </section>
        </div>
    )
}