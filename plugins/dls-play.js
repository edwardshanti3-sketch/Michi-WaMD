import fetch from "node-fetch";
import yts from "yt-search";

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text?.trim()) return m.reply(`❀ Ingresa un link de YouTube o texto\n> Ejemplo: ${usedPrefix + command} ozuna`);

  try {
    let url = text.match(/(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/\S+/gi)?.[0];
    let results;

    if (!url) {
      let search = await yts(text);
      if (!search?.all || search.all.length === 0) return m.reply('❀ No se encontraron resultados.');
      results = search.all[0];
      url = results.url;
    } else {
      results = { title: 'Audio/Video', url };
    }

    let infoTxt = `「✦」Downloading *${results.title}*\n\n`;
    if (results.author?.name) infoTxt += `> ✿ Canal: *${results.author.name}*\n`;
    if (results.views) infoTxt += `> ✰ Vistas: *${results.views.toLocaleString()}*\n`;
    if (results.timestamp) infoTxt += `> ⴵ Duración: *${results.timestamp}*\n`;
    if (results.ago) infoTxt += `> ✐ Publicado: *${results.ago}*\n`;
    infoTxt += `> 🜸 Url: ${url}`;

    await conn.sendMessage(m.chat, { image: { url: results.thumbnail }, caption: infoTxt }, { quoted: m });

    await m.react('🕒');

    let endpoint;
    if (command === 'play' || command === 'ytmp3') {
      endpoint = `https://api-adonix.ultraplus.click/download/ytmp3?apikey=Adofreekey&url=${encodeURIComponent(url)}`;
    } else if (command === 'play2' || command === 'ytmp4') {
      endpoint = `https://api-adonix.ultraplus.click/download/ytmp4?apikey=Adofreekey&url=${encodeURIComponent(url)}`;
    }

    const resText = await fetch(endpoint, { method: 'GET', redirect: 'follow' }).then(r => r.text());
    console.log('[INFO] Respuesta API completa:', resText);

    const dataUrl = JSON.parse(resText)?.data?.url;
    if (!dataUrl) return m.reply(' No se pudo descargar el contenido.');

    if (command === 'play' || command === 'ytmp3') {
      await conn.sendMessage(m.chat, {
        audio: { url: dataUrl },
        mimetype: 'audio/mpeg',
        fileName: `${results.title || 'audio'}.mp3`,
        ptt: false
      }, { quoted: m });
    } else if (command === 'play2' || command === 'ytmp4') {
      await conn.sendMessage(m.chat, {
        video: { url: dataUrl },
        mimetype: 'video/mp4',
        fileName: `${results.title || 'video'}.mp4`
      }, { quoted: m });
    }

    await m.react('✔️');

  } catch (err) {
    console.error('[ERROR]', err);
    await m.react('✖️');
    m.reply(`⚠ Se produjo un error al obtener el contenido\n${err.message || err}`);
  }
};

handler.command = ['play', 'ytmp3', 'play2', 'ytmp4'];
handler.help = ['play', 'ytmp3', 'play2', 'ytmp4'];
handler.tags = ['descargas'];

export default handler;
