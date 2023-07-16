import React from 'react'
import { Link } from 'react-router-dom'

import './404.scss'

export default function Error404Page() {
    return (
        <div id="error404page">
            <div className="wrapper">
                <img src="/assets/404.png" alt="Error 404" />
                <h1>Упс, кажется мы столкнулись с проблемой</h1>
                <h2>Запрашиваемая Вами страница не существует. <br />Если Вы считаете, что страница должна существовать - <Link className="link color" to="#feedback">напишите нам</Link></h2>
            </div>
        </div>
    )
}