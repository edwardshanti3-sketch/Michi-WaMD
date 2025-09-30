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

    let rolBot = conn.user.jid == global.conn.user.jid ? 'Principal 🅥' : 'Sub-Bot 🅑'

    
    let txt = `「⊹」𝗛𝗼𝗹𝗮! 𝗦𝗼𝘆 *${botNameToShow}* (${rolBot})

> ✐ Hora: ${moment.tz("America/Tegucigalpa").format("HH:mm:ss")}
> ꕤ Fecha: ${moment.tz("America/Tegucigalpa").format("DD/MM/YYYY")}
> ❏ Actividad: ${uptimeStr}
> ✩ Canal: https://whatsapp.com/channel/0029VbArz9fAO7RGy2915k3O

━━━━━━━━━━━━━━\n`

    for (let tag in menu) {
      txt += `「✎」 *${tag.toUpperCase()}*\n\n`
      for (let plugin of menu[tag]) {
        for (let cmd of plugin.help) {
          txt += `> ❐ *${usedPrefix + cmd}*\n`
        }
      }
      txt += `━━━━━━━━━━━━━━\n\n`
    }

    if (videoUrl) {
      await conn.sendMessage(
        m.chat,
        { video: { url: videoUrl }, caption: txt, gifPlayback: false },
        { quoted: m }
      )
    } else if (bannerUrl) {
      await conn.sendMessage(
        m.chat,
        { image: { url: bannerUrl }, caption: txt },
        { quoted: m }
      )
    } else {
      await conn.sendMessage(
        m.chat,
        { image: { url: global.michipg }, caption: txt },
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
