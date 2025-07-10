import style from './App.css';
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { PiGraduationCap } from "react-icons/pi";
import { BsClock } from "react-icons/bs";
import { onAuthStateChanged } from './firebase';
import { auth, signOut } from './firebase';
import userimg from './img/sample-user.png';
import userimg2 from './img/sample-user2.png';
import { cardData, courseList } from './data'; // Assuming you have a data.js file exporting these
import Maincarosel from './Maincarosel';

const sampleImages = [userimg, userimg2];
function getProfileImg(user) {
  if (user && user.photoURL) return user.photoURL;
  const img = sampleImages[Math.floor(Math.random() * sampleImages.length)];
  console.log('Profile fallback image:', img);
  return img;
}

function Home() {

  const [goal, setGoal] = useState('');
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const inputWrapperRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState('');
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (text) => {
    setQuery(text);
    setSuggestions([]);
    setGoal(text);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    const filtered = courseList.filter(course =>
      course.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      alert("Please enter a career path");
      return;
    }

    setLoading(true);

    const goal = query;
    const prompt = `
I want to become a ${goal}. Create a comprehensive, well-structured learning roadmap with the following requirements:

first giev the heading of the title course he want to learn then below proceed this..
1. Structure the roadmap in clear phases with distinct levels:
   - Phase 1: Beginner Foundations (Months 1-3)
   - Phase 2: Intermediate Skills (Months 4-6)
   - Phase 3: Advanced Concepts (Months 7-9)
   - Phase 4: Mastery & Specialization (Months 10-12)

2. For each phase, provide:
   ## [Phase Title] 
   **Duration:** [X months]
   **Focus Areas:** [Key concepts to master]
   
   ### Core Topics to Learn
   - [Topic 1]: Brief description (1-2 sentences)
   - [Topic 2]: Brief description
   
   ### Recommended Resources
   - Courses: [Course names with platforms]
   - Books: [Title by Author]
   - Tools: [Tools/technologies to practice]
   
   ### Practical Projects
   - Project 1: [Name] - [Brief description and skills practiced]
   - Project 2: [Name] - [Brief description]
   
   ### Certifications (if available)
   - [Certification Name] - [Issuing Organization]

3. Formatting requirements:
   - Use proper Markdown syntax with hierarchy (##, ###, ####)
   - Bold all section headers (like **Focus Areas**)
   - Include empty lines between sections for readability
   - Use bullet points for all lists
   - Keep descriptions concise but informative
   - Highlight important terms in italics

4. Additional requirements:
   - Include estimated time commitment per week (e.g., "10-15 hours/week")
   - Mention common pitfalls to avoid in each phase
   - Suggest communities/forums for support
   - Include progress checkpoints for self-assessment

Example structure for reference:
## Phase 1: Beginner Foundations (Months 1-3)
**Duration:** 3 months
**Focus Areas:** Core concepts, basic tools, foundational theory

### Core Topics to Learn
- *Programming Fundamentals*: Variables, loops, functions, basic algorithms
- *Web Basics*: HTML/CSS, responsive design principles

### Recommended Resources
- Course: "CS50's Introduction to Computer Science" (edX)
- Book: "Eloquent JavaScript" by Marijn Haverbeke

### Practical Projects
- Personal Portfolio Website: Build with HTML/CSS to showcase work
- Todo List App: Basic JavaScript application

### Certifications
- freeCodeCamp Responsive Web Design Certification

**Weekly Commitment:** 10-12 hours
**Pitfalls to Avoid:** Trying to learn too many frameworks too quickly
`;
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.REACT_APP_GEMINI_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Alternative: Use 'X-goog-api-key' header instead of query param
            // "X-goog-api-key": process.env.REACT_APP_GEMINI_KEY,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7, // Controls randomness (0 = strict, 1 = creative)
              maxOutputTokens: 1000, // Limit response length
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `API Error ${response.status}: ${errorData.error?.message || "Unknown error"}`
        );
      }

      const data = await response.json();
      console.log("Gemini Full Response:", data);

      // Extract the generated text safely
      const roadmapText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No roadmap generated. Try again.";

      console.log("Generated Roadmap:", roadmapText);
      setRoadmap(roadmapText);
      navigate("/roadmappage", { state: { roadmap: roadmapText, title: goal } });

    } catch (err) {
      console.error("Gemini API Error:", err);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const scrollRef = useRef();

  const scroll = (scrollOffset) => {
    scrollRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputWrapperRef.current &&
        !inputWrapperRef.current.contains(event.target)
      ) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  return (

    <div className="main-page">

      {loading && (
        <div className="loading-overlay">
          <div className="loading-box">
            <div className="spinner"></div>
            <p >Finding your learning path...</p>
          </div>
        </div>
      )}

      <div className="header">
        <h1 className="homepage-header-title">PathGenius</h1>
        <a href="#work">How it works</a>
        <a href="#Success">Success Stories</a>
        <a href="#contact">Contact us</a>
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
      <div className="search-body">
        <div className="search">
          <h1 className="homepage-main-title">Discover Your Perfect Learning Journey</h1>
          <h5 className="homepage-subtitle">AI-Powered career roadmaps tailored just for you</h5>
          <div className="mp1">
            <form className="mp1" onSubmit={handleSubmit}>
              <div ref={inputWrapperRef} style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="find-path"
                  placeholder="Enter your dream career (e.g., Data Scientist)"
                  value={query}
                  onChange={handleChange}
                  autoComplete="off"
                />
                {suggestions.length > 0 && (
                  <ul className="autocomplete-list">
                    {suggestions.map((item, index) => (
                      <li key={index} onClick={() => handleSelect(item)}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button type="submit" className="homepage-generate-btn" disabled={loading}>
                {loading ? 'Generating...' : 'Generate Plan'}
              </button>
            </form>
          </div>
        </div>
        <div className="search-content">
          <div className="Content">
            <h1 className="content-icon"><HiOutlineLightBulb /></h1>
            <p className="content-title">Personalized Roadmap</p>
            <p className="content-description">Get a custom learning path based on your goals and experience</p>
          </div>
          <div className="Content">
            <h1 className="content-icon"><PiGraduationCap /></h1>
            <p className="content-title">Personalized Roadmap</p>
            <p className="content-description">AI-curated courses from top platforms matched to your needs</p>
          </div>
          <div className="Content">
            <h1 className="content-icon"><BsClock /></h1>
            <p className="content-title">Personalized Roadmap</p>
            <p className="content-description">Realistic schedules that fit your pace and availablity</p>
          </div>
        </div>
      </div>
      <div className="career-slider-wrapper">
        <h1 className="slider-title">Popular Career Paths</h1>
        <div className={style.scrollcontainer}>
          <button className="scrollbtn left2" onClick={() => scroll(-400)}>&lt;</button>
          <div className="card-container" ref={scrollRef}>
            {cardData.map((card, index) => (
              <div className="career-card" key={index}>
                <img src={card.img} alt={card.title} />
                <p className="career-card-title">{card.title}</p>
                <p className="career-card-desc">{card.desc}</p>
                <div className="card-footer">
                  <span className="career-card-duration">{card.duration}</span>
                  <a href={""} className="career-card-link">View Path →</a>
                </div>
              </div>
            ))}
          </div>
          <button className="scrollbtn right2" onClick={() => scroll(400)}>&gt;</button>
        </div>
      </div>

      <div className="Success" id="Success">
        <Maincarosel />
      </div>
      <div className="work" id="work">
        <h1 className="work-title">How PathGenius Works</h1>
        <div className="steps">
          <div className="step">
            <div><p className="step-number">1</p></div>
            <p className="step-title"> Enter Your Goal</p>
            <h4 className="step-description">Tell us what career you want to pursue</h4>
          </div>
          <div className="step">
            <div><p className="step-number">2</p></div>
            <p className="step-title">Get Your Custom Path</p>
            <h4 className="step-description">Receive an AI-generated learning roadmap</h4>
          </div>
          <div className="step">
            <div><p className="step-number">3</p></div>
            <p className="step-title">Start Learning</p>
            <h4 className="step-description">Follow you personalized journey to sucess</h4>
          </div>
        </div>
      </div>
      <div className="footer" id="contact">
        <h1 className="footer-title">Contact Us</h1>
        <div className="contact-wrapper">
          {/* Phone */}
          <div className="ctn">
            <p className="contact-label">Phone Call</p>
            <a href="tel:9515682954" className="contact-value">9515682954</a>
          </div>

          {/* Email */}
          <div className="ctn">
            <p className="contact-label">Email</p>
            <a href="mailto:tony3k05@gmail.com" className="contact-value">Tony3k05@gmail.com</a>
          </div>

          <div className="social">
            <p className="social-label">Social</p>
            <div className="ctn social-icons">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="icon insta">
                <FaInstagram />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="icon fb">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="icon tw">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
        <hr className="styled-hr" />
        <div className="bottom">
          <h1 className="copyright-text">@ 2024 PathGenius. All rights reserved.</h1>
        </div>
      </div>
    </div>
  );
}

export default Home;