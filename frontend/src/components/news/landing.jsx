export default function NewsLanding() {
    return (
        <div className="newsLanding landing">
            <header className="title landingAnimate"></header>

            <div className="list">
                <div className='item'>
                    <div className="itemHeader">
                        <section style={{alignItems: 'center'}}>
                            <span>
                                <div className="landingAvatar landingAnimate"></div>
                            </span>
                            <h1>
                                <span className="landingAnimate"></span>
                                <h3 className="landingAnimate"></h3>
                            </h1>
                        </section>
                    </div>
                    <div className="body">
                        <section className="text">
                            <div className="landingAnimate"></div>
                            <div className="landingAnimate"></div>
                            <div className="landingAnimate"></div>
                            <div className="landingAnimate"></div>
                            <div className="landingAnimate"></div>
                            <div className="landingAnimate"></div>
                        </section>
                        <section className="attached landingAnimate"></section>
                    </div>
                    <div className="bottom">
                        <section className="feedback">
                            <button className="btn icontext left transparent landingAnimate">
                                <span></span>
                            </button>
                            <button className="btn icontext left transparent landingAnimate">
                                <span></span>
                            </button>
                            <button className="btn icontext left transparent landingAnimate">
                                <span></span>
                            </button>
                        </section>
                        
                        <section className="views">
                            <button className="btn icontext left transparent landingAnimate">
                                <span></span>
                            </button>
                            <button className="btn icontext left transparent landingAnimate">
                                <span></span>
                            </button>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}