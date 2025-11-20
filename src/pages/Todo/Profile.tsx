import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Todo.css";
import { changePassword, logoutUser } from "../../api/userApi";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  // Placeholder for user data

  //load user with API
  const user = {
    profilePicture: "https://via.placeholder.com/150",
    name: "John Doe",
    email: "john.doe@example.com",
  };

  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      if (res.data) {
      }
      console.log("User logged out");
    } catch (error) {
      console.error(error);
      navigate("/login");
    }
  };

  const handleChangePassword = async (newPass: string, currentPass: string) => {
    try {
      const res = await changePassword(newPass, currentPass);
      if (res.data) {
        console.log("Password changed successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>

      <div className="profile-picture-section">
        <img
          src={user.profilePicture}
          alt="Profile"
          className="profile-picture"
        />
        {/* Optionally, add an upload button for profile picture */}
        {/* <button className="btn">Change Picture</button> */}
      </div>

      <div className="profile-details">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>

      <div className="profile-actions">
        <button
          onClick={() => handleChangePassword}
          className="btn btn-primary"
        >
          Change Password
        </button>
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
