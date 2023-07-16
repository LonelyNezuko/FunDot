import React from 'react'
import { Link, useLocation } from "react-router-dom"

import './quick.scss'

import NotifyModal from '../../_modals/notify/notify'
import FriendsModal from '../../_modals/friends/friends'

import { MdExitToApp } from 'react-icons/md'
import { IoSettingsSharp } from 'react-icons/io5'
import { IoMdNotifications } from 'react-icons/io'
import { FaUserFriends } from 'react-icons/fa'

export default function Nav() {
    const location = useLocation()

	const [ notify, setNotify ] = React.useState([
		{ title: 'Тех. работы', text: 'С 30.04, 08:30 (UTC+3) пройдут технические работы на сайте. В течении 30ти минут сайт не будет работать (уже зарегистрированные игры будут работать в штатном режиме). Приносим извинения за неудобства!', date: new Date() },
        { title: 'Тех. работы', text: 'С 30.04, 08:30 (UTC+3) пройдут технические работы на сайте. В течении 30ти минут сайт не будет работать (уже зарегистрированные игры будут работать в штатном режиме). Приносим извинения за неудобства!', date: new Date(), attached: {
            photo: 'https://i.ytimg.com/vi/GwC6j4Do--E/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAqutPnpaurBvqhh7YhNl6F1CQ_qA'
        } },
        { title: 'Тех. работы', text: 'С 30.04, 08:30 (UTC+3) пройдут технические работы на сайте. В течении 30ти минут сайт не будет работать (уже зарегистрированные игры будут работать в штатном режиме). Приносим извинения за неудобства!', date: new Date(), attached: {
            photos: ['https://i.ytimg.com/vi/GwC6j4Do--E/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAqutPnpaurBvqhh7YhNl6F1CQ_qA', 'https://i.ytimg.com/vi/GwC6j4Do--E/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAqutPnpaurBvqhh7YhNl6F1CQ_qA', 'https://i.ytimg.com/vi/GwC6j4Do--E/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAqutPnpaurBvqhh7YhNl6F1CQ_qA', 'https://i.ytimg.com/vi/GwC6j4Do--E/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAqutPnpaurBvqhh7YhNl6F1CQ_qA']
        } },
        { title: 'Тех. работы', text: 'С 30.04, 08:30 (UTC+3) пройдут технические работы на сайте. В течении 30ти минут сайт не будет работать (уже зарегистрированные игры будут работать в штатном режиме). Приносим извинения за неудобства!', date: new Date(), attached: {
            avatar: { image: 'https://static.displate.com/857x1200/displate/2019-09-04/04e658831fcb7ec9958f496c029cccd2_93f63c496c402fa7ace55ddd3b26bdf8.jpg', size: 200 }
        } }
	])
	const [ notifyToggle, setNotifyToggle ] = React.useState(false)
    function notifyOnClear() {

    }

	const [ friends, setFriends ] = React.useState([
		[
			{ username: 'LonelyNezuko', id: 1, link: 'lonelynezuko', isVerified: true, isBot: false, avatar: { image: 'https://static.displate.com/857x1200/displate/2019-09-04/04e658831fcb7ec9958f496c029cccd2_93f63c496c402fa7ace55ddd3b26bdf8.jpg', size: 200 }, status: { type: 'afk' }, isInTeam: { teamid: 295 } },
			{ username: 'Bot', id: 2, link: 'bot', isVerified: false, isBot: true, avatar: { image: 'https://cdn.dribbble.com/users/1708653/screenshots/5355337/libe2.png', size: 200, position: {x: -40, y: 0} }, status: { type: 'watchmatch', matchid: 2758272 } },
        	{ username: 'User', id: 3, link: 'id3', isVerified: false, isBot: false, avatar: { image: 'https://gas-kvas.com/uploads/posts/2023-01/1673362466_gas-kvas-com-p-anime-risunki-amino-23.jpg' }, status: { type: 'playmatch', matchid: 58295727, gameName: 'Dota 2' } },
        	{ username: 'User 2', id: 4, link: 'id4', isVerified: false, isBot: false, avatar: { image: 'https://gas-kvas.com/uploads/posts/2023-01/1673362466_gas-kvas-com-p-anime-risunki-amino-23.jpg' } }
		],
		[
			{ username: 'User 3', id: 5, link: 'id5', isVerified: true, isBot: false, avatar: { image: 'https://fanibani.ru/images/wp-content/uploads/2021/02/image186-32.jpg' }, status: { type: 'playmatch', matchid: 58295727, gameName: 'Dota 2' } },
        	{ username: 'User 4', id: 6, link: 'id6', isVerified: false, isBot: false, avatar: { image: 'https://coolsen.ru/wp-content/uploads/2021/12/160-20211222_191732.jpg', size: 200, position: { x: -50, y: 0 } }, status: { type: '' } }
		]
	])
	const [ friendsToggle, setFriendsToggle ] = React.useState(false)
	const [ friendsAll, setFriendsAll ] = React.useState(5829)

	return (
        <section className="quick">
            <div className="elem">
                <Link to="#exit" className="quickItem btn icon focus exit">
                    <MdExitToApp />
                </Link>
            </div>
            <div className="elem">
                <a id="quickNotify" className="quickItem" data-new="1">
                    <div className="quickWrap btn icon transparent" onClick={() => setNotifyToggle(!notifyToggle)}>
                        <IoMdNotifications />
                    </div>
                    <NotifyModal openedElement='#quickNotify .quickWrap' toggleStatus={notifyToggle} notifyList={notify} onHide={() => setNotifyToggle(false)} onClear={notifyOnClear} />
                </a>
                <a id="quickOnlineFriends" className="quickItem" data-new="1">
                    <div className="quickWrap btn icon transparent" onClick={() => setFriendsToggle(!notifyToggle)}>
                        <FaUserFriends />
                    </div>
                    <FriendsModal openedElement='#quickOnlineFriends .quickWrap' toggleStatus={friendsToggle} friendsList={friends} typeCount={[friends[0].length, friendsAll, friends[1].length]} onHide={() => setFriendsToggle(false)} />
                </a>
            </div>
            <div className="elem">
                <Link to="/settings" className={`quickItem btn icon ${location.pathname === '/settings' ? '' : 'focus'} settings`}>
                    <IoSettingsSharp />
                </Link>
            </div>
        </section>
	)
}