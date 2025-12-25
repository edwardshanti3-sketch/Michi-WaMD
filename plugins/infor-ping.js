import speed from 'performance-now'
import os from 'os'

let handler = async (m, { conn }) => {
  let timestamp = speed()
  let sentMsg = await conn.reply(
    m.chat,
    '⏳ ᴄᴀʟᴄᴜʟᴀɴᴅᴏ ᴘɪɴɢ ʏ ᴇsᴛᴀᴅᴏ ᴅᴇʟ sɪsᴛᴇᴍᴀ...',
    m
  )

  let latency = speed() - timestamp

  // 🔧 Sistema
  const arch = os.arch()
  const platform = os.platform()
  const release = os.release()
  const hostname = os.hostname()
  const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2)
  const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2)
  const uptime = formatUptime(os.uptime())
  const cpu = os.cpus()
  const cpuModel = cpu[0].model
  const cpuCores = cpu.length
  const botUptime = formatUptime(process.uptime())

  // 🛸 SISTEMA INFO FUTURISTA
  let result = `
╭─〔 ⚙️ ѕʏѕᴛᴇᴍ ɪɴғᴏ 〕─╮
│ ⚡ ᴘɪɴɢ :: ${latency.toFixed(1)} ms
│ 🧠 ᴄᴘᴜ :: ${cpuCores} ᴄᴏʀᴇs
│ 🔬 ᴍᴏᴅᴇʟ :: ${cpuModel}
│ 💾 ʀᴀᴍ :: ${freeMem}ɢʙ / ${totalMem}ɢʙ
│ 🖥️ ᴏs :: ${platform} ${arch}
│ 🧬 ᴋᴇʀɴᴇʟ :: ${release}
│ 🌐 ʜᴏsᴛ :: ${hostname}
│ ⏱️ sʏsᴛᴇᴍ ᴜᴘ :: ${uptime}
│ 🤖 ʙᴏᴛ ᴜᴘ :: ${botUptime}
╰────────────────────╯

✦ ᴘᴏᴡᴇʀᴇᴅ ʙʏ : 𝘿𝙞𝙤𝙣𝙚𝙗𝙞-𝙨𝙖𝙢𝙖
✦ ᴄᴏʀᴇ : sɪ ʏɪɴɢ ʙᴏᴛ
  `.trim()

  conn.sendMessage(
    m.chat,
    { text: result, edit: sentMsg.key },
    { quoted: m }
  )
}

function formatUptime(seconds) {
  const days = Math.floor(seconds / (24 * 60 * 60))
  seconds %= 24 * 60 * 60
  const hours = Math.floor(seconds / (60 * 60))
  seconds %= 60 * 60
  const minutes = Math.floor(seconds / 60)
  return `${days}ᴅ ${hours}ʜ ${minutes}ᴍ`
}

handler.help = ['ping', 'info']
handler.tags = ['main', 'info']
handler.command = ['ping', 'p', 'speed', 'info']

export default handler