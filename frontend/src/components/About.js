import React from 'react';
import img3 from './assets/img3.svg';
import { Link } from 'react-router-dom';
const About = () => {
   return (
    <>
         <div className="container my-3">
                <div className="row">
                    <div className="col-md-6 d-flex flex-column justify-content-center">
                        <h1 className="display-4 mb-4">About <span style={{ color: "darkred" }} > SummerizeIt</span> </h1>
                        <p>Transform the way you handle information with SummerizeIt, the cutting-edge platform that effortlessly extracts key 
                        insights from any web URL or manual input. Designed for professionals, students, and anyone who values their time, SummerizeIt
                         delivers concise, accurate summaries in seconds.</p>
                        <h2 className="mb-3 my-3" style={{ fontWeight: "revert-layer" }}>Why Choose <span style={{ color: "darkred" }}>SummerizeIt?</span> </h2>
                        <p><ul>
                        <li>AI Precision: Leveraging advanced AI technology, SummerizeIt scrapes and summarizes content with unparalleled accuracy.</li>
                        <li>Affordable Excellence: Enjoy top-tier AI capabilities at a fraction of the cost, making cutting-edge technology accessible to everyone.</li>
                        <li>Lightning Fast: Experience the speed of next-generation NLP, providing you with summaries in the blink of an eye.</li>
                        </ul>


                        </p>

                    </div>
                    <div className="col-md-6 my-4">
                        <img className="img-fluid awesome" src={img3} alt="about-awesome" />
                    </div>
                </div>
            </div>

      <footer>
                <div className="content">
                    <div className="top">
                        <div className="logo-details">
                            <span className="logo_name"><span style={{ color: "darkred" }}>SummarizeIt</span></span>
                        </div>
                        <div className="media-icons">
                            <Link to="/"><i className="fab fa-facebook-f"></i></Link>
                            <Link to="/"><i className="fab fa-twitter"></i></Link>
                            <Link to="https://www.instagram.com/prakhar___singh___"><i className="fab fa-instagram"></i></Link>
                            <Link to="https://linkedin.com/in/prakhar-singh09/"><i className="fab fa-linkedin-in"></i></Link>
                            <Link to="/"><i className="fab fa-youtube"></i></Link>
                        </div>
                    </div>
                    <div className="link-boxes">
                        <ul className="box">
                            <li className="link_name">Company</li>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/new">New Summaries</Link></li>
                            <li><Link to="/about">About us</Link></li>
                            <li><Link to="/signup">Get started</Link></li>
                        </ul>
                        <ul className="box">
                            <li className="link_name">Services</li>
                            <li><Link to="/Summaries">Your Summaries</Link></li>
                            <li><Link to="/new">New Summary</Link></li>
                        </ul>
                        <ul className="box">
                            <li className="link_name">Account</li>
                            <li><Link to="/login">Sign-in</Link></li>
                            <li><Link to="/login">Join Free</Link></li>
                        </ul>
                        <ul className="box">
                            <li className="link_name">Top Categories</li>
                            <li><Link to="/Summaries">Food Summaries</Link></li>
                            <li><Link to="/Summaries">Travel Summaries</Link></li>
                            <li><Link to="/Summaries">Business Summaries</Link></li>
                            <li><Link to="/Summaries">Iternary Summaries</Link></li>
                        </ul>
                        <ul className="box input-box">
                            <li className="link_name">About Creator</li>
                            <li style={{ color: "#F7FFFF" }}>
                            Hi, I am Prakhar Singh, I like to work on cutting edge technologies, that impacts human lives around the globe.
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="bottom-details">
                    <div className="bottom_text">
                        <span className="copyright_text">Copyright © 2024 <Link to="/">SummarizeIt</Link>All rights reserved</span>
                        <span className="policy_terms">
                            <Link to="/">Privacy policy</Link>
                            <Link to="/">Terms & condition</Link>
                        </span>
                    </div>
                </div>
            </footer>
    </>
   )
}

export default About;