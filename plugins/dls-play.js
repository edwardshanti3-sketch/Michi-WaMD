import fetch from 'node-fetch'
import yts from 'yt-search'

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) return m.reply(`» Ingresa un texto o link de YouTube\n> Ejemplo: ${usedPrefix + command} ozuna`)

    try {
        let url = text.match(/(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/\S+/gi)?.[0]
        let results

        if (!url) {
            let search = await yts(text)
            if (!search?.all || search.all.length === 0) return m.reply('No se encontraron resultados.')
            results = search.all[0]
            url = results.url
        } else {
            results = { title: 'Audio/Video', url }
        }

        let infoTxt = `「✦」Downloading *${results.title}*\n\n`
        if (results.author?.name) infoTxt += `> ✿ Canal: *${results.author.name}*\n`
        if (results.views) infoTxt += `> ✰ Vistas: *${results.views.toLocaleString()}*\n`
        if (results.timestamp) infoTxt += `> ⴵ Duración: *${results.timestamp}*\n`
        if (results.ago) infoTxt += `> ✐ Publicado: *${results.ago}*\n`
        infoTxt += `> 🜸 Url: ${url}`

        await conn.sendMessage(m.chat, {
            image: { url: results.thumbnail },
            caption: infoTxt
        }, { quoted: m })

        const fetchOptions = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*'
            }
        }

        if (command === 'play' || command === 'ytmp3') {
            let res = await fetch(`https://api-adonix.ultraplus.click/download/ytmp3?apikey=Adofreekey&url=${encodeURIComponent(url)}`, fetchOptions)
            let api2 = await res.json()
            let audioUrl = api2?.data?.url || null
            if (!audioUrl) return m.reply('> No se pudo descargar el audio.')

            await conn.sendMessage(m.chat, {
                audio: { url: audioUrl },
                mimetype: 'audio/mpeg',
                fileName: `${results.title || 'audio'}.mp3`,
                ptt: false
            }, { quoted: m })

        } else if (command === 'play2' || command === 'ytmp4') {
            let res = await fetch(`https://api-adonix.ultraplus.click/download/ytmp4?apikey=Adofreekey&url=${encodeURIComponent(url)}`, fetchOptions)
            let api2 = await res.json()
            let videoUrl = api2?.data?.url || null
            if (!videoUrl) return m.reply('> No se pudo descargar el video.')

            await conn.sendMessage(m.chat, {
                video: { url: videoUrl },
                mimetype: 'video/mp4',
                fileName: `${results.title || 'video'}.mp4`
            }, { quoted: m })
        }

    } catch (e) {
        m.reply(`Error: ${e.message}`)
        m.react('✖️')
    }
}

handler.command = ['play', 'ytmp3', 'play2', 'ytmp4']
handler.help = ['play', 'ytmp3', 'play2', 'ytmp4']
handler.tags = ['descargas']

export default handler
