// src/App.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import SignUp from "./components/SignUp";

function App() {
  const { user, userProfile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user && userProfile) {
      // Redirect authenticated users based on their role
      if (userProfile.role === 'admin') {
        navigate('/Admin');
      } else {
        navigate('/Shop');
      }
    }
  }, [user, userProfile, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#173D54]">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Show SignUp page for non-authenticated users
  return (
    <>
      <SignUp />
    </> 
  );
}

export default App;