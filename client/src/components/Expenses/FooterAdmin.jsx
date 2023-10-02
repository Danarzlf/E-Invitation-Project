import React from "react";
import { Image, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./FooterAdmin.css";

export default function FooterAdmin() {
  return (
    <div
      style={{
        marginTop: "100px",
      }}
    >
      <footer className="footer-48201-adm  ">
        <div className="container-footer-adm">
          <div className="col-md-4 pr-md-5 col-12 ">
            <Image
              className="history-top__arrow-left my-2 mb-2 mt-2 logo-product-admin"
              src="/narrgather123.png"
              alt="logo-travelesia"
              style={{ width: "18%" }}
            />

            {/* <p className="footer-text ">
              Welcome to our travel app! Discover your <br /> dream
              destinations, create unforgettable <br />
              journeys, and uncover hidden treasures
            </p> */}
          </div>
        </div>
        <div className="col-12 text-center">
          <div className="copyright-adm">
            <p>
              <small className="text-white">
                &copy; 2019-2023 All rights reserved.
              </small>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
