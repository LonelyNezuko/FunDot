import React from "react"
import { Link } from 'react-router-dom'
import $ from 'jquery'

import Moment from 'moment'
import 'moment/locale/ru'

import intToString from '../../modules/intToString'
import Avatar from '../avatar/avatar'
import Modal from '../_modals/index/index'
import SortMedia from "../../modules/sortMedia"

import './news.scss'

import { HiDotsVertical } from 'react-icons/hi'

import { AiOutlineLike } from 'react-icons/ai'
import { AiOutlineDislike } from 'react-icons/ai'
import { AiTwotoneLike } from 'react-icons/ai'
import { AiTwotoneDislike } from 'react-icons/ai'
import { FaShare } from 'react-icons/fa'
import { FaRegComment } from 'react-icons/fa'
import { FaComment } from 'react-icons/fa'

import { BiHide } from 'react-icons/bi'
import { BiBlock } from 'react-icons/bi'

import { RiPagesLine } from 'react-icons/ri'

import { MdInsertPhoto } from 'react-icons/md'

import { AiFillPushpin } from 'react-icons/ai'

import { MdFolderDelete } from 'react-icons/md'

import Comments from "./comments/comments"

export default function News(props) {
    const [ news, setNews ] = React.useState(props.news || [])
    React.useEffect(() => {
        setNews(props.news)
    }, [props.news])

    const onNews = {
        like: id => {
            const news = JSON.parse($(props.id && `#${props.id} ` + '.list').attr('data-news'))
            const item = news[id]

            item.userInfo.like = !item.userInfo.like

            if(!item.userInfo.like) item.feedback[0] -= 1
            else item.feedback[0] += 1

            if(item.userInfo.dislike === true && item.userInfo.like === true) {
                item.userInfo.dislike = false
                item.feedback[1] -= 1
            }

            news[id] = item
            setNews(news)
        },
        dislike: id => {
            console.log(props.id && `#${props.id} ` + '.list')
            console.log($(props.id && `#${props.id} ` + '.list'))

            const news = JSON.parse($(props.id && `#${props.id} ` + '.list').attr('data-news'))
            const item = news[id]

            item.userInfo.dislike = !item.userInfo.dislike

            if(!item.userInfo.dislike) item.feedback[1] -= 1
            else item.feedback[1] += 1

            if(item.userInfo.like === true && item.userInfo.dislike === true) {
                item.userInfo.like = false
                item.feedback[0] -= 1
            }

            news[id] = item
            setNews(news)
        },
        ageLimit: id => {
            const news = JSON.parse($(props.id && `#${props.id} ` + '.list').attr('data-news'))
            const item = news[id]

            item.ageLimit = false

            news[id] = item
            setNews(news)
        },
        deletePost: (id, status) => {
            if(status === undefined) {
                
            }
            else {

            }
        }
    }

    const [ addForm, setAddForm ] = React.useState({
        isShow: false
    })
    const [ modals, setModals ] = React.useState({
        delete: false
    })

    return (
        <section className="news" id={props.id}>
            {modals.delete ? (
                <Modal
                    toggle={true}

                    title="Удаление поста"
                    desciption="Вы действительно желаете удалить данный пост?"
                    icon={( <MdFolderDelete /> )}

                    body={(
                        <div className="news">
                            <div className="list" style={{marginTop: '0'}}>
                                <NewsRender item={news[modals.delete.id]} i={modals.delete.id} props={props} preview={true} />
                            </div>
                        </div>
                    )}
                    buttons={['Нет', 'Да']}
                />
            ) : ''}

            
            <header className="title">{props.title || 'Лента новостей'}</header>

            {props.addform ? (
                <div className={`newpost ${addForm.isShow ? 'show' : ''}`}>
                    <div className="text">
                        <div className="form">
                            <Avatar type="min" image='https://static.displate.com/857x1200/displate/2019-09-04/04e658831fcb7ec9958f496c029cccd2_93f63c496c402fa7ace55ddd3b26bdf8.jpg' size='200' />
                            <div className="forminput forminputtextarea">
                                <div onInput={event => {
                                    if(event.target.textContent.length) setAddForm({ ...addForm, isShow: true })
                                    else setAddForm({ ...addForm, isShow: false })
                                }} className="textarea" data-placeholder="Что-то новенькое? Поделитесь этим" contentEditable={true} aria-multiline="true"></div>
                            </div>
                        </div>
                    </div>
                    <div className="settings">
                        <div className="form flex">
                            <div className="forminput forminputchoice">
                                <div className="select" data-value="public" data-title="Доступный всем">
                                    <ul>
                                        <li data-value="public" className="selected">Доступный всем</li>
                                        <li data-value="privatefriend">Только для друзей</li>
                                        <li data-value="privatesubs">Только для подписчиков</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="forminput forminputchoice">
                                <div className="select" data-value="yes" data-title="Получать уведомления">
                                    <ul>
                                        <li data-value="yes" className="selected">Получать уведомления</li>
                                        <li data-value="no">Не получать уведомления</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="attached">
                        <div className="item photo">
                            <img src="https://static.displate.com/857x1200/displate/2019-09-04/04e658831fcb7ec9958f496c029cccd2_93f63c496c402fa7ace55ddd3b26bdf8.jpg" alt="Image" />
                        </div>
                    </div> */}
                    <div className="buttons">
                        <div className="attach">
                            <button className="btn icon transparent">
                                <MdInsertPhoto />
                            </button>
                        </div>
                        <button className="btn">Выложить</button>
                    </div>
                </div>
            ) : ''}

            {!news.length ? (
                <div className="nonews">
                <RiPagesLine />
                <h1>Пока ничего</h1>
            </div>
            ) : ''}
            <div className="list" data-news={JSON.stringify(news)}>
                {news.filter(elem => { return elem.isPin }).map((item, i) => {
                    if(item.hided) {
                        return <NewsHided item={item} i={i} onNews={onNews} />
                    }
                    if(item.blocked) {
                        return <NewsBlocked item={item} i={i} onNews={onNews} />
                    }
                    return <NewsRender item={item} i={i} onNews={onNews} props={props} />
                })}
                {news.filter(elem => { return !elem.isPin }).map((item, i) => {
                    if(item.hided) {
                        return <NewsHided item={item} i={i} onNews={onNews} />
                    }
                    if(item.blocked) {
                        return <NewsBlocked item={item} i={i} onNews={onNews} />
                    }
                    return <NewsRender item={item} i={i} onNews={onNews} props={props} />
                })}
            </div>
        </section>
    )
}


