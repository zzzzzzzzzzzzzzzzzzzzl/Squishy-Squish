import items from '../shopItems'

function Store() {
  return (
    <div className="menu-overlay">
      <div className="border">
        <ul className="flex flex-row flex-wrap justify-center mt-10">
          {items.map((item) => (
            <li key={item.id}>
              {item.name}
              {/* <img src=`{item.image}`/> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Store
