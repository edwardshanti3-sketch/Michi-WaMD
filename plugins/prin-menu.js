import moment from "moment-timezone"
import fs from "fs"
import path from "path"

const USERS_DB = './database/users.json'

// 📂 crear base de datos si no existe
if (!fs.existsSync('./database')) fs.mkdirSync('./database')
if (!fs.existsSync(USERS_DB)) fs.writeFileSync(USERS_DB, JSON.stringify([]))

let handler = async (m, { conn, usedPrefix }) => {
  try {
    /* ───── 👥 REGISTRO DE USUARIOS ───── */
    let users = JSON.parse(fs.readFileSync(USERS_DB))
    let sender = m.sender

    if (!users.includes(sender)) {
      users.push(sender)
      fs.writeFileSync(USERS_DB, JSON.stringify(users, null, 2))
    }

    let totalUsers = users.length
    /* ─────────────────────────────── */

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
    let configPath
    if (conn.user.jid === global.conn.user.jid) {
      configPath = path.join("./Sessions", "config.json")
    } else {
      configPath = path.join("./Sessions/SubBot", senderBotNumber, "config.json")
    }

    if (fs.existsSync(configPath)) {
      try {
        const botConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"))
        if (botConfig.name) botNameToShow = botConfig.name
        if (botConfig.banner) bannerUrl = botConfig.banner
        if (botConfig.video) videoUrl = botConfig.video
      } catch (e) { console.error(e) }
    }

    let txt = `
╭─❖ 「 🤖 𝗠𝗘𝗡𝗨 𝗣𝗥𝗜𝗡𝗖𝗜𝗣𝗔𝗟 」 ❖─╮
│
│ 𝐇𝐨𝐥𝐚! 𝐒𝐨𝐲 *${botNameToShow}*
│ ${(conn.user.jid == global.conn.user.jid ? '𝐁𝐨𝐭 𝐏𝐫𝐢𝐧𝐜𝐢𝐩𝐚𝐥 🅥' : '𝐒𝐮𝐛-𝐁𝐨𝐭 🅑')}
│
│ ⏰ Hora: ${moment.tz("America/Tegucigalpa").format("HH:mm:ss")}
│ 📅 Fecha: ${moment.tz("America/Tegucigalpa").format("DD/MM/YYYY")}
│ ⚡ Activo: ${uptimeStr}
│ 👥 Usuarios registrados: ${totalUsers}
│
╰────────────────────────╯

✿ 𝗖𝗮𝗻𝗮𝗹:
https://whatsapp.com/channel/0029Vb6ygDELo4hpelb24M01

⟪ 📜 𝗟𝗜𝗦𝗧𝗔 𝗗𝗘 𝗖𝗢𝗠𝗔𝗡𝗗𝗢𝗦 ⟫

`

    for (let tag in menu) {
      txt += `╭─⊹ ${tag.toUpperCase()} ⊹─╮\n`
      for (let plugin of menu[tag]) {
        for (let cmd of plugin.help) {
          txt += `│ ✧ ${usedPrefix + cmd}\n`
        }
      }
      txt += `╰──────────────╯\n\n`
    }

    // 🔹 FIRMA FUTURISTA (fuente chica)
txt += `
────────────────────
ʙᴏᴛ: 𝗦𝗶 𝗬𝗶𝗻𝗴
ᴅᴇᴠ: 👑 ᴅɪᴏɴᴇʙɪ-sᴀᴍᴀ | 開発者
sʏsᴛᴇᴍ: ғᴜᴛᴜʀᴇ-ʙᴏᴛ ⚡
────────────────────
`

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

handler.command = ['help', 'menu', 'm']
export default handler