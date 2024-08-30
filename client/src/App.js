// App.js
import React, { useState } from 'react';
import Header from './Components/Header/Header';
import Body from './Components/Body/Body';
import Footer from './Components/Footer/Footer';
import './App.css';
import './index.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Body darkMode={darkMode}/>
      <Footer />
    </div>
  );
}

export default App;
