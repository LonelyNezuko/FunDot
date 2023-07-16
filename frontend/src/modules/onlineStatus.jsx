import { Link } from 'react-router-dom'

export default function OnlineStatus({status}) {
    if(!status)return (<></>)

    if(status.type === 'afk')return (<h2>AFK</h2>)
    if(status.type === 'watchmatch')return (<h2>
        Смотрит игру <Link className="link" to={`/match/${status.matchid}`}>#{status.matchid}</Link>
    </h2>)
    if(status.type === 'playmatch')return (<h2>
        Играет в <Link className="link" to={`/match/${status.matchid}`}>{status.gameName}</Link>
    </h2>)

    const CONFIG = require('../config.json')

    return (<h2>{status.type.length > CONFIG.maxOnlineStatusLength ? status.type.substring(0, CONFIG.maxOnlineStatusLength) + '...' : status.type}</h2>)
}