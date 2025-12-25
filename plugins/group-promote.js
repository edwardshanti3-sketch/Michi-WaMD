var handler = async (m, { conn, usedPrefix, isAdmin }) => {
  // 🔒 Solo admins pueden usar el comando
  if (!isAdmin) {
    return conn.reply(
      m.chat,
      '⛔ Solo los administradores pueden usar este comando.',
      m
    )
  }

  let user =
    m.mentionedJid?.[0] ||
    (m.quoted ? m.quoted.sender : null)

  if (!user) {
    return conn.reply(
      m.chat,
      '✎ Debes mencionar a un usuario o responder a su mensaje para promoverlo a administrador.',
      m
    )
  }

  try {
    const groupInfo = await conn.groupMetadata(m.chat)

    const participant = groupInfo.participants.find(p => p.id === user)

    if (!participant) {
      return conn.reply(
        m.chat,
        '⚠️ El usuario no está en el grupo.',
        m
      )
    }

    if (participant.admin) {
      return conn.reply(
        m.chat,
        '> El usuario mencionado ya tiene privilegios de administrador.',
        m
      )
    }

    // 🚀 PROMOVER
    await conn.groupParticipantsUpdate(m.chat, [user], 'promote')

    // 📛 Nombre del que ejecutó el comando
    let authorName = await conn.getName(m.sender)

    // 👑 MENSAJE FINAL
    await conn.sendMessage(
      m.chat,
      {
        text:
          `ꕥ 𝗠𝗶 𝗮𝗺𝗼 𝗗𝗶𝗼𝗻𝗲𝗯𝗶-𝘀𝗮𝗺𝗮 𝗵𝗮 𝗱𝗲𝗰𝗶𝗱𝗶𝗱𝗼 𝗱𝗮𝗿𝘁𝗲 𝗮𝗱𝗺𝗶𝗻 👑\n\n` +
          `✦ Usuario: @${user.split('@')[0]}\n` +
          `✦ Acción realizada por: ${authorName}`,
        mentions: [user]
      },
      { quoted: m }
    )

  } catch (e) {
    conn.reply(
      m.chat,
      `⚠︎ Se ha producido un problema.\n> Usa *${usedPrefix}report* para informarlo.`,
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