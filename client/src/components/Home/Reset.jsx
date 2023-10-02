import React, { useState } from "react";
import FormReset from "../Expenses/FormReset";
import { Navbar, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Reset.css";
function Reset() {
  const styles = `
  .container-fluid {
    padding-left:0px;
  }
  `;
  return (
    <>
      <style>{styles}</style>
      <div className="reset-page">
        <Navbar className="fixed-top border-bottom shadow-sm navbar-otp">
          <Container>
            <Navbar.Brand>
              <Link to="/">
                <img
                  className="logo-navbar"
                  src="/narrgather123.png"
                  alt="logo"
                  style={{ width: "100%" }}
                />
              </Link>
            </Navbar.Brand>
          </Container>
        </Navbar>

        <div
          className="container-fluid d-flex flex-column justify-content-end"
          style={{
            backgroundColor: "#343957",
            height: "100vh",
          }}
        >
          <div className="row align-items-center">
            {/* <div className="col-md-6 d-none d-md-block">
            <img
              src={loginLogo}
              alt="background"
              style={{
                width: "100%",
                maxHeight: "100vh", // Atur tinggi maksimal gambar agar sesuai dengan tinggi layar
                objectFit: "cover",
              }}
            />
          </div> */}

            <div className="log col-md-6 col-lg-5 col-md-5 mx-auto">
              <div className="row">
                <FormReset />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reset;
