import { useState } from 'react'

interface HomeProps {
  onStart: () => void
}

function Home(props: HomeProps) {
  const handleStartClick = () => {
    props.onStart()
  }

  return (
    <div className="menu-overlay">
      <div className="border">
        <ul className="menu">
          <li>
            <button onClick={handleStartClick}>Start</button>
          </li>
          <li>
            <button>Shop</button>
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
