import fetch from 'node-fetch'
import yts from 'yt-search'
import https from 'https'

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) return m.reply(`» Ingresa un texto o link de YouTube\n> *Ejemplo:* ${usedPrefix + command} ozuna`)

  const API_KEY = 'russellxz'
  const IP_FAKE = '173.208.189.26'
  const TIMEOUT_MS = 60000
  const httpsAgentForIp = new https.Agent({ servername: 'api.neoxr.eu', rejectUnauthorized: false })

  const sleep = ms => new Promise(r => setTimeout(r, ms))
  const MAX_RETRIES = 3
  const RETRY_BASE_DELAY_MS = 1000

  async function requestWithRetries(url, useAgent = false) {
    let lastError
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const resp = await fetch(url, {
          headers: {
            'X-Forwarded-For': IP_FAKE,
            'X-Real-IP': IP_FAKE,
            'User-Agent': 'curl/7.85.0'
          },
          agent: useAgent ? httpsAgentForIp : undefined,
          timeout: TIMEOUT_MS
        })
        return await resp.json()
      } catch (err) {
        lastError = err
        await sleep(RETRY_BASE_DELAY_MS * Math.pow(2, attempt - 1))
      }
    }
    throw lastError
  }

  try {
    let search = await yts(text)
    if (!search?.all || search.all.length === 0) return m.reply('No se encontraron resultados.')

    let results = search.all[0]
    let url = results.url
    let apiData

    if (command === 'play1' || command === 'ytmp3') {
      const primaryUrl = `https://api.neoxr.eu/api/youtube?url=${encodeURIComponent(url)}&type=audio&quality=129kbps&apikey=${API_KEY}`
      apiData = await requestWithRetries(primaryUrl, true)

      // fallback si no vino url
      if (!apiData?.data?.url) {
        const fallbackUrl = `https://${IP_FAKE}/api/youtube?url=${encodeURIComponent(url)}&type=audio&quality=129kbps&apikey=${API_KEY}`
        apiData = await requestWithRetries(fallbackUrl, true)
      }

      if (!apiData?.data?.url) return m.reply('> No se pudo descargar el audio.')

      let txt = `「✦」Descargando *${results.title}*

> ✐ Canal » *${results.author?.name || '-'}*
> ⴵ Duración » *${results.timestamp || '-'}*
> ✰ Calidad » *${apiData.data.quality || '128k'}*
> 🜸 Link » ${results.url}`

      await conn.sendMessage(m.chat, { image: { url: results.image }, caption: txt }, { quoted: m })
      await conn.sendMessage(m.chat, {
        audio: { url: apiData.data.url },
        mimetype: 'audio/mpeg',
        fileName: `${results.title || 'audio'}.mp3`,
        ptt: false
      }, { quoted: m })

    } else if (command === 'play22' || command === 'ytmp4') {
      const primaryUrl = `https://api.neoxr.eu/api/youtube?url=${encodeURIComponent(url)}&type=video&quality=360p&apikey=${API_KEY}`
      apiData = await requestWithRetries(primaryUrl, true)

      // fallback si no vino url
      if (!apiData?.data?.url) {
        const fallbackUrl = `https://${IP_FAKE}/api/youtube?url=${encodeURIComponent(url)}&type=video&quality=360p&apikey=${API_KEY}`
        apiData = await requestWithRetries(fallbackUrl, true)
      }

      if (!apiData?.data?.url) return m.reply('> No se pudo descargar el video.')

      let txt = `「✦」Descargando *${results.title}*

> ✐ Canal » *${results.author?.name || '-'}*
> ⴵ Duración » *${results.timestamp || '-'}*
> ✰ Calidad » *${apiData.data.quality || '360p'}*
> 🜸 Link » ${results.url}`

      await conn.sendMessage(m.chat, { image: { url: results.image }, caption: txt }, { quoted: m })
      await conn.sendMessage(m.chat, {
        video: { url: apiData.data.url },
        mimetype: 'video/mp4',
        fileName: `${results.title || 'video'}.mp4`,
        caption: '> ❑ Aquí tienes'
      }, { quoted: m })
    }

  } catch (e) {
    m.reply(`Error: ${e.message}`)
    m.react('✖️')
  }
}

handler.command = ['play1', 'play22']

export default handler
