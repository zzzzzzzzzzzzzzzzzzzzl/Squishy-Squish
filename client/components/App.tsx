import Canvas from './main'
import Home from './Home'
import P5 from './main'

import { useState } from 'react'

function App() {
  const [showHome, setShowHome] = useState(true) // state variable to show/hide Home component

  const handleStart = () => {
    setShowHome(false) // hide Home component when Start button is clicked
  }

  return (
    <div>
      {showHome && <Home onStart={handleStart} />}{' '}
      {/* pass handleStart function as a prop to Home component */}
      <Canvas />
    </div>
  )
}

export default App
