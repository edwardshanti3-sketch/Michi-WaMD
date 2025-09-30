import { watchFile, unwatchFile } from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"
import fs from "fs"

global.botNumber = "" 

global.owner = [
// ZONA DE JIDS
["50499605089", "Isagi </>", true],
["51956931649"],
[""],  
// ZONA DE LIDS
["", "", true], 
["", "", true]
]

global.mods = []
global.suittag = ["50499605089"] 
global.prems = []


global.libreria = "Baileys Multi Device"
global.vs = "^1.3.2"
global.nameqr = "Goku"
global.sessions = "Sessions/Principal"
global.jadi = "Sessions/SubBot"
global.MichiJadibts = true
global.enableRcanal = true

global.botname = "Goku - 𝖡𝗈𝗍Saiyan"
global.textbot = "ᴍɪᴄʜɪ ᴠ3, 𝗔𝗱𝗼"
global.dev = "✎ ⍴᥆ᥕᥱrᥱძ ᑲᥡ isagi"
global.author = "© mᥲძᥱ ᥕі𝗍һ isagi"
global.etiqueta = "isagi | 𝟤𝟢𝟤𝟧 ©"
global.currency = "$ sagicoins"
global.michipg = "https://files.catbox.moe/p2eq60.jpg"
global.icono = "https://files.catbox.moe/dnjyto.jpg"
global.catalogo = fs.readFileSync('./lib/catalogo.jpg')


global.group = "https://chat.whatsapp.com/L9UyXG5Oh7UEP1wMF3UjHL?mode=ems_copy_c"
global.community = ""
global.channel = "https://whatsapp.com/channel/0029Vb71nqg0AgW2Lehkye2p"
global.github = "https://github.com"
global.gmail = "minexdt@gmail.com"
global.ch = {
ch1: "120363420941524030@newsletter"
}


global.APIs = {
vreden: { url: "https://api.vreden.web.id", key: null },
delirius: { url: "https://api.delirius.store", key: null },
zenzxz: { url: "https://api.zenzxz.my.id", key: null },
siputzx: { url: "https://api.siputzx.my.id", key: null },
adonix: { url: "https://api-adonix.ultraplus.click", key: null }
}


let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
unwatchFile(file)
console.log(chalk.redBright("Update 'settings.js'"))
import(`${file}?update=${Date.now()}`)
})
