import React from "react"
import { Link } from 'react-router-dom'
import $ from 'jquery'

import Moment from 'moment'
import 'moment/locale/ru'

import intToString from '../../modules/intToString'
import Avatar from '../avatar/avatar'
import Modal from '../_modals/index/index'
import SortMedia from "../../modules/sortMedia"
import FormAttach from '../formattach'
import Select from '../select'

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
        _getNews: () => {
            let path = props.id ? `#${props.id} ` : ''
            path += '.list'

            const news = JSON.parse($(path).attr('data-news'))
            return news
        },

        like: id => {
            const news = onNews._getNews()
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

            // api
        },
        dislike: id => {
            const news = onNews._getNews()
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

            // api
        },
        ageLimit: id => {
            const news = onNews._getNews()

            news[id].ageLimit = false
            setNews(news)

            // api
        },
        deletePost: (id, status = false) => {
            if(!status) { // show modal
                setDeletePost({
                    toggle: true,
                    postid: id
                })
            }
            else { // delete
                setDeletePost({ toggle: false, id: -1 })

                // api
            }
        },
        pin: id => {
            const news = onNews._getNews()
            const item = news[id]

            if(!item.isPin) {
                news.map(item => {
                    if(item.isPin) item.isPin = false
                })
            }

            item.isPin = !item.isPin
            news[id] = item

            setNews(news)

            // api
        },

        hide: (id, status) => {
            const news = onNews._getNews()
            const item = news[id]

            item.reported = false
            item.hidden = status

            news[id] = item
            news.map(elem => {
                if(elem.author.id === item.author.id) elem.hidden = status
            })

            setNews(news)

            // api
        },
        block: (id, status) => {
            const news = onNews._getNews()
            const item = news[id]
            
            item.reported = false
            item.blocked = status
            
            news[id] = item
            news.map(elem => {
                if(elem.author.id === item.author.id) elem.blocked = status
            })

            setNews(news)

            // api
        },
        report: id => {
            const news = onNews._getNews()
            
            news[id].hidden = true
            news[id].reported = true

            setNews(news)

            // api
        }
    }

    // add new post
    const [ addForm, setAddForm ] = React.useState({
        text: '',

        access: 'public',
        notify: 'yes',

        files: []
    })
    const [ addFormShow, setAddFormShow ] = React.useState(false)
    function onAddFormSubmit() {
        if(!addForm.text.length)return

        // api
    }


    // delete post
    const [ deletePost, setDeletePost ] = React.useState({
        toggle: false,
        postid: -1
    })

    return (
        <section className="news" id={props.id}>
            {deletePost.toggle ? (
                <Modal
                    toggle={true}

                    title="Удаление поста"
                    desciption="Вы действительно желаете удалить данный пост?"
                    icon={( <MdFolderDelete /> )}

                    body={(
                        <div className="news">
                            <div className="list" style={{margin: '0', padding: '0'}}>
                                <NewsRender item={news[deletePost.postid]} i={deletePost.postid} props={props} preview={true} />
                            </div>
                        </div>
                    )}
                    buttons={['Нет', 'Да']}

                    onClose={() => setDeletePost({ toggle: false, id: -1 })}
                    onClick={() => onNews.deletePost(deletePost.id, true)}
                />
            ) : ''}

            
            <header className="title">{props.title || 'Лента новостей'}</header>

            {props.addform ? (
                <div className={`newpost ${addFormShow ? 'show' : ''}`}>
                    <div className="text">
                        <div className="form">
                            <Avatar type="min" image='https://static.displate.com/857x1200/displate/2019-09-04/04e658831fcb7ec9958f496c029cccd2_93f63c496c402fa7ace55ddd3b26bdf8.jpg' size='200' />
                            <div className="forminput forminputtextarea">
                                <div id="newsNewPostText" onInput={event => {
                                    if(event.target.textContent.length
                                        || addForm.files.length) setAddFormShow(true)
                                    else setAddFormShow(false)

                                    setAddForm({ ...addForm, text: event.target.textContent })
                                }} className="textarea" data-placeholder="Что-то новенькое? Поделитесь этим" contentEditable={true} aria-multiline="true"></div>
                            </div>
                        </div>
                    </div>
                    <div className="settings">
                        <div className="form flex">
                            <div className="forminput forminputchoice">
                                <Select _type={addForm.access} _list={[
                                    [ 'public', 'Доступный всем' ],
                                    [ 'private', 'Для друзей и подписчиков' ],
                                    [ 'privatefriends', 'Только для друзей' ],
                                    [ 'privatesubs', 'Только для подписчиков' ]
                                ]} onChange={event => {
                                    setAddForm({ ...addForm, access: event[0] })
                                }} />
                            </div>
                            <div className="forminput forminputchoice">
                                <Select _type={addForm.notify} _list={[
                                    [ 'yes', 'Получать уведомления' ],
                                    [ 'no', 'Не получать уведомления' ]
                                ]} onChange={event => {
                                    setAddForm({ ...addForm, notify: event[0] })
                                }} />
                            </div>
                        </div>
                    </div>
                    <FormAttach id="newsNewPost" maxFiles={10} _accept="image/*, videos/*, text/*" _multiple={true} _files={addForm.files} onLoad={event => {
                        const filesTemp = [...addForm.files]

                        event.map(item => {
                            if(item.type.indexOf('image/') === 0
                                || item.type.indexOf('text/') === 0
                                || item.type.indexOf('videos/') === 0) filesTemp.push(item)
                        })
                        setAddForm({ ...addForm, files: filesTemp })
                    }} onDelete={event => {
                        const filesTemp = [...addForm.files]
                        let index = -1

                        filesTemp.filter((file, i) => {
                            if(file === event) {
                                return index = i
                            }
                        })

                        if(index != -1) filesTemp.splice(index, 1)
                        setAddForm({ ...addForm, files: filesTemp })

                        if($('#newsNewPostText')[0].textContent.length
                            || filesTemp.length) setAddFormShow(true)
                        else setAddFormShow(false)
                    }} />
                    <div className="buttons">
                        <span style={{display: 'block'}}>&nbsp;</span>
                        <button className="btn" onClick={() => onAddFormSubmit()}>Выложить</button>
                    </div>
                </div>
            ) : ''}

            {!news.length ? (
                <div className="nonews">
                <RiPagesLine />
                <h1>Пока ничего</h1>
            </div>
            ) : ''}
            {props.account ? (
                <div className="list" data-news={JSON.stringify(news)}>
                    {news.map((item, i) => {
                        if(!item.isPin)return
                        
                        if(item.hidden) {
                            return <NewsHidden item={item} i={i} onNews={onNews} />
                        }
                        if(item.blocked) {
                            return <NewsBlocked item={item} i={i} onNews={onNews} />
                        }
                        return <NewsRender item={item} i={i} onNews={onNews} props={props} />
                    })}
                    {news.map((item, i) => {
                        if(item.isPin)return

                        if(item.hidden) {
                            return <NewsHidden item={item} i={i} onNews={onNews} />
                        }
                        if(item.blocked) {
                            return <NewsBlocked item={item} i={i} onNews={onNews} />
                        }
                        return <NewsRender item={item} i={i} onNews={onNews} props={props} />
                    })}
                </div>
            ) : (
                <div className="list" data-news={JSON.stringify(news)}>
                    {news.map((item, i) => {
                        if(item.hidden) {
                            return <NewsHidden item={item} i={i} onNews={onNews} />
                        }
                        if(item.blocked) {
                            return <NewsBlocked item={item} i={i} onNews={onNews} />
                        }
                        return <NewsRender item={item} i={i} onNews={onNews} props={props} />
                    })}
                </div>
            )}
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
                        <Avatar image={item.author.avatar.image} position={item.author.avatar.position} size={item.author.avatar.size} />
                    </Link>
                    <h1>
                        <Link className="link" to={`/account/${item.author.id}`}>{item.author.username} {item.author.isVerified ? (<span className="verified"></span>) : ''}{item.author.isBot ? (<span className="bot"></span>) : ''}</Link>
                        <h3>
                            {Moment(item.date).fromNow()}
                            {props.account ? (
                                item.isPin ? (<AiFillPushpin />) : ''
                            ) : ''}
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
                                <span onClick={() => onNews.report(i)}>Пожаловаться</span>
                                <span onClick={() => onNews.hide(i, true)}>Скрыть новости польз.</span>
                                <span onClick={() => onNews.block(i, true)}>Заблокировать польз.</span>
                            </div>
                        </button>
                    </section>
                ) : ''}
                {props.account && !preview ? (
                    <section>
                        <button className="btn icon focus">
                            <HiDotsVertical />
                            <div className="submenu">
                                <span onClick={() => onNews.pin(i)}>{item.isPin ? 'Открепить' : 'Закрепить'}</span>
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
                <section className="text" style={{textAlign: 'center'}}>
                    Вы заблокировали пользователя <Link className="link color" to={`/account/${item.author.id}`}>{item.author.username}</Link>
                </section>
                <section className="buttons">
                    <button onClick={() => onNews.block(i, false)} className="btn">Разблокировать</button>
                </section>
            </div>
        </div>
    )
}
function NewsHidden({item, i, onNews}) {
    return (
        <div className="item" key={i}>
            <div className="body">
                <section className="svg">
                    <BiHide />
                </section>
                <section className="text" style={{textAlign: 'center'}}>
                    {item.reported ? (
                        <>
                            Спасибо за отправленную жалобу на пользователя <Link className="link color" to={`/account/${item.author.id}`}>{item.author.username}</Link>
                            <br />
                            Мы рассмотрим ее как можно скорее и, если жалоба будет оправдана, мы примем меры
                        </>
                    ) : (
                        <>Вы больше не будете видеть новости от <Link className="link color" to={`/account/${item.author.id}`}>{item.author.username}</Link></>
                    )}
                </section>
                <section className="buttons">
                    <button onClick={() => onNews.hide(i, false)} className="btn">
                        {item.reported ? 'Снова показать новость' : 'Показывать новости'}
                    </button>
                </section>
            </div>
        </div>
    )
}