import enviroment from './game/enviroment'
import Home from './MainMenu'


function Canvas() {
  return (
    <div style={{ display: 'inline-block' }}>
      <div id="canvasParent"></div>
    </div>
  )
}
const a = new enviroment(1000)

export default Canvas
