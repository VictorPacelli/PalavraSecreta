const GameOver = ({setStage}) => {
    return (
        <>
            <div className="container-fluid d-flex flex-column align-items-center justify-content-center bg-primary bg-gradient min-vh-100">
                <div className="row">
                    <div className="col-12 d-flex flex-column gap-2 justify-content-center align-items-center">
                        <div><h2 className="text-white">Fim de jogo</h2></div>
                        <div><button className="btn btn-light btn-lg text-primary fw-bold" onClick={()=>{setStage('Home')}}>Recomeçar</button></div>
                    </div>

                </div>


            </div>
        </>
    )
}

export default GameOver