function NewsRender({item, i, onNews, props, preview}) {
    const [ goComment, setGoComment ] = React.useState(false)
    function getCommentsCount() {
        let count = 0

        if(item.comments) {
            item.comments.map(item => {
                count ++
                if(item.answers) count += item.answers.length
            })
        }
        return count
    }

    return (
        <div className={`item ${preview ? 'preview' : ''}`} key={i}>
            <div className="itemHeader">
                <section style={{alignItems: !item.tags ? 'center' : 'flex-start'}}>
                    <Link to={`/account/${item.author.id}`}>
                        <Avatar image={item.author.image.img} position={item.author.image.position} size={item.author.image.size} />
                    </Link>
                    <h1>
                        <Link className="link" to={`/account/${item.author.id}`}>{item.author.username} {item.author.verified ? (<span className="verified"></span>) : ''}{item.author.bot ? (<span className="bot"></span>) : ''}</Link>
                        <h3>
                            {Moment(item.date).fromNow()}
                            {item.isPin ? (<AiFillPushpin />) : ''}
                            {item.forSubs ? (<span>только для подписчиков</span>) : ''}
                        </h3>
                        {item.tags ? (
                            <div className="newstags">
                                {item.tags.split(' ').map((item, i) => {
                                    return (<NewsRenderTag key={i} tag={item} />)
                                })}
                            </div>
                        ) : ''}
                    </h1>

                    {item.userInfo.subscribed && !props.account ? (<div className="subscribed">Вы подписаны</div>) : ''}
                </section>
                {!props.account && !preview ? (
                    <section>
                        <button className="btn icon focus">
                            <HiDotsVertical />
                            <div className="submenu">
                                <span>Пожаловаться</span>
                                <span onClick={() => onNews.hided(i, true)}>Скрыть новости польз.</span>
                                <span onClick={() => onNews.blocked(i, true)}>Заблокировать польз.</span>
                            </div>
                        </button>
                    </section>
                ) : ''}
                {props.account && !preview ? (
                    <section>
                        <button className="btn icon focus">
                            <HiDotsVertical />
                            <div className="submenu">
                                <span>{item.isPin ? 'Открепить' : 'Закрепить'}</span>
                                <span onClick={() => onNews.deletePost(i)}>Удалить пост</span>
                            </div>
                        </button>
                    </section>
                ) : ''}
            </div>
            <div className="body">
                <section className="text">{item.body.text}</section>
                {item.body.attached && item.body.attached.length ? (
                    <section className="attached">
                        <SortMedia media={item.body.attached} />
                    </section>
                ) : ''}

                {item.ageLimit && !preview ? (
                    <section className="ageLimit">
                        <div>
                            <h1>Данный контент имеет ограничения по возрасту</h1>
                            <button onClick={() => onNews.ageLimit(i)} className="btn">Показать</button>
                        </div>
                    </section>
                ) : ''}
            </div>
            <div className="bottom">
                {!preview ? (
                    <section className="feedback">
                        <button onClick={() => setGoComment(!goComment)} className="btn icontext left transparent">
                            {!goComment ? (<FaRegComment />) : (<FaComment />)}
                            <span>{intToString(getCommentsCount())}</span>
                        </button>
                        <button className="btn icontext left transparent" onClick={() => onNews.like(i)}>
                            {!item.userInfo.like ? (<AiOutlineLike />) : (<AiTwotoneLike />)}
                            <span>{intToString(item.feedback[0])}</span>
                        </button>
                        <button className="btn icontext left transparent" onClick={() => onNews.dislike(i)}>
                            {!item.userInfo.dislike ? (<AiOutlineDislike />) : (<AiTwotoneDislike />)}
                            <span>{intToString(item.feedback[1])}</span>
                        </button>
                    </section>
                ) : (
                    <section className="feedback">
                        <button className="btn icontext left transparent">
                            <FaRegComment />
                            <span>{intToString(getCommentsCount())}</span>
                        </button>
                        <button className="btn icontext left transparent">
                            {!item.userInfo.like ? (<AiOutlineLike />) : (<AiTwotoneLike />)}
                            <span>{intToString(item.feedback[0])}</span>
                        </button>
                        <button className="btn icontext left transparent">
                            {!item.userInfo.dislike ? (<AiOutlineDislike />) : (<AiTwotoneDislike />)}
                            <span>{intToString(item.feedback[1])}</span>
                        </button>
                    </section>
                )}
                <section className="views">
                    <button className="btn icontext left transparent">
                        <FaShare />
                        <span>{intToString(item.feedback[2])}</span>
                    </button>
                    <div>{intToString(item.feedback[3])}</div>
                </section>
            </div>
            {!preview ? (<Comments comments={item.comments} goComment={goComment} initial={true} />) : ''}
        </div>
    )
}


