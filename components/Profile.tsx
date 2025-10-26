import React from 'react';
import useMockApi from '../hooks/useMockApi';
import { mockPatient } from '../data/mockData';
import type { Patient } from '../types';
import type { FontSize } from '../App';
import LockClosedIcon from './icons/LockClosedIcon';

interface ProfileProps {
    onLogout: () => void;
    isDarkMode: boolean;
    onToggleDarkMode: () => void;
    fontSize: FontSize;
    onChangeFontSize: (size: FontSize) => void;
}

const ProfileInfoRow: React.FC<{ label: string, value: string, icon?: React.ElementType }> = ({ label, value, icon: Icon }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
        <span className="text-gray-500 dark:text-gray-400">{label}</span>
        <div className="flex items-center space-x-2">
            {Icon && <Icon className="w-4 h-4 text-gray-400" />}
            <span className="font-semibold text-gray-800 dark:text-gray-200">{value}</span>
        </div>
    </div>
);

const ProfileSection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">{title}</h3>
        {children}
    </div>
);

const Profile: React.FC<ProfileProps> = ({ onLogout, isDarkMode, onToggleDarkMode, fontSize, onChangeFontSize }) => {
    const { data: patient, loading } = useMockApi<Patient>(mockPatient);

    if (loading || !patient) {
        return <div className="text-center p-10 dark:text-gray-300">Loading profile...</div>;
    }

    const FontSizeButton: React.FC<{ size: FontSize, label: string }> = ({ size, label }) => (
        <button
            onClick={() => onChangeFontSize(size)}
            className={`px-4 py-1 rounded-md text-sm font-semibold transition ${fontSize === size ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
        >
            {label}
        </button>
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col items-center space-y-3">
                <div className="relative">
                    <img className="h-24 w-24 rounded-full object-cover" src={`https://i.pravatar.cc/150?u=${patient.id}`} alt={patient.name} />
                    <span className="absolute bottom-0 right-0 block h-4 w-4 rounded-full bg-green-400 ring-2 ring-white dark:ring-gray-800"></span>
                </div>
                <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{patient.name}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{patient.id}</p>
                </div>
            </div>

            <ProfileSection title="Accessibility">
                <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600 dark:text-gray-300 font-medium">High-Contrast Mode</span>
                    <button onClick={onToggleDarkMode} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${isDarkMode ? 'bg-blue-600' : 'bg-gray-200'}`}>
                        <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>
                <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600 dark:text-gray-300 font-medium">Font Size</span>
                    <div className="flex space-x-2">
                        <FontSizeButton size="sm" label="A" />
                        <FontSizeButton size="base" label="A" />
                        <FontSizeButton size="lg" label="A" />
                    </div>
                </div>
            </ProfileSection>

            <ProfileSection title="Personal Information">
                <ProfileInfoRow label="Date of Birth" value={patient.dob} />
                <ProfileInfoRow label="Gender" value={patient.gender} />
            </ProfileSection>
            
            <ProfileSection title="Contact Information">
                <ProfileInfoRow label="Email" value={patient.contact.email} />
                <ProfileInfoRow label="Phone" value={patient.contact.phone} />
            </ProfileSection>

            <div className="space-y-3 pt-4">
                 <button className="w-full bg-red-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600 dark:hover:bg-red-400 transition transform hover:scale-105 active:scale-95">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
