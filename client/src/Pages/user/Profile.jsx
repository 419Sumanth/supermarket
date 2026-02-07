import React, { useEffect, useState } from "react";
import authApi from "../../api/authApi";

const Profile = () => {
  const [user, setUser] = useState(null);

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

  return (

    
  
    <div
  // style={{
  //   maxWidth: "600px",
  //   margin: "30px auto",
  //   padding: "30px 50px",
  //   background: "#fff",
  //   border: "1px solid #e5e7eb",
  //   borderRadius: "12px",
  //   boxShadow: "0px 4px 12px rgba(0,0,0,0.1)"
  // }}
>
   <h2 style={{ textAlign: "left", marginBottom: "20px", color: "#0c0d0e" }}>
    User Profile
  </h2>
 

  {user ? (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        borderRadius: "10px",
        overflow: "hidden",
        padding: "20px",
        // border: "1px solid #e5e7eb",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        // background: "#fff"
        // borderRadius: "10px",
      }}
    >
      <tbody>
        <tr style={{ background: "#ffffff" }}>
          <td style={{ padding: "20px", fontWeight: "600", width: "40%" }}>
            Name
          </td>
          <td style={{ padding: "20px" }}>{user.Name}</td>
        </tr>

        <tr>
          <td style={{ padding: "20px", fontWeight: "600" }}>Email</td>
          <td style={{ padding: "20px" }}>{user.Email}</td>
        </tr>

        <tr style={{ background: "#ffffff" }}>
          <td style={{ padding: "20px", fontWeight: "600" }}>Mobile</td>
          <td style={{ padding: "20px" }}>{user.Mobile}</td>
        </tr>

        <tr>
          <td style={{ padding: "20px", fontWeight: "600" }}>DOB</td>
          <td style={{ padding: "20px" }}>{user.DOB}</td>
        </tr>
      </tbody>
    </table>
  ) : (
    <p style={{ textAlign: "center", color: "gray" }}>Loading profile...</p>
  )}
</div>
     

  );
};

export default Profile;
