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
            avatar: { image: 'https://i.ibb.co/2cgHpWC/nezu5-2.jpg', size: 100, position: { x: 0, y: 0 } },
            isVerified: true
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
        }, hidden: false, blocked: false, reported: false, ageLimit: false, isPin: false, forSubs: false, forFriends: false,
        comments: [], tags: '#job #news' },

        { author: {
            id: 1,
            username: 'LonelyNezuko',
            avatar: { image: 'https://static.displate.com/857x1200/displate/2019-09-04/04e658831fcb7ec9958f496c029cccd2_93f63c496c402fa7ace55ddd3b26bdf8.jpg', size: 200 },
            isVerified: true
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
        }, hidden: false, blocked: false, reported: false, ageLimit: false, isPin: true, forSubs: true,
        comments: [
            { author: {
                id: 1,
                username: 'LonelyNezuko',
                avatar: { image: 'https://i.ibb.co/2cgHpWC/nezu5-2.jpg', size: 100, position: { x: 0, y: 0 } },
                isVerified: true
            }, body: { text: 'Привет, это я, твой единственный подпищек', attached: {} }, date: new Date(), feedback: [0, 0], userInfo: { like: false, dislike: false }, answers: [
                { author: {
                    id: 1,
                    username: 'LonelyNezuko',
                    avatar: { image: 'https://i.ibb.co/2cgHpWC/nezu5-2.jpg', size: 100, position: { x: 0, y: 0 } },
                    isVerified: true
                }, body: { text: 'Да, я знаю, спасибо', attached: {} }, date: new Date(), feedback: [0, 0], userInfo: { like: false, dislike: false } },
                { author: {
                    id: 1,
                    username: 'LonelyNezuko',
                    avatar: { image: 'https://i.ibb.co/2cgHpWC/nezu5-2.jpg', size: 100, position: { x: 0, y: 0 } },
                    isVerified: true
                }, body: { text: 'Да, я знаю, спасибо', attached: {} }, date: new Date(), feedback: [0, 0], userInfo: { like: false, dislike: false } }
            ] },
            { author: {
                id: 1,
                username: 'LonelyNezuko',
                avatar: { image: 'https://i.ibb.co/2cgHpWC/nezu5-2.jpg', size: 100, position: { x: 0, y: 0 } },
                isVerified: true
            }, body: { text: 'Привет, это я, твой единственный подпищек', attached: {} }, date: new Date(), feedback: [0, 0], userInfo: { like: false, dislike: false }, answers: [] }
        ], tags: '#top official tournaments' },

        { author: {
            username: 'bot',
            id: 123,
            isVerified: false,
            isBot: true,
            avatar: { image: 'https://cdn.dribbble.com/users/1708653/screenshots/5355337/libe2.png', size: 200, position: {x: -40, y: 0} },
        },
        date: new Date(), body: {
            text: 'Я бот. Я бот. Я бот',
            attached: []
        }, feedback: [ 128, 3, 0, 252 ], userInfo: {
            like: true,
            dislike: false,
            view: false,
            subscribed: false
        }, hidden: false, blocked: false, reported: false, ageLimit: false, isPin: true, forSubs: false,
        comments: [], tags: '#ябот' },
    ])

    return (
        <div id="newsPage">
            <News news={news} id="newsPage_news" />
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