import { useAppSelector } from '../hooks'

function Armour({ initialArmour = 1 }) {
  const armour = useAppSelector((state) => state.inventory.armour)

  return (
    <>
      {Array.from({ length: armour }, (_, i) => (
        <img
          key={i}
          className={`armour-overlay armour-overlay${i}`}
          src="assests/game-UI/armour.png"
          alt="armour"
        />
      ))}
    </>
  )
}

export default Armour
