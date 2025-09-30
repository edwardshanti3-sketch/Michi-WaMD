import fetch from 'node-fetch'
import yts from 'yt-search'

// scraper adaptado
async function ytdl(url) {
    try {
        const response = await fetch('https://ytdown.io/proxy.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': '*/*',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: `url=${encodeURIComponent(url)}`
        })

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const data = await response.json()
        return data.api // <- array de objetos con mediaUrl, type, etc.
    } catch (error) {
        console.error('Error downloading video:', error)
        throw error
    }
}

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

        let dl = await ytdl(url)
        if (!dl || !Array.isArray(dl)) return m.reply('No se pudo obtener la descarga.')

        if (command === 'play' || command === 'ytmp3') {
            let audio = dl.find(v => v.type?.toLowerCase() === 'audio')
            if (!audio) return m.reply('No se encontró un enlace de audio.')

            await conn.sendMessage(m.chat, {
                audio: { url: audio.mediaUrl },
                mimetype: 'audio/mpeg',
                fileName: `${results.title || audio.name || 'audio'}.${(audio.mediaExtension || 'mp3').toLowerCase()}`,
                ptt: false,
                contextInfo: {
                    externalAdReply: {
                        title: results.title || audio.name,
                        body: `Calidad: ${audio.mediaQuality || 'desconocida'} | Duración: ${audio.mediaDuration || ''}`,
                        thumbnailUrl: audio.mediaThumbnail,
                        sourceUrl: url,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: m })

        } else if (command === 'play2' || command === 'ytmp4') {
            let video = dl.find(v => v.type?.toLowerCase() === 'video')
            if (!video) return m.reply('No se encontró un enlace de video.')

            await conn.sendMessage(m.chat, {
                video: { url: video.mediaUrl },
                mimetype: 'video/mp4',
                fileName: `${results.title || video.name || 'video'}.${(video.mediaExtension || 'mp4').toLowerCase()}`,
                contextInfo: {
                    externalAdReply: {
                        title: results.title || video.name,
                        body: `Calidad: ${video.mediaQuality || ''} | Duración: ${video.mediaDuration || ''}`,
                        thumbnailUrl: video.mediaThumbnail,
                        sourceUrl: url,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
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
