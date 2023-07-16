import React from 'react'
import { Link } from 'react-router-dom'

import Moment from 'moment'
import 'moment/locale/ru'

import Avatar from '../avatar/avatar'

import './matchpreview.scss'

export default function MatchPreview({key, match}) {
    Moment.locale('ru')

    return (
        <Link target="_blank" to={`/match/${match.id}`} key={key} className="matchpreview" style={{backgroundImage: `url(${match.map[1]})`}}>
            <div className="bg"></div>
            <div className="wrap">
                <div className="game">
                    <h1>{match.game}</h1>
                    <h1>{Moment(match.date).fromNow()}</h1>
                    <h1>{match.type}</h1>
                </div>
                <div className="map">{match.map[0]}</div>
                <div className="info">
                    {match.teams[0].accountLink ? (
                        <Link target="_blank" to={`/account/${match.teams[0].accountLink}`} className="team link">
                            <Avatar image={match.teams[0].avatar.image} size={match.teams[0].avatar.size} position={match.teams[0].avatar.position} />
                            <h1>{match.teams[0].name}</h1>
                        </Link>
                    ) : (
                        <div className="team">
                            <Avatar image={match.teams[0].avatar.image} size={match.teams[0].avatar.size} position={match.teams[0].avatar.position} />
                            <h1>{match.teams[0].name}</h1>
                        </div>
                    )}
                    <div className="score">
                        <div className="status">
                            <h1>{match.score[0]}</h1>
                            <h2 className={match.status}>{match.status === 'lose' ? 'Поражение' : 'Победа'}</h2>
                            <h1>{match.score[1]}</h1>
                        </div>
                        <div className="time">
                            {match.time}
                        </div>
                    </div>
                    {match.teams[1].accountLink ? (
                        <Link target="_blank" to={`/account/${match.teams[1].accountLink}`} className="team link">
                            <Avatar image={match.teams[1].avatar.image} size={match.teams[1].avatar.size} position={match.teams[1].avatar.position} />
                            <h1>{match.teams[1].name}</h1>
                        </Link>
                    ) : (
                        <div className="team">
                            <Avatar image={match.teams[1].avatar.image} size={match.teams[1].avatar.size} position={match.teams[1].avatar.position} />
                            <h1>{match.teams[1].name}</h1>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    )
}