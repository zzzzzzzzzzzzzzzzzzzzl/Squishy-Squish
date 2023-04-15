import items from '../shopItems'
import { loadPlayerData, savePlayerData } from '../localPlayerData'
import { useState } from 'react'

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
  // const [viewToRender, setViewToRender] = useState('home')

  const handleReturnButton = () => {
    props.updateViewToRender('home')
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
      alert(`Purchased!`)
    } else alert(`Your poor bro`)
  }

  return (
    <div className="menu-overlay">
      <div className="store-listing">
        <img
          className="return-button"
          src="/images/return-button.png"
          onClick={handleReturnButton}
          alt="return button"
        />
        <br></br>
        <h2 className="menu-heading">Shop</h2>
        <br></br>
        <p>Current currency: ${playerinfo.currency}</p>
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
            <p className="item-cost">${item.price} </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Store
