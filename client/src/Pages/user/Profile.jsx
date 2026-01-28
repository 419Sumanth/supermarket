import { useEffect, useState } from "react";
import authApi from "../../api/authApi";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "",
    createdAt: "",
  });

  const [loading, setLoading] = useState(false);

  // Load user profile
  const fetchProfile = async () => {
    try {
      const res = await authApi.getProfile();
      setProfile(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const changeHandler = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await authApi.updateProfile({
        name: profile.name,
        phone: profile.phone,
        address: profile.address,
      });
      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
      alert("Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h4 className="mb-3">My Profile</h4>

        <form onSubmit={submitHandler}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                name="name"
                value={profile.name}
                onChange={changeHandler}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                className="form-control"
                value={profile.email}
                disabled
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Phone</label>
              <input
                className="form-control"
                name="phone"
                value={profile.phone}
                onChange={changeHandler}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Role</label>
              <input
                className="form-control"
                value={profile.role}
                disabled
              />
            </div>

            <div className="col-md-12">
              <label className="form-label">Address</label>
              <textarea
                className="form-control"
                name="address"
                rows="2"
                value={profile.address}
                onChange={changeHandler}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Account Created</label>
              <input
                className="form-control"
                value={
                  profile.createdAt
                    ? new Date(profile.createdAt).toLocaleDateString()
                    : ""
                }
                disabled
              />
            </div>
          </div>

          <button
            className="btn btn-primary mt-3"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
