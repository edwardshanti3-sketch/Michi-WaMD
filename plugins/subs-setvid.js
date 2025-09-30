import fs from "fs"
import path from "path"
import fetch from "node-fetch"
import FormData from "form-data"

async function uploadToCatbox(content, filename) {
  const form = new FormData()
  form.append("reqtype", "fileupload")
  form.append("fileToUpload", content, filename)

  const res = await fetch("https://catbox.moe/user/api.php", {
    method: "POST",
    body: form
  })

  const text = await res.text()
  if (!text || !text.startsWith("https://")) throw new Error("❌ Error al subir el video a Catbox.")
  return text
}

const handler = async (m, { conn, command }) => {
  try {
    const senderNumber = m.sender.replace(/[^0-9]/g, "")
    let configPath

    // si es subbot
    const botPath = path.join("./Sessions/SubBot", senderNumber)
    if (fs.existsSync(botPath)) {
      configPath = path.join(botPath, "config.json")
    } else {
      // si es bot principal
      configPath = path.join("./Sessions", "config.json")
    }

    const q = m.quoted || m
    const mime = (q.msg || q).mimetype || q.mediaType || ""

    if (!mime || !/video\/(mp4|mkv|mov)/.test(mime)) {
      return conn.sendMessage(m.chat, {
        text: `❐ Por favor, responde a un 🎞️ *video válido* (MP4, MKV, MOV) usando *.${command}*`,
      }, { quoted: m })
    }

    await conn.sendMessage(m.chat, { react: { text: "🕓", key: m.key } })

    const media = await q.download()
    if (!media) throw new Error("❌ No se pudo descargar el video.")

    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${mime.split("/")[1]}`
    const uploadUrl = await uploadToCatbox(media, filename)

    const config = fs.existsSync(configPath)
      ? JSON.parse(fs.readFileSync(configPath))
      : {}
    config.video = uploadUrl
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2))

    await conn.sendMessage(m.chat, {
      text: `✩︎ Video actualizado correctamente:\n${uploadUrl}`,
    }, { quoted: m })

    await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } })

  } catch (err) {
    console.error(err)
    await conn.sendMessage(m.chat, {
      text: "❌ No se pudo subir el video, inténtalo más tarde.",
    }, { quoted: m })
    await conn.sendMessage(m.chat, { react: { text: "✖️", key: m.key } })
  }
}

handler.command = ["setvid","setvideo"]
handler.help = ["setvid"]
handler.tags = ["serbot"]
export default handler