function NewsRenderTag({ tag }) {
    const CONFIG = require('../../config.json')

    if(CONFIG.newsTags[tag])return (<Link to={`/news/${tag}`} className={`newstagname newstagname-${tag}`}>{CONFIG.newsTags[tag]}</Link>)
    return (<Link to={`/news?hashtag=${tag}`} className={`newstagname newstagname-hashtag newstagname-hashtag-${tag.replace('#', '')}`}>{tag}</Link>)
}











function NewsBlocked({item, i, onNews}) {
    return (
        <div className="item" key={i}>
            <div className="body">
                <section className="svg">
                    <BiBlock />
                </section>
                <section className="text" style={{textAlign: 'center'}}>Вы успешно заблокировали пользователя <Link className="link" to={`/account/${item.author.id}`}>{item.author.username}</Link></section>
                <section className="buttons">
                    <button onClick={() => onNews.blocked(i, false)} className="btn">Разблокировать</button>
                </section>
            </div>
        </div>
    )
}
function NewsHided({item, i, onNews}) {
    return (
        <div className="item" key={i}>
            <div className="body">
                <section className="svg">
                    <BiHide />
                </section>
                <section className="text" style={{textAlign: 'center'}}>Вы больше не будете видеть новости от <Link className="link" to={`/account/${item.author.id}`}>{item.author.username}</Link></section>
                <section className="buttons">
                    <button onClick={() => onNews.hided(i, false)} className="btn">Показывать новости</button>
                </section>
            </div>
        </div>
    )
}