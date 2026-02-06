import React, { useEffect, useState } from "react";
import instance from "../../api/axios";

const Profile = () => {
  const [user, setUser] = useState(null);

  const getUserProfile = async () => {
    try {
      const res = await instance.get("/auth/profile");
      return res.data;
    } catch (error) {
      console.log("Profile Fetch Error:", error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  };


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getUserProfile();
        setUser(res.user);
      } catch (error) {
        console.log("Failed to load profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h2>User Profile</h2>

      {user ? (
        <div>
          <p><b>Name:</b> {user.Name}</p>
          <p><b>Email:</b> {user.Email}</p>
          <p><b>Mobile:</b> {user.Mobile}</p>
          <p><b>DOB:</b> {user.DOB}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
