import React, { useState, useEffect } from 'react';
import googleIcon from './img/Google_Icons.webp';
import Spline from '@splinetool/react-spline';
import { Link, useNavigate } from 'react-router-dom';
import {
  auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  googleProvider
} from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './styles.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768); 
    };
  
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      setShowSuccessPopup(true);
      setTimeout(() => {
        navigate('/home'); // Redirect to home.js route after login
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        await auth.signOut();
        navigate('/signup', {
          state: {
            email: user.email,
            message: 'Please complete signup to finish account setup.'
          }
        });
        return;
      }
      
      setShowSuccessPopup(true);
      setTimeout(() => {
        navigate('/'); // Redirect to home.js route after Google login
      }, 2000);
    } catch (err) {
      console.error('Google Sign-in error:', err);
      setError(err.message || 'Google Sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="background">
    {showSuccessPopup && (
      <div className="success-popup">
        <div className="popup-content">
          <h3>Login Successful!</h3>
          <p>Redirecting to your Home page...</p>
        </div>
      </div>
    )}
      
      <div className="left">
        <div className="auth-container">
          <h2>Login</h2>
          {error && <div className="auth-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div className="links">
            <Link to="/forgot-password">Forgot Password?</Link>
            <Link
              to="/signup"
              onClick={async () => {
                try {
                  await auth.signOut();
                } catch (err) {
                  console.log('Sign out error:', err);
                }
              }}
            >
              Don't have an account? Sign Up
            </Link>
          </div>
          <br />
          <div className="social-login">
            <p className="divider">Or continue with</p>
            <button
              onClick={handleGoogleSignIn}
              className="google-button"
              disabled={loading}
            >
              <img
                src={googleIcon}
                alt="Google logo"
                className="google-logo"
              />
              Continue with Google
            </button>
          </div>
        </div>
      </div>

      {!isMobile && (
        <div className="right">
          <Spline
            scene="https://prod.spline.design/QtVIVF7r-NuDLzPt/scene.splinecode" 
          />
        </div>
      )}
    </div>
  );
};

export default Login;