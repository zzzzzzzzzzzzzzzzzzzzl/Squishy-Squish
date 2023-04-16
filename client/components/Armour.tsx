import React, { useState } from 'react'

function Armour({ initialArmour = 0 }) {
  const [armour, setArmour] = useState(initialArmour)

  return (
    <>
      {Array.from({ length: armour }, (_, i) => (
        <img
          key={i}
          className={`armour-overlay armour-overlay${i}`}
          src="/images/health.png"
          alt="armour"
        />
      ))}
    </>
  )
}

export default Armour
