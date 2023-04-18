// WARNING: this file is only a guide! not to be used as part of the challenge!
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
// import UpdateTodoComponent from '../components/UpdateTodoComponent'

interface InitialState {
  intialState: string[]
}

// {id:id,task:input,done:false}
const sampleData = { jumpHeight: 8, speed: 1, lives: 1, armour: 0 }

// where our business logic goes
export const inventorySlice = createSlice({
  name: 'game',
  initialState: sampleData,

  reducers: {
    test: (state, action) => {
      console.log(action.payload, 'here')
      const newState = state
      newState.lives = action.payload
      // newState.dead = true
      return newState
    },
    increaseJumpHeight: (state) => {
      const newState = { ...state }
      newState.jumpHeight += 4
      return newState
    },
    increaseSpeed: (state) => {
      const newState = { ...state }
      newState.speed += 1
      return newState
    },
    increaseLives: (state) => {
      const newState = { ...state }
      newState.lives += 1
      return newState
    },
    increaseArmour: (state) => {
      const newState = { ...state }
      newState.armour += 1
      return newState
    },
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
} = inventorySlice.actions

// the reducer to be used in store.js
export default inventorySlice.reducer
