import './App.css';
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Qr from './components/Qr';
import Logout from './components/LogoutForm'
import { useEffect, useState } from 'react';
import { fetchCvData, saveCvData, getToken } from './services/ApiService';

function App() {
  const [cvData, setCvData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (loading) {  // Only run if loading is true (i.e., initial fetch or reload)
      console.log('useEffect called - starting fetch');
      
      const token = getToken();
      console.log('Token retrieved:', token);
    
      if (!token) {
        console.log('No token found, user is not logged in.');
        setIsLoggedIn(false);
        setLoading(false); // Stop loading if no token is found
        return;
      }
    
      const fetchData = async () => {
        try {
          const data = await fetchCvData(token);  // Fetch data with token
          setCvData(data);
          setIsLoggedIn(true);
        } catch (err) {
          setIsLoggedIn(false);
          console.error('Error fetching CV data:', err);
        } finally {
          setLoading(false); // Ensure loading is set to false
        }
      };

      fetchData();  // Only call fetchData when loading is true
    }
  }, [loading]);  // Depend on `loading` to prevent re-firing unnecessarily

  
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };
  
  const handleSave = async (updatedData) => {
    try {
      const token = getToken();
      console.log("Token being sent with request:", updatedData);
      
      const fullData = {
        aboutMe: updatedData?.aboutMe || cvData.aboutMe,
        skills: cvData?.skills,
        projects: cvData?.projects
      };

      await saveCvData(token, fullData);
      setCvData(fullData); 
      setIsEditing(false); 
    } catch (err) {
      console.error('Error saving CV data:', err);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      setIsLoggedIn(false); 
      setErrorMessage('');  
    } catch (error) {
      setErrorMessage('Logout failed. Please try again.');
    }
  };

  const createUpdateData = (section, value) => {
    return {
      aboutMe: section === 'aboutMe' ? value : cvData?.aboutMe,
      skills: section === 'skills' ? value : cvData?.skills,
      projects: section === 'projects' ? value : cvData?.projects
    };
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
            createUpdateData={createUpdateData}
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
          <Logout onLogout={handleLogout} errorMessage={errorMessage} />
        </>
      )}
    </div>
  );
}

export default App;
