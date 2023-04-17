import { useAppDispatch } from '../hooks'
import { startGame } from '../slices/gameSlice'

interface StartProps {
  onStart: () => void
  onShopButton: () => void
  onLeaderboardButton: () => void
}

function Home(props: StartProps) {
  const dispatch = useAppDispatch()

  const handleStartClick = () => {
    props.onStart()
    dispatch(startGame())
  }

  const handleShopButton = () => {
    props.onShopButton()
  }
  const handleLeaderboardButton = () => {
    props.onLeaderboardButton()
  }

  return (
    <div className="menu-overlay">
      <div className="border">
        <ul className="menu">
          <li>
            <button onClick={handleStartClick}>Start</button>
          </li>
          <li>
            <button onClick={handleShopButton}>Shop</button>
          </li>
          <li>
            <button onClick={handleLeaderboardButton}>LeaderBoard</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Home
