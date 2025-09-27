import axios from "axios"

let handler = async (m, { conn, text }) => {
  if (!text) throw `👉 Escribe el nombre del server\nEjemplo: .crearserver MiServer`

  try {
    const config = {
      panelUrl: "https://tupanel.com",
      apiKey: "TU_ADMIN_API_KEY"
    }

    const userId = 1
    const eggId = 5
    const dockerImage = "node:18-alpine"
    const startup = "npm start"
    const allocationId = 10

    const limits = {
      memory: 755,
      disk: 765,
      cpu: 0
    }

    const data = {
      name: text,
      user: userId,
      egg: eggId,
      docker_image: dockerImage,
      startup: startup,
      environment: {
        STARTUP_CMD: startup
      },
      limits: {
        memory: limits.memory,
        swap: 0,
        disk: limits.disk,
        io: 500,
        cpu: limits.cpu
      },
      feature_limits: {
        databases: 1,
        backups: 1,
        allocations: 1
      },
      allocation: {
        default: allocationId
      }
    }

    const res = await axios.post(`${config.panelUrl}/api/application/servers`, data, {
      headers: {
        "Authorization": `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })

    await m.reply(`✅ Servidor creado correctamente\n📦 Nombre: *${text}*\n💾 RAM: ${limits.memory} MB\n📂 Disco: ${limits.disk} MB\n⚡ CPU: ${limits.cpu === 0 ? "Ilimitado" : limits.cpu + "%"}`)
  } catch (e) {
    console.error(e.response?.data || e.message)
    throw `❌ Error creando el server\n${e.response?.data?.errors?.[0]?.detail || e.message}`
  }
}

handler.command = ["crearserver"]

export default handler
