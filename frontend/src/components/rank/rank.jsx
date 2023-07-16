import React from 'react'
import $ from 'jquery'

import './rank.scss'

export function Rank({ rpp }) {
    return (
        <div className="rank">
            <div className="elem empty">
                <div className="wrap" style={{display: !rankPrevRPP(rpp) ? 'none' : 'block'}}>
                    <img src={rankGetID(rankPrevRPP(rpp)).img} />
                    <div className="name">
                        <h1>{rankGetID(rankPrevRPP(rpp)).name}</h1>
                    </div>
                    <div className="matchcounts">
                        <span className="rpp">{rankPrevRPP(rpp).toLocaleString()}</span>
                    </div>
                </div>
            </div>
            <div className="elem">
                <img src={rankGetID(rpp).img} />
                <div className="name">
                    <h1>{rankGetID(rpp).name}</h1>
                </div>
                <div className="matchcounts">
                    <span className="rpp">{rpp.toLocaleString()}</span>
                    <h1>12.582 матчей</h1>
                </div>
            </div>
            <div className="elem">
                <div className="wrap" style={{display: !rankNextRPP(rpp) ? 'none' : 'block'}}>
                    <img src={rankGetID(rankNextRPP(rpp)).img} />
                    <div className="name">
                        <h1>{rankGetID(rankNextRPP(rpp)).name}</h1>
                    </div>
                    <div className="matchcounts">
                        <span className="rpp">{rankNextRPP(rpp).toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function rankGetID(rpp) {
    if(rpp > 0 && rpp <= 100)return { id: 1, name: 'Silver', img: '/assets/ranks/1.png' }
    if(rpp > 100 && rpp <= 250)return { id: 2, name: 'Silver 2', img: '/assets/ranks/2.png' }
    if(rpp > 250 && rpp <= 500)return { id: 3, name: 'Silver 3', img: '/assets/ranks/3.png' }
    if(rpp > 500 && rpp <= 750)return { id: 4, name: 'Silver 4', img: '/assets/ranks/4.png' }
    if(rpp > 750 && rpp <= 900)return { id: 5, name: 'Silver Elite', img: '/assets/ranks/5.png' }
    if(rpp > 900 && rpp <= 1150)return { id: 6, name: 'Silver Elite Master', img: '/assets/ranks/6.png' }
    if(rpp > 1150 && rpp <= 1300)return { id: 7, name: 'Gold Nova', img: '/assets/ranks/7.png' }
    if(rpp > 1300 && rpp <= 1450)return { id: 8, name: 'Gold Nova 2', img: '/assets/ranks/8.png' }
    if(rpp > 1450 && rpp <= 1700)return { id: 9, name: 'Gold Nova 3', img: '/assets/ranks/9.png' }
    if(rpp > 1700 && rpp <= 1950)return { id: 10, name: 'Gold Nova Master', img: '/assets/ranks/10.png' }
    if(rpp > 1950 && rpp <= 2100)return { id: 11, name: 'Master Guardian', img: '/assets/ranks/11.png' }
    if(rpp > 2100 && rpp <= 2300)return { id: 12, name: 'Master Guardian II', img: '/assets/ranks/12.png' }
    if(rpp > 2300 && rpp <= 2500)return { id: 13, name: 'Master Guardian Elite', img: '/assets/ranks/13.png' }
    if(rpp > 2500 && rpp <= 2800)return { id: 14, name: 'Distinguished Master Guardian', img: '/assets/ranks/14.png' }
    if(rpp > 2800 && rpp <= 3100)return { id: 15, name: 'Legendary Eagle', img: '/assets/ranks/15.png' }
    if(rpp > 3100 && rpp <= 3400)return { id: 16, name: 'Legendary Eagle Master', img: '/assets/ranks/16.png' }
    if(rpp > 3400 && rpp <= 3800)return { id: 17, name: 'Supreme Master First Class', img: '/assets/ranks/17.png' }
    if(rpp > 3800)return { id: 18, name: 'The Global Elite', img: '/assets/ranks/18.png' }
    return { id: 0, name: 'Без звания', img: '/assets/ranks/0.png' }
}
export function rankPrevRPP(rpp) {
    if(rpp > 0 && rpp <= 100)return 0
    if(rpp > 100 && rpp <= 250)return 100
    if(rpp > 250 && rpp <= 500)return 250
    if(rpp > 500 && rpp <= 750)return 500
    if(rpp > 750 && rpp <= 900)return 750
    if(rpp > 900 && rpp <= 1150)return 900
    if(rpp > 1150 && rpp <= 1300)return 1150
    if(rpp > 1300 && rpp <= 1450)return 1300
    if(rpp > 1450 && rpp <= 1700)return 1450
    if(rpp > 1700 && rpp <= 1950)return 1700
    if(rpp > 1950 && rpp <= 2100)return 1950
    if(rpp > 2100 && rpp <= 2300)return 2100
    if(rpp > 2300 && rpp <= 2500)return 2300
    if(rpp > 2500 && rpp <= 2800)return 2500
    if(rpp > 2800 && rpp <= 3100)return 2800
    if(rpp > 3100 && rpp <= 3400)return 3100
    if(rpp > 3400 && rpp <= 3800)return 3400
    if(rpp > 3800)return 3800
    return 0
}
export function rankNextRPP(rpp) {
    if(rpp > 0 && rpp <= 100)return 101
    if(rpp > 100 && rpp <= 250)return 251
    if(rpp > 250 && rpp <= 500)return 501
    if(rpp > 500 && rpp <= 750)return 751
    if(rpp > 750 && rpp <= 900)return 901
    if(rpp > 900 && rpp <= 1150)return 1151
    if(rpp > 1150 && rpp <= 1300)return 1301
    if(rpp > 1300 && rpp <= 1450)return 1451
    if(rpp > 1450 && rpp <= 1700)return 1701
    if(rpp > 1700 && rpp <= 1950)return 1951
    if(rpp > 1950 && rpp <= 2100)return 2101
    if(rpp > 2100 && rpp <= 2300)return 2301
    if(rpp > 2300 && rpp <= 2500)return 2501
    if(rpp > 2500 && rpp <= 2800)return 2801
    if(rpp > 2800 && rpp <= 3100)return 3101
    if(rpp > 3100 && rpp <= 3400)return 3401
    if(rpp > 3400 && rpp <= 3800)return 3801
    if(rpp > 3800)return 0
    return 0
}