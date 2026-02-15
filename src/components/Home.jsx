
const Home = () => {
    return (
        <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center bg-primary bg-gradient align-items-center">
            <div className="row flex-grow-1">
                <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
                    <div className="col-12 text-center "><p className="text-white fw-bold fs-1">Palavra Secreta</p></div>
                    <div><p className="text-white text-center fs-2">Clique no botão para iniciar o jogo</p></div>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-light btn-lg text-primary fw-bold">Começar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home