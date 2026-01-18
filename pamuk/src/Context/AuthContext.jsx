import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Restore user on refresh by validating token with backend
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (data.success) {
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          // token invalid or expired
          localStorage.removeItem("auth-token");
          localStorage.removeItem("user");
          setUser(null);
        }
      } catch (err) {
        console.error("Auth restore failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ✅ Login helper
  const login = (userData, token) => {
    localStorage.setItem("auth-token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // ✅ Logout helper
  const logout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

