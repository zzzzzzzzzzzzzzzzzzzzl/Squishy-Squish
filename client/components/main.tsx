import enviroment from './game/enviroment'
import Home from './Home'

let a = new enviroment(1000)

function Canvas() {
  return (
    <div style={{ display: 'inline-block' }}>
      <div id="canvasParent"></div>
    </div>
  )
}

export default Canvas
