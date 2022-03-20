import React from "react";

export default function Footer() {
  return (
    <div>
      <div className="footer">
        <div className="footer1">
          <div className="footer-item">
            <img
              src="/images/logo1.png"
              alt="logo"
              style={{ width: "100px" }}
            />
          </div>
          <div className="footer-item">About Us</div>
          <div className="footer-item">Team</div>
        </div>

        <div className="footer2">
          <div className="footer-item">Privacy Policy</div>
          <div className="footer-item">Terms and Condition</div>
          <div className="footer-item">Tokenomics</div>
        </div>

        <div className="footer3">
          <div className="footer-item">Email Address</div>
          <div className="footer-item">Phone Number</div>
          <div className="footer-item">Social Links</div>
        </div>
      </div>
    </div>
  );
}
