import React from 'react'
import $ from 'jquery'
import { Link, useLocation } from "react-router-dom"
import Cookies from 'universal-cookie'

import './nav.scss'

import Avatar from '../avatar/avatar'

import Team from './team/team'
import Menu from './menu/menu'
import Quick from './quick/quick'

import NavLanding from './landing'

export default function Nav() {
	const [ landing, setLanding ] = React.useState(true)
	const cookies = new Cookies()

	const [ account, setAccount ] = React.useState({
		username: 'LonelyNezuko',
		id: 1,
		link: 'lonelynezuko',
		avatar: {
			image: 'https://i.ibb.co/2cgHpWC/nezu5-2.jpg',
			size: 100,
			position: { x: 0, y: 0 }
		},
		isInTeam: {
			teamid: 258173,
			team: {}
		}
	})

	const [ team, setTeam ] = React.useState({
		name: 'LonelyNezuko',
	
		id: 258173,
		host: account,
	
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
			}
		]
	})

	const [ teamAddAccount, setTeamAddAccount ] = React.useState(-1)
	const onTeam = {
		create: () => {
			setTeam({
				name: account.username,
		
				id: 258173,
				hostID: account.id,
		
				accounts: [
					account
				]
			})
		},
		leave: () => {
			setTeam({})
		},
		add: friend => {
			if(friend.isInTeam
				|| (friend.status && friend.status.type === 'playmatch')
				|| team.accounts.findIndex(elem => elem.id === friend.id) !== -1)return setTeamAddAccount(true)

			const accounts = team.accounts
			accounts.push({
				...friend,
				status: 'wait'
			})

			setTeam({...team, accounts: accounts})
		},
		delete: slot => {
			if(team.accounts[slot].account.id === account.id) setTeam({})
			else setTeam({...team, accoutns: team.accounts.splice(slot, 1)})
		}
	}

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

	React.useMemo(() => {
		const jwt = cookies.get('jsonwebtoken')
		if(!jwt)return window.location = '/signin'

		$.ajax({
			url: '/api/user/nav',
			headers: { jwt }
		}).done(results => {
			if(results.type === 'error') {
				if(results.statusCode === 401)return window.location = '/signin'
			}
			else {
				setAccount(results.message)
				setLanding(false)
			}
		}).fail(err => {
			notify('Упс. Кажется где-то ошибка (подробнее в консоли)')
		})
	}, [])

	const location = useLocation()
	return (
		<div id="nav">
			{landing ? (<NavLanding />) : (
				<div className="wrapper">
					<Quick />
					<section className="account">
						<div className="image">
							<Link to={`/account/${account.link}`} style={{margin: '0'}}>
								<Avatar image={account.avatar.image} type='medium' size={account.avatar.size} position={account.avatar.position} />
							</Link>
							<Link to={`/account/${account.link}`}>{account.username}</Link>
						</div>
					</section>
					<Team account={account} friends={friends} />
					<Menu />
				</div>
			)}
		</div>
	)
}