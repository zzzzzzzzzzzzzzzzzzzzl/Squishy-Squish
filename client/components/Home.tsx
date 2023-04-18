import Store from './Store'
import Leaderboard from './Leaderboard'
import MainMenu from './MainMenu'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { setDisplay, startGame } from '../slices/gameSlice'

interface StartProps {
  onStart: () => void
  onShopButton: () => void
  onLeaderboardButton: () => void
  onReset: () => void
}

function Home() {
  const gameState = useAppSelector((state) => state.game)
  const dispatch = useAppDispatch()

  // const [viewToRender, setViewToRender] = useState('home')

  // const handleStartClick = () => {
  //   props.onStart()
  //   dispatch(startGame())

  const handleStart = () => {
    // props.onStart()
    dispatch(startGame())
    dispatch(setDisplay('none'))
    // setViewToRender('start') // hide Home component when Start button is clicked
  }
  const handleShopButton = () => {
    dispatch(setDisplay('shop'))
    // setViewToRender('shop')
  }
  const handleLeaderboardButton = () => {
    dispatch(setDisplay('leaderboard'))
    // setViewToRender('leaderboard')
  }

  function updateViewToRender(view: string) {
    dispatch(setDisplay('view'))
    // setViewToRender(view)
  }
  // const handleResetView = () => {
  //   setViewToRender('shop')
  // }

  function getViewToRender() {
    switch (gameState.display) {
      case 'home':
        return (
          <MainMenu
            onStart={handleStart}
            onShopButton={handleShopButton}
            onLeaderboardButton={handleLeaderboardButton}
            // onReset={handleResetView}
          />
        )

      case 'shop':
        return <Store updateViewToRender={updateViewToRender} />

      case 'leaderboard':
        return <Leaderboard updateViewToRender={updateViewToRender} />

      default:
        return null
    }
  }

  return <div>{getViewToRender()}</div>
}

export default Home
