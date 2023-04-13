interface StartProps {
  onStart: () => void
  onShopButton: () => void
}

function Home(props: StartProps) {
  const handleStartClick = () => {
    props.onStart()
  }

  const handleShopButton = () => {
    props.onShopButton()
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
            <button>LeaderBoard</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Home
