import './App.css';
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Qr from './components/Qr';
import { useEffect, useState } from 'react';
import { fetchCvData, saveCvData, getToken } from './services/ApiService';

function App() {
  const [cvData, setCvData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    console.log('useEffect called - starting fetch');
    
    const token = getToken();
    console.log('Token retrieved:', token);
  
    if (!token) {
      console.log('No token found, user is not logged in.');
      setIsLoggedIn(false);
      setLoading(false);
      return;
    }
  
    const fetchData = async () => {
      try {
        const data = await fetchCvData(token);
        setCvData(data);
        setIsLoggedIn(true);
      } catch (err) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false); 
      }
    };
  
    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount
  
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };
  
  const handleSave = async (updatedData) => {
    try {
      const token = getToken();
      console.log("Token being sent with request:", token);
      await saveCvData(token, updatedData);
      setCvData(updatedData); 
      setIsEditing(false); 
    } catch (err) {
      console.error('Error saving CV data:', err);
    }
  };

  return (
    <div className="App">
      <Header />
      
      {loading ? (
        <p>Loading...</p> 
      ) : !isLoggedIn ? (
        <LandingPage onLoginSuccess={handleLoginSuccess} /> 
      ) : (
        <>
          <About
            aboutMe={cvData?.aboutMe}
            handleSave={handleSave}
          />
          <Skills 
            skills={cvData?.skills}
            handleSave={handleSave}
          />
          <Projects 
            projects={cvData?.projects}
            handleSave={handleSave}
          />
          <Contact 
            contact={cvData?.contact}
            handleSave={handleSave}
          />
          <Qr />
        </>
      )}
    </div>
  );
}

export default App;
