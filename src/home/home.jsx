import { useEffect, useState } from "react";
import "../styles/home.css";
import { FaStar, FaStarHalfAlt, FaRegStar, FaHeart } from "react-icons/fa";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function StarRating ({stars}) {
    return (
            <div className="stars">
                {[1, 2, 3, 4, 5].map((i) => {
                    if (stars >= i) {
                    return <FaStar key={i} color="navy" size={30}/>;
                    }
                    if (stars >= i - 0.5) {
                    return <FaStarHalfAlt key={i} color="navy" size={30}/>;
                    }
                    return <FaRegStar key={i} size={30}/>;
                })}
            </div>
    );
}

function Home() {

    const [shoes, setShoes] = useState([]);

    useEffect(() => {
        const fetchShoes = async () => {
            const querySnapshot = await getDocs(collection(db, "shoes"));
            const shoesList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setShoes(shoesList)
        };
        fetchShoes();
    }, []);

    const handleAddToCart = () => {
    console.log("Added to cart!");
};

    const filteredPopularShoes = shoes.filter((shoe) => shoe.stars >= 4.8);

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
        <div className="popular-shoes">
            <h1>Popular Shoes</h1>
            <div className="grid">
                {filteredPopularShoes.map (shoe => (
                    <div className="card" key={shoe.id}>
                            
                            <img src={shoe.images[0]} alt="primary-image" width='100%' height={200}/>
                            <h3>{shoe.name}</h3>
                            <h2 style={{color: '#1c1180'}}>₱{shoe.price}</h2>
                            <p className="shoe-description">{shoe.description}</p>
                            <div className="card-buttons">
                                <button style={{fontWeight: 'bold'}} onClick={handleAddToCart}>Buy</button>
                                <button style={{backgroundColor: "transparent", color: 'black', boxShadow: "var(--default-box-shadow)"}} onClick={handleAddToCart}>Add to Cart</button>
                            </div>
                        </div>
                ))}
            </div>
        </div>
        </>
    );
}

export default Home