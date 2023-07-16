import { Link } from "react-router-dom"

export default function SortMedia({ media }) {
    media.map(item => {
        if(item.type === 'youtube') {
            if(item.src.indexOf('youtube.com') !== -1) item.src = item.src.substring(item.src.indexOf('?v=') + 3, item.src.length)
        }
    })
    return (
        <div className={`_sortMedia _sortMedia-${media.length}`}>
            {media.map((item, i) => {
                return (<div key={i} className="_sortMediaItem">
                    {item.type === 'img' ? (<Link to={`?image=${item.src}`} className={`_sortMediaItem_img`}>
                        <img src={item.src} />
                    </Link>) : ''}
                    {item.type === 'youtube' ? (
                        <iframe className="_sortMediaItem_video"
                            src={`https://www.youtube.com/embed/${item.src}`}
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen></iframe>
                    ) : ''}
                </div>)
            })}
        </div>
    )
}