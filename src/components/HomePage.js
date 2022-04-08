import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { NavbarHomepage } from './Navbar/Header';

function HomePage({connected, connectWallet, disconnectWallet, account, isAdmin}) {

    return (

        <div>
            {/* Home Nav */}
            <NavbarHomepage connected={connected} isAdmin={isAdmin} account ={account} disconnectWallet={disconnectWallet}  connectWallet={connectWallet} />
            
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