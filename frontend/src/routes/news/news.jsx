import React from 'react'
import $ from 'jquery'
import { Link, useLocation } from 'react-router-dom'

import setTitleName from '../../modules/setTitleName'

import News from "../../components/news/news"

import './news.scss'

export default function NewsPage() {
    const location = useLocation()

    React.useMemo(() => { setTitleName('Новости') })
    const [ news, setNews ] = React.useState([
        { author: {
            id: 1,
            username: 'LonelyNezuko',
            image: { img: 'https://static.displate.com/857x1200/displate/2019-09-04/04e658831fcb7ec9958f496c029cccd2_93f63c496c402fa7ace55ddd3b26bdf8.jpg', size: 200 },
            verified: true
        }, date: new Date(), body: {
            text: 'Привет, это первая новость здесь. Поставь лайк :)',
            attached: [
                { type: "img", src: 'https://i.pinimg.com/736x/5a/c0/76/5ac07656d8527a0a2fb2379081cea082.jpg' }
            ]
        }, feedback: [ 128, 3, 0, 252 ], userInfo: {
            like: true,
            dislike: false,
            view: false,
            subscribed: false
        }, hided: false, blocked: false, ageLimit: false, comments: [
            { author: {
                id: 1,
                username: 'LonelyNezuko',
                image: { img: 'https://static.displate.com/857x1200/displate/2019-09-04/04e658831fcb7ec9958f496c029cccd2_93f63c496c402fa7ace55ddd3b26bdf8.jpg', size: 200 },
                verified: true
            }, body: { text: 'Привет, это я, твой единственный подпищек', attached: {} }, date: new Date(), feedback: [0, 0], userInfo: { like: false, dislike: false }, answers: [
                { author: {
                    id: 1,
                    username: 'LonelyNezuko',
                    image: { img: 'https://static.displate.com/857x1200/displate/2019-09-04/04e658831fcb7ec9958f496c029cccd2_93f63c496c402fa7ace55ddd3b26bdf8.jpg', size: 200 },
                    verified: true
                }, body: { text: 'Привет, это я, твой единственный подпищек', attached: {} }, date: new Date(), feedback: [0, 0], userInfo: { like: false, dislike: false } }
            ] },
        ], tags: 'official tournaments #hashtag #dasdasd' },
        { author: {
            id: 2,
            username: 'BOT',
            image: { img: 'https://cdn.dribbble.com/users/1708653/screenshots/5355337/libe2.png', position: { x: -40, y: 0 }, size: 200 },
            bot: true
        }, date: new Date(), body: {
            text: 'Я очень дружелюбный бот',
            attached: {}
        }, feedback: [ 523, 23, 521, 18592 ], userInfo: {
            like: false,
            dislike: true,
            view: false,
            subscribed: true
        }, hided: false, blocked: false, ageLimit: false },
        { author: {
            id: 3,
            username: 'User',
            image: { img: 'https://gas-kvas.com/uploads/posts/2023-01/1673362466_gas-kvas-com-p-anime-risunki-amino-23.jpg' }
        }, date: new Date(), body: {
            text: 'Привет!',
            attached: {}
        }, feedback: [ 523, 23, 521, 18592 ], userInfo: {
            like: false,
            dislike: false,
            view: false,
            subscribed: false
        }, hided: false, blocked: false, ageLimit: false }
    ])

    return (
        <div id="newsPage">
            <News news={news} />
            <div className="newstype">
                <ul>
                    <Link to="/news" className={location.pathname === '/news' ? 'selected' : ''}>Все новости</Link>
                    <Link to="/news/official" className={location.pathname.indexOf('/news/official') !== -1 ? 'selected' : ''}>Официальные новости</Link>
                    <Link to="/news/subscribers" className={location.pathname.indexOf('/news/subscribers') !== -1 ? 'selected' : ''}>Подписки</Link>
                    <Link to="/news/tournaments" className={location.pathname.indexOf('/news/tournaments') !== -1 ? 'selected' : ''}>Турниры</Link>
                </ul>
            </div>
        </div>
    )
}