import { useState, useEffect, useRef } from "react"
import { wordsList } from "../data/words.jsx"

const Game = ({setStage}) => {
    const [tempWordsList] = useState(JSON.parse(JSON.stringify(wordsList)));
    const [tip, setTip] = useState('')
    const [word, setWord] = useState('')
    const [letterTip, setLetterTip] = useState('')
    const [lifes, setLifes] = useState(5)
    const [lettersRight, setLettersRight] = useState([])
    const [lettersPlayed, setLettersPlayed] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const letterInputRef = useRef(null)

    const normalize = (str) => {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    }

    const selectWord = () => {
        let categories = Object.keys(tempWordsList)
        if(categories.length === 0){
            setStage('GameOver')
            return
        }
        let category = categories[Math.floor(Math.random() * categories.length)]
        let words = tempWordsList[category]
        let word = words[Math.floor(Math.random() * words.length)]
        let newWordsList= tempWordsList[category].filter(wordN => wordN !== word)
        console.log(newWordsList)
        if(newWordsList.length === 0){
            delete tempWordsList[category]
        }else{
            tempWordsList[category] = [... newWordsList]
        }
        setWord(word.toUpperCase())
        setTip(category)
        setLetterTip('')
        setLettersRight([])
        setLettersPlayed([])
    }

    const checkLetter = () => {
        let isPlayed = lettersPlayed.filter(letterP => letterTip === letterP)
        if (isPlayed.length !== 0) {
            setShowAlert(true)
            setLetterTip('')
            return
        }
        let isRight = false
        let newLettersRight = [...lettersRight]
        setLettersPlayed([...lettersPlayed, letterTip])
        const normalizedString = normalize(word)
        normalizedString.split('').forEach(
            (letter, index) => {
                if (letter === letterTip.toLowerCase()) {
                    isRight = true
                    newLettersRight.push(letter)
                }
            }
        )
        if (isRight) {
            setLettersRight(newLettersRight)
            if (newLettersRight.length === word.length) {
                selectWord()
            }
        } else{
            let lifesRemaining = lifes - 1
            setLifes(lifesRemaining)
            if(lifesRemaining == 0){
                setStage('GameOver')
                tempWordsList = wordsList
            }
        }

        setLetterTip('')
        letterInputRef.current.focus()

    }

    useEffect(() => {
        selectWord()
    }, [])

    return (
        <>
            {(showAlert) &&
                <div className="col-10 col-md-7 col-lg-5 alert alert-danger position-absolute top-0 start-50 translate-middle-x mt-1" role="alert">
                    <p> Letra já foi jogada, selecione outra e tente novamente.</p>
                </div>
            }

            <div className="d-flex justify-content-end col-11 position-absolute top-0 start-50 translate-middle-x mt-1 z-3">
                    {[...Array((lifes))].map((_, index) => (
                        <div>
                            <p key={"lf" + index}>❤️</p>
                        </div>
                    ))}
                </div>

            <div className="position-relative container-fluid bg-primary bg-gradient min-vh-100 d-flex flex-column justify-content-evenly">
                

                <div className="row">
                    <div className="col-12 text-white text-center fw-bold">
                        <h1>Adivinhe a palavra:</h1>
                    </div>
                    <div className="col-12 text-light d-flex justify-content-center gap-2">
                        <h4>Dica sobre a palavra:</h4><h4 className="fw-bold text-warning">{tip}</h4>
                    </div>
                </div>

                <div className="row d-flex align-items-center justify-content-center">
                    <div className="d-flex justify-content-center gap-4">
                        {
                            word.split('').map((letter, index) => (
                                <div key={"w"+index} className="bg-white letterContent d-flex align-items-center justify-content-center">
                                    {(lettersRight.includes(normalize(letter))) && letter}
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
                            <input ref={letterInputRef} type="text" className="bg-white" maxLength={1} value={letterTip} onChange={(e) => { setLetterTip(e.target.value.toUpperCase()); setShowAlert(false) }} />
                        </div>

                        <div className="col-7 d-flex justify-content-center col-md-2">
                            <button className="btn btnbtn btn-light btn-large text-primary w-75" onClick={checkLetter}>Jogar</button>
                        </div>
                    </div>

                    <div className="col-12 d-flex justify-content-center text-white mt-4">
                        <h4>Letras jogadas: </h4> {lettersPlayed.map((letter, index) => (
                            <div className="ms-1"><h4 key={'lp' + index} >{letter}</h4></div>
                        ))}
                    </div>

                </div>
            </div>
        </>
    )
}

export default Game