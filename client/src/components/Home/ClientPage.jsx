import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button, Image, Dropdown, Navbar } from "react-bootstrap";

import "./ClientPage.css";

const ClientPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div>
        {/* <section id="topbar" className="d-flex align-items-center">
          <div className="container d-flex justify-content-center justify-content-md-between">
            <div className="contact-info d-flex align-items-center">
              <i className="bi bi-envelope-fill"></i>
              <a href="mailto:contact@example.com">dnrfian168@gmail.com</a>
              <i className="bi bi-phone-fill phone-icon"></i> +62 821 1410 3452
            </div>
            <div className="social-links d-none d-md-block">
              <a href="#" className="twitter">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="linkedin">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
        </section> */}

        <header id="header" className="d-flex align-items-center">
          <div className="container d-flex align-items-center justify-content-between">
            <h1 className="logo">
              <Image
                className=""
                src="/narrgather123.png"
                alt="logo-travelesia"
                style={{ width: "30%" }}
              />
            </h1>
            {/* Uncomment below if you prefer to use an image logo */}
            {/* <a href="index.html" className="logo"><img src="assets/img/logo.png" alt="" className="img-fluid"></a>*/}
            <nav id="navbar" className="navbar">
              <ul>
                <li>
                  <a className="nav-link scrollto " href="#hero">
                    Home
                  </a>
                </li>
                <li>
                  <a className="nav-link scrollto" href="#about">
                    About
                  </a>
                </li>
                <li>
                  <a className="nav-link scrollto" href="#services">
                    Services
                  </a>
                </li>
                {/* <li>
                  <a className="nav-link scrollto " href="#portfolio">
                    Portfolio
                  </a>
                </li> */}
                <li>
                  <a className="nav-link scrollto" href="#pricing">
                    Price List
                  </a>
                </li>
                {/* <li>
                  <a className="nav-link scrollto" href="#team">
                    Team
                  </a>
                </li> */}
                <li className="dropdown">
                  <a href="#">
                    <span className="text-black">Catalog Design</span>
                    <i className="bi bi-chevron-down"></i>
                  </a>
                  <ul>
                    <li>
                      <a href="#">Drop Down 1</a>
                    </li>
                    {/* <li className="dropdown">
                      <a href="#">
                        <span>Deep Drop Down</span>{" "}
                        <i className="bi bi-chevron-right"></i>
                      </a>
                      <ul>
                        <li>
                          <a href="#">Deep Drop Down 1</a>
                        </li>
                        <li>
                          <a href="#">Deep Drop Down 2</a>
                        </li>
                        <li>
                          <a href="#">Deep Drop Down 3</a>
                        </li>
                        <li>
                          <a href="#">Deep Drop Down 4</a>
                        </li>
                        <li>
                          <a href="#">Deep Drop Down 5</a>
                        </li>
                      </ul>
                    </li> */}
                    <li>
                      <a href="#">Drop Down 2</a>
                    </li>
                    <li>
                      <a href="#">Drop Down 3</a>
                    </li>
                    <li>
                      <a href="#">Drop Down 4</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a className="nav-link scrollto" href="#contact">
                    Contact Us
                  </a>
                </li>
              </ul>
              <i className="bi bi-list mobile-nav-toggle"></i>
            </nav>
          </div>
        </header>

        <section id="hero" className="d-flex align-items-center">
          <div
            className="container position-relative"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <h1>NarrGather</h1>
            <h2>Klik dan sebarkan undangan dengan cepat</h2>
            <a
              href="https://wa.me/082114103452"
              class="btn-get-started scrollto"
            >
              Get Started
            </a>
          </div>
        </section>

        <section id="about" className="about mt-3">
          <div className="about-sct">
            <div
              className="container-fluid cont-about-sct"
              style={{ background: "white" }}
            >
              <div className="row">
                <div
                  className="col-lg-6 order-1 order-lg-2"
                  data-aos="fade-left"
                >
                  <img src="assets/img/phn.png" className="img-fluid " alt="" />
                </div>
                <div
                  className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content d-flex align-items-center"
                  data-aos="fade-right"
                >
                  {/* <h3>Tentang Kami</h3> */}
                  <p>
                    <span> Tentang Kami </span> <br /> <br />
                    NarrGather merupakan penyedia layanan pembuatan undangan
                    online/digital (e-invitation) berbasis website untuk
                    memenuhi kebutuhan anda dalam membuat berbagai undangan
                    seperti pernikahan, ulang tahun, event, dan lainnya. Dengan
                    berbagai fitur dan desain menarik yang kami tawarkan, kami
                    memberikan pelayanan yang mudah, cepat, hemat, dan
                    terpercaya . <br /> <br />
                    NarrGather adalah gabungan dua buah kata dalam bahasa
                    inggris, yaitu Invitation (undangan) dan Story
                    (cerita/kisah). Undang kerabat, sahabat, teman, dan sanak
                    saudara anda untuk menjadi bagian dari kisah hidup anda.
                    Bagikan link undangan, cukup klik dan sebarkan undangan anda
                    secara online.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <section id="why-us" className="why-us">
          <div className="container">
            <div className="row">
              <div className="col-lg-4" data-aos="fade-up">
                <div className="box">
                  <span>01</span>
                  <h4>Lorem Ipsum</h4>
                  <p>
                    Ulamco laboris nisi ut aliquip ex ea commodo consequat. Et
                    consectetur ducimus vero placeat
                  </p>
                </div>
              </div>
              <div
                className="col-lg-4 mt-4 mt-lg-0"
                data-aos="fade-up"
                data-aos-delay="150"
              >
                <div className="box">
                  <span>02</span>
                  <h4>Repellat Nihil</h4>
                  <p>
                    Dolorem est fugiat occaecati voluptate velit esse. Dicta
                    veritatis dolor quod et vel dire leno para dest
                  </p>
                </div>
              </div>
              <div
                className="col-lg-4 mt-4 mt-lg-0"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="box">
                  <span>03</span>
                  <h4>Ad ad velit qui</h4>
                  <p>
                    Molestiae officiis omnis illo asperiores. Aut doloribus
                    vitae sunt debitis quo vel nam quis
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        <section id="clients" className="clients">
          <div className="container" data-aos="zoom-in">
            <div className="row d-flex align-items-center">
              <div className="col-lg-2 col-md-4 col-6">
                <img
                  src="assets/img/clients/client-1.png"
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div className="col-lg-2 col-md-4 col-6">
                <img
                  src="assets/img/clients/client-2.png"
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div className="col-lg-2 col-md-4 col-6">
                <img
                  src="assets/img/clients/client-3.png"
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div className="col-lg-2 col-md-4 col-6">
                <img
                  src="assets/img/clients/client-4.png"
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div className="col-lg-2 col-md-4 col-6">
                <img
                  src="assets/img/clients/client-5.png"
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div className="col-lg-2 col-md-4 col-6">
                <img
                  src="assets/img/clients/client-6.png"
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="services"
          className="services"
          style={{ backgroundColor: "#EED9C4" }}
        >
          <div className="container">
            <div className="section-title">
              <span>Fitur Undangan</span>
              <h2>Fitur Undangan</h2>
              <p>
                Sit sint consectetur velit quisquam cupiditate impedit suscipit
                alias
              </p>
            </div>
            <div className="row">
              <div
                className="col-lg-4 col-md-6 d-flex align-items-stretch"
                data-aos="fade-up"
              >
                <div className="icon-box">
                  <div className="icon">
                    <i className="bx bxl-dribbble"></i>
                  </div>
                  <h4>
                    <a href="">Unlimited Guests</a>
                  </h4>
                  <p>
                    Tidak ada biaya tambahan untuk berapapun tamu yang diundang.
                  </p>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0"
                data-aos="fade-up"
                data-aos-delay="150"
              >
                <div className="icon-box">
                  <div className="icon">
                    <i className="bx bx-file"></i>
                  </div>
                  <h4>
                    <a href="">Love Stories</a>
                  </h4>
                  <p>
                    Ceritakan kisah cintamu kepada para undangan tamu beserta
                    foto selama menjalani kisah kasih.
                  </p>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="icon-box">
                  <div className="icon">
                    <i className="bx bx-tachometer"></i>
                  </div>
                  <h4>
                    <a href="">Send Wishes</a>
                  </h4>
                  <p>
                    Biarkan undangan untuk membagikan kesan & pesan ataupun doa
                    atas hari bahagiamu.
                  </p>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4"
                data-aos="fade-up"
                data-aos-delay="450"
              >
                <div className="icon-box">
                  <div className="icon">
                    <i className="bx bx-world"></i>
                  </div>
                  <h4>
                    <a href="">Photo Gallery</a>
                  </h4>
                  <p>
                    Bagikan foto/video momen spesialmu dengan pasangan kepada
                    para undangan.
                  </p>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <div className="icon-box">
                  <div className="icon">
                    <i className="bx bx-slideshow"></i>
                  </div>
                  <h4>
                    <a href="">RSVP</a>
                  </h4>
                  <p>
                    Estimasi pendataan jumlah kehadiran dari orang-orang yang
                    kamu sayangi.
                  </p>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4"
                data-aos="fade-up"
                data-aos-delay="750"
              >
                <div className="icon-box">
                  <div className="icon">
                    <i className="bx bx-arch"></i>
                  </div>
                  <h4>
                    <a href="">Background Music</a>
                  </h4>
                  <p>
                    Perkuat kesan dari acara spesialmu dengan musik pilihanmu di
                    undanganmu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <section id="portfolio" className="portfolio">
          <div className="container">
            <div className="section-title">
              <span>Portfolio</span>
              <h2>Portfolio</h2>
              <p>
                Sit sint consectetur velit quisquam cupiditate impedit suscipit
                alias
              </p>
            </div>

            <div className="row" data-aos="fade-up">
              <div className="col-lg-12 d-flex justify-content-center">
                <ul id="portfolio-flters">
                  <li data-filter="*" className="filter-active">
                    All
                  </li>
                  <li data-filter=".filter-app">App</li>
                  <li data-filter=".filter-card">Card</li>
                  <li data-filter=".filter-web">Web</li>
                </ul>
              </div>
            </div>

            <div
              className="row portfolio-container"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              <div className="col-lg-4 col-md-6 portfolio-item filter-app">
                <img
                  src="assets/img/portfolio/portfolio-1.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="portfolio-info">
                  <h4>App 1</h4>
                  <p>App</p>
                  <a
                    href="assets/img/portfolio/portfolio-1.jpg"
                    data-gallery="portfolioGallery"
                    className="portfolio-lightbox preview-link"
                    title="App 1"
                  >
                    <i className="bx bx-plus"></i>
                  </a>
                  <a
                    href="portfolio-details.html"
                    className="details-link"
                    title="More Details"
                  >
                    <i className="bx bx-link"></i>
                  </a>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item filter-web">
                <img
                  src="assets/img/portfolio/portfolio-2.jpg"
                  className="img-fluid"
                  alt="asd"
                />
                <div className="portfolio-info">
                  <h4>Web 3</h4>
                  <p>Web</p>
                  <a
                    href="assets/img/portfolio/portfolio-2.jpg"
                    data-gallery="portfolioGallery"
                    className="portfolio-lightbox preview-link"
                    title="Web 3"
                  >
                    <i className="bx bx-plus"></i>
                  </a>
                  <a
                    href="portfolio-details.html"
                    className="details-link"
                    title="More Details"
                  >
                    <i className="bx bx-link"></i>
                  </a>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item filter-app">
                <img
                  src="assets/img/portfolio/portfolio-3.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="portfolio-info">
                  <h4>App 2</h4>
                  <p>App</p>
                  <a
                    href="assets/img/portfolio/portfolio-3.jpg"
                    data-gallery="portfolioGallery"
                    className="portfolio-lightbox preview-link"
                    title="App 2"
                  >
                    <i className="bx bx-plus"></i>
                  </a>
                  <a
                    href="portfolio-details.html"
                    className="details-link"
                    title="More Details"
                  >
                    <i className="bx bx-link"></i>
                  </a>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item filter-card">
                <img
                  src="assets/img/portfolio/portfolio-4.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="portfolio-info">
                  <h4>Card 2</h4>
                  <p>Card</p>
                  <a
                    href="assets/img/portfolio/portfolio-4.jpg"
                    data-gallery="portfolioGallery"
                    className="portfolio-lightbox preview-link"
                    title="Card 2"
                  >
                    <i className="bx bx-plus"></i>
                  </a>
                  <a
                    href="portfolio-details.html"
                    className="details-link"
                    title="More Details"
                  >
                    <i className="bx bx-link"></i>
                  </a>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item filter-web">
                <img
                  src="assets/img/portfolio/portfolio-5.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="portfolio-info">
                  <h4>Web 2</h4>
                  <p>Web</p>
                  <a
                    href="assets/img/portfolio/portfolio-5.jpg"
                    data-gallery="portfolioGallery"
                    className="portfolio-lightbox preview-link"
                    title="Web 2"
                  >
                    <i className="bx bx-plus"></i>
                  </a>
                  <a
                    href="portfolio-details.html"
                    className="details-link"
                    title="More Details"
                  >
                    <i className="bx bx-link"></i>
                  </a>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item filter-app">
                <img
                  src="assets/img/portfolio/portfolio-6.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="portfolio-info">
                  <h4>App 3</h4>
                  <p>App</p>
                  <a
                    href="assets/img/portfolio/portfolio-6.jpg"
                    data-gallery="portfolioGallery"
                    className="portfolio-lightbox preview-link"
                    title="App 3"
                  >
                    <i className="bx bx-plus"></i>
                  </a>
                  <a
                    href="portfolio-details.html"
                    className="details-link"
                    title="More Details"
                  >
                    <i className="bx bx-link"></i>
                  </a>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item filter-card">
                <img
                  src="assets/img/portfolio/portfolio-7.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="portfolio-info">
                  <h4>Card 1</h4>
                  <p>Card</p>
                  <a
                    href="assets/img/portfolio/portfolio-7.jpg"
                    data-gallery="portfolioGallery"
                    className="portfolio-lightbox preview-link"
                    title="Card 1"
                  >
                    <i className="bx bx-plus"></i>
                  </a>
                  <a
                    href="portfolio-details.html"
                    className="details-link"
                    title="More Details"
                  >
                    <i className="bx bx-link"></i>
                  </a>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item filter-card">
                <img
                  src="assets/img/portfolio/portfolio-8.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="portfolio-info">
                  <h4>Card 3</h4>
                  <p>Card</p>
                  <a
                    href="assets/img/portfolio/portfolio-8.jpg"
                    data-gallery="portfolioGallery"
                    className="portfolio-lightbox preview-link"
                    title="Card 3"
                  >
                    <i className="bx bx-plus"></i>
                  </a>
                  <a
                    href="portfolio-details.html"
                    className="details-link"
                    title="More Details"
                  >
                    <i className="bx bx-link"></i>
                  </a>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item filter-web">
                <img
                  src="assets/img/portfolio/portfolio-9.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="portfolio-info">
                  <h4>Web 3</h4>
                  <p>Web</p>
                  <a
                    href="assets/img/portfolio/portfolio-9.jpg"
                    data-gallery="portfolioGallery"
                    className="portfolio-lightbox preview-link"
                    title="Web 3"
                  >
                    <i className="bx bx-plus"></i>
                  </a>
                  <a
                    href="portfolio-details.html"
                    className="details-link"
                    title="More Details"
                  >
                    <i className="bx bx-link"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        <section id="pricing" className="pricing">
          <div className="container">
            <div className="section-title">
              <span>Pilihan Harga</span>
              <h2>Pilihan Harga</h2>
              <p>Pilih paket sesuai kebutuhan mu</p>
            </div>
            <div className="row">
              <div
                className="col-lg-4 col-md-6"
                data-aos="zoom-in"
                data-aos-delay="150"
              >
                <div className="box">
                  <h3>Silver</h3>
                  <h4>
                    <sup>Rp</sup>99.000
                  </h4>
                  <ul>
                    <li>Masa Aktif 3 Bulan</li>
                    <li>Bahasa Indonesia / Inggris</li>
                    <li>Jumlah Tamu Tidak Terbatas</li>
                    <li>Custom Nama Tamu</li>
                    <li>Cover Pembuka</li>
                    <li>Detail Info Acara</li>
                    <li>Profil Pasangan</li>
                    <li>Protokol Kesehatan</li>
                    <li>Navigasi Lokasi</li>
                    <li>Tambahkan ke Google Calendar</li>
                    <li>Countdown Acara</li>
                    <li>Amplop Digital</li>
                    <li>Wedding Wishes</li>
                    <li className="na">Konfirmasi Kehadiran</li>
                    <li className="na">Background Music</li>
                    <li className="na">Galeri Foto</li>
                    <li className="na">Video Prewed</li>
                    <li className="na">Tombol Live Streaming</li>
                    <li className="na">Love Stories</li>
                  </ul>
                  <div className="btn-wrap">
                    {/* <a href="#" className="btn-buy">
                      Buy Now
                    </a> */}
                    <a href="https://wa.me/082114103452" className="btn-buy">
                      Buy Now
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 mt-4 mt-md-0"
                data-aos="zoom-in"
              >
                <div className="box featured">
                  <h3>Gold</h3>
                  <h4>
                    <sup>Rp</sup>149.000
                  </h4>
                  <ul>
                    <li>Masa Aktif 3 Bulan</li>
                    <li>Bahasa Indonesia / Inggris</li>
                    <li>Jumlah Tamu Tidak Terbatas</li>
                    <li>Custom Nama Tamu</li>
                    <li>Cover Pembuka</li>
                    <li>Detail Info Acara</li>
                    <li>Profil Pasangan</li>
                    <li>Protokol Kesehatan</li>
                    <li>Navigasi Lokasi</li>
                    <li>Tambahkan ke Google Calendar</li>
                    <li>Countdown Acara</li>
                    <li>Amplop Digital</li>
                    <li>Wedding Wishes</li>
                    <li>Konfirmasi Kehadiran</li>
                    <li>Background Music</li>
                    <li>Galeri Foto</li>
                    <li className="na">Video Prewed</li>
                    <li className="na">Tombol Live Streaming</li>
                    <li className="na">Love Stories</li>
                  </ul>
                  <div className="btn-wrap">
                    <a href="https://wa.me/082114103452" className="btn-buy">
                      Buy Now
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 mt-4 mt-lg-0"
                data-aos="zoom-in"
                data-aos-delay="150"
              >
                <div className="box">
                  <h3>Diamond</h3>
                  <h4>
                    <sup>Rp</sup>199.000
                  </h4>
                  <ul>
                    <li>Masa Aktif 3 Bulan</li>
                    <li>Bahasa Indonesia / Inggris</li>
                    <li>Jumlah Tamu Tidak Terbatas</li>
                    <li>Custom Nama Tamu</li>
                    <li>Cover Pembuka</li>
                    <li>Detail Info Acara</li>
                    <li>Profil Pasangan</li>
                    <li>Protokol Kesehatan</li>
                    <li>Navigasi Lokasi</li>
                    <li>Tambahkan ke Google Calendar</li>
                    <li>Countdown Acara</li>
                    <li>Amplop Digital</li>
                    <li>Wedding Wishes</li>
                    <li>Konfirmasi Kehadiran</li>
                    <li>Background Music</li>
                    <li>Galeri Foto</li>
                    <li>Video Prewed</li>
                    <li>Tombol Live Streaming</li>
                    <li>Love Stories</li>
                  </ul>
                  <div className="btn-wrap">
                    <a href="https://wa.me/082114103452" className="btn-buy">
                      Buy Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center mt-3" style={{ color: "red" }}>
              Garansi 7 hari uang kembali
            </p>
          </div>
        </section>

        <section id="cta" className="cta">
          <div className="container" data-aos="zoom-in">
            <div className="text-center">
              <h3>Mulai Sekarang</h3>
              <p>
                Buat momen pernikahan Anda menjadi lebih istimewa dengan
                undangan pernikahan elektronik kami. Kami menghadirkan solusi
                modern untuk mengirim undangan elegan kepada keluarga dan
                teman-teman Anda. Dengan berbagai pilihan desain yang indah,
                Anda bisa menemukan undangan yang sesuai dengan gaya Anda.
              </p>
              <a className="cta-btn" href="#">
                Buat Undangan
              </a>
            </div>
          </div>
        </section>

        {/* <section id="team" className="team">
          <div className="container">
            <div className="section-title">
              <span>Team</span>
              <h2>Team</h2>
              <p>
                Sit sint consectetur velit quisquam cupiditate impedit suscipit
                alias
              </p>
            </div>
            <div className="row">
              <div
                className="col-lg-4 col-md-6 d-flex align-items-stretch"
                data-aos="zoom-in"
              >
                <div className="member">
                  <img src="assets/img/team/team-1.jpg" alt="" />
                  <h4>Walter White</h4>
                  <span>Chief Executive Officer</span>
                  <p>
                    Magni qui quod omnis unde et eos fuga et exercitationem.
                    Odio veritatis perspiciatis quaerat qui aut aut aut
                  </p>
                  <div className="social">
                    <a href="">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 d-flex align-items-stretch"
                data-aos="zoom-in"
              >
                <div className="member">
                  <img src="assets/img/team/team-2.jpg" alt="" />
                  <h4>Sarah Jhinson</h4>
                  <span>Product Manager</span>
                  <p>
                    Repellat fugiat adipisci nemo illum nesciunt voluptas
                    repellendus. In architecto rerum rerum temporibus
                  </p>
                  <div className="social">
                    <a href="">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 d-flex align-items-stretch"
                data-aos="zoom-in"
              >
                <div className="member">
                  <img src="assets/img/team/team-3.jpg" alt="" />
                  <h4>William Anderson</h4>
                  <span>CTO</span>
                  <p>
                    Voluptas necessitatibus occaecati quia. Earum totam
                    consequuntur qui porro et laborum toro des clara
                  </p>
                  <div className="social">
                    <a href="">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        <section id="why-us" className="why-us">
          <div className="container">
            <div className="row">
              <div className="col-lg-4" data-aos="fade-up">
                <div className="box">
                  <span>01</span>
                  <h4>Lorem Ipsum</h4>
                  <p>
                    Ulamco laboris nisi ut aliquip ex ea commodo consequat. Et
                    consectetur ducimus vero placeat
                  </p>
                </div>
              </div>
              <div
                className="col-lg-4 mt-4 mt-lg-0"
                data-aos="fade-up"
                data-aos-delay="150"
              >
                <div className="box">
                  <span>02</span>
                  <h4>Repellat Nihil</h4>
                  <p>
                    Dolorem est fugiat occaecati voluptate velit esse. Dicta
                    veritatis dolor quod et vel dire leno para dest
                  </p>
                </div>
              </div>
              <div
                className="col-lg-4 mt-4 mt-lg-0"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="box">
                  <span>03</span>
                  <h4>Ad ad velit qui</h4>
                  <p>
                    Molestiae officiis omnis illo asperiores. Aut doloribus
                    vitae sunt debitis quo vel nam quis
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="section-faq">
          <div class="container">
            <div class="text-center">
              <h3 class="fw-bold mb-5">Masih Ada Pertanyaan?</h3>
              {/* <p class="mt-3">
                Lorem ipsum dolor sit amet consectetur adipisicing.
              </p> */}
            </div>
            <div class="">
              <div class="accordion" id="accordionExample">
                <div class="accordion-item ">
                  <h2 class="accordion-header" id="headingOne">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Kenapa harus di NarrGather?
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      {/* <strong>This is the first item's accordion body.</strong>{" "}
                      It is shown by default, until the collapse plugin adds the
                      appropriate classes that we use to style each element.
                      These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify
                      any of this with custom CSS or overriding our default
                      variables. It's also worth noting that just about any HTML
                      can go within the <code>.accordion-body</code>, though the
                      transition does limit overflow. */}
                      Di NarrGather, kami menyediakan layanan pembuatan undangan
                      digital (e-invitation) dengan praktis, cepat, dan desain
                      yang elegan. Kalian tidak perlu ribet untuk memasukan data
                      sendiri. Karna semua proses desain, memasukkan data,
                      memasukkan gambar, dan lainnya semua dari kita. Jadi
                      kalian tinggal terima jadi aja deh sambil mempersiapkan
                      hal-hal lain yang perlu kalian persiapkan.
                    </div>
                  </div>
                </div>
                <div class="accordion-item mt-3">
                  <h2 class="accordion-header" id="headingTwo">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Apa itu Undangan Digital?
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      Undangan digital merupakan sebuah cara baru yang kekinian
                      untuk mengundang kerabat dan sanak saudara menghadiri
                      salah satu momen dalam hidup anda. Undangan digital
                      berbasis web. Jadi anda tidak perlu mencetak undangan
                      secara fisik. Karna konten undangan digital sudah mencakup
                      semua informasi yang kalian perlu sajikan.
                    </div>
                  </div>
                </div>
                <div class="accordion-item mt-3">
                  <h2 class="accordion-header" id="headingThree">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Apa keunggulan Undangan Digital dibandingkan Undangan
                      Fisik?
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      Seperti yang kami telah jelaskan sebelumnya. Keunggulan
                      undangan digital tentunya dari segi biaya nya yang lebih
                      murah dibandingkan membuat undangan fisik. Proses
                      pengerjaannya pun lebih cepat. Anda juga tidak perlu
                      khawatir dengan resiko salah cetak, karna setiap data bisa
                      diedit kapanpun. Yang tidak kalah menarik adalah fitur
                      didalam undangan digital. Kalian bisa menambahkan galeri
                      foto dan video, peta lokasi yang langsung terhubung dengan
                      google map, split invitation, ucapan real time, bisa
                      dilihat kapanpun, dan lainnya.
                    </div>
                  </div>
                </div>
                <div class="accordion-item mt-3">
                  <h2 class="accordion-header" id="headingFour">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      Pengerjaan berapa hari?
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      Proses pengerjaan sekitar 2-4 hari bergantung pada jumlah
                      antrian. Jadi kalau bisa dari H-7 sebelum deadline ya,
                      jangan mepet-mepet hehehe. Dan silahkan konsultasikan ke
                      kami dahulu untuk estimasi pembuatan ya ketika kalian mau
                      membuat undangan online.
                    </div>
                  </div>
                </div>
                <div class="accordion-item mt-3">
                  <h2 class="accordion-header" id="headingFive">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      Berapa lama masa berlaku undangan online?
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      Untuk saat ini undangan berlaku selamanya atau lieftime
                      selama Invistory masih ada.
                    </div>
                  </div>
                </div>
                {/* <div class="accordion-item mt-3">
                  <h2 class="accordion-header" id="headingFive">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      Berapa lama masa berlaku undangan online?
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                    Untuk saat ini undangan berlaku selamanya atau lieftime selama Invistory masih ada.
                    </div>
                  </div>
                </div> */}
                <div class="accordion-item mt-3">
                  <h2 class="accordion-header" id="headingFive">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      Saya butuh cepat! Apakah bisa dibantu?
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      Yap sangat bisa. Normal nya pengerjaan 2-4 hari dari form
                      diisi. Namun jika butuh lebih cepat, kami memiliki layanan
                      Prioritas (One Day Service). Dengan layanan ini, chat kamu
                      akan kami balas lebih cepat (prioritas). Pengerjaan
                      undangan dibawah 24 Jam. Untuk mendapatkan layanan ini
                      kamu bisa cek Price List.
                    </div>
                  </div>
                </div>
                <div class="accordion-item mt-3">
                  <h2 class="accordion-header" id="headingFive">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      Apakah undangannya hanya mengikuti template?
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      Undangan NarrGather (e-invitation) tidak bersifat kaku.
                      Untuk paket Carnation dan Adenium, template hanyalah base
                      dari undangan nya saja. Warna, isi konten, font, icon, dan
                      lainnya masih bisa di custom sesuai kebutuhan. Jika kamu
                      membutuhkan yang lebih fleksibel, pilih Paket Adenium.
                    </div>
                  </div>
                </div>
                <div class="accordion-item mt-3">
                  <h2 class="accordion-header" id="headingFive">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      Saya mau buat custom desain apakah bisa?
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      Tentunya bisa, untuk pemesanan di INVISTORY kamu bisa
                      sangat fleksibel bahkan bisa full custom! Untuk harga
                      SEMI-CUSTOM (custom yang cukup kompleks tapi masih
                      mempertahan template base Invistory) kena tambahan biaya
                      100K dari Paket Adenium, sedangkan untuk harga CUSTOM
                      (custom yang cukup kompleks dengan draft contoh desain
                      yang anda inginkan) kena biaya tambahan 200K – 300K dari
                      Paket Adenium. Silahkan konsultasikan terlebih dahulu
                      dengan tim kami.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <section id="contact" className="contact">
          <div className="container">
            <div className="section-title">
              <span>Contact</span>
              <h2>Contact</h2>
              <p>
                Sit sint consectetur velit quisquam cupiditate impedit suscipit
                alias
              </p>
            </div>
            <div className="row" data-aos="fade-up">
              <div className="col-lg-6">
                <div className="info-box mb-4">
                  <i className="bx bx-map"></i>
                  <h3>Our Address</h3>
                  <p>A108 Adam Street, New York, NY 535022</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="info-box  mb-4">
                  <i className="bx bx-envelope"></i>
                  <h3>Email Us</h3>
                  <p>contact@example.com</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="info-box  mb-4">
                  <i className="bx bx-phone-call"></i>
                  <h3>Call Us</h3>
                  <p>+1 5589 55488 55</p>
                </div>
              </div>
            </div>
            <div className="row" data-aos="fade-up">
              <div className="col-lg-6 ">
                <iframe
                  className="mb-4 mb-lg-0"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.88380837641915!2d106.72315979116583!3d-6.245151226275504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1856687f71b%3A0xc9383117e931027!2sYoungGuns%20BirdFarm!5e0!3m2!1sid!2sid!4v1692856962627!5m2!1sid!2sid"
                  frameBorder="0"
                  style={{ border: "0", width: "100%", height: "384px" }}
                  allowFullScreen
                ></iframe>
              </div>
              <div className="col-lg-6">
                <form
                  action="forms/contact.php"
                  method="post"
                  role="form"
                  className="php-email-form"
                >
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        placeholder="Your Name"
                        required
                      />
                    </div>
                    <div className="col-md-6 form-group mt-3 mt-md-0">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="Your Email"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      id="subject"
                      placeholder="Subject"
                      required
                    />
                  </div>
                  <div className="form-group mt-3">
                    <textarea
                      className="form-control"
                      name="message"
                      rows="5"
                      placeholder="Message"
                      required
                    ></textarea>
                  </div>
                  <div className="my-3">
                    <div className="loading">Loading</div>
                    <div className="error-message"></div>
                    <div className="sent-message">
                      Your message has been sent. Thank you!
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit">Send Message</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section> */}

        <footer id="footer">
          <div className="footer-top">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="footer-info">
                    <h3>Day</h3>
                    <p>
                      A108 Adam Street <br />
                      NY 535022, USA
                      <br />
                      <br />
                      <strong>Phone:</strong> +1 5589 55488 55
                      <br />
                      <strong>Email:</strong> info@example.com
                      <br />
                    </p>
                    <div className="social-links mt-3">
                      <a href="#" className="twitter">
                        <i className="bx bxl-twitter"></i>
                      </a>
                      <a href="#" className="facebook">
                        <i className="bx bxl-facebook"></i>
                      </a>
                      <a href="#" className="instagram">
                        <i className="bx bxl-instagram"></i>
                      </a>
                      <a href="#" className="google-plus">
                        <i className="bx bxl-skype"></i>
                      </a>
                      <a href="#" className="linkedin">
                        <i className="bx bxl-linkedin"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-6 footer-links">
                  <h4>Useful Links</h4>
                  <ul>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="#">Home</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="#">About us</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="#">Services</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="#">Terms of service</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="#">Privacy policy</a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-2 col-md-6 footer-links">
                  <h4>Our Services</h4>
                  <ul>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="#">Web Design</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="#">Web Development</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="#">Product Management</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="#">Marketing</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="#">Graphic Design</a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-4 col-md-6 footer-newsletter">
                  <h4>Our Newsletter</h4>
                  <p>
                    Tamen quem nulla quae legam multos aute sint culpa legam
                    noster magna
                  </p>
                  <form action="" method="post">
                    <input type="email" name="email" />
                    <input type="submit" value="Subscribe" />
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="copyright">
              &copy; Copyright{" "}
              <strong>
                <span>Day</span>
              </strong>
              . All Rights Reserved
            </div>
            <div className="credits">
              Designed by <a href="https://bootstrapmade.com/">NarrGather</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ClientPage;
