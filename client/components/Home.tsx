import Store from './Store'
import Leaderboard from './Leaderboard'
import MainMenu from './MainMenu'
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

  const handleStart = () => {
    dispatch(startGame())
    dispatch(setDisplay('none'))
  }
  const handleShopButton = () => {
    dispatch(setDisplay('shop'))
  }
  const handleLeaderboardButton = () => {
    dispatch(setDisplay('leaderboard'))
  }

  function updateViewToRender(view: string) {
    dispatch(setDisplay('view'))
  }

  function getViewToRender() {
    switch (gameState.display) {
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
        return <Leaderboard />

      default:
        return null
    }
  }
  return <div>{getViewToRender()}</div>
}

export default Home
