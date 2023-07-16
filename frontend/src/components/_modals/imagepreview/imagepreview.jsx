import React from 'react'
import $ from 'jquery'
import { useLocation, Navigate } from 'react-router-dom'

import './imagepreview.scss'

import { MdClose } from 'react-icons/md'

export default function ImagePreview() {
    const location = useLocation()
    const [ scale, setScale ] = React.useState(1)

    const [ close, setClose ] = React.useState(false)

    if(location.search.indexOf('?image') === -1)return false

    const url = new URL(window.location)
    const imageHref = url.searchParams.get('image')

    if(!imageHref)return false

    return (
        <div className="imagepreview">
            {close ? (
                <Navigate to={window.location.pathname + window.location.search.replace(`?image=${imageHref}`, '') + window.location.hash} />
            ) : ''}
            
            <div className="close" onClick={() => setClose(true)}>
                <MdClose />
            </div>
            <div className="image" onClick={event => {
                if($(event.target)[0] !== $(event.currentTarget).parent().find('.image img')[0]) setClose(true)
            }} onWheel={event => {
                if(event.deltaY > 0) {
                    if(scale < 0.5)return
                    setScale(scale - 0.1)
                }
                else {
                    if(scale > 2)return
                    setScale(scale + 0.1)
                }
            }}>
                <img src={imageHref} style={{transform: `scale(${scale})`}} />
            </div>
        </div>
    )
}