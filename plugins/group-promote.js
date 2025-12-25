var handler = async (m, { conn, usedPrefix }) => {

  // ❌ Bloquear mensajes reenviados
  if (m.isForwarded) {
    return conn.reply(
      m.chat,
      '⛔ No puedes usar este comando en mensajes reenviados.\n\n' +
      '✔️ Escribe el comando DIRECTAMENTE en el grupo.\n' +
      '✔️ Menciona usando la lista de WhatsApp.',
      m
    )
  }

  // ✅ Mención real
  let user = m.mentionedJid?.[0]

  if (!user) {
    return conn.reply(
      m.chat,
      '✎ Uso correcto:\n\n' +
      '➤ .promote @usuario\n\n' +
      '⚠️ Debes seleccionar el contacto desde WhatsApp.\n' +
      '❌ No alias (@~nombre)\n' +
      '❌ No reenviados\n' +
      '❌ No canales',
      m
    )
  }

  try {
    const groupInfo = await conn.groupMetadata(m.chat)

    const owner =
      groupInfo.owner ||
      m.chat.split('-')[0] + '@s.whatsapp.net'

    // 🔒 Solo creador
    if (m.sender !== owner) {
      return conn.reply(
        m.chat,
        '⛔ Este comando solo puede ser usado por el creador del grupo.',
        m
      )
    }

    const participant = groupInfo.participants.find(
      p => p.id === user
    )

    if (!participant) {
      return conn.reply(
        m.chat,
        '⚠️ El usuario no pertenece a este grupo.',
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
      `⚠️ Error interno.\n> Usa *${usedPrefix}report* para informarlo.`,
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