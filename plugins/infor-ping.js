import speed from 'performance-now'
import os from 'os'

let handler = async (m, { conn }) => {
    let timestamp = speed();
    let sentMsg = await conn.reply(m.chat, '🏓 𝙲𝙰𝙻𝙲𝚄𝙻𝙰𝙽𝙳𝙾 𝙿𝙸𝙽𝙶 𝚈 𝙳𝙰𝚃𝙾𝚂 𝙳𝙴𝙻 𝚂𝙸𝚂𝚃𝙴𝙼𝙰...', m);

    let latency = speed() - timestamp;

    // Información del sistema
    const arch = os.arch();
    const platform = os.platform();
    const release = os.release();
    const hostname = os.hostname();
    const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
    const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
    const uptime = formatUptime(os.uptime());
    const cpus = os.cpus();
    const cpuModel = cpus[0].model;
    const cpuCores = cpus.length;


    const botUptime = formatUptime(process.uptime());

    let result = `
╭━━━〔 ⚡ 𝚂𝙸𝚂𝚃𝙴𝙼𝙰 𝙸𝙽𝙵𝙾 ⚡ 〕━━━╮
┃ 📡 *Ping:* ${latency.toFixed(1)} ms
┃ 💻 *Plataforma:* ${platform} ${arch}
┃ 🖥️ *Sistema:* ${release}
┃ 🌐 *Hostname:* ${hostname}
┃ 🔧 *CPU:* ${cpuModel} (${cpuCores} núcleos)
┃ 🗂️ *RAM:* ${freeMem} GB libres de ${totalMem} GB
┃ ⏳ *Uptime Sistema:* ${uptime}
┃ 🤖 *Uptime Bot:* ${botUptime}
╰━━━━━━━━━━━━━━━━━━━╯
    `.trim();

    conn.sendMessage(m.chat, { text: result, edit: sentMsg.key }, { quoted: m });
};

function formatUptime(seconds) {
    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds %= 24 * 60 * 60;
    const hours = Math.floor(seconds / (60 * 60));
    seconds %= 60 * 60;
    const minutes = Math.floor(seconds / 60);

    return `${days}d ${hours}h ${minutes}m`;
}

handler.help = ['ping', 'info'];
handler.tags = ['main', 'info'];
handler.command = ['ping', 'p', 'speed', 'info'];

export default handler;


/*import speed from 'performance-now'
import { spawn, exec, execSync } from 'child_process'

let handler = async (m, { conn }) => {
  let timestamp = speed()
  let sentMsg = await conn.reply(m.chat, '❐ Calculando ping...', m)
  let latency = speed() - timestamp

  exec(`neofetch --stdout`, (error, stdout, stderr) => {
    let child = stdout.toString("utf-8")
    let ssd = child.replace(/Memory:/, "Ram:")

    let result = `✩ *¡Pong!*\n> *_✦ Tiempo ${latency.toFixed(4).split(".")[0]}ms_*\n${ssd}`
    conn.sendMessage(m.chat, { text: result, ...rcanal, edit: sentMsg.key }, { quoted: m })
  })
}

handler.help = ['ping']
handler.tags = ['informacion']
handler.command = ['ping', 'p']

export default handler*/
