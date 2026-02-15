import { useState } from 'react'
import './App.css'
import Home from './components/Home.jsx'
import Game from './components/Game.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Game />
    </>
  )
}

export default App
