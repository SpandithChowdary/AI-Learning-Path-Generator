import React, { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import googleIcon from './img/Google_Icons.webp';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  fetchSignInMethodsForEmail
} from 'firebase/auth';
import { db } from '../firebase';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import './styles.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    setLoading(true);
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      
      const userRef = doc(db, 'users', userCredential.user.uid);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          email: userCredential.user.email,
          createdAt: serverTimestamp(),
          provider: 'email',
          displayName: userCredential.user.displayName || null,
          photoURL: userCredential.user.photoURL || null
        });
      }
      
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('./login', { 
          state: { 
            signupSuccess: true,
            email: formData.email 
          } 
        });
      }, 2000);
      
    } catch (err) {
      console.error(err);
      setError(err.message || 'Signup failed. Please try again.');
      setLoading(false);
    }
  };

    useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768); 
    };
  
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if email already exists with other providers
      const methods = await fetchSignInMethodsForEmail(auth, user.email);
      if (methods.length > 0 && !methods.includes('google.com')) {
        await auth.signOut();
        setError('Email already exists with a different provider. Please try another email or login method.');
        setLoading(false);
        return;
      }

      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        await setDoc(userRef, {
          email: user.email,
          createdAt: serverTimestamp(),
          provider: 'google',
          displayName: user.displayName || '',
          photoURL: user.photoURL || ''
        });
        setSuccess('Successfully signed up with Google! Redirecting...');
      } else {
        setSuccess('Welcome back! Redirecting...');
      }

      setTimeout(() => {
        navigate('/');
      }, 1500);

    } catch (err) {
      console.error('Google SignUp Error:', err);
      if (err.code === 'auth/account-exists-with-different-credential') {
        setError('Email already exists with a different provider. Please try another email or login method.');
      } else {
        setError(err.message || 'Google signup failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="background">
      <div className="left">
        <div className="auth-container">
          <h2>Sign Up</h2>
          
          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}
          
          {success && (
            <div className="auth-success">
              {success}
            </div>
          )}
          
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
                minLength="6"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength="6"
              />
            </div>
            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Creating...' : 'Sign Up'}
            </button>
          </form>

          <div className="links">
            <Link to="/login">Already have an account? Login</Link>
          </div>

          <div className="social-login">
            <p className="divider">Or sign up with</p>
            <button 
              onClick={handleGoogleSignUp} 
              className="google-button" 
              disabled={loading}
              type="button"
            >
              <img
                src={googleIcon}
                alt="Google logo"
                className="google-logo"
              />
              {loading ? 'Redirecting...' : 'Continue with Google'}
            </button>
          </div>
        </div>
      </div>
      {!isMobile && (
      <div className="right">
        <Spline
          scene="https://prod.spline.design/NvpUSXeGHRp2pMmy/scene.splinecode" 
        />
      </div>
      )}
    </div>
  );
};

export default Signup;