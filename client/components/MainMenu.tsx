interface StartProps {
  onStart: () => void
  onShopButton: () => void
  onLeaderboardButton: () => void
}

function MainMenu(props: StartProps) {
  const handleStartClick = () => {
    props.onStart()
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
            <button className="leaderBoard" onClick={handleLeaderboardButton}>
              Leader Board
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MainMenu
