import moment from "moment-timezone"
import fs from "fs"
import path from "path"

let handler = async (m, { conn, usedPrefix }) => {
  try {
    let menu = {}
    for (let plugin of Object.values(global.plugins)) {
      if (!plugin || !plugin.help) continue
      let taglist = plugin.tags || []
      for (let tag of taglist) {
        if (!menu[tag]) menu[tag] = []
        menu[tag].push(plugin)
      }
    }

    let uptimeSec = process.uptime()
    let hours = Math.floor(uptimeSec / 3600)
    let minutes = Math.floor((uptimeSec % 3600) / 60)
    let seconds = Math.floor(uptimeSec % 60)
    let uptimeStr = `${hours}h ${minutes}m ${seconds}s`

    let botNameToShow = global.botname || ""
    let bannerUrl = global.michipg || ""
    let videoUrl = null

    const senderBotNumber = conn.user.jid.split('@')[0]
    const configPath = path.join('./Sessions/SubBot', senderBotNumber, 'config.json')
    if (fs.existsSync(configPath)) {
      try {
        const subBotConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
        if (subBotConfig.name) botNameToShow = subBotConfig.name
        if (subBotConfig.banner) bannerUrl = subBotConfig.banner
        if (subBotConfig.video) videoUrl = subBotConfig.video
      } catch (e) { console.error(e) }
    }

    let txt = `𝐇𝐨𝐥𝐚! 𝐒𝐨𝐲 *${botNameToShow}* ${(conn.user.jid == global.conn.user.jid ? '(𝐏𝐫𝐢𝐧𝐜𝐢𝐩𝐚𝐥 🅥)' : '(𝐒𝐮𝐛-𝐁𝐨𝐭 🅑)')}

⊹ *Hora:* ${moment.tz("America/Tegucigalpa").format("HH:mm:ss")}
⊹ *Fecha:* ${moment.tz("America/Tegucigalpa").format("DD/MM/YYYY")}
⊹ *Actividad:* ${uptimeStr}

Aǫᴜɪ ᴛɪᴇɴᴇs ʟᴀ ʟɪsᴛᴀ ᴅᴇ ᴄᴏᴍᴀɴᴅᴏs:\n\n`

    for (let tag in menu) {
      txt += `*»  ⊹ ˚୨ ${tag.toUpperCase()} ୧˚⊹*\n`
      for (let plugin of menu[tag]) {
        for (let cmd of plugin.help) {
          txt += `❏ ${usedPrefix + cmd}\n`
        }
      }
      txt += `\n`
    }

    if (videoUrl) {
      await conn.sendMessage(
        m.chat,
        {
          video: { url: videoUrl },
          caption: txt,
          gifPlayback: false
        },
        { quoted: m }
      )
    } else if (bannerUrl) {
      await conn.sendMessage(
        m.chat,
        {
          image: { url: bannerUrl },
          caption: txt
        },
        { quoted: m }
      )
    } else {
      await conn.sendMessage(
        m.chat,
        {
          image: { url: global.michipg },
          caption: txt
        },
        { quoted: m }
      )
    }

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, "» Ocurrió un error.", m)
  }
}

handler.command = ['help', 'menu']
export default handler
