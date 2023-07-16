import React from 'react'
import { useLocation, Navigate, Link } from "react-router-dom"

import FormAttach from "../formattach"
import Select from "../select"

import Modal from "./index"
import Avatar from '../avatar/avatar'

import notify from '../../modules/notify'

import { FcFeedback } from 'react-icons/fc'

import { SlBan } from 'react-icons/sl'
import { IoMdStats } from 'react-icons/io'
import { TiGroup } from 'react-icons/ti'
import { TbDots } from 'react-icons/tb'

import { MdSupervisorAccount } from 'react-icons/md'
import { MdContentCopy } from 'react-icons/md'
import { MdNoAdultContent } from 'react-icons/md'

export default function Feedback() {
    const location = useLocation()

    const [ type, setType ] = React.useState('')
    const [ desc, setDesc ] = React.useState('')
    const [ files, setFiles ] = React.useState([])

    function isValidForm() {
        if(!type.length)return false

        if(report) {
            if(type === 'other' && !desc.length)return false
            return true
        }

        if(type.length && desc.length)return true
        return false
    }
    const [ validate, setValidate ] = React.useState(false)

    React.useEffect(() => {
        setValidate(isValidForm())
    }, [type, desc])


    const [ success, setSuccess ] = React.useState(false)
    const [ error, setError ] = React.useState('')

    const [ report, setReport ] = React.useState('')
    const [ reportData, setReportData ] = React.useState({})

    React.useEffect(() => {
        if(location.search.indexOf('?report') !== -1) {
            const url = new URL(window.location)
            setReport(url.searchParams.get('report'))
        }
    }, [])
    React.useEffect(() => {
        if(report.length) {
            // запрос
            setReportData({
                username: 'LonelyNezuko',
                id: 'lonelynezuko',
                isVerified: true,
                isBot: false,
                avatar: {
                    image: 'https://i.ibb.co/2cgHpWC/nezu5-2.jpg',
                    size: 100,
                    position: { x: 0, y: 0 }
                }
            })
        }
    }, [report])

    if(location.search.indexOf('?report') !== -1
        && report.length
        && reportData.id)return (
        <>
            <Modal
                toggle={!success ? true : false}

                title="Жалоба на игрока"
                desciption="Это форма на отправку жалобы на игрока"
                icon={(<FcFeedback />)}
                
                buttons={['Отмена', 'Пожаловаться']}
                buttonsBlock={!validate}
                buttonsHref={[ window.location.href.replace(`?report=${report}`, '') ]}
                
                body={(
                    <>
                        <div className="modaltext">
                            <section>
                                <h1>Игрок, на которого Вы отправляете жалобу:</h1>
                                <Link target="_blank" to={`/account/${reportData.id}`} className="modalAccount">
                                    <Avatar image={reportData.avatar.image} size={reportData.avatar.size} position={reportData.avatar.position} />
                                    <h1>
                                        {reportData.username}

                                        {reportData.isVerified ? (<span className="verified"></span>) : ''}
                                        {reportData.isBot ? (<span className="bot"></span>) : ''}

                                        <h2>{reportData.id}</h2>
                                    </h1>
                                </Link>
                            </section>
                        </div>
                        <div className="form">
                            <div className="forminput forminputchoice">
                                <label>Что данный игрок нарушил?</label>
                                <Select _type={type} _list={[
                                    [ 'cheater', 'Читерство', (<SlBan />) ],
                                    [ 'smurfing', 'Смурфинг', (<MdSupervisorAccount />) ],
                                    [ 'abnormal', 'Оскорбляющее поведение', (<MdNoAdultContent />) ],
                                    [ 'content', 'Оскорбительный и/или неуместный контент', (<MdContentCopy />) ],
                                    [ 'other', 'Другое', (<TbDots />) ],
                                ]} onChange={item => {
                                    setType(item[0])
                                }} />
                            </div>
                            <div className="forminput forminputtextarea" data-atasd={JSON.stringify(files)}>
                                <label for="feedbackDesc">{type === 'other' ? 'Опишите, что конкретно нарушил игрок' : 'Можете добавить конкретики (необзятельно)'}</label>
                                <textarea value={desc} onChange={event => setDesc(event.target.value)} id="feedbackDesc" rows="4"></textarea>
                            </div>
                            <FormAttach maxFiles={5} maxSize={20971520} id='reportFiles' name="Доказательства (Не обязательно)" _multiple={true} _accept="image/*, text/*, videos/*" _files={files} onLoad={_files => {
                                const filesTemp = [...files]

                                _files.map(item => {
                                    if(item.type.indexOf('image/') === 0
                                        || item.type.indexOf('text/') === 0
                                        || item.type.indexOf('videos/') === 0) filesTemp.push(item)
                                })
                                setFiles(filesTemp)
                            }} onDelete={_file => {
                                const filesTemp = [...files]
                                let index = -1

                                filesTemp.filter((file, i) => {
                                    if(file === _file) {
                                        return index = i
                                    }
                                })
                                if(index != -1) filesTemp.splice(index, 1)

                                setFiles(filesTemp)
                            }} />
                        </div>
                    </>
                )}

                onClick={() => {
                    if(!isValidForm())return console.log('sdad')
                    if((!report.length || (report.length && type === 'other')) && desc.length < 144)return notify('Длина обращения должна быть минимум 144 символа')

                    setSuccess(true)
                }}
            />

            <Modal
                toggle={success}

                title="Жалоба на игрока"
                icon={(<FcFeedback />)}
                
                buttons={['Закрыть']}
                buttonsHref={[ window.location.href.replace(`?report=${report}`, '') ]}
                
                body={(
                    <>
                        <div className="modaltext">
                            <section>
                                {!error.length ? (<h1 style={{textAlign: 'center', margin: '0'}}>Спасибо за отправленную жалобу. <br />Мы рассмотрим ее как можно скорее и примем меры</h1>) : ''}

                                {error === 'timeout'
                                    ? (<h1 style={{textAlign: 'center', margin: '0', color: '#df6767'}}>Вы уже отправляли недавно жалобу. Пожалуйста, немного подождите!</h1>)
                                    : (<h1 style={{textAlign: 'center', margin: '0', color: '#df6767'}}>{error}</h1>)}
                            </section>
                        </div>
                    </>
                )}
            />
        </>
    )
    return (
        <>
            <Modal
                toggle={!success ? true : false}

                title="Обратная связь"
                desciption="Это форма обратной связи. Если у Вас появились какие-то проблемы и/или вопросы - напишите нам и наши специолисты помогут Вам."
                icon={(<FcFeedback />)}
                
                buttons={['Отмена', 'Отправить']}
                buttonsBlock={!validate}
                buttonsHref={[ window.location.href.replace('#feedback', '') ]}
                
                body={(
                    <>
                        <div className="modaltext">
                            <section>
                                <h1>Персональная информация, которую мы от Вас получим</h1>
                                1. Логин аккаунта <br />
                                2. UID аккаунта (User Indification) <br />
                                3. Email адрес аккаунта <br />
                                4. Ваш IP адрес <br />
                                5. Ваш браузер <br />
                            </section>
                        </div>
                        <div className="form">
                            <div className="forminput forminputchoice">
                                <label>В чем у Вас проблемы/вопрос?</label>
                                <Select _type={type} _list={[
                                    [ 'ban', 'Блокировка аккаунта', (<SlBan />) ],
                                    [ 'stats', 'Статистика аккаунта', (<IoMdStats />) ],
                                    [ 'groups', 'Сообщество', (<TiGroup />) ],
                                    [ 'other', 'Другое', (<TbDots />) ],
                                ]} onChange={item => {
                                    setType(item[0])
                                }} />
                            </div>
                            <div className="forminput forminputtextarea" data-atasd={JSON.stringify(files)}>
                                <label for="feedbackDesc">Опишите Вашу проблему/вопрос</label>
                                <textarea value={desc} onChange={event => setDesc(event.target.value)} id="feedbackDesc" rows="7"></textarea>
                            </div>
                            <FormAttach maxFiles={10} maxSize={20971520} id='feedbackFiles' name="Вложения (Не обязательно)" _multiple={true} _accept="image/*, text/*, videos/*" _files={files} onLoad={_files => {
                                const filesTemp = [...files]

                                _files.map(item => {
                                    if(item.type.indexOf('image/') === 0
                                        || item.type.indexOf('text/') === 0
                                        || item.type.indexOf('videos/') === 0) filesTemp.push(item)
                                })
                                setFiles(filesTemp)
                            }} onDelete={_file => {
                                const filesTemp = [...files]
                                let index = -1

                                filesTemp.filter((file, i) => {
                                    if(file === _file) {
                                        return index = i
                                    }
                                })
                                if(index != -1) filesTemp.splice(index, 1)

                                setFiles(filesTemp)
                            }} />
                        </div>
                    </>
                )}

                onClick={() => {
                    if(!isValidForm())return
                    if(desc.length < 144)return notify('Длина обращения должна быть минимум 144 символа')

                    setSuccess(true)
                }}
            />

            <Modal
                toggle={success}

                title="Обратная связь"
                icon={(<FcFeedback />)}
                
                buttons={['Закрыть']}
                buttonsHref={[ window.location.href.replace('#feedback', '') ]}
                
                body={(
                    <>
                        <div className="modaltext">
                            <section>
                                {!error.length ? (<h1 style={{textAlign: 'center', margin: '0'}}>Спасибо за отправленную заявку. <br />Мы рассмотрим ее как можно скорее и пришлем уведомление на Ваш аккаунт</h1>) : ''}

                                {error === 'timeout'
                                    ? (<h1 style={{textAlign: 'center', margin: '0', color: '#df6767'}}>Вы уже отправляли недавно заявку. Пожалуйста, немного подождите!</h1>)
                                    : (<h1 style={{textAlign: 'center', margin: '0', color: '#df6767'}}>{error}</h1>)}
                            </section>
                        </div>
                    </>
                )}
            />
        </>
    )
}