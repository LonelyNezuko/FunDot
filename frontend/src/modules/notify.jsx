import $ from 'jquery'
import func from "./func"

export default function notify(text, type = 'error', time = 5000) {
    // text = text.replaceAll(/{[a-f0-9]{6}\b}/gi, (elem, $1) => {
    //     return `<span style="color: #${elem.replace('{', '').replace('}', '')}; width: 100%; margin: 0;" />`
    // })

    const id = func.random(0, 9999999999)
    $('#notify').prepend(`
        <section data-id="${id}" class="${type}">${text}</section>
    `)
    setTimeout(() => {
        $(`#notify section[data-id="${id}"]`).remove()
    }, time)
}