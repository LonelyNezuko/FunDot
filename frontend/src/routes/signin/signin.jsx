import React from 'react'
import $ from 'jquery'
import { Link, useLocation } from 'react-router-dom'

import isValid from '../../modules/validate'
import setTitleName from '../../modules/setTitleName'

import Modal from '../../components/_modals/index/index'
import CircleLoader from '../../components/circleLoader/circleLoader'

import './signin.scss'

import { CgEye } from 'react-icons/cg'
import { CgEyeAlt } from 'react-icons/cg'

import { RxFileText } from 'react-icons/rx'
import { MdPrivacyTip } from 'react-icons/md'

export default function SigninPage() {
    React.useMemo(() => { setTitleName("Авторизация") })

    const [ type, setType ] = React.useState(0)
    const [ form, setForm ] = React.useState({
        signinFormUsername: '',
        signinFormPassword: '',
        signinRemember: false,

        signupFormEmail: '',
        signupFormUsername: '',
        signupFormPassword: '',
        signupFormPromo: '',

        signupFormPrivacyCheck: false,
        signupFormTermsCheck: false,

        signupFormPrivacy: false,
        signupFormTerms: false,

        signinFormPasswordView: false,
        signupFormPasswordView: false,
    })
    const [ status, setStatus ] = React.useState(false)

    const location = useLocation()
    React.useEffect(() => {
        if(location.hash.indexOf('#signup') !== -1) setType(1)
        else setType(0)
    }, [location])



    function onFormPasswordView(type, status) {
        if(!type) setForm({...form, signinFormPasswordView: status})
        else if(type === 1) setForm({...form, signupFormPasswordView: status})
    }
    function onFormUpdate(id, value) {
        $(`#signin #${id} ~ .error`).removeClass('show')
        function error(text) {
            $(`#signin #${id} ~ .error`).text(text)
            $(`#signin #${id} ~ .error`).addClass('show')

            setTimeout(() => {
                $(`#signin #${id} ~ .error`).removeClass('show')
            }, 2000)
        }

        if(id === 'signupFormEmail'
            && !isValid.email(value)
            && value.length) error('Не корректная почта')
        
        if(id === 'signupFormPromo'
            && value.indexOf('#') !== -1) value = value.replace('#', '')

        if(id === 'signupFormPrivacy'
            && !form.signupFormPrivacyCheck)return error('Сначала прочтите политику конфиденциальности')
        if(id === 'signupFormTerms'
            && !form.signupFormTermsCheck)return error('Сначала прочтите условия пользования')

        setForm({...form, [id]: value})
    }
    function onFormSubmit(type) {
        if(!isFormFilled(type)
            || status)return
        
        setStatus(true)
        setTimeout(() => {
            setStatus(false)
        }, 2000)
    }
    function isFormFilled(type) {
        if(!type) {
            if(form.signinFormUsername.length && form.signinFormPassword.length)return true
        }
        else if(type === 1) {
            if(form.signupFormEmail.length
                && isValid.email(form.signupFormEmail)
                && form.signupFormUsername.length
                && form.signupFormPassword.length
                && form.signupFormPrivacy === true
                && form.signupFormTerms === true)return true
        }

        return false
    }



    // preview
    const [ preview, setPreview ] = React.useState([
        { image: 'https://steamuserimages-a.akamaihd.net/ugc/2014830937644965250/00FCAC3D8AB9517A96E321C8A90BC4692BFFED0D/?imw=512&amp;imh=208&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true', title: 'Современный античит', desc: 'Наш самописный античит банит до 90% всех читеров. Даже если это простой бхоп' },
        { image: 'https://steamuserimages-a.akamaihd.net/ugc/2014830937644965250/00FCAC3D8AB9517A96E321C8A90BC4692BFFED0D/?imw=512&amp;imh=208&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true', title: 'Система рейтинга', desc: 'Самая оригинальная и не повторимая система рейтинга только у нас' },
        { image: 'https://steamuserimages-a.akamaihd.net/ugc/2014830937644965250/00FCAC3D8AB9517A96E321C8A90BC4692BFFED0D/?imw=512&amp;imh=208&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true', title: 'Чета там еще', desc: 'Еще Еще Еще Еще Еще Еще Еще Еще Еще Еще Еще Еще Еще Еще Еще Еще Еще ' },
        { image: 'https://steamuserimages-a.akamaihd.net/ugc/2014830937644965250/00FCAC3D8AB9517A96E321C8A90BC4692BFFED0D/?imw=512&amp;imh=208&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true', title: 'Больше лам', desc: 'Лама Лама Лама Лама Лама Лама Лама Лама Лама Лама Лама Лама Лама ' }
    ])
    const [ previewSelected, setPreviewSelected ] = React.useState(0)
    React.useEffect(() => {
        setInterval(() => {
            setPreviewSelected(old => {
                return old >= preview.length - 1 ? 0 : old + 1
            })
        }, 5000)
    }, [])


    // modals
    const [ privacyText, setPrivacyText ] = React.useState('privacy')
    const [ termsText, setTermsText ] = React.useState('terms')

    React.useEffect(() => {
        fetch(require('../../text/privacy.txt')).then(t => t.text()).then(text => {
            setPrivacyText(text)
        })
        fetch(require('../../text/terms.txt')).then(t => t.text()).then(text => {
            setTermsText(text)
        })
    }, [])

    return (
        <div id="signin">
            {location.hash.indexOf('#privacy') !== -1 ? (
                <Modal
                toggle={true}

                title='Политика конфиденциальности'
                desciption='Перед регистрацией прочтите и примите нашу политику конфиденциальности.' 
                icon={(<MdPrivacyTip />)}
                
                body={(
                    <>
                        <div className="modaltext">
                            <section dangerouslySetInnerHTML={{ __html: privacyText }}></section>
                        </div>
                    </>
                )}
                buttons={['Я прочитал']}
                
                onClose={() => {
                    window.location = '/signin#signup'
                }} />
            ) : ''}
            {location.hash.indexOf('#terms') !== -1 ? (
                <Modal
                toggle={true}

                title='Условия пользования'
                desciption='Перед регистрацией прочтите и примите условия пользования данным сайтом.' 
                icon={(<RxFileText />)}
                
                body={(
                    <>
                        <div className="modaltext">
                            <section dangerouslySetInnerHTML={{ __html: termsText }}></section>
                        </div>
                    </>
                )}
                buttons={['Я прочитал']}
                
                onClose={() => {
                    window.location = '/signin#signup'
                }} />
            ) : ''}
            <div className={`home ${type === 1 ? 'signup' : ''}`}>
                <div className="homeWrap" style={{display: !type ? 'block' : 'none'}}>
                    <h1 className="title">Авторизация</h1>
                    <h2 className="desc">Всегда приятно возвращаться в родные края. Мы рады, что ты не забыл про нас!</h2>

                    <div className={`form ${status && 'blockedEx'}`}>
                        <div className="forminput">
                            <label>Никнейм или почта</label>
                            <input onChange={event => onFormUpdate(event.target.id, event.target.value)} value={form.signinFormUsername} id="signinFormUsername" type="text" name="username" maxlength="32" placeholder=" " />

                            <h1 className="error"></h1>
                        </div>
                        <div className="forminput">
                            {form.signinFormPasswordView ? (<CgEyeAlt onClick={() => onFormPasswordView(0, !form.signinFormPasswordView)} />) : (<CgEye onClick={() => onFormPasswordView(0, !form.signinFormPasswordView)} />)}
                            <label>Пароль</label>
                            <input onChange={event => onFormUpdate(event.target.id, event.target.value)} value={form.signinFormPassword} id="signinFormPassword" type={!form.signinFormPasswordView ? 'password' : 'text'} name="password" maxlength="64" placeholder=" " />

                            <h1 className="error"></h1>
                        </div>
                    </div>

                    <div className={`rules ${status && 'blockedEx blockedEx-nonop'}`}>
                        <section className="forminputcheckbox">
                            <input id="signinFormRemember" type="checkbox" />
                            <h1 className="error"></h1>
                            <label for="signinFormRemember">Запомнить меня и не выходить с аккаунта</label>
                        </section>
                    </div>

                    <div className="btns">
                        <button className={`btn ${(!isFormFilled(0) || status) ? 'blocked' : ''}`} onClick={() => onFormSubmit(type)}>
                            {status ? (<CircleLoader type="min" />) : 'Это точно!'}
                        </button>
                        <h1 className={`${status && "blockedEx blockedEx-nonop"}`}>Нет аккаунта? <Link to="#signup">Создай его за минуту</Link> </h1>
                    </div>
                </div>
                <div className="homeWrap" style={{display: type === 1 ? 'block' : 'none'}}>
                    <h1 className="title">Регистрация</h1>
                    <h2 className="desc">Рады приветствовать тебя на нашем портале. Прежде чем начать играть с вместе с нами, придется создать аккаунт, чтобы мы могли лучше работать.</h2>

                    <div className={`form ${status && 'blockedEx'}`}>
                        <div className="forminput">
                            <label>Для начала почта</label>
                            <input onChange={event => onFormUpdate(event.target.id, event.target.value)} value={form.signupFormEmail} id="signupFormEmail" type="text" name="email" maxlength="255" placeholder=" " />

                            <h1 className="error"></h1>
                        </div>
                        <div className="forminput">
                            <label>Теперь придумай себе запоминающийся никнейм</label>
                            <input onChange={event => onFormUpdate(event.target.id, event.target.value)} value={form.signupFormUsername} id="signupFormUsername" type="text" name="username" maxlength="32" placeholder=" " />

                            <h1 className="error"></h1>
                        </div>
                        <div className="forminput">
                            {form.signupFormPasswordView ? (<CgEyeAlt onClick={() => onFormPasswordView(1, !form.signupFormPasswordView)} />) : (<CgEye onClick={() => onFormPasswordView(1, !form.signupFormPasswordView)} />)}
                            <label>Дальше все просто. Просто пароль</label>
                            <input onChange={event => onFormUpdate(event.target.id, event.target.value)} value={form.signupFormPassword} id="signupFormPassword" type={!form.signupFormPasswordView ? 'password' : 'text'} name="password" maxlength="64" placeholder=" " />

                            <h1 className="error"></h1>
                        </div>
                        <div className="forminput forminputpromo">
                            <span>#</span>
                            <label>Знаешь промокод? Вводи его сюда</label>
                            <input onChange={event => onFormUpdate(event.target.id, event.target.value)} value={form.signupFormPromo} id="signupFormPromo" type="text" name="promo" maxlength="32" placeholder=" " />

                            <h1 className="error"></h1>
                        </div>
                    </div>

                    <div className={`rules ${status && 'blockedEx blockedEx-nonop'}`}>
                        <section className="forminputcheckbox">
                            <input onChange={event => onFormUpdate(event.target.id, event.target.checked)} checked={form.signupFormPrivacy} id="signupFormPrivacy" type="checkbox" />
                            <h1 className="error"></h1>
                            <label for="signupFormPrivacy">Я прочитал <Link onClick={() => setForm({...form, signupFormPrivacyCheck: true})} to={`${location.hash}#privacy`}>политику конфиденциальности</Link> и принимаю ее</label>
                        </section>
                        <section className="forminputcheckbox">
                            <input onChange={event => onFormUpdate(event.target.id, event.target.checked)} checked={form.signupFormTerms} id="signupFormTerms" type="checkbox" />
                            <h1 className="error"></h1>
                            <label for="signupFormTerms">Я ознакомился с <Link onClick={() => setForm({...form, signupFormTermsCheck: true})} to={`${location.hash}#terms`}>условиями пользования</Link></label>
                        </section>
                    </div>

                    <div className="btns">
                        <button className={`btn ${(!isFormFilled(1) || status) ? 'blocked' : ''}`} onClick={() => onFormSubmit(type)}>
                            {status ? (<CircleLoader type="min" />) : 'Я все'}
                        </button>
                        <h1 className={`${status && "blockedEx blockedEx-nonop"}`}>Уже есть аккаунт? <Link to="">Так что ты молчишь</Link></h1>
                    </div>
                </div>
            </div>
            <div className="preview">
                <div className="wrapper" style={{transform: `translateX(-${100 * previewSelected}%)`}}>
                    {preview.map((item, i) => {
                        return (
                            <div className="wrap" key={i}>
                                <div className="banner">
                                    <img src={item.image} alt={item.title} />
                                </div>

                                <div className="title">{item.title}</div>
                                <div className="desc">{item.desc}</div>
                            </div>
                        )
                    })}
                </div>

                <div className="nav">
                    {preview.map((item, i) => {
                        return (<button onClick={() => setPreviewSelected(i)} className={previewSelected === i ? 'selected' : ''}></button>)
                    })}
                </div>
            </div>
        </div>
    )
}