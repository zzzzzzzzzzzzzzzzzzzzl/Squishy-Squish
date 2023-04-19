// Define types for the player's currency and stats
interface PlayerData {
  playerStats: {
    // username: string
    // score: number
    currency: number
    movementSpeed: number
    jumpHeight: number
    lives: number
    armour: number
  }
}

// Function to save the player's data to Local Storage
function savePlayerData(playerStats: PlayerData['playerStats']) {
  localStorage.setItem('playerStats', JSON.stringify(playerStats))
}

// Function to load the player's data from Local Storage
function loadPlayerData(): PlayerData {
  const playerStats = JSON.parse(localStorage.getItem('playerStats') || '{}')
  return { playerStats }
}

// Function to clear the player's data from Local Storage
function clearLocalStorage() {
  localStorage.clear()
}


export { loadPlayerData, savePlayerData, clearLocalStorage }
