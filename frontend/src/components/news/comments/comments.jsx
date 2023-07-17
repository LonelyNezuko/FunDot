import React from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'

import Moment from 'moment'
import 'moment/locale/ru'

import intToString from '../../../modules/intToString'
import Avatar from '../../avatar/avatar'

import './comments.scss'

import { MdSend } from 'react-icons/md'

import { AiOutlineLike } from 'react-icons/ai'
import { AiOutlineDislike } from 'react-icons/ai'
import { AiTwotoneLike } from 'react-icons/ai'
import { AiTwotoneDislike } from 'react-icons/ai'

// News(Parent) -> Comments -> Comment ?-> Comments -> Comment

export default function Comments({ comments, goComment, initial, isAnswers, defaultGoAns }) {
    const [ commentShow, setCommentShow ] = React.useState(false)
    const [ goAns, setGoAns ] = React.useState(false)

    React.useEffect(() => {
        setGoAns(defaultGoAns)
    }, [defaultGoAns])
    return (
        <div className="comments" style={{display: (initial && goComment) || (isAnswers && comments.length) || (isAnswers && !comments.length && goAns) ? 'block' : 'none'}}>
            {(!comments || !comments.length) && initial ? (
                <h1 className="nocomments">Будьте первыми, кто напишет комментарий под этим постом</h1>
            ) : ''}
            {comments && comments.length ? (
                <div className="commentsList">
                    {comments.map((item, i) => {
                        if(!commentShow && i > 0)return ''
                        return ( <Comment item={item} key={i} onGoAns={() => setGoAns(!goAns)} /> )
                    })}
                </div>
            ) : ''}
            {comments && comments.length ? (
                <div className="commentsShow" onClick={() => setCommentShow(!commentShow)} style={{display: comments.length === 1 ? 'none' : 'block'}}>
                    {!commentShow ? `показать все ${isAnswers ? 'ответы' : 'комментарии'}` : `скрыть все ${isAnswers ? 'ответы' : 'комментарии'}`}
                </div>
            ) : ''}
            <div className="commentsForm" style={{display: !isAnswers || (isAnswers && goAns) ? 'flex' : 'none'}}>
                <Avatar type="min" image='https://static.displate.com/857x1200/displate/2019-09-04/04e658831fcb7ec9958f496c029cccd2_93f63c496c402fa7ace55ddd3b26bdf8.jpg' size='200' />
                <div className="forminput forminputtextarea">
                    <div className="textarea" data-placeholder="Напишите комментарий" contentEditable={true} aria-multiline="true"></div>
                </div>
                <div className="action">
                    <MdSend />
                </div>
            </div>
        </div>
    )
}

function Comment({ item, onGoAns }) {
    const [ goAns, setGoAns ] = React.useState(false)

    return (
        <div className="comment">
            <div className="left">
                <Link to={`/account/${item.author.link}`}>
                    <Avatar type="min" image={item.author.avatar.image} size={item.author.avatar.size} position={item.author.avatar.position} />
                </Link>
            </div>
            <div className="right">
                <Link to={`/account/${item.author.link}`} className="username link color">
                    {item.author.username}
                    {item.author.isVerified ? (<span className="verified"></span>) : ''}
                    {item.author.isBot ? (<span className="bot"></span>) : ''}
                </Link>
                <div className="text">
                    <h6>{item.body.text}</h6>
                    <div className="attached">
                        {/* {item.body.attached.images ? } */}
                    </div>
                </div>
                <div className="bottom">
                    <div className="date">
                        {Moment(item.date).format('YYYY') === Moment(new Date()).format('YYYY')
                            ? Moment(item.date).calendar({
                                sameDay: 'сегодня в HH:mm',
                                sameElse: 'Do MMM'
                            }) : Moment(item.date).format('DD.MM.YYYY')}
                        <span className="link" onClick={() => {
                            if(!item.answers) onGoAns()
                            else setGoAns(!goAns)

                            console.log(item.answers)
                        }}>ответить</span>
                    </div>
                    <div className="feedback">
                        <button className="btn icontext left transparent">
                            {!item.userInfo.like ? (<AiOutlineLike />) : (<AiTwotoneLike />)}
                            <span>{intToString(item.feedback[0])}</span>
                        </button>
                        <button className="btn icontext left transparent">
                            {!item.userInfo.dislike ? (<AiOutlineDislike />) : (<AiTwotoneDislike />)}
                            <span>{intToString(item.feedback[1])}</span>
                        </button>
                    </div>
                </div>
                {item.answers ? (
                    <Comments comments={item.answers} isAnswers={true} defaultGoAns={goAns} />
                ) : ''}
            </div>
        </div>
    )
}