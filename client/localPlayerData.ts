// Define types for the player's currency and stats
interface PlayerData {
  playerinfo: {
    username: string
    score: number
    currency: number
  }
  stats: {
    movementspeed: number
    jumpheight: number
    lives: number
    armour: number
  }
}

// Function to save the player's data to Local Storage
function savePlayerData(
  playerinfo: PlayerData['playerinfo'],
  stats: PlayerData['stats']
) {
  localStorage.setItem('playerinfo', JSON.stringify(playerinfo))
  localStorage.setItem('stats', JSON.stringify(stats))
}

// Function to load the player's data from Local Storage
function loadPlayerData(): PlayerData {
  const playerinfo = JSON.parse(localStorage.getItem('playerinfo') || '{}')
  const stats = JSON.parse(localStorage.getItem('stats') || '{}')
  return { playerinfo, stats }
}

// Usage example
const newPlayerInfo = { username: '', score: 0, currency: 2000 }
const newStats = { movementspeed: 1, jumpheight: 1, lives: 1, armour: 0 }

savePlayerData(newPlayerInfo, newStats)

const { playerinfo, stats } = loadPlayerData()

console.log(playerinfo) // 100
console.log(stats) // { level: 5, experience: 500 }

export { loadPlayerData, savePlayerData }
