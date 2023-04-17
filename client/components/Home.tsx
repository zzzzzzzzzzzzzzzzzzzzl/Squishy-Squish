import Store from './Store'
import Leaderboard from './Leaderboard'
import MainMenu from './MainMenu'
import { useState } from 'react'
import { useAppDispatch } from '../hooks'
import { startGame } from '../slices/gameSlice'

interface StartProps {
  onStart: () => void
  onShopButton: () => void
  onLeaderboardButton: () => void
}

function Home(props: StartProps) {
  const dispatch = useAppDispatch()
  const [viewToRender, setViewToRender] = useState('home')

  // const handleStartClick = () => {
  //   props.onStart()
  //   dispatch(startGame())

  const handleStart = () => {
    // props.onStart()
    dispatch(startGame())
    setViewToRender('start') // hide Home component when Start button is clicked
  }
  const handleShopButton = () => {
    setViewToRender('shop')
  }
  const handleLeaderboardButton = () => {
    setViewToRender('leaderboard')
  }

  function updateViewToRender(view: string) {
    setViewToRender(view)
  }

  function getViewToRender() {
    switch (viewToRender) {
      case 'home':
        return (
          <MainMenu
            onStart={handleStart}
            onShopButton={handleShopButton}
            onLeaderboardButton={handleLeaderboardButton}
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
