var handler = async (m, { conn, usedPrefix, isAdmin }) => {
  // 🔒 Solo admins
  if (!isAdmin) {
    return conn.reply(
      m.chat,
      '⛔ Solo los *administradores* pueden usar este comando.',
      m
    )
  }

  // 👤 Usuario objetivo
  let user = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null)

  if (!user) {
    return conn.reply(
      m.chat,
      '✎ Debes mencionar a un usuario o responder a su mensaje para promoverlo a administrador.',
      m
    )
  }

  try {
    // 🚀 PROMOVER (sin comprobar participants)
    await conn.groupParticipantsUpdate(m.chat, [user], 'promote')

    // 👑 Nombre del que ejecutó el comando
    let actor = m.sender.split('@')[0]

    // 👑 Mensaje final
    await conn.sendMessage(
      m.chat,
      {
        text:
          `ꕥ 𝗠𝗶 𝗮𝗺𝗼 𝗗𝗶𝗼𝗻𝗲𝗯𝗶-𝘀𝗮𝗺𝗮 𝗵𝗮 𝗱𝗲𝗰𝗶𝗱𝗶𝗱𝗼 𝗱𝗮𝗿𝘁𝗲 𝗮𝗱𝗺𝗶𝗻 👑\n\n` +
          `✦ Usuario: @${user.split('@')[0]}\n` +
          `✦ Acción hecha por: @${actor}\n\n` +
          `Usa tu poder con honor ⚔️`,
        mentions: [user, m.sender]
      },
      { quoted: m }
    )

  } catch (e) {
    conn.reply(
      m.chat,
      `⚠︎ Error al promover.\n> Asegúrate de que el bot sea admin.`,
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