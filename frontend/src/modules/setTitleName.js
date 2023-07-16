export default function setTitleName(name) {
    const CONFIG = require('../config.json')
    document.title = CONFIG.defaultTitleName + " - " + name
}