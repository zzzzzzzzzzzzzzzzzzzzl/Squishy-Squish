import { useState } from 'react'

function Home() {
  return (
    <div className="menu-overlay">
      <ul className="menu">
        <li>
          <button>Start</button>
        </li>
        <li>
          <button>Shop</button>
        </li>
        <li>
          <button>LeaderBoard</button>
        </li>
      </ul>
    </div>
  )
}

export default Home
