import items from '../shopItems'
import { loadPlayerData, savePlayerData } from '../localPlayerData'

interface ShopItem {
  id: number
  name: string
  price: number
  power: number
  value: number
  image: string
}

function Store() {
  const { playerinfo, stats } = loadPlayerData()

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
        <p>Current currency: ${playerinfo.currency}</p>
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
