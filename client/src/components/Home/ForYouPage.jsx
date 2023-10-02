import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Carousel, Modal } from "react-bootstrap";
import Footer from "../Expenses/Footer";
import "./ForYouPage.css";

const ForYouPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("to");
  const [showGiftModal, setShowGiftModal] = useState(false); // State untuk mengontrol modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [invitationData, setInvitationData] = useState(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isInvitationOpened, setIsInvitationOpened] = useState(false);
  const [wishText, setWishText] = useState("");
  const [senderName, setSenderName] = useState("");
  const [copiedText, setCopiedText] = useState("");
  const [isScreenFlashing, setIsScreenFlashing] = useState(false);

  // Pisahkan URL path untuk mendapatkan urlCouple
  const urlParts = location.pathname.split("/");
  const urlCouple = urlParts[2]; // Ambil nilai dari posisi indeks 2

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);

    setTimeout(() => {
      setCopiedText("");
    }, 2000);
  };

  const handleOpenGiftModal = () => {
    setShowGiftModal(true);
  };

  const handleCloseGiftModal = () => {
    setShowGiftModal(false);
  };

  const handleOpenInvitationClick = () => {
    setIsMusicPlaying(true);
    setIsInvitationOpened(true);

    // Mulai animasi layar hitam
    setIsScreenFlashing(true);

    // Hentikan animasi setelah 1 detik (1000 milidetik)
    setTimeout(() => {
      setIsScreenFlashing(false);
    }, 1000);
  };

  const handlePauseClick = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const formatDate = (rawDate) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(rawDate);
    return date.toLocaleDateString("en-US", options);
  };

  const handleReloadPage = () => {
    const dynamicURL = `/wedding/${encodeURIComponent(
      urlCouple
    )}/?to=${encodeURIComponent(name)}`;
    window.location.href = dynamicURL;
  };

  useEffect(() => {
    const fetchInvitationDataByName = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/invitation/search/${urlCouple}`
        );
        const data = await response.json();
        setInvitationData(data.data);

        console.log("Data from API:", data.data);
      } catch (error) {
        console.error("Error fetching invitation data:", error);
      }
    };

    if (urlCouple) {
      fetchInvitationDataByName();
    }
  }, [urlCouple]);

  useEffect(() => {
    const audioElement = document.getElementById("backgroundMusic");
    if (isMusicPlaying) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }, [isMusicPlaying]);

  const handleWishSubmit = async (e) => {
    e.preventDefault();

    try {
      if (invitationData?.invitation?.id) {
        const response = await fetch(
          "http://localhost:8000/api/v1/wishes/create-wishes",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: senderName,
              wish: wishText,
              invitation_id: invitationData.invitation.id,
            }),
          }
        );

        if (response.ok) {
          console.log("Wish sent successfully");
          setShowSuccessModal(true);
        } else {
          console.error("Failed to send wish");
        }
      }
    } catch (error) {
      console.error("Error sending wish:", error);
    }
  };

  return (
    <>
      <div className="main">
        <audio id="backgroundMusic" hidden loop src="/weddingsong2.mp3" />

        <div
          style={{
            backgroundImage: `url(${invitationData?.invitation?.image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: "100%",
            height: "100vh",
            position: "relative",
            filter: "brightness(80%)",
            paddingTop: "55px",
          }}
        >
          <div className="opening text-center">
            {isInvitationOpened ? (
              <>
                <div className="main-open">
                  <p className="text-white">WE ARE GETTING MARRIED</p>
                  <h1 className="text-white">
                    {invitationData?.invitation?.groom} &{" "}
                    {invitationData?.invitation?.bride}
                  </h1>
                  <p className="text-white">
                    {formatDate(invitationData?.invitation?.date)}
                  </p>
                </div>
                <Button
                  style={{
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "transparent",
                    alignItems: "center",
                    padding: 0,
                  }}
                  className="pause-button"
                  onClick={handlePauseClick}
                  variant="secondary"
                >
                  {isMusicPlaying ? (
                    <img
                      style={{ width: "100%", height: "auto" }}
                      src="/resume.png"
                      alt="Resume"
                    />
                  ) : (
                    <img
                      style={{ width: "100%", height: "auto" }}
                      src="/pause.png"
                      alt="Pause"
                    />
                  )}
                </Button>
              </>
            ) : (
              <>
                <div className="dear-open">
                  <p className="text-white">Dear, {name}</p>
                  <p
                    className="text-white you-inv"
                    style={{ fontFamily: "Gilda Display, serif" }}
                  >
                    You're Invited!
                  </p>

                  <p
                    className="text-white clb"
                    style={{ fontFamily: "Gilda Display, serif" }}
                  >
                    The Wedding Celebration of
                  </p>
                  <div className="couple">
                    <p
                      className="text-white"
                      style={{
                        fontSize: "120px",
                        fontFamily: "Playball, cursive",
                      }}
                    >
                      {invitationData?.invitation?.groom}
                    </p>
                    <p
                      className="text-white"
                      style={{
                        fontSize: "50px",
                        fontFamily: "Playball, cursive",
                        marginBottom: "-40px",
                        marginTop: "-40px",
                      }}
                    >
                      &
                    </p>
                    <p
                      className="text-white"
                      style={{
                        fontSize: "120px",
                        fontFamily: "Playball, cursive",
                      }}
                    >
                      {invitationData?.invitation?.bride}
                    </p>
                  </div>
                </div>
                <Button
                  className="open-inv"
                  onClick={handleOpenInvitationClick}
                >
                  <img
                    style={{ width: "15%", marginRight: "5px" }}
                    src="/open-icon.png"
                    alt="Open Invitation"
                  />
                  Open Invitation
                </Button>
              </>
            )}
          </div>
        </div>
        <div
          className={`flashing-overlay ${isScreenFlashing ? "active" : ""}`}
        />
      </div>
      {isInvitationOpened && (
        <div className="invitation-body">
          <div className="section-1">
            <div className="desc-quotes" style={{}}>
              <div style={{ width: "470px" }}>
                <p className="text-center">
                  {/* "Cinta adalah ikatan yang menghubungkan dua jiwa menjadi satu.
                  Di hadapan Allah dan orang-orang yang kita cintai, hari ini
                  kita bersumpah untuk mencintai dan menghargai satu sama lain
                  selamanya." */}
                  {invitationData?.invitation?.quotes}
                </p>
                <p className="text-center mt-5">
                  {" "}
                  {invitationData?.invitation?.quoter}
                </p>
              </div>
            </div>

            <div className="row-12 couple-img">
              <div className="col-4 img1">
                <img
                  src="/pororo.jpg"
                  style={{ width: "83%", borderRadius: "20px" }}
                  alt="Image 1"
                />
                <div className="image-text">
                  <p className="cpl-married">
                    {invitationData?.invitation?.groom}
                  </p>
                  <p className="parents">The son of</p>
                  <p className="parents">
                    Mr. {invitationData?.invitation?.groomDad}
                  </p>
                  <p className="parents">
                    & Mrs {invitationData?.invitation?.groomMom}
                  </p>
                </div>
              </div>
              <div className="col-4 img2">
                <img
                  src="/pororo.jpg"
                  style={{ width: "83%", borderRadius: "20px" }}
                  alt="Image 2"
                />
                <div className="image-text">
                  <p className="cpl-married">
                    {invitationData?.invitation?.bride}
                  </p>
                  <p className="parents">The daughter of</p>
                  <p className="parents">
                    Mr. {invitationData?.invitation?.brideDad}
                  </p>
                  <p className="parents">
                    & Mrs {invitationData?.invitation?.brideMom}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="section-2">
            <h1 className="title-sect">Counting Down</h1>
            <p className="countdown">12 : 12 : 12 : 12 </p>
            <a href="https://calendar.google.com" target="_blank">
              <button>Add Calendar</button>
            </a>
            <h1 className="title-sect mt-5">Reception</h1>
            <p>{formatDate(invitationData?.invitation?.date)}</p>
            <p>{invitationData?.invitation?.time}</p>
            <p>{invitationData?.invitation?.place}</p>
            <p>{invitationData?.invitation?.address}</p>
            <a href={invitationData?.invitation?.linkMap} target="_blank">
              <button>View Location</button>
            </a>
          </div>

          <div className="section-3">
            <h1 className="title-sect">Our Story</h1>
            <Carousel
              prevIcon={
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
              }
              nextIcon={
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
              }
            >
              {invitationData?.invitation?.stories.map((story, index) => (
                <Carousel.Item key={index}>
                  <div className="carousel-content">
                    <img
                      src={story.image}
                      alt="Story"
                      style={{
                        maxWidth: "10%", // Gambar tidak akan melebihi lebar wadah
                        height: "auto", // Tinggi gambar disesuaikan agar proporsi terjaga
                      }}
                    />
                    <h1 style={{ color: "black" }}>{story.year}</h1>
                    <p style={{ color: "black" }}>{story.description}</p>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>

          <div className="section-4">
            <h1 className="title-sect">Virtual Blessings</h1>
            <p>
              Hopefully this limitation does not reduce happiness for both of us
              and does not eliminate the blessings from all of <br />
              you. Your prayer for our marriage is the greatest gift of all.
            </p>
            <button className="gift-btn" onClick={handleOpenGiftModal}>
              Send Gift
            </button>
          </div>

          <div className="section-5">
            <div className="rsvp">
              <h1 className="title-sect text-center">RSVP</h1>
              <p>Will you join with us?</p>
              <label>
                <input type="radio" name="rsvpOption" value="yes" />
                Definitely Yes
              </label>
              <br />
              <label>
                <input type="radio" name="rsvpOption" value="doubtful" />
                doubtful
              </label>
              <br />
              <label>
                <input type="radio" name="rsvpOption" value="no" />
                Sorry, I Can't Attend Your Wedding
              </label>

              <p>Full Name</p>
              <input
                className="input-rsvp"
                type="text"
                placeholder="  Full Name"
                aria-label="Full Name"
                required
              />
              <br />
              <button>Submit</button>
            </div>
          </div>

          <div className="section-6">
            <h1 className="title-sect">Send Wishes</h1>
            <button className="wish-btn">
              <img
                style={{ width: "10%", marginBottom: "3px" }}
                src="/wish.png"
              />
              <a href="#wishes">Write your wish</a>
            </button>

            <div
              className="wish-list"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                overflowY: "auto",
                maxHeight: "320px", // Tentukan tinggi maksimal untuk menampilkan 5 item
              }}
            >
              {invitationData?.invitation?.wishes.map((wish) => (
                <div style={{ backgroundColor: "grey" }} key={wish.id}>
                  <h4>{wish.name}</h4>
                  <p>{wish.wish}</p>
                </div>
              ))}
              {/* Item berikutnya akan muncul dengan scroll jika lebih dari 5 */}
            </div>

            <form onSubmit={handleWishSubmit}>
              <input
                type="text"
                id="wishes"
                placeholder="Write Your Wishes"
                aria-label="wish"
                required
                value={wishText}
                onChange={(e) => setWishText(e.target.value)}
              />
              <br />
              <input
                type="text"
                className="wishes-name"
                placeholder="Your Name"
                aria-label="name"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
              />
              <br />
              <Button type="submit">Submit</Button>
            </form>

            <div className="thankyou-couple mt-5">
              <h5 className="title-sect">Thank You</h5>
              <h1 className="title-sect">
                {invitationData?.invitation?.groom} &{" "}
                {invitationData?.invitation?.bride}
              </h1>
            </div>
          </div>
          <Footer />
        </div>
      )}

      <Modal
        show={showGiftModal}
        onHide={handleCloseGiftModal}
        dialogClassName="custom-modal"
      >
        <Modal.Body className="custom-modal-body">
          <button className="close-button" onClick={handleCloseGiftModal}>
            {/* Tambahkan logo silang di sini */}
            <img src="/close-btn.png" alt="Close" />
          </button>
          <h1 className="text-center text-white">Virtual Blessings</h1>
          <div className="banks-container">
            {invitationData?.invitation?.banks.map((bank, index) => (
              <div className="bank-card" key={index}>
                <img
                  style={{ width: "55%", marginTop: "20px" }}
                  src={bank.imageQR}
                  alt={`Bank QR Code for ${bank.nameBank}`}
                />
                <h4 className="mt-5">{bank.nameBank}</h4>
                <p>{bank.noRek}</p>
                <p>{bank.bankOwner}</p>
                <button
                  style={{ marginTop: "30px" }}
                  onClick={() => handleCopyText(bank.noRek)}
                >
                  Copy Number
                </button>
                {copiedText === bank.noRek && <p>Copied!</p>}
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        dialogClassName="custom-modal-2"
        show={showSuccessModal}
        onHide={handleCloseSuccessModal}
      >
        <Modal.Body className="custom-modal-body-2">
          <button
            className="close-button"
            onClick={handleCloseSuccessModal}
            onClick={handleReloadPage}
          >
            {/* Tambahkan logo silang di sini */}
            <img src="/close-btn.png" alt="Close" />
          </button>
          Your wish has been successfully sent
          <br />
          <img className="thx" src="/thx.png" />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ForYouPage;
