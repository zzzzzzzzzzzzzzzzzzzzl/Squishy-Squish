import React, { useState } from 'react'

function Lives({ initialLives = 3 }) {
  const [lives, setLives] = useState(initialLives)

  return (
    <>
      {Array.from({ length: lives }, (_, i) => (
        <img
          key={i}
          className={`health-overlay health-overlay${i}`}
          src="/images/lives.png"
          alt="health"
        />
      ))}
    </>
  )
}

export default Lives
