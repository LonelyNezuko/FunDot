import React from 'react'
import { Link, useLocation } from "react-router-dom"

import './menu.scss'

import { IoHome } from 'react-icons/io5'
import { MdOutlineGames } from 'react-icons/md'
import { BiServer } from 'react-icons/bi'
import { TiGroup } from 'react-icons/ti'
import { HiNewspaper } from 'react-icons/hi'

export default function Menu() {
	const location = useLocation()
	return (
        <section className="menu">
            <Link to="/" className={`item ${location.pathname === '/' && 'selected'}`}>
                <IoHome />
                <h1>Главная</h1>
            </Link>
            <Link to="/news" className={`item ${location.pathname.indexOf('/news') !== -1 && 'selected'}`}>
                <HiNewspaper />
                <h1>Новости</h1>
            </Link>
            <Link to="/play" className={`item ${location.pathname.indexOf('/play') !== -1 && 'selected'}`}>
                <MdOutlineGames />
                <h1>Играть</h1>
            </Link>
            <Link to="/servers" className={`item ${location.pathname.indexOf('/servers') !== -1 && 'selected'}`}>
                <BiServer />
                <h1>Сервера</h1>
            </Link>
            <Link to="/groups" className={`item ${location.pathname.indexOf('/groups') !== -1 && 'selected'}`}>
                <TiGroup />
                <h1>Сообщества</h1>
            </Link>
        </section>
	)
}