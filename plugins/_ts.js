let handler = async (m, { conn }) => {
    try {
        const message = {
            text: 'Test? 🎉',
            footer: 'Sxjx',
            templateButtons: [
                { urlButton: { displayText: 'Ir al grupo', url: 'https://chat.whatsapp.com/DJcUWCf08sDGFcMKiap0mr?mode=ems_copy_t' } }
            ]
        }

        await conn.sendMessage(m.chat, message, { quoted: m })
    } catch (e) {
        m.reply(`Error: ${e.message}`)
        m.react('✖️')
    }
}

handler.command = ['invitelink', 'grupo', 'linkgrupo']

export default handler
