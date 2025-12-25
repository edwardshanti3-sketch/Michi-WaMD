var handler = async (m, { conn, usedPrefix }) => {
  const text = m.text || ''
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

  let user = m.mentionedJid?.[0]

  // 🔎 FALLBACK: buscar por nombre (@~Nombre)
  if (!user) {
    const name = text.split('@')[1]
    if (name) {
      const found = groupInfo.participants.find(p =>
        (p.notify || '')
          .toLowerCase()
          .includes(name.toLowerCase())
      )
      if (found) user = found.id
    }
  }

  if (!user) {
    return conn.reply(
      m.chat,
      '✎ Uso correcto:\n\n' +
      '➤ .promote @usuario\n\n' +
      '⚠️ Asegúrate de mencionar a alguien del grupo.',
      m
    )
  }

  const participant = groupInfo.participants.find(
    p => p.id === user
  )

  if (!participant) {
    return conn.reply(
      m.chat,
      '⚠︎ El usuario no pertenece a este grupo.',
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

  // 🚀 PROMOVER
  await conn.groupParticipantsUpdate(m.chat, [user], 'promote')

  // 👑 MENSAJE FINAL
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
}

handler.help = ['promote']
handler.tags = ['grupo']
handler.command = ['promote', 'promover']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler