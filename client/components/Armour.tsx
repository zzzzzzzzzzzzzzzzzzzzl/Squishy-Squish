import React, { useState } from 'react'

function Armour({ initialArmour = 1 }) {
  const [armour, setArmour] = useState(initialArmour)

  return (
    <>
      {Array.from({ length: armour }, (_, i) => (
        <img
          key={i}
          className={`armour-overlay armour-overlay${i}`}
          src="assests/game-UI/lives.png"
          alt="armour"
        />
      ))}
    </>
  )
}

export default Armour
