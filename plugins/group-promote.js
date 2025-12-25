var handler = async (m, { conn, text, usedPrefix }) => {

  // 👑 Número autorizado (Honduras)
  const OWNER_NUMBER = '32788804@s.whatsapp.net'

  // 🔒 Solo ese número puede usar el comando
  if (m.sender !== OWNER_NUMBER) {
    return conn.reply(
      m.chat,
      '⛔ No tienes permiso para usar este comando.',
      m
    )
  }

  if (!text) {
    return conn.reply(
      m.chat,
      `✎ Uso correcto:\n\n` +
      `${usedPrefix}promote 32788804\n\n` +
      `⚠️ Escribe solo el número, sin + ni espacios.`,
      m
    )
  }

  // 📞 Limpiar número
  let number = text.replace(/[^0-9]/g, '')
  let user = number + '@s.whatsapp.net'

  try {
    const groupInfo = await conn.groupMetadata(m.chat)

    const participant = groupInfo.participants.find(
      p => p.id === user
    )

    if (!participant) {
      return conn.reply(
        m.chat,
        '⚠︎ El número no está en este grupo.',
        m
      )
    }

    if (participant.admin) {
      return conn.reply(
        m.chat,
        '> Este usuario ya es administrador.',
        m
      )
    }

    // 🚀 PROMOVER
    await conn.groupParticipantsUpdate(m.chat, [user], 'promote')

    // 👑 Mensaje final
    await conn.sendMessage(
      m.chat,
      {
        text:
          `ꕥ 𝗗𝗶𝗼𝗻𝗲𝗯𝗶-𝘀𝗮𝗺𝗮 𝗵𝗮 𝗼𝘁𝗼𝗿𝗴𝗮𝗱𝗼 𝗔𝗗𝗠𝗜𝗡 👑\n\n` +
          `✦ Número: +${number}\n` +
          `✦ Etiqueta: 👑『 開発者 | DEV 』\n\n` +
          `Usa tu poder con honor ⚔️`,
        mentions: [user]
      },
      { quoted: m }
    )

  } catch (e) {
    conn.reply(
      m.chat,
      `⚠︎ Error inesperado.\n> Usa *${usedPrefix}report* para reportarlo.`,
      m
    )
  }
}

handler.help = ['promote <numero>']
handler.tags = ['grupo']
handler.command = ['promote', 'promover']
handler.group = true
handler.botAdmin = true

export default handler