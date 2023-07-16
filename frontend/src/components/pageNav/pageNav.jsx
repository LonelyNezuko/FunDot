import React from "react"
import { Link } from 'react-router-dom'

import './pageNav.scss'

export default function PageNav() {
    return (
        <div className="pageNav">
            <Link className="item selected">
                <span>Новостная лента</span>
            </Link>
            <Link className="item">
                <span>Игры</span>
            </Link>
            <Link className="item disabled">
                <span>Статистика</span>
            </Link>
        </div>
    )
}