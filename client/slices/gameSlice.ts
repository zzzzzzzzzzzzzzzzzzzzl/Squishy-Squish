// WARNING: this file is only a guide! not to be used as part of the challenge!
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory'

// {id:id,task:input,done:false}
const sampleData = {
  score: 0,
  inputName: false,
  highscore: false,
  start: false,
  reset: false,
  display: 'home', //start home leaderboard shop none
}

// where our business logic goes
export const gameSlice = createSlice({
  name: 'game',
  initialState: sampleData,

  reducers: {
    test: (state, action) => {
      console.log(action.payload, 'here')
      const newState = state
      newState.score = action.payload
      newState.inputName = true
      return newState
    },
    highScore: (state) => {
      const newState = state
      newState.highscore = !newState.highscore
      return newState
    },
    toggleInputName: (state) => {
      const newState = state
      newState.inputName = !newState.inputName
      return newState
    },
    startGame: (state) => {
      const newState = state
      newState.start = !newState.start
      return newState
    },
    resetGame: (state) => {
      const newState = state
      newState.reset = !newState.reset
      return newState
    },
    setDisplay: (state, action) => {
      const newState = state
      newState.display = action.payload
      return newState
    },
  },
})

// a selector to be used as: const example = useSelector(exampleSelector)
export const gameSelector = (state: RootState) => state.game

// actions to be dispatched using dispatch(exampleAddToArray({ example: 'hi' }))
export const {
  test,
  highScore,
  toggleInputName,
  startGame,
  resetGame,
  setDisplay,
} = gameSlice.actions

// the reducer to be used in store.js
export default gameSlice.reducer
