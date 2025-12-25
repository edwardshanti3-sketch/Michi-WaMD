var handler = async (m, { conn, usedPrefix }) => {

  // 👑 OWNER FIJO (TU NÚMERO)
  const OWNER = '50432788804@s.whatsapp.net'

  // 🔒 SOLO TÚ PUEDES USARLO
  if (m.sender !== OWNER) {
    return conn.reply(
      m.chat,
      '⛔ No tienes permiso para usar este comando.',
      m
    )
  }

  // ✅ SOLO MENCIÓN REAL
  let user = m.mentionedJid?.[0]

  if (!user) {
    return conn.reply(
      m.chat,
      '✎ Uso correcto:\n\n' +
      '➤ .promote @usuario\n\n' +
      '⚠️ Usa la mención real de WhatsApp.',
      m
    )
  }

  try {
    const groupInfo = await conn.groupMetadata(m.chat)

    const participant = groupInfo.participants.find(
      p => p.id === user
    )

    if (!participant) {
      return conn.reply(
        m.chat,
        '⚠︎ El usuario no está en el grupo.',
        m
      )
    }

    if (participant.admin) {
      return conn.reply(
        m.chat,
        '> El usuario ya es administrador.',
        m
      )
    }

    await conn.groupParticipantsUpdate(m.chat, [user], 'promote')

    await conn.sendMessage(
      m.chat,
      {
        text:
          `ꕥ 𝗗𝗶𝗼𝗻𝗲𝗯𝗶-𝘀𝗮𝗺𝗮 𝗵𝗮 𝗼𝘁𝗼𝗿𝗴𝗮𝗱𝗼 𝗔𝗗𝗠𝗜𝗡 👑\n\n` +
          `✦ Etiqueta: 👑『 開発者 | DEV 』\n` +
          `✦ Usuario: @${user.split('@')[0]}\n\n` +
          `Usa tu poder con honor ⚔️`,
        mentions: [user]
      },
      { quoted: m }
    )

  } catch (e) {
    conn.reply(
      m.chat,
      `⚠︎ Error interno.\n> Usa *${usedPrefix}report* si persiste.`,
      m
    )
  }
}

handler.help = ['promote']
handler.tags = ['grupo']
handler.command = ['promote', 'promover']
handler.group = true
handler.botAdmin = true

export default handler