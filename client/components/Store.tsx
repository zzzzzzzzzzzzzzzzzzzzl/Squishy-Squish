import items from '../shopItems'
import { loadPlayerData, savePlayerData } from '../localPlayerData'
import { useState } from 'react'
import { useAppDispatch } from '../hooks'
import {
  increaseArmour,
  increaseJumpHeight,
  increaseLives,
  increaseSpeed,
} from '../slices/inventorySlice'
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
  const { playerinfo, stats } = loadPlayerData()
  const dispatch = useAppDispatch()
  // const [viewToRender, setViewToRender] = useState('home')

  const handleReturnButton = () => {
    dispatch(setDisplay('home'))
  }

  function handleItemDoubleClick(item: ShopItem) {
    if (playerinfo.currency >= item.price) {
      const updatePlayerInfo = {
        ...playerinfo,
        currency: playerinfo.currency - item.price,
      }
      const updatePlayerStats = {
        ...stats,
      }
      savePlayerData(updatePlayerInfo, updatePlayerStats)

      // dispatch the appropriate action based on the item id
      switch (item.id) {
        case 1:
          dispatch(increaseJumpHeight())
          break
        case 2:
          dispatch(increaseSpeed())
          break
        case 3:
          dispatch(increaseLives())
          break
        case 4:
          dispatch(increaseArmour())
          break
        default:
          break
      }

      alert(`Purchased!`)
    } else {
      alert(`Your poor bro`)
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
        <p className="currency-display">
          Current Rations: &#10084; {playerinfo.currency}
        </p>
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
      </div>
    </div>
  )
}

export default Store
