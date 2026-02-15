import { useState, useEffect } from "react"
import { wordsList } from "../data/words.jsx"

const Game = () => {
    const [tip, setTip] = useState('')
    const [word, setWord] = useState('')
    const [letterTip, setLetterTip] = useState('')

    const normalize = (str) => {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "") 
        .toLowerCase();                
}

    const checkLetter = () => {
        let isRight = false
        const normalizedString = normalize(word)
        normalizedString.split('').forEach(
            (letter, index)=>{
                if(letter === letterTip.toLowerCase()){
                    let putLetter = document.getElementById('fk'+index)
                    putLetter.innerText = word.split('')[index]
                    isRight = true
                }
            }
        )
     
    }

    useEffect(() => {
        const selectWord = () => {
            let categories = Object.keys(wordsList)
            let category = categories[Math.floor(Math.random() * categories.length)]
            let words = wordsList[category]
            let word = words[Math.floor(Math.random() * words.length)]
            setWord(word.toUpperCase())
            setTip(category)
        }
        selectWord()
    }, [])
    return (
        <>
            <div className="container-fluid bg-primary bg-gradient min-vh-100 d-flex flex-column justify-content-evenly">
                <div className="row">
                    <div className="col-12 text-white text-center fw-bold">
                        <h1>Advinhe a palavra:</h1>
                    </div>
                    <div className="col-12 text-light d-flex justify-content-center gap-2">
                        <h4>Dica sobre a palavra:</h4><h4 className="fw-bold text-warning">{tip}</h4>
                    </div>
                </div>

                <div className="row d-flex align-items-center justify-content-center">
                    <div className="d-flex justify-content-center gap-4">
                        {
                            word.split('').map((letter, index) => (
                                <div key={index} className="bg-white letterContent d-flex align-items-center justify-content-center" id={`fk${index}`}>
                                    
                                </div>
                            )

                            )
                        }
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 text-light d-flex align-items-center justify-content-center mb-4">
                        <h4>Tente advinhar uma letra da palavra:</h4>
                    </div>

                    <div className="col-12 d-flex align-items-center justify-content-center gap-2">
                        <div>
                            <input type="text" className="bg-white" maxLength={1} value={letterTip} onChange={(e) => { setLetterTip(e.target.value) }} />
                        </div>

                        <div className="col-2 d-flex justify-content-center">
                            <button className="btn btnbtn btn-light btn-large text-primary w-75" onClick={checkLetter}>Jogar</button>
                        </div>
                    </div>

                </div>




            </div>
        </>
    )
}

export default Game