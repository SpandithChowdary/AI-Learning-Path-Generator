import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home';
import RoadmapPage from './roadmappage';
import Login from './components/login';
import Signup from './components/signup';
import ForgotPassword from './components/forgot-password';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, auth } from './firebase';
import UserDetails from './UserDetails';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/roadmappage" element={<RoadmapPage />} />
        <Route path="/user-details" element={<UserDetails/>} />
      </Routes>
    </Router>
  );
}

export default App;
