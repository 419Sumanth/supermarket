import React, { useEffect, useState } from "react";
import { FaLock, FaSignOutAlt, FaEnvelope, FaPhoneAlt,FaBirthdayCake, FaShoppingCart } from "react-icons/fa";
import authApi from "../../api/authApi";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const logout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await authApi.getProfile();
        setUser(res.data.user);
      } catch (error) {
        console.log("Failed to load profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const ProfileItem = ({ icon, text }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ fontSize: "18px" }}>{icon}</span>
        <span style={{ fontSize: "15px", fontWeight: "500" }}>{text}</span>
      </div>
    </div>
  );
};

  return (
    <div>
      <h4 style={{ textAlign: "left", marginBottom: "20px", color: "#0c0d0e" }}>
        User Profile
      </h4>

      {user ? (
        <div
            style={{

              display: "flex",
              justifyContent: "center",
              marginLeft:"50px"
            }}
          >
            <div
              style={{
                width: "400px",
                background: "#f3f4f6",
                borderRadius: "30px",
                padding: "25px",
              }}
            >

              {/* Avatar */}
              <div style={{ textAlign: "center", marginBottom: "25px" }}>
                <div
                  style={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "50%",
                    background: "#e5e7eb",
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "30px",
                    fontWeight: "700",
                    color: "#111827"
                  }}
                >
                  {user?.Name?.charAt(0)}
                </div>

                <h3 style={{ margin: "12px 0 4px", fontSize: "18px" }}>
                  {user?.Name}
                </h3>

                <p style={{ margin: 0, color: "gray", fontSize: "14px" }}>
                  @{user?.Email?.split("@")[0]}
                </p>

                <button
                  style={{
                    marginTop: "15px",
                    padding: "10px 25px",
                    background: "black",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontWeight: "600"
                  }}
                > 
                  Edit Profile
                </button>
             </div>
             <hr style={{ border: "0.5px solid #e5e7eb", marginBottom: "15px" }} />

              {/* Menu Items */}
              <div style={{ display: "flex", flexDirection: "column", gap: "15px", }}>
                <ProfileItem icon={<FaEnvelope />} text={user.Email} />
                <ProfileItem icon={<FaPhoneAlt />} text= {user.Mobile} />
                <ProfileItem icon={<FaBirthdayCake />} text= {user.DOB} />
                <ProfileItem icon={<FaLock />} text="Change Password" />

                <hr style={{ border: "0.5px solid #e5e7eb" }} />

                 <a href="/user/orders" style={{fontSize:"16px", color:"black", textDecoration:"none"}}><FaShoppingCart/> <p style={{marginLeft:"10px", display:"inline"}}> Go to my Orders</p></a>
                 <button 
                    className="btn btn-outline-light" 
                    onClick={logout}
                    style={{
                      marginTop: "15px",
                      padding: "10px 25px",
                      background: "black",
                      color: "white",
                      border: "none",
                      borderRadius: "12px",
                      cursor: "pointer",
                      fontWeight: "600"
                    }}
                 >
                    <FaSignOutAlt/> Logout
                  </button>
              </div>
            </div>
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "gray" }}>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
