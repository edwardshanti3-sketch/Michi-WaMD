import { generateWAMessageFromContent, proto } from '@whiskeysockets/baileys'

let handler = async (m, { conn }) => {
    try {
        // Mensaje tipo "Group Invite" con botón oficial
        const message = {
            groupInviteMessage: {
                inviteCode: 'DJcUWCf08sDGFcMKiap0mr', // código de tu enlace
                groupJid: '120363403646972443@g.us', // JID del grupo
                inviteExpiration: 0, // 0 = sin expiración
                groupName: 'Shadow Group', // nombre que se mostrará en el botón
                caption: '¡Únete a nuestro grupo wey! 🎉',
                jpegThumbnail: null 
            }
        }

        const msg = generateWAMessageFromContent(
            m.chat,
            proto.Message.fromObject(message),
            { quoted: m }
        )

        await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })

    } catch (e) {
        m.reply(`Error: ${e.message}`)
        m.react('✖️')
    }
}

handler.command = ['invitelink', 'grupo', 'linkgrupo']
handler.help = ['invitelink']
handler.tags = ['general']

export default handler
