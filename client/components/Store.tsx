import items from '../shopItems'

function Store() {
  return (
    <div className="menu-overlay">
      {/* <div className="border"> */}
      <div className="store-listing">
        {items.map((item) => (
          <p className="items" key={item.id}>
            {item.name}
            {/* <img src=`{item.image}`/> */}
          </p>
        ))}
      </div>
      {/* </div> */}
    </div>
  )
}

export default Store
