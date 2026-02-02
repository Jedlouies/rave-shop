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
                            <h2 style={{color: '#2515b6'}}>Midnight Runner</h2>
                            <p>Embrace the dark with Midnight Runner, made for those who shine at night. Sleek black with reflective hits, this shoe gives style and safety. Its 'LunaGrip' sole offers traction for city life. Ideal for the urban explorer.</p>
                            <button>Order Now</button>
                        </div>
                    </div>
                </div>
                <img className="banner-image" src="/Banner 1.jpg" alt="banner" />
            </div>
             <div className="banner">
                <div className="objects">
                    <div className="content">
                        <img className="shoes" src="/shoes2-1.png" alt="shoes" />
                        <div className="words">
                            <h2 style={{color: 'white'}}>White Nebula</h2>
                            <p>The White Nebula is where high-fashion minimalism meets the energy of the dance floor. Inspired by the bright core of a star, these sneakers feature a triple-white matte and mesh upper that provides a clean, breathable foundation.</p>
                            <button>Order Now</button>
                        </div>
                    </div>
                </div>
                <img className="banner-image" src="/banner 2.jpg" alt="banner" />
            </div>
        </div>
        </>
    );
}

export default Home