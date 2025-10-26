import React, { useState, useCallback, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Prescriptions from './components/Prescriptions';
import LabResults from './components/LabResults';
import Appointments from './components/Appointments';
import MedicalRecords from './components/MedicalRecords';
import Profile from './components/Profile';
import AuthScreen from './components/AuthScreen';
import Messages from './components/Messages';
import Toast from './components/Toast';

export type Screen = 'home' | 'records' | 'prescriptions' | 'lab-results' | 'appointments' | 'profile' | 'messages';
export type FontSize = 'sm' | 'base' | 'lg';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState<FontSize>('base');
  const [toast, setToast] = useState<{ message: string, id: number } | null>(null);

  useEffect(() => {
    const body = document.body;
    if (isDarkMode) {
      body.classList.add('dark', 'bg-gray-900');
      body.classList.remove('bg-gray-50');
    } else {
      body.classList.remove('dark', 'bg-gray-900');
      body.classList.add('bg-gray-50');
    }
  }, [isDarkMode]);

  const showToast = useCallback((message: string) => {
    setToast({ message, id: Date.now() });
  }, []);
  
  const handleLogout = () => {
      setIsAuthenticated(false);
      setActiveScreen('home');
      showToast("You have been logged out.");
  }

  const renderScreen = () => {
    const screenProps = {
      setActiveScreen,
      showToast,
      isDarkMode,
      fontSize,
    };
    switch (activeScreen) {
      case 'home':
        return <Dashboard {...screenProps} />;
      case 'records':
        return <MedicalRecords {...screenProps} />;
      case 'prescriptions':
        return <Prescriptions {...screenProps} />;
      case 'lab-results':
        return <LabResults {...screenProps} />;
      case 'appointments':
        return <Appointments {...screenProps} />;
      case 'messages':
        return <Messages {...screenProps} />;
      case 'profile':
        return <Profile onLogout={handleLogout} isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} fontSize={fontSize} onChangeFontSize={setFontSize} />;
      default:
        return <Dashboard {...screenProps} />;
    }
  };

  const getFontSizeClass = () => {
    switch(fontSize) {
      case 'sm': return 'text-sm';
      case 'lg': return 'text-lg';
      default: return 'text-base';
    }
  }

  if (!isAuthenticated) {
    return (
        <div className={`${isDarkMode ? 'dark' : ''} ${getFontSizeClass()}`}>
            <AuthScreen onLoginSuccess={() => {setIsAuthenticated(true); showToast("Login successful!");}} />
        </div>
    );
  }

  return (
    <div className={`${isDarkMode ? 'dark' : ''} ${getFontSizeClass()}`}>
        <Layout activeScreen={activeScreen} setActiveScreen={setActiveScreen} showToast={showToast}>
        {renderScreen()}
        </Layout>
        {toast && <Toast key={toast.id} message={toast.message} onDismiss={() => setToast(null)} />}
    </div>
  );
};

export default App;
