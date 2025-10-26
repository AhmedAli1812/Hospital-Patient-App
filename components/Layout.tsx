import React, { useState, useRef, useEffect } from 'react';
import type { Screen } from '../App';
import HomeIcon from './icons/HomeIcon';
import RecordsIcon from './icons/RecordsIcon';
import PrescriptionIcon from './icons/PrescriptionIcon';
import AppointmentIcon from './icons/AppointmentIcon';
import ProfileIcon from './icons/ProfileIcon';
import BellIcon from './icons/BellIcon';
import MessageIcon from './icons/MessageIcon';
import LabIcon from './icons/LabIcon';

interface LayoutProps {
  children: React.ReactNode;
  activeScreen: Screen;
  setActiveScreen: (screen: Screen) => void;
  showToast: (message: string) => void;
}

const navItems = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'records', label: 'Records', icon: RecordsIcon },
  { id: 'prescriptions', label: 'Meds', icon: PrescriptionIcon },
  { id: 'appointments', label: 'Visits', icon: AppointmentIcon },
  { id: 'profile', label: 'Profile', icon: ProfileIcon },
] as const;

const NotificationPanel: React.FC<{onClose: () => void}> = ({ onClose }) => {
    const panelRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    return (
        <div ref={panelRef} className="absolute top-14 right-4 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 z-20 animate-fadeIn">
            <div className="p-3 border-b dark:border-gray-700">
                <h4 className="font-semibold text-gray-800 dark:text-white">Notifications</h4>
            </div>
            <ul className="divide-y dark:divide-gray-700 max-h-80 overflow-y-auto">
                <li className="p-3 flex items-start space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-full"><LabIcon className="w-5 h-5 text-green-600 dark:text-green-300"/></div>
                    <div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">Your CBC test results are ready.</p>
                        <span className="text-xs text-gray-400 dark:text-gray-500">2 hours ago</span>
                    </div>
                </li>
                <li className="p-3 flex items-start space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-full"><AppointmentIcon className="w-5 h-5 text-purple-600 dark:text-purple-300"/></div>
                    <div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">Appointment with Dr. Sarah confirmed for Nov 15.</p>
                        <span className="text-xs text-gray-400 dark:text-gray-500">1 day ago</span>
                    </div>
                </li>
                 <li className="p-3 flex items-start space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-full"><MessageIcon className="w-5 h-5 text-blue-600 dark:text-blue-300"/></div>
                    <div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">New message from Dr. Sarah Mohamed.</p>
                        <span className="text-xs text-gray-400 dark:text-gray-500">3 days ago</span>
                    </div>
                </li>
            </ul>
        </div>
    );
}

const Layout: React.FC<LayoutProps> = ({ children, activeScreen, setActiveScreen }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const getScreenTitle = () => {
    switch (activeScreen) {
      case 'home': return 'Dashboard';
      case 'records': return 'Medical Records';
      case 'prescriptions': return 'My Prescriptions';
      case 'lab-results': return 'Lab Results';
      case 'appointments': return 'My Appointments';
      case 'profile': return 'My Profile';
      case 'messages': return 'Messages';
      default: return 'Patient Portal';
    }
  };

  return (
    <div className="flex flex-col h-screen font-sans">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">{getScreenTitle()}</h1>
          <div className="relative">
            <button onClick={() => setShowNotifications(!showNotifications)} className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white relative">
                <BellIcon />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
            </button>
            {showNotifications && <NotificationPanel onClose={() => setShowNotifications(false)} />}
          </div>
        </div>
      </header>
      <main className="flex-grow overflow-y-auto p-4 pb-20">
        <div key={activeScreen} className="animate-fadeIn">
            {children}
        </div>
      </main>
      <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 md:max-w-sm md:mx-auto">
        <nav className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveScreen(item.id)}
              className={`flex flex-col items-center justify-center w-full transition-colors duration-200 ${
                activeScreen === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'
              }`}
            >
              <item.icon className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </footer>
    </div>
  );
};

export default Layout;
