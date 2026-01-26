import "./styles/landing-page.css";

function LandingPage({handleBuyNow}) {

  return (
  <>
   
    <div className='landing-page-container'>
        <div className="featured-shoe-container">
            <img className='featured-shoe' src="/Shoes.png" alt="featured-shoes" />
        </div>
          <div className="product-featured-container">
            <h1>Violet Velocity</h1>
            <h2>Rave Sneakers</h2>
            <p>Experience motion redefined. The Violet Velocity combines futuristic style with athletic performance. Featuring our signature 'Aero-Mesh' knit for maximum airflow and a dynamic, energy-returning sole that glows with electric purple intensity. Perfect for the night runner looking to make a statement.</p>
            <p><b>Price:</b> $129.99 <strike>$129.99</strike></p>
            <button className="buy-now-button" onClick={handleBuyNow}>Buy Now</button>
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

export default LandingPage;