import React from "react";
import { Image, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./Footer.css";

export default function Footer() {
  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      <footer className="footer-48201 pt-5">
        <div className="container-footer">
          <div className="col-md-4 pr-md-5 col-12 ">
            <Image
              className="history-top__arrow-left my-2"
              src="./logofinal.png"
              alt="logo-travelesia"
              style={{ width: "40%", height: "40%" }}
            />

            <p className="footer-text ">
              Welcome to our travel app! Discover your <br /> dream
              destinations, create unforgettable <br />
              journeys, and uncover hidden treasures
            </p>
          </div>
        </div>
        <div className="col-12 text-center">
          <div className="copyright">
            <p>
              <small>&copy; 2019-2023 All rights reserved.</small>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
