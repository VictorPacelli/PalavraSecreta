import { useState } from 'react'
import './App.css'
import Home from './components/Home.jsx'
import Game from './components/Game.jsx'
import GameOver from './components/GameOver.jsx'

function App() {
  const [stage, setStage] = useState('Home')
  
  return (
    <>
    {(stage == 'Home')&& <Home setStage={setStage}/>}
    {(stage == 'Game')&&<Game setStage={setStage}/>}
    {(stage == 'GameOver')&&<GameOver setStage={setStage}/>}
    </>
  )
}

export default App
