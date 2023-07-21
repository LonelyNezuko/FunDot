import React from 'react'

import { Rank } from '../../components/rank/rank'
import News from '../../components/news/news'

export default function AccountLandingBodyStats() {
    return (
        <div id="accountLandingBodyStats" className="landing">
            <div className="home">
                <section className="section">
                    <Rank rpp={500} landing={true} />
                    <div className="stats">
                        <h1 className="title">
                            <h2 className="landingAnimate"></h2>
                            <span className="landingAnimate"></span>
                        </h1>
                        <div className="wrap">
                            <div className="about landingAnimate">
                                <h1>&nbsp;</h1>
                                <div></div>
                            </div>
                            <div className="main">
                                <section className="country landingAnimate">
                                    <h1>&nbsp;</h1>
                                    <span>&nbsp;</span>
                                </section>
                                <section className="regdate landingAnimate">
                                    <h1>&nbsp;</h1>
                                    <span>&nbsp;</span>
                                </section>
                                <section className="steam landingAnimate">
                                    <h1>&nbsp;</h1>
                                    <span>&nbsp;</span>
                                </section>
                                <section className="social landingAnimate">
                                    <h1>&nbsp;</h1>
                                    <span>&nbsp;</span>
                                </section>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section">
                    <News addform={true} title='Новости' account={true} id="accountNews" landing={true} />
                </section>
            </div>
        </div>
    )
}