import React, { useState, useEffect } from "react";
import "./style.css";
import "./ExpenseLogin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const DataDashboard = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalInvitations, setTotalInvitations] = useState(0);
  const [totalInvitees, setTotalInvitees] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Get the token from the cookie
        const token = Cookies.get("token");

        const response = await axios.get("http://localhost:8000/api/v1/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Filter users based on the 'verified' attribute
        const verifiedUsers = response.data.data.users.filter(
          (user) => user.verified === true
        );
        setUsers(verifiedUsers);

        // Set the total number of users
        setTotalUsers(verifiedUsers.length);
      } catch (error) {
        console.error("Error fetching users:", error);
        // If there's an error or the token is invalid, navigate to the /who page
      }
    };

    fetchUsers();
  }, [navigate]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        // Get the token from the cookie
        const token = Cookies.get("token");

        // if (!token) {
        //   // Token not found in cookie, handle the case accordingly
        //   console.log("Token not found in cookie");
        //   navigate("/who?");
        //   return;
        // }

        const response = await axios.get(
          "http://localhost:8000/api/v1/user/user-info",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data.data.user);
      } catch (error) {
        // Handle error jika terjadi masalah saat mengambil data pengguna
        console.log("Error:", error);
      }
    };

    getUserData();
  }, [navigate]);

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        // Get the token from the cookie
        const token = Cookies.get("token");

        if (!token) {
          // Handle token not found in cookie
          console.log("Token not found in cookie");
          navigate("/who?");
          return;
        }

        const response = await axios.get(
          "http://localhost:8000/api/v1/invitation",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Set the total number of invitations
        setTotalInvitations(response.data.data.invitations.length);
      } catch (error) {
        console.error("Error fetching invitations:", error);
        // Handle error or navigate to /who page
        navigate("/who?");
      }
    };

    fetchInvitations();
  }, [navigate]);

  useEffect(() => {
    const fetchInvitees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/foryous"
        );

        // Set the total number of invitees
        setTotalInvitees(response.data.data.foryous.length);
      } catch (error) {
        console.error("Error fetching invitees:", error);
      }
    };

    fetchInvitees();
  }, []);

  return (
    <>
      <div className="row page-titles mx-0">
        <div className="col-sm-6 p-md-0">
          <div className="welcome-text">
            <h4>Hi, {user ? user.name : ""}, welcome back!</h4>
            <p className="mb-0">Manage your business dashboard</p>
          </div>
        </div>
        {/* <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="javascript:void(0)">Layout</a>
            </li>
            <li className="breadcrumb-item active">
              <a href="javascript:void(0)">Blank</a>
            </li>
          </ol>
        </div> */}
      </div>

      <div className="row">
        <div className="col-lg-3 col-sm-6">
          <div className="card">
            <div className="stat-widget-one card-body d-flex align-items-center">
              <div className="img-dat ">
                <img
                  style={{ width: "60%", maxWidth: "100%" }}
                  src="./user-gear.png"
                  className="ti-money text-success border-success"
                  alt="Image"
                />
              </div>
              <div className="text-data">
                <div className="stat-text">Admin</div>
                <div className="stat-digit">{totalUsers}</div>{" "}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-sm-6">
          <div className="card">
            <div className="stat-widget-one card-body d-flex align-items-center">
              <div className="img-dat">
                <img
                  style={{ width: "60%" }}
                  src="./invitation.png"
                  className="ti-money text-success border-success"
                  alt="Image"
                />
              </div>
              <div className="text-data">
                <div className="stat-text">Invitation</div>
                <div className="stat-digit">{totalInvitations}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-sm-6">
          <div className="card">
            <div className="stat-widget-one card-body d-flex align-items-center">
              <div className="img-dat">
                <img
                  style={{ width: "60%" }}
                  src="./customer-satisfaction.png"
                  className="ti-money text-success border-success"
                  alt="Image"
                />
              </div>
              <div className="text-data">
                <div className="stat-text">Invitees</div>
                <div className="stat-digit">{totalInvitees}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-sm-6">
          <div className="card">
            <div className="stat-widget-one card-body d-flex align-items-center">
              <div className="img-dat">
                <img
                  style={{ width: "60%" }}
                  src="./customer-feedback.png"
                  className="ti-money text-success border-success"
                  alt="Image"
                />
              </div>
              <div className="text-data">
                <div className="stat-text">Customer Feedback</div>
                <div className="stat-digit">2,781</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataDashboard;
