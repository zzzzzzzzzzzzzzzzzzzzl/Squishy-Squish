import Canvas from './main'
import Home from './Home'
import Name from './Name'
import Lives from './Lives'
import Armour from './Armour'
import gameSlice from '../slices/gameSlice'
import { useAppSelector } from '../hooks'

function App() {
  const gameSlice = useAppSelector((state) => state.game)
  const translateStyle = {
    transform: 'translate(10px, 500px)', // Adjust the values as needed
  };
  return (
    <div style={translateStyle} >
      {gameSlice.inputName && gameSlice.highscore && <Name />}
      {<Lives />}
      {<Armour />}
      {<Home />}
      {<Canvas />}
    </div>
  )
}

export default App
