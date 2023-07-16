import React from "react"
import { Link } from 'react-router-dom'

import './video.scss'

import intToString from '../../modules/intToString'
import Avatar from '../avatar/avatar'

import { AiOutlineEye } from 'react-icons/ai'

export default function Video(props) {
    const CONFIG = require('../../config.json')
    
    return (
        <a key={props.key || '0'} target="_blank" href={props.video.link} className="video">
            <div className="background">
                <a target="_blank" href={CONFIG.platforms[props.video.platform].link} className="platform">
                    <img src={CONFIG.platforms[props.video.platform].icon} alt={CONFIG.platforms[props.video.platform].alt} />
                </a>
                <div className="img">
                    <img src={props.video.background} />
                </div>
                <div className="views">
                    <AiOutlineEye />
                    <span>{intToString(props.video.views)}</span>
                </div>

                <div className="title">
                    <Link to={`/account/${props.video.author.link}`}>
                        <Avatar type="min" image={props.video.author.image.img} size={props.video.author.image.size} position={props.video.author.image.position} />
                    </Link>
                    <div className="desc">
                        <h1>{props.video.title}</h1>
                        <Link className="link" to={`/account/${props.video.author.link}`}>{props.video.author.username} {props.video.author.bot && (<span className="bot"></span>)}{props.video.author.verified && (<span className="verified"></span>)}</Link>
                    </div>
                </div>
            </div>
        </a>
    )
}