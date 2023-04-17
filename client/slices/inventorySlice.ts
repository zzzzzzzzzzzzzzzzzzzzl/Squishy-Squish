// WARNING: this file is only a guide! not to be used as part of the challenge!
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import UpdateTodoComponent from '../components/UpdateTodoComponent'

const initialState: string[] = []

// {id:id,task:input,done:false}
const sampleData = { score: 0, dead: false }

// where our business logic goes
export const inventorySlice = createSlice({
  name: 'game',
  initialState: sampleData,

  reducers: {
    test: (state, action) => {
      console.log(action.payload, 'here')
      const newState = state
      newState.score = action.payload
      newState.dead = true
      return newState
    },
  },
})

// a selector to be used as: const example = useSelector(exampleSelector)
export const gameSelector = (state: RootState) => state.example

// actions to be dispatched using dispatch(exampleAddToArray({ example: 'hi' }))
export const { test } = inventorySlice.actions

// the reducer to be used in store.js
export default inventorySlice.reducer
