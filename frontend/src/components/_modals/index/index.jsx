import React from 'react'
import $ from 'jquery'
import { Link } from 'react-router-dom'

import './index.scss'

import { IoClose } from 'react-icons/io5'

import { ImPencil } from 'react-icons/im'

import { BsFlagFill } from 'react-icons/bs'
import { FaCashRegister } from 'react-icons/fa'
import { GiTeapot } from 'react-icons/gi'

export default function Modal({
    toggle = false,
    
    title = 'title',
    desciption = '&nbsp;',
    icon,

    nav,
    body = 'body',

    buttons = [],
    buttonsBlock,
    buttonsHref = [],

    navButtons,
    navButtonsBlock = [],

    onClose = () => {},
    onClick = () => {}

}) {
    const [ navPage, setNavPage ] = React.useState(0)
    React.useEffect(() => {
        setNavPage(0)
    }, [toggle])

    return (
        <div className="modal" style={{display: !toggle ? 'none' : 'flex'}}>
            <div className="modalWrapper">
                <header className="modalHeader">
                    {icon ? (
                        <div className="icon">
                            {icon}
                        </div>
                    ) : ''}
                    <div className="title">
                        <h1>{title}</h1>
                        <span dangerouslySetInnerHTML={{ __html: desciption }}></span>
                    </div>
                    {buttonsHref[0] ? (
                        <Link to={buttonsHref[0]} onClick={() => onClose()} className="close">
                            <IoClose />
                        </Link>
                    ) : (
                        <div onClick={() => onClose()} className="close">
                            <IoClose />
                        </div>
                    )}
                </header>
                {typeof nav === 'object' ? (
                    <div className="nav">
                        {nav.map((item, i) => {
                            return (<button onClick={() => setNavPage(i)} key={i} className={navPage === i ? 'selected' : ''}>{item}</button>)
                        })}
                    </div>
                ) : ''}
                {body.map ? (
                    body.map((item, i) => {
                        return (
                            <div key={i} className="body" style={{display: navPage !== i ? 'none' : 'block'}}>
                                {item}
                            </div>
                        )
                    })
                ) : (
                    <div className="body">
                        {body}
                    </div>
                )}
                {navButtons ? 
                    navButtons.map((item, i) => {
                        return (
                            <div key={i} className="buttons" style={{display: navPage !== i ? 'none' : 'flex'}}>
                                <button onClick={() => onClose(navPage)} className="btn focus cancel">{item[0] || 'Cancel'}</button>
                                {item[1] ? (<button onClick={() => onClick(navPage)} className={`btn ${navButtonsBlock[i] ? 'blocked' : ''}`}>{item[1]}</button>) : ''}
                            </div>
                        )
                    }) : 
                    (
                        <div className="buttons">
                            {buttonsHref[0] ? (
                                <Link to={buttonsHref[0]} onClick={() => onClose()} className="btn focus cancel">{buttons[0] || 'Cancel'}</Link>
                            ) : (
                                <button onClick={() => onClose()} className="btn focus cancel">{buttons[0] || 'Cancel'}</button>
                            )}
                            {buttons[1] ? buttonsHref[1] ? (<Link to={buttonsHref[1]} onClick={() => onClick()} className={`btn ${buttonsBlock ? 'blocked' : ''}`}>{buttons[1]}</Link>) :
                                (<button onClick={() => onClick()} className={`btn ${buttonsBlock ? 'blocked' : ''}`}>{buttons[1]}</button>)
                            : ''}
                        </div>
                    )}
            </div>
        </div>
    )
}