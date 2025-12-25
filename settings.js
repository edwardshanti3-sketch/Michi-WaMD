import { watchFile, unwatchFile } from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"
import fs from "fs"

global.botNumber = "" 

global.owner = [
// ZONA DE JIDS
["50432788804", "Dionebi-sama </>", true],
["50432788804"],
[""],  
// ZONA DE LIDS
["", "", true], 
["", "", true]
]

global.mods = []
global.suittag = ["50432788804"] 
global.prems = []


global.libreria = "Baileys Multi Device"
global.vs = "^1.3.2"
global.nameqr = "si ying"
global.sessions = "Sessions/Principal"
global.jadi = "Sessions/SubBot"
global.MichiJadibts = true
global.enableRcanal = true

global.botname = "Si ying - 🌸"
global.textbot = "si ying ᴠ3, Dionebi-sama"
global.dev = "✎ ⍴᥆ᥕᥱrᥱძ ᑲᥡ Dionebi-sama"
global.author = "© mᥲძᥱ ᥕі𝗍һ Dionebi-sama"
global.etiqueta = "dionebi-sama | 𝟤𝟢𝟤𝟧 ©"
global.currency = "$ siyings"
global.michipg = "https://files.catbox.moe/p2eq60.jpg"
global.icono = "https://files.catbox.moe/dnjyto.jpg"
global.catalogo = fs.readFileSync('./lib/catalogo.jpg')


global.group = "https://chat.whatsapp.com/LTdquaIwk9sEz66D1u0kNh"
global.community = "https://chat.whatsapp.com/HbnT0v3LLpwEX4LH0yis3j"
global.channel = "https://whatsapp.com/channel/0029Vb6ygDELo4hpelb24M01"
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
