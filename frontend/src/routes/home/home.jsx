import React from "react"
import { Link } from 'react-router-dom'
import $ from 'jquery'

import Moment from 'moment'
import 'moment/locale/ru'

import intToString from '../../modules/intToString'
import setTitleName from "../../modules/setTitleName"

import './home.scss'

import Video from "../../components/video/video"
import MatchPreview from "../../components/matchpreview/matchpreview"
import Modal from "../../components/_modals/index"

export default function HomePage() {
    React.useMemo(() => { setTitleName("Главная") })
    Moment.locale('ru')

    const [ streams, setStreams ] = React.useState([
        { platform: "youtube", background: "https://i.ytimg.com/vi/GwC6j4Do--E/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAqutPnpaurBvqhh7YhNl6F1CQ_qA", views: 5827582, author: {
            id: 1,
            link: "lonelynezuko",
            username: 'LonelyNezuko',
            image: { img: 'https://static.displate.com/857x1200/displate/2019-09-04/04e658831fcb7ec9958f496c029cccd2_93f63c496c402fa7ace55ddd3b26bdf8.jpg', size: 200 },
            verified: true
        }, title: "ФАРФОРОВАЯ КУКЛА ЗА 15 МИНУТ", link: "https://www.youtube.com/watch?v=GwC6j4Do--E" },
        { platform: "youtube", background: "https://i.ytimg.com/vi/GwC6j4Do--E/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAqutPnpaurBvqhh7YhNl6F1CQ_qA", views: 5827582, author: {
            id: 1,
            link: "lonelynezuko",
            username: 'LonelyNezuko',
            image: { img: 'https://static.displate.com/857x1200/displate/2019-09-04/04e658831fcb7ec9958f496c029cccd2_93f63c496c402fa7ace55ddd3b26bdf8.jpg', size: 200 },
            verified: true
        }, title: "ФАРФОРОВАЯ КУКЛА ЗА 15 МИНУТ", link: "https://www.youtube.com/watch?v=GwC6j4Do--E" },
        { platform: "youtube", background: "https://i.ytimg.com/vi/GwC6j4Do--E/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAqutPnpaurBvqhh7YhNl6F1CQ_qA", views: 5827582, author: {
            id: 1,
            link: "lonelynezuko",
            username: 'LonelyNezuko',
            image: { img: 'https://static.displate.com/857x1200/displate/2019-09-04/04e658831fcb7ec9958f496c029cccd2_93f63c496c402fa7ace55ddd3b26bdf8.jpg', size: 200 },
            verified: true
        }, title: "ФАРФОРОВАЯ КУКЛА ЗА 15 МИНУТ", link: "https://www.youtube.com/watch?v=GwC6j4Do--E" },
        { platform: "youtube", background: "https://i.ytimg.com/vi/GwC6j4Do--E/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAqutPnpaurBvqhh7YhNl6F1CQ_qA", views: 5827582, author: {
            id: 1,
            link: "lonelynezuko",
            username: 'LonelyNezuko',
            image: { img: 'https://static.displate.com/857x1200/displate/2019-09-04/04e658831fcb7ec9958f496c029cccd2_93f63c496c402fa7ace55ddd3b26bdf8.jpg', size: 200 },
            verified: true
        }, title: "ФАРФОРОВАЯ КУКЛА ЗА 15 МИНУТ", link: "https://www.youtube.com/watch?v=GwC6j4Do--E" }
    ])
    const [ highlights, setHighlights ] = React.useState([
        { platform: "twitch", background: "https://clips-media-assets2.twitch.tv/o7nUSr_haK6T9wVnuUFiHg/AT-cm%7Co7nUSr_haK6T9wVnuUFiHg-preview-260x147.jpg", views: 4167, author: {
            id: 2,
            link: "user",
            username: 'User',
            image: { img: 'https://gas-kvas.com/uploads/posts/2023-01/1673362466_gas-kvas-com-p-anime-risunki-amino-23.jpg' }
        }, title: "Выпало ничего из кейса", link: "https://www.twitch.tv/fenya/clip/CleanRichYogurtStrawBeary-v-ForpP3BWe5QWIe?filter=moments" }
    ])

    const [ lastMatches, setLastMatches ] = React.useState([
        { id: 1, map: [ 'overpass', 'https://csgonerd.files.wordpress.com/2017/11/csgo_overpass_image_1_16_july_2014_update.jpg' ], teams: [
            { name: 'LonelyNezuko', avatar: { image: 'https://static.displate.com/857x1200/displate/2019-09-04/04e658831fcb7ec9958f496c029cccd2_93f63c496c402fa7ace55ddd3b26bdf8.jpg', size: 200 }, accountLink: 'lonelynezuko' },
            { name: 'User', avatar: { image: 'https://gas-kvas.com/uploads/posts/2023-01/1673362466_gas-kvas-com-p-anime-risunki-amino-23.jpg', position: {x: 0, y: 0} }, accountLink: 'user' }
        ], date: new Date(), time: '15:23', status: 'lose', score: [ 16, 13 ], type: '1 vs 1', game: 'CS:GO' },
        { id: 2, map: [ 'mirage', 'https://media.esportsedition.com/wp-content/uploads/2016/03/20160310181152_1.jpg' ], teams: [
            { name: 'User', avatar: { image: 'https://gas-kvas.com/uploads/posts/2023-01/1673362466_gas-kvas-com-p-anime-risunki-amino-23.jpg', position: {x: 0, y: 0} } },
            { name: 'LonelyNezuko', avatar: { image: 'https://static.displate.com/857x1200/displate/2019-09-04/04e658831fcb7ec9958f496c029cccd2_93f63c496c402fa7ace55ddd3b26bdf8.jpg', size: 200 } }
        ], date: new Date(), time: '32:17', status: 'win', score: [ 24, 29 ], type: '5 vs 5', game: 'CS:GO' },
        { id: 2, map: [ 'mirage', 'https://media.esportsedition.com/wp-content/uploads/2016/03/20160310181152_1.jpg' ], teams: [
            { name: 'User', avatar: { image: 'https://gas-kvas.com/uploads/posts/2023-01/1673362466_gas-kvas-com-p-anime-risunki-amino-23.jpg', position: {x: 0, y: 0} } },
            { name: 'LonelyNezuko', avatar: { image: 'https://static.displate.com/857x1200/displate/2019-09-04/04e658831fcb7ec9958f496c029cccd2_93f63c496c402fa7ace55ddd3b26bdf8.jpg', size: 200 } }
        ], date: new Date(), time: '32:17', status: 'win', score: [ 24, 29 ], type: '5 vs 5', game: 'CS:GO' }
    ])

    return (
        <div id="home">
            <Modal />
            <div className="homeWrapper central">
                <section className="element lastgame">
                    <header>Последние игры</header>

                    <div className="list">
                        {lastMatches.map((item, i) => {
                            return <MatchPreview  key={i} match={item} />
                        })}
                    </div>
                </section>
                
                <section className="element videos">
                    <header>Рекомендуемые стримы</header>

                    <div className="list">
                        {streams.map((item, i) => {
                            return <Video key={i} video={item} />
                        })}
                    </div>
                </section>
                <section className="element videos highlights">
                    <header>Популярные хайлайты</header>

                    <div className="list">
                        {highlights.map((item, i) => {
                            return <Video key={i} video={item} />
                        })}
                    </div>
                </section>
            </div>
            {/* <div className="homeWrapper">
                <News news={news} id="homeNews" />
            </div> */}
        </div>
    )
}