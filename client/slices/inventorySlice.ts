import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { loadPlayerData, savePlayerData } from '../localPlayerData'

const { playerStats } = loadPlayerData()

const newPlayerStats = {
  movementSpeed: 0.8,
  jumpHeight: 10,
  lives: 1,
  armour: 0,
  currency: 10000,
}

const initialState = playerStats
  ? { ...newPlayerStats, ...playerStats }
  : newPlayerStats

// where our business logic goes
const inventorySlice = createSlice({
  name: 'inventory',
  initialState: initialState,
  reducers: {
    increaseJumpHeight: (state) => {
      const newState = { ...state }
      newState.jumpHeight += 2
      savePlayerData({ ...newState })
      return newState
    },
    increaseSpeed: (state) => {
      const newState = { ...state }
      newState.movementSpeed += 0.04
      savePlayerData({ ...newState })
      return newState
    },
    increaseLives: (state) => {
      const newState = { ...state }
      newState.lives += 1
      savePlayerData({ ...newState })
      return newState
    },
    decreaseLives: (state) => {
      const newState = { ...state }
      newState.lives -= 1
      savePlayerData({ ...newState })
      return newState
    },
    increaseArmour: (state) => {
      const newState = { ...state }
      newState.armour += 1
      savePlayerData({ ...newState })
      return newState
    },
    playerCurrency: (state, action) => {
      console.log(action.payload)
      state.currency += action.payload
      savePlayerData({ ...state })
      return state
    },
    resetInventory: () => newPlayerStats,
  },
})

// a selector to be used as: const example = useSelector(exampleSelector)
export const gameSelector = (state: RootState) => state.game

// actions to be dispatched using dispatch(exampleAddToArray({ example: 'hi' }))
export const {
  increaseArmour,
  increaseJumpHeight,
  increaseLives,
  increaseSpeed,
  playerCurrency,
  resetInventory,
  decreaseLives,
} = inventorySlice.actions

// the reducer to be used in store.js
export default inventorySlice.reducer
