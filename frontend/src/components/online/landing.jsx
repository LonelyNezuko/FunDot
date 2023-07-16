import React from "react"
import './online.scss'

export default function OnlineLanding() {
    return (
        
        <div id="onlineLanding" className="landing">
            <header>
                <h1 className="landingAnimate">&nbsp;</h1>
                <span className="landingAnimate">&nbsp;</span>
            </header>
            <section className="list">
                {new Array(4).fill(0).map((item, i) => {
                    return (<div className="item">
                        <div className="image landingAnimate"></div>
                        <h1>
                            <div className="landingAnimate">&nbsp;</div>
                            <span className="landingAnimate">&nbsp;</span>
                        </h1>
                    </div>)
                })}
            </section>
        </div>
    )
}