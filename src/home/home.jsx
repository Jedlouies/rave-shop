import { useEffect, useState } from "react";
import "../styles/home.css";
import "../../api-gateway/styles/landing-page.css"
import { FaStar, FaStarHalfAlt, FaRegStar, FaHeart } from "react-icons/fa";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Navigate, useNavigate } from "react-router-dom";

function Home() {

    const [shoes, setShoes] = useState([]);
    const navigate = useNavigate();

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

    const handleCategoryClick = (categoryName) => {
        navigate('/products/catalog/view', {state: {selectedCategory: categoryName} });
    };

    const handleSampleClick = () => {
       navigate('/products/catalog/view', {state: {selectedPrice: "1001-999999"} });
    };

    const filteredPopularShoes = shoes.filter((shoe) => shoe.stars >= 4.8);

    return (
        <>
        <div className="home-container">
            <div className="header">
                <div className="banner">
                <div className="objects">
                    <div className="content">   
                        <img className="shoes" src="/midnight1.png" alt="shoes" />
                        <div className="words">
                            <h2 style={{color: '#2515b6'}}>Midnight Runner</h2>
                            <p>Embrace the dark with Midnight Runner, made for those who shine at night. Sleek black with reflective hits, this shoe gives style and safety. Its 'LunaGrip' sole offers traction for city life. Ideal for the urban explorer.</p>
                            <button onClick={handleSampleClick}>Order Now (P500)</button>
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
        <div className="home-categories">
            <h1>Categories</h1>
            <div className="home-cards">
            <div className="category-card" 
            style={{backgroundImage: "url('/sports.png')", 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'}}
            onClick={() => handleCategoryClick("Performance")}>
                <h1>Sports</h1>        
            </div>

            <div className="category-card"
            style={{backgroundImage: "url('/street.png')", 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'}}
            onClick={() => handleCategoryClick("Lifestyle & Streetwear")}>
                <h1>Lifestyle & Street Wear</h1> 
            </div>
            <div className="category-card"
            style={{backgroundImage: "url('/formal.png')", 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'}}
            onClick={() => handleCategoryClick("Formal & Business")}>
                <h1>Formal & Business</h1>   
            </div>
            <div className="category-card"
            style={{backgroundImage: "url('/hike.png')", 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'}}
            onClick={() => handleCategoryClick("Outdoor & Adventure")}>
                <h1>Outdoor & Adventure</h1>
            </div>

        </div>

        </div>
                <div className="popular-shoes">
            <h1>Shoes</h1>
            <div className="grid">
                {shoes.map (shoe => (
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

        <div className="mission">
                <h1>Mission</h1>
                <div className="content">
                    <img src="/Rave-Logo-Slogan.png" alt="" width="70%"/>
                    <p>Our mission is to redefine the rhythm of the streets. We engineer footwear 
                        that bridges the gap between bold, futuristic aesthetics and high-performance comfort. 
                        From the deep hues of the Midnight Rush to the ethereal pull of the White Nebula, 
                        we don’t just make shoes—we create the gear for those who move at their own pace and light up the dark. 
                        Step into the noise. Join the RAVE.</p>
                </div>
        </div>
        <div className="footer">
            <div className="footer-body">
                <div className="footer-item">
                    <img src="/Rave-Logo.png" alt="" width={50}/>
                    <p>Your ultimate destination for trendy and affordable footwear. Step into style with Rave Shop!</p>
                </div>
                <div className="footer-item">
                    <h3>Policy and Terms</h3>
                    <p>Privacy Policy</p>
                    <p>Terms of Service</p>
                    <p>Return Policy</p>
                </div>
                <div className="footer-item">
                    <h3>Contact Us</h3>
                    <p>Email: support@rave.ph</p>
                    <p>Phone: +1 (555) 123-4567</p>
                </div>
            </div>
        </div>
        </div>
        </>
    );
}

export default Home