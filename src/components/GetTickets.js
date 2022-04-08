import React from 'react';
import { NavbarHomepage } from './Navbar/Header';

function GetTickets({connected, connectWallet, disconnectWallet, account, isAdmin}) {
    return (
        <div>
            {/* Nav */}
            <NavbarHomepage connected={connected} isAdmin={isAdmin} account ={account} disconnectWallet={disconnectWallet}  connectWallet={connectWallet}  />
            {/* End Nav */}

            <div className="section wf-section">
                <div className="w-container">
                    <div className="section-title-group">
                        <h2 className="section-heading centered">BUY A TICKET</h2>
                    </div>
                    <div className="form-wrapper w-form">
                        <form id="email-form" name="email-form" data-name="Email Form" method="get" className="form">
                            <input type="text" className="form-field w-input" maxlength="256" name="Name" data-name="Name" placeholder="Name" id="Name" required="" />
                            <input type="text" className="form-field w-input" maxlength="256" name="Ticket-Amount" data-name="Ticket Amount" placeholder="Amount due " id="Ticket-Amount" />
                            <input type="submit" value="GET TICKETS" data-wait="Please wait..." className="button full-width w-button" />
                        </form>
                        <div className="w-form-done">
                            <p>Thank you!</p>
                        </div>
                        <div className="w-form-fail">
                            <p>Oops! Something went wrong while submitting the form :(</p>
                        </div>
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

export default GetTickets;