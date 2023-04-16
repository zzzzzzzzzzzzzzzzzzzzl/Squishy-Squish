import { combineReducers } from '@reduxjs/toolkit'
import gameReducer from './gameSlice'

export default combineReducers({
  game: gameReducer,
})
