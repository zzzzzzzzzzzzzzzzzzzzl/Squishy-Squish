import { combineReducers } from '@reduxjs/toolkit'
import gameReducer from './gameSlice'
import inventoryReducer from './inventorySlice'

export default combineReducers({
  game: gameReducer,
  inventory: inventoryReducer,
})
