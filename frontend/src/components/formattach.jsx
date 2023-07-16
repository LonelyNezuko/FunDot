import React from 'react'
import $ from 'jquery'

import notify from '../modules/notify'

import { ImAttachment } from 'react-icons/im'
import { IoMdClose } from 'react-icons/io'

import { AiOutlineFileImage } from 'react-icons/ai'
import { AiOutlineFileText } from 'react-icons/ai'
import { AiOutlineFile } from 'react-icons/ai'

export default function FormAttach({
    id,
    name,

    maxVisualFiles,
    maxFiles,

    maxSize,

    _files = [],

    onLoad,
    onDelete,

    _accept,
    _multiple }) {
    const [ files, setFiles ] = React.useState([])
    React.useEffect(() => {
        setFiles(_files)
    }, [_files])

    return (
        <div className="forminput formattach">
            <label>{name || 'Вложения'}</label>
            <div className="files">
                {files.map((item, i) => {
                    if(maxVisualFiles && i >= maxVisualFiles)return ''
                    return (
                        <div key={i} className="file img" title={item.name}>
                            <div className="wrap">
                                {item.type.indexOf('image/') === 0 ? (<AiOutlineFileImage />)
                                    : item.type.indexOf('text/') === 0 ? (<AiOutlineFileText />)
                                    : (<AiOutlineFile />)}
                                <h1>{item.name.length > 11 ? item.name.substring(0, 11) + '...' : item.name}</h1>
                            </div>
                            <button className="btn icon transparent" onClick={() => {
                                if(onDelete) onDelete(item)
                            }}>
                                <IoMdClose />
                            </button>
                        </div>
                    )
                })}
                {(maxVisualFiles && files.length > maxVisualFiles) ? (
                    <div className="file desc">... и еще {files.length - maxVisualFiles}</div>
                ) : ''}
                <div className={`loadfile ${files.length && 'loaded'}`} style={{display: files.length >= maxFiles ? 'none' : 'flex'}}>
                    <label for={id}>
                        <div className="wrap">
                            <ImAttachment />
                            <span>Выберите файл</span>
                        </div>
                    </label>

                    <input id={id} type="file" onChange={event => {
                        if(files.length < maxFiles) {
                            let _files = [...event.target.files]
                            if(_files.length > maxFiles - files.length) _files = _files.slice(0, maxFiles - files.length)

                            const loadFiles = []
                            let sizeCount = 0

                            _files.forEach((item, i) => {
                                if(maxSize && item.size >= maxSize) sizeCount ++

                                if(!files.find(file => file.name === item.name && file.size === item.size && file.lastModified === item.lastModified)
                                    && (maxSize && item.size < maxSize)) {
                                    loadFiles.push(item)
                                }
                            })

                            if(_files.length && sizeCount) {
                                if(_files.length === 1) notify('Файл не может быть загружен, так как превышает размер в 20 мбайт')
                                else notify('Некоторые файлы не были загружены, так как превышают размер в 20 мбайт')
                            }
                            if(onLoad && loadFiles.length) onLoad(loadFiles)
                        }

                        event.target.value = ""
                        event.target.files = undefined
                    }} accept={_accept || ''} multiple={_multiple || false} />
                </div>
            </div>
        </div>
    )
}