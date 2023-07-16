import React from 'react'
import $ from 'jquery'
import { useLocation } from 'react-router-dom'

import './nav.scss'

export default function NavLanding() {
    React.useEffect(() => {
        
    }, [])
    const location = useLocation()
	return (
		<div id="navLanding" className="landing">
			<div className="wrapper">
                <section className="quick">
                    <div className="elem">
                        <a className="quickItem">
                            <div className="quickWrap btn icon landingAnimate">&nbsp;</div>
                        </a>
                    </div>
                    <div className="elem">
                        <a className="quickItem">
                            <div className="quickWrap btn icon landingAnimate">&nbsp;</div>
                        </a>
                        <a className="quickItem">
                            <div className="quickWrap btn icon landingAnimate">&nbsp;</div>
                        </a>
                    </div>
                    <div className="elem">
                        <a className="quickItem">
                            <div className="quickWrap btn icon landingAnimate">&nbsp;</div>
                        </a>
                    </div>
                </section>
				<section className="account">
					<div className="image">
                        <section className="landingAnimate"></section>
                        <a className="username landingAnimate"></a>
                    </div>
				</section>
                <section className={`team show`}>
                    <div className="list">
                        {new Array(5).fill(0).map((item, i) => {
                            return (
                                <div className="item empty landingAnimate">&nbsp;</div>
                            )
                        })}
                    </div>
                    <div className="leave">
                        <button className="btn landingAnimate">&nbsp;</button>
                    </div>
                </section>
                <section className="menu">
                    <a className={`item selected`}>
                        <div className="landingAnimate"></div>
                        <h1 className="landingAnimate"></h1>
                    </a>
                    <a className={`item ${location.pathname.indexOf('/play') !== -1 && 'selected'}`}>
                        <div className="landingAnimate"></div>
                        <h1 className="landingAnimate"></h1>
                    </a>
                    <a className={`item ${location.pathname.indexOf('/servers') !== -1 && 'selected'}`}>
                        <div className="landingAnimate"></div>
                        <h1 className="landingAnimate"></h1>
                    </a>
                    <a className={`item ${location.pathname.indexOf('/groups') !== -1 && 'selected'}`}>
                        <div className="landingAnimate"></div>
                        <h1 className="landingAnimate"></h1>
                    </a>
                </section>
			</div>
		</div>
	)
}