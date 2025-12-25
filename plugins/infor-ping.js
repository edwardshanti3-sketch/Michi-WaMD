import speed from 'performance-now'
import os from 'os'

let handler = async (m, { conn }) => {
    let timestamp = speed()
    let sentMsg = await conn.reply(
        m.chat,
        '⚡ Iniciando escaneo del sistema...\n⌛ Analizando rendimiento y núcleo...',
        m
    )

    let latency = speed() - timestamp

    // Información del sistema
    const arch = os.arch()
    const platform = os.platform()
    const release = os.release()
    const hostname = os.hostname()
    const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2)
    const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2)
    const uptime = formatUptime(os.uptime())
    const cpus = os.cpus()
    const cpuModel = cpus[0].model
    const cpuCores = cpus.length
    const botUptime = formatUptime(process.uptime())

    let result = `
╔══════════〔 ⚙️ SYSTEM CORE ⚙️ 〕══════════╗
║ 🤖 IA: Si Ying • Núcleo Activo
║
║ 📡 Latencia: ${latency.toFixed(1)} ms
║ 🧠 CPU: ${cpuModel}
║ ⚙️ Núcleos: ${cpuCores}
║
║ 💻 Plataforma: ${platform} (${arch})
║ 🖥️ Kernel: ${release}
║ 🌐 Host: ${hostname}
║
║ 🗂️ RAM Libre: ${freeMem} GB
║ 📦 RAM Total: ${totalMem} GB
║
║ ⏳ Uptime Sistema: ${uptime}
║ 🤖 Uptime Bot: ${botUptime}
╠══════════════════════════════════════════╣
║ 👑 Controlado por: Dionebi-sama
║ ⚔️ Firma: Si Ying • 開発者 | DEV
╚══════════════════════════════════════════╝
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
    return `${days}d ${hours}h ${minutes}m`
}

handler.help = ['ping', 'info']
handler.tags = ['main', 'info']
handler.command = ['ping', 'p', 'speed', 'info']

export default handler