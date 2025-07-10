import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { signInWithEmailLink, isSignInWithEmailLink } from 'firebase/auth';
import './styles.css';

const OTPVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailLink, setEmailLink] = useState('');

  useEffect(() => {
    // Check if this is a email link sign-in
    if (isSignInWithEmailLink(auth, window.location.href)) {
      // Get the email from localStorage if available
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        // If missing email, prompt user for it
        email = window.prompt('Please provide your email for confirmation');
      }
      setEmail(email);
      setEmailLink(window.location.href);
    } else if (location.state?.email) {
      // If coming from forgot password flow
      setEmail(location.state.email);
    }
  }, [location]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto focus to next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      setError('Please enter a 6-digit code');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      if (emailLink) {
        // Complete sign-in with email link
        await signInWithEmailLink(auth, email, emailLink);
        window.localStorage.removeItem('emailForSignIn');
        navigate('/dashboard');
      } else {
        // For custom OTP verification (would need your own backend)
        // This is where you'd typically verify against your backend
        // For Firebase password reset, this isn't needed as it's handled automatically
        navigate('/reset-password', { state: { email } });
      }
    } catch (err) {
      setError(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setLoading(true);
      // For Firebase password reset, you would call sendPasswordResetEmail again
      // await sendPasswordResetEmail(auth, email);
      setError('');
      alert('New OTP has been sent to your email');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Verify OTP</h2>
      <p className="email-notice">We've sent a 6-digit code to:</p>
      <p className="email-display">{email}</p>
      
      {error && <div className="auth-error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="otp-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              className="otp-input"
              autoFocus={index === 0}
            />
          ))}
        </div>
        
        <button 
          type="submit" 
          className="auth-button"
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>
      
      <div className="links">
        <button 
          type="button" 
          onClick={handleResendOTP}
          disabled={loading}
          className="link-button"
        >
          Resend OTP
        </button>
        <Link to="/login">Back to Login</Link>
      </div>
    </div>
  );
};

export default OTPVerification;