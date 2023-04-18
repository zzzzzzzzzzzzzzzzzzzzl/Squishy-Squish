import { useAppSelector } from '../hooks'

function Lives() {
  const lives = useAppSelector((state) => state.inventory.lives)

  return (
    <>
      {Array.from({ length: lives }, (_, i) => (
        <img
          key={i}
          className={`health-overlay health-overlay${i}`}
          src="/assests/game-UI/lives.png"
          alt="health"
        />
      ))}
    </>
  )
}

export default Lives
