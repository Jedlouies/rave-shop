import "../styles/home.css"

function Home() {
    return (
        <>
        <div className="home-container">
            <div className="banner">
                <div className="objects">
                    <div className="content">
                        <img className="shoes" src="/midnight1.png" alt="shoes" />
                        <div className="words">
                            <h1 style={{color: 'skyblue'}}>Midnight Runner</h1>
                            <p>Embrace the night with the Midnight Runner, designed for those who dare to shine in the darkest hours. Featuring a sleek black design with reflective accents, this sneaker ensures visibility and style. The 'LunaGrip' sole provides exceptional traction for urban adventures after dark. Perfect for night owls and city explorers.</p>
                        </div>
                    </div>
                    <img className="banner-image" src="/Banner 1.jpg" alt="banner" />

                </div>
            </div>
        </div>
        </>
    );
}

export default Home