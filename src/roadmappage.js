import { useLocation } from 'react-router-dom';
import './Roadmap.css';
import React, { useEffect,useState } from "react";
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from './firebase';
import { auth, signOut } from './firebase';
import userimg from './img/sample-user.png';
import userimg2 from './img/sample-user2.png';

const RoadmapPage = () => {
  const sampleImages = [userimg, userimg2];
  function getProfileImg(user) {
    if (user && user.photoURL) return user.photoURL;
    const img = sampleImages[Math.floor(Math.random() * sampleImages.length)];
    console.log('Profile fallback image:', img);
    return img;
  }
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { roadmap, title } = location.state || {};

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleProfileClick = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setShowDropdown(false);
  };

  if (!roadmap || !title) {
    return (
      <div className="roadmap-container">
        <header className="roadmap-header">
          <h1>No Roadmap Found</h1>
          <button onClick={() => navigate('/')} className="back-button">
            Go Back Home
          </button>
        </header>
      </div>
    );
  }

  return (
    <div className="roadmap-container">
      {/* Header Section */}
      <div className="header">
        <h1 className="homepage-header-title">PathGenius</h1>
        {user ? (
          <div className="profile" style={{ position: 'relative' }}>
            <img
              src={getProfileImg(user)}
              alt="Profile"
              className="profile-img"
              style={{ width: 40, height: 40, borderRadius: '50%', cursor: 'pointer' }}
              onClick={handleProfileClick}
            />
            {showDropdown && (
              <div className="profile-dropdown" style={{ position: 'absolute', top: 50, right: 0, background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', borderRadius: 8, zIndex: 10 }}>
                <button onClick={() => { setShowDropdown(false); navigate('/user-details'); }} style={{ fontWeight: '700', padding: '10px 20px', border: 'none', background: 'none', cursor: 'pointer', width: '100%' }}>User Details</button>
                <button onClick={handleLogout} style={{ padding: '10px 20px', border: 'none', fontWeight: '700', background: 'none', cursor: 'pointer', width: '100%' }}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <button className="homepage-login-btn" onClick={() => navigate('/login')}>Login-In</button>
        )}
      </div>

      {/* Main Content */}
      <main className="roadmap-content">
        <div className="roadmap-actions">
          <button onClick={() => navigate('/')} className="back-button">
            ← Back to Generator
          </button>
          <button
            onClick={() => window.print()}
            className="print-button"
          >
            Print Roadmap
          </button>
        </div>

        <div className="roadmap-text">
          {roadmap.split('\n').map((paragraph, index) => {
            if (paragraph.startsWith('#')) {
              const level = paragraph.match(/^#+/)[0].length;
              const text = paragraph.replace(/^#+\s*/, '');
              return React.createElement(
                `h${level}`,
                { key: index, className: `heading-${level}` },
                text
              );
            }
            return <p key={index}>{paragraph}</p>;
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="roadmap-footer">
        <p>© {new Date().getFullYear()} Learning Roadmap Generator</p>
        <p>Powered by Gemini AI</p>
      </footer>
    </div>
  );
};

export default RoadmapPage;