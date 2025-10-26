import React from 'react';
import useMockApi from '../hooks/useMockApi';
import { mockPatient } from '../data/mockData';
import type { Patient } from '../types';
import type { Screen } from '../App';
import RecordsIcon from './icons/RecordsIcon';
import PrescriptionIcon from './icons/PrescriptionIcon';
import LabIcon from './icons/LabIcon';
import AppointmentIcon from './icons/AppointmentIcon';
import MessageIcon from './icons/MessageIcon';
import DocumentIcon from './icons/DocumentIcon';

interface DashboardProps {
    setActiveScreen: (screen: Screen) => void;
}

const QuickActionButton: React.FC<{ icon: React.ElementType, label: string, onClick: () => void }> = ({ icon: Icon, label, onClick }) => (
    <button onClick={onClick} className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-lg dark:hover:shadow-blue-500/20 transition-all duration-300 space-y-2 transform hover:scale-105 active:scale-95">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full">
            <Icon className="w-6 h-6 text-blue-600 dark:text-blue-300" />
        </div>
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 text-center">{label}</span>
    </button>
);

const Dashboard: React.FC<DashboardProps> = ({ setActiveScreen }) => {
  const { data: patient, loading } = useMockApi<Patient>(mockPatient);

  if (loading || !patient) {
    return <div className="text-center p-10 dark:text-gray-300">Loading...</div>;
  }
  
  const quickActions = [
      { label: 'Medical Records', icon: RecordsIcon, screen: 'records' as Screen },
      { label: 'My Prescriptions', icon: PrescriptionIcon, screen: 'prescriptions' as Screen },
      { label: 'Lab Results', icon: LabIcon, screen: 'lab-results' as Screen },
      { label: 'Appointments', icon: AppointmentIcon, screen: 'appointments' as Screen },
      { label: 'Messages', icon: MessageIcon, screen: 'messages' as Screen },
      { label: 'Book Appointment', icon: DocumentIcon, screen: 'appointments' as Screen },
  ];

  return (
    <div className="space-y-6">
      <div className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Welcome, {patient.name.split(' ')[0]}!</h2>
                <p className="text-gray-500 dark:text-gray-400">How are you feeling today?</p>
            </div>
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                patient.status === 'Admitted' ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300' : 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
            }`}>
                {patient.status}
            </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {quickActions.map(action => (
            <QuickActionButton key={action.label} label={action.label} icon={action.icon} onClick={() => setActiveScreen(action.screen)} />
        ))}
      </div>
      
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">Recent Activity</h3>
        <ul className="space-y-3">
          <li className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-full"><LabIcon className="w-5 h-5 text-green-600 dark:text-green-300"/></div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Your CBC test results are ready.</p>
            <span className="text-xs text-gray-400 dark:text-gray-500 ml-auto">2h ago</span>
          </li>
          <li className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-full"><AppointmentIcon className="w-5 h-5 text-purple-600 dark:text-purple-300"/></div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Appointment with Dr. Sarah confirmed.</p>
            <span className="text-xs text-gray-400 dark:text-gray-500 ml-auto">1d ago</span>
          </li>
        </ul>
      </div>

    </div>
  );
};

export default Dashboard;