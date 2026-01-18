import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { db } from "../firebase"
import "../styles/no-login-catalog.css";

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

function NoLoginCatalog() {

    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [reviews, setReviews] = useState("");
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

    return (
        <>
        <div className="no-login-catalog-container">
            <div className="catalog-actions">
                <h4>Filter: </h4>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Sneakers">Sneakers</option>
                </select>
                <select value={price} onChange={(e) => setPrice(e.target.value)}>
                    <option value="₱400 - ₱500">₱400 - ₱500</option>
                </select>
                <select value={reviews} onChange={(e) => setReviews(e.target.value)}>
                    <option value="5 Star">5 Star</option>
                </select>
            </div>
            <div className="shoes-container">
                <h1>Shoes</h1>
                <div className="grid">
                    {shoes.map(shoe => (
                        <div className="card" key={shoe.id}>
                            <img src="" alt="" width='100%' height={200}/>
                            <h3>{shoe.name}</h3>
                            <h4>{shoe.nickname}</h4>
                            <h2>₱{shoe.price}</h2>
                            <p>{shoe.description}</p>
                            <div className="rating">
                                <StarRating stars={shoe.stars} />
                                <span>{shoe.stars} / 5.0</span>
                            </div>
                            <button>Add to Cart</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    );   
}

export default NoLoginCatalog