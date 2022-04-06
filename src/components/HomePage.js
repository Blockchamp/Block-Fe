import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div>
            {/* Home Nav */}
            <div data-collapse="medium" data-animation="default" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" className="navigation-bar w-nav"><img src="/images/Nestcoin-1024x726.jpg" loading="lazy" width="0" sizes="100vw" srcSet="images/Nestcoin-1024x726-p-500.jpeg 500w, images/Nestcoin-1024x726-p-800.jpeg 800w, images/Nestcoin-1024x726.jpg 1024w" alt="" /><img src="images/Nestcoin-1024x726.jpg" loading="lazy" width="120" height="90" srcSet="images/Nestcoin-1024x726-p-500.jpeg 500w, images/Nestcoin-1024x726-p-800.jpeg 800w, images/Nestcoin-1024x726.jpg 1024w" sizes="120px" alt="" className="image-2" />
                <div className="container w-container">
                    <Link to="/" className="brand-link w-nav-brand"> <img src="/images/nestcoin-logo-big-N.jpg" width="0" alt="Nestcoin Logo" className="image" /> </Link>
                    <nav role="navigation" className="navigation-menu w-nav-menu">
                        <Link to="/" className="navigation-link w-nav-link">Home</Link>
                        <Link to="/get-tickets" className="navigation-link w-nav-link ">Get Tickets</Link>
                        <Link to="#" className="button-2 w-button">Connect Wallet</Link>
                    </nav>
                    <div className="hamburger-button w-nav-button">
                        <div className="w-icon-nav-menu"></div>
                    </div>
                </div>
            </div>
            <div className="hero-section centered wf-section">
                <div data-w-id="e464d218-f801-55d1-1f50-7da00b5bfb8f" style={{ opacity: 1 }} className="w-container">
                    <h1 className="hero-heading">NESTCOIN CINEMAS</h1>
                </div>
            </div>
            <div className="section wf-section">
                <div className="w-container">
                    <div className="section-title-group">
                        <h2 className="section-heading centered">CURRENTLY SHOWING</h2>
                    </div>
                    <div className="w-row">
                        <div className="w-col w-col-4"><img src="images/avengers-movie-poster.jpg" loading="lazy" alt="" /></div>
                        <div className="w-col w-col-4"><img src="images/black-panther.jpg" loading="lazy" alt="" /></div>
                        <div className="w-col w-col-4"><img src="images/cap.jpg" loading="lazy" alt="" /></div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="footer wf-section">
                <div className="w-container">
                    <div className="w-row">
                        <div className="spc w-col w-col-6">
                            <h5>NESTCOIN CINEMAS</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.</p>
                        </div>
                        <div className="spc w-col w-col-6">
                            <h5>useful links</h5>
                            <a href="#" className="footer-link">Advertise with us</a>
                            <a href="#" className="footer-link">Tickets</a>
                            <a href="#" className="footer-link">Link</a>
                            <a href="#" className="footer-link">Link</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer center wf-section">
                <div className="w-container">
                    <div className="footer-text">Copyright © Nestcoin Cinemas 2022.</div>
                </div>
            </div>


        </div>
    );
}

export default HomePage;