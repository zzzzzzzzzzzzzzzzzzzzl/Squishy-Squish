import items from '../shopItems'
import Message from './Message'
import { clearLocalStorage } from '../localPlayerData'
import { useState } from 'react'
import { useAppDispatch } from '../hooks'
import {
  increaseArmour,
  increaseJumpHeight,
  increaseLives,
  increaseSpeed,
  playerCurrency,
  resetInventory,
} from '../slices/inventorySlice'
import { useAppSelector } from '../hooks'
import { setDisplay } from '../slices/gameSlice'

interface ShopItem {
  id: number
  name: string
  price: number
  power: number
  value: number
  image: string
}

interface Props {
  updateViewToRender: (view: string) => void
}

function Store(props: Props) {
  const [message, setMessage] = useState('')

  const dispatch = useAppDispatch()
  // const [viewToRender, setViewToRender] = useState('home')
  const jump = useAppSelector((state) => state.inventory.jumpHeight)
  const speed = useAppSelector((state) => state.inventory.movementSpeed)
  const lives = useAppSelector((state) => state.inventory.lives)
  const armour = useAppSelector((state) => state.inventory.armour)
  const currency = useAppSelector((state) => state.inventory.currency)

  const handleReturnButton = () => {
    dispatch(setDisplay('home'))
  }

  function resetPlayerButton() {
    clearLocalStorage()
    setMessage(`Your stats have been reset!`)
    dispatch(resetInventory())
    dispatch(setDisplay('home'))
  }

  function handleItemDoubleClick(item: ShopItem) {
    if (currency >= item.price) {
      const updateCurrency = currency - item.price
      // dispatch(playerCurrency(updateCurrency))

      // dispatch the appropriate action based on the item id
      switch (item.id) {
        case 1:
          if (jump >= 20) {
            setMessage(`Sorry, You have maxed out this skill`)
          } else {
            dispatch(playerCurrency(updateCurrency))
            dispatch(increaseJumpHeight())
            setMessage(`Purchased!`)
          }
          break
        case 2:
          if (speed >= 1) {
            setMessage(`Sorry, You have maxed out this skill`)
          } else {
            dispatch(playerCurrency(updateCurrency))
            dispatch(increaseSpeed())
            setMessage(`Purchased!`)
          }
          break
        case 3:
          if (lives >= 3) {
            setMessage(`Sorry, You have maxed out this skill`)
          } else {
            dispatch(playerCurrency(updateCurrency))
            dispatch(increaseLives())
            setMessage(`Purchased!`)
          }
          break
        case 4:
          if (armour >= 3) {
            setMessage(`Sorry, You have maxed out this skill`)
          } else {
            dispatch(playerCurrency(updateCurrency))
            dispatch(increaseArmour())
            setMessage(`Purchased!`)
          }
          break
        default:
          break
      }
    } else {
      setMessage(`You're too poor bro`)
    }
  }

  return (
    <div className="menu-overlay">
      <div className="view store-listing">
        <img
          className="return-button"
          src="/assests/main-menu/return-button.png"
          onClick={handleReturnButton}
          alt="return button"
        />
        <br></br>
        <h2 className="menu-heading">Shop</h2>
        <br></br>
        <p className="currency-display">Current Rations: &#10084; {currency}</p>
        <br></br>
        {items.map((item) => (
          <div className="item-container" key={item.id}>
            <p className="item-name">{item.name}</p>
            <img
              className="item-image"
              alt=""
              src={item.image}
              onDoubleClick={() => handleItemDoubleClick(item)}
            />
            <p className="item-cost"> &#10084; {item.price} </p>
          </div>
        ))}

        <div className="reset-button" onDoubleClick={resetPlayerButton}>
          Reset Player
        </div>
      </div>
      {message && <Message message={message} onClose={() => setMessage('')} />}
    </div>
  )
}

export default Store
