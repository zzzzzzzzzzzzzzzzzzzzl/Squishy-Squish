// WARNING: this file is only a guide! not to be used as part of the challenge!
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { loadPlayerData, savePlayerData } from '../localPlayerData'
// import UpdateTodoComponent from '../components/UpdateTodoComponent'

// interface InitialState {
//   intialState: string[]
// }

const { playerStats } = loadPlayerData()

const newPlayerStats = {
  movementSpeed: 0.8,
  jumpHeight: 8,
  lives: 1,
  armour: 0,
  currency: 10000,
}

const initialState = playerStats
  ? { ...newPlayerStats, ...playerStats }
  : newPlayerStats

// // {id:id,task:input,done:false}
// const sampleData = { jumpHeight: 8, speed: 0.8, lives: 1, armour: 2 }

// where our business logic goes
const inventorySlice = createSlice({
  name: 'inventory',
  initialState: initialState,
  reducers: {
    increaseJumpHeight: (state) => {
      if (state.jumpHeight >= 20) return state
      const newState = { ...state }
      newState.jumpHeight += 2
      savePlayerData({ ...newState })
      return newState
    },
    increaseSpeed: (state) => {
      if (state.movementSpeed >= 10) return state
      const newState = { ...state }
      newState.movementSpeed += 0.4
      savePlayerData({ ...newState })
      return newState
    },
    increaseLives: (state) => {
      if (state.lives >= 3) return state
      const newState = { ...state }
      newState.lives += 1
      savePlayerData({ ...newState })
      return newState
    },
    increaseArmour: (state) => {
      if (state.armour >= 3) return state
      const newState = { ...state }
      newState.armour += 1
      savePlayerData({ ...newState })
      return newState
    },
    playerCurrency: (state, action) => {
      state.currency = action.payload
      savePlayerData({ ...state })
      return state
    },
    resetInventory: () => initialState,
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
} = inventorySlice.actions

// the reducer to be used in store.js
export default inventorySlice.reducer
