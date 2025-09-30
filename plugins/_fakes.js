import pkg from '@whiskeysockets/baileys'
import fs from 'fs'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = pkg

var handler = m => m
handler.all = async function (m) { 
  global.canalIdM = ["120363403739366547@newsletter", "120363403739366547@newsletter"]
  global.canalNombreM = ["Support isagi 🦖", "isagi 𝗖𝗛𝗡𝗟︎"]
  global.channelRD = await getRandomChannel()

  global.d = new Date(new Date + 3600000)
  global.locale = 'es'
  global.dia = d.toLocaleDateString(locale, { weekday: 'long' })
  global.fecha = d.toLocaleDateString('es', { day: 'numeric', month: 'numeric', year: 'numeric' })
  global.mes = d.toLocaleDateString('es', { month: 'long' })
  global.año = d.toLocaleDateString('es', { year: 'numeric' })
  global.tiempo = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })

  var canal = 'https://whatsapp.com/channel/0029Vb71nqg0AgW2Lehkye2p'  
  var comunidad = 'https://chat.whatsapp.com/L9UyXG5Oh7UEP1wMF3UjHL?mode=ems_copy_c'
  var git = 'https://github.com/'
  var github = 'https://github.com/' 
  var correo = 'minexdt@gmail.com'
  global.redes = pickRandom([canal, comunidad, git, github, correo])

  global.nombre = m.pushName || 'Anónimo'
  global.packsticker = `〄 𝗦𝗧𝗜𝗖𝗞𝗘𝗥𝗦\n✩ᩚ Usuario » ${nombre}\n✦ Bot » ${botname}`
  global.packsticker2 = `\n\n${dev}`
  
  
  global.rcanal = { 
    key: { 
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
      id: "Halo",
      forwardingScore: 999,
      isForwarded: true
    }
  }
}

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

async function getRandomChannel() {
  let randomIndex = Math.floor(Math.random() * global.canalIdM.length)
  let id = global.canalIdM[randomIndex]
  let name = global.canalNombreM[randomIndex]
  return { id, name }
}
