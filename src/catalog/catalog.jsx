import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { FaStar, FaStarHalfAlt, FaRegStar, FaHeart } from "react-icons/fa";
import { db } from "../firebase"
import "../styles/catalog.css";
import { useNavigate } from "react-router-dom";

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

function Catalog() {

    const [category, setCategory] = useState("All");
    const [price, setPrice] = useState("All");
    const [reviews, setReviews] = useState("All");
    const [favoriteLight, setFavoriteLight] = useState(true);
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
        navigate("/")
    };

    const handleFavoriteClick = () => {
        setFavoriteLight(false);
    };

    const handleUnfavoriteClick = () => {
        setFavoriteLight(true);
    };

    const filteredShoes = shoes.filter((shoe) => {
        const matchesCategory = category === "All" || shoe.category === category
        const matchesStar = reviews === "All" || (reviews === "1 - 2 Star" && shoe.stars >= 1 && shoe.stars <= 2.9) || (reviews === "3 - 4 Star" && shoe.stars >= 3.9 && shoe.stars <= 4.9) || (reviews === "5 Star" && shoe.stars === 5)
        const matchesPrice = price === "All" || (price === "400-500" && shoe.price >= 400 && shoe.price <= 500) || (price === "501-1000" && shoe.price >= 501 && shoe.price <= 1000) || (price === "1001-999999" && shoe.price >= 1001)
        return matchesCategory && matchesStar && matchesPrice;
    });

    return (
        <>
        <div className="no-login-catalog-container">
            <div className="catalog-actions">
                <div className="filtering">
                <h4>Filter: </h4>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="All">All Shoes</option>
                    <option value="Performance">Performance</option>
                    <option value="Lifestyle / Streetwear">Lifestyle / Streetwear</option>
                    <option value="Formal & Business">Formal & Business</option>
                    <option value="Outdoor & Adventure">Outdoor & Adventure</option>
                    <option value="Limited Releases">Limited Releases</option>
                </select>
                <select value={price} onChange={(e) => setPrice(e.target.value)}>
                    <option value="All">All Prices</option>
                    <option value="400-500">₱400 - ₱500</option>
                    <option value="501-1000">₱501 - ₱1,000</option>
                    <option value="1001-999999">₱1,000+</option>
                </select>
                <select value={reviews} onChange={(e) => setReviews(e.target.value)}>
                    <option value="All">All Ratings</option>
                    <option value="1 - 2 Star">1 - 2 Star</option>
                    <option value="3 - 4 Star">3 - 4 Star</option>
                    <option value="5 Star">5 Star</option>
                </select>
                </div>
                <div className="right-icons">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-cart3" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg>
                </div>
            </div>
            <div className="shoes-container">
                <h1>{category || "All Shoes"}</h1>
                <div className="grid">
                    {filteredShoes.length === 0 ? (
                        <div className="no-products-found">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-ban" viewBox="0 0 16 16">
                            <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/>
                            </svg>
                            <h2>No Products Found.</h2>
                            <p>Try changing your filters.</p>
                        </div>
                    ) : (
                    filteredShoes.map(shoe => (
                        <div className="card" key={shoe.id}>
                            <div className="favorite-button">
                            {favoriteLight ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16" onClick={handleFavoriteClick} >
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                            </svg>
                            ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" class="bi bi-heart-fill" viewBox="0 0 16 16" onClick={handleUnfavoriteClick}>
                                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                            </svg>
                            )}
                            </div>
                            <img src={shoe.images[0]} alt="primary-image" width='100%' height={200}/>
                            <div className="card-images">
                                <img src={shoe.images[1]} alt="other-images" width="30%" height={80} />
                                <img src={shoe.images[2]} alt="other-images" width="30%" height={80} />
                                <img src={shoe.images[3]} alt="other-images" width="30%" height={80} />
                            </div>
                            <h3>{shoe.name}</h3>
                            <h4>{shoe.nickname}</h4>
                            <h2>₱{shoe.price}</h2>
                            <p>{shoe.description}</p>
                            <div className="rating">
                                <StarRating stars={shoe.stars} />
                                <span>{shoe.stars} / 5.0</span>
                            </div>
                            <div className="card-buttons">
                                <button style={{fontWeight: 'bold'}} onClick={handleAddToCart}>Buy</button>
                                <button style={{backgroundColor: "transparent", color: 'black', boxShadow: "var(--default-box-shadow)"}} onClick={handleAddToCart}>Add to Cart</button>
                            </div>
                        </div>
                    ))
                    )}
                </div>
            </div>
        </div>
        </>
    );   
}

export default Catalog

