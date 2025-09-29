import { generateWAMessageFromContent, proto } from '@whiskeysockets/baileys'

let handler = async (m, { conn }) => {
    try {
        const message = {
            groupInviteMessage: {
                inviteCode: 'DJcUWCf08sDGFcMKiap0mr',
                groupJid: '120363403646972443@g.us',
                inviteExpiration: 0,
                groupName: 'Shadow Group',
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
