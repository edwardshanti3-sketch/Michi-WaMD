import { generateWAMessageFromContent, proto } from '@whiskeysockets/baileys'

let handler = async (m, { conn }) => {
    try {
        // Mensaje con link directo al grupo
        const message = {
            templateMessage: {
                hydratedTemplate: {
                    hydratedContentText: '¡Únete a nuestro grupo wey! 🎉',
                    locationMessage: { 
                        jpegThumbnail: null 
                    },
                    hydratedFooterText: 'Shadow Group',
                    hydratedButtons: [
                        {
                            urlButton: {
                                displayText: 'Unirme al grupo',
                                url: 'https://chat.whatsapp.com/DJcUWCf08sDGFcMKiap0mr?mode=ems_copy_t'
                            }
                        }
                    ]
                }
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
