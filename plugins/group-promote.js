var handler = async (m, { conn, usedPrefix }) => {
  // ✅ SOLO mención real
  let user = m.mentionedJid?.[0]

  if (!user) {
    return conn.reply(
      m.chat,
      '✎ Uso correcto:\n\n' +
      '➤ .promote @usuario\n\n' +
      '⚠️ Debes mencionar usando la lista de WhatsApp.\n' +
      '❌ No responder mensajes\n' +
      '❌ No usar reenviados o canales',
      m
    )
  }

  try {
    const groupInfo = await conn.groupMetadata(m.chat)

    // 👑 Dueño del grupo
    const owner =
      groupInfo.owner ||
      m.chat.split('-')[0] + '@s.whatsapp.net'

    // 🔒 Solo creador
    if (m.sender !== owner) {
      return conn.reply(
        m.chat,
        '⛔ Este comando solo puede ser usado por el *creador del grupo*.',
        m
      )
    }

    const participant = groupInfo.participants.find(
      p => p.id === user
    )

    if (!participant) {
      return conn.reply(
        m.chat,
        '⚠︎ El usuario mencionado no pertenece a este grupo.',
        m
      )
    }

    if (participant.admin) {
      return conn.reply(
        m.chat,
        '> El usuario ya posee rango de administrador.',
        m
      )
    }

    // 🚀 PROMOVER
    await conn.groupParticipantsUpdate(m.chat, [user], 'promote')

    // 👑 MENSAJE CON ETIQUETA
    await conn.sendMessage(
      m.chat,
      {
        text:
          `ꕥ 𝗠𝗶 𝗮𝗺𝗼 𝗗𝗶𝗼𝗻𝗲𝗯𝗶-𝘀𝗮𝗺𝗮 𝗵𝗮 𝗱𝗲𝗰𝗶𝗱𝗶𝗱𝗼 𝗼𝘁𝗼𝗿𝗴𝗮𝗿𝘁𝗲 𝗲𝗹 𝗿𝗮𝗻𝗴𝗼 𝗱𝗲 𝗔𝗗𝗠𝗜𝗡 👑\n\n` +
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
      `⚠︎ Ocurrió un error.\n> Usa *${usedPrefix}report* para informarlo.`,
      m
    )
  }
}

handler.help = ['promote']
handler.tags = ['grupo']
handler.command = ['promote', 'promover']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler