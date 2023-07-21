export default function AccountLandingHeader() {
    return (
        <div id="accountLandingHeader" className="landing">
            <header className="header">
                <div className="accountBG"></div>
                <div className="wrapper">
                    <div className="accountAvatar">
                        <div className="landingAvatar landingAnimate"></div>
                        <div className="wrap">
                            <div className="title">
                                <h1 className="landingAnimate"></h1>
                                <h2 className="landingAnimate"></h2>
                            </div>
                            <button className="btn icon focus manage">
                            </button>
                        </div>
                    </div>
                    <div className="nav">
                        <span className="item landingAnimate"></span>
                        <span className="item landingAnimate"></span>
                        <span className="item landingAnimate"></span>
                        <span className="item landingAnimate"></span>
                        <span className="item landingAnimate"></span>
                    </div>
                </div>
                <div className="bg"></div>
            </header>
        </div>
    )
}