var handler = async (m, { conn, usedPrefix, isAdmin }) => {
  // 🔒 Solo admins pueden usar el comando
  if (!isAdmin) {
    return conn.reply(
      m.chat,
      '⛔ Solo los *administradores* pueden usar este comando.',
      m
    )
  }

  let mentionedJid = m.mentionedJid
  let user = mentionedJid && mentionedJid.length
    ? mentionedJid[0]
    : m.quoted
    ? m.quoted.sender
    : null

  if (!user) {
    return conn.reply(
      m.chat,
      '✎ Debes mencionar a un usuario o responder a su mensaje para promoverlo a administrador.',
      m
    )
  }

  try {
    const groupInfo = await conn.groupMetadata(m.chat)

    // ❌ Si ya es admin
    if (groupInfo.participants.some(p => p.id === user && p.admin)) {
      return conn.reply(
        m.chat,
        '> El usuario mencionado ya tiene privilegios de administrador.',
        m
      )
    }

    // 🚀 Promover
    await conn.groupParticipantsUpdate(m.chat, [user], 'promote')

    // 👑 Mensaje Dionebi-sama
    await conn.reply(
      m.chat,
      'ꕥ 𝗠𝗶 𝗮𝗺𝗼 𝗗𝗶𝗼𝗻𝗲𝗯𝗶-𝘀𝗮𝗺𝗮 𝗵𝗮 𝗱𝗲𝗰𝗶𝗱𝗶𝗱𝗼 𝗱𝗮𝗿𝘁𝗲 𝗮𝗱𝗺𝗶𝗻 👑',
      m,
      { mentions: [user] }
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