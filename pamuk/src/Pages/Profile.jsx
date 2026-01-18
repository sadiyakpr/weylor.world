import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext"; // ✅ ensure path matches your folder
import "./CSS/Profile.css";
import login_user_img from '../Assets/login_user2.svg'

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (!token || user) return;

    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:4000/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setUser(data.user);
        } else {
          setError("Unable to fetch profile. Please login again.");
        }
      } catch (err) {
        setError("Server error. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user, setUser]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!user) return <p>Please login to view your profile.</p>;

  return (
    <section className="profile">
      <div className="profile-container">
        {/* LEFT CARD */}
        <div className="profile-info">
          <img
            src={login_user_img} // replace with user.avatar if available
            alt="User avatar"
            className="profile-avatar"
          />
          <h2>{user.username}</h2>
          <p>{user.email}</p>
        </div>

        {/* RIGHT CARD */}
        <div className="profile-details">
          <h3>Account Details</h3>

          <div className="profile-block">
            <h4>Username</h4>
            <p>{user.username}</p>
          </div>

          <div className="profile-block">
            <h4>Email</h4>
            <p>{user.email}</p>
          </div>

          {/* Add more blocks if backend returns more fields */}
        </div>
      </div>
    </section>
  );
};

export default Profile;
