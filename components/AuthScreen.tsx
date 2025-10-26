import React, { useState } from 'react';
import UserIcon from './icons/UserIcon';
import LockClosedIcon from './icons/LockClosedIcon';
import EyeIcon from './icons/EyeIcon';
import EyeSlashIcon from './icons/EyeSlashIcon';
import PhoneIcon from './icons/PhoneIcon';

interface AuthScreenProps {
  onLoginSuccess: () => void;
}

type AuthMode = 'login' | 'signup';

const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState<AuthMode>('login');

  const [patientId, setPatientId] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (patientId === 'patient' && password === 'password123') {
      onLoginSuccess();
    } else {
      setError('Invalid Patient ID or password.');
    }
  };
  
  const handleSignup = (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      if (password !== confirmPassword) {
          setError('Passwords do not match.');
          return;
      }
      if (patientId && phone && password) {
          // Simulate successful registration
          onLoginSuccess();
      } else {
          setError('Please fill all fields.');
      }
  }
  
  const commonInputClasses = "w-full py-3 pl-10 pr-3 text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Patient Portal</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {mode === 'login' ? 'Sign in to access your health records' : 'Create your portal account'}
            </p>
        </div>

        <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button onClick={() => setMode('login')} className={`w-1/2 py-3 font-semibold ${mode === 'login' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>Login</button>
            <button onClick={() => setMode('signup')} className={`w-1/2 py-3 font-semibold ${mode === 'signup' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>Sign Up</button>
        </div>

        <form className="space-y-6" onSubmit={mode === 'login' ? handleLogin : handleSignup}>
            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <UserIcon className="w-5 h-5 text-gray-400" />
                </span>
                <input id="patientId" name="patientId" type="text" required className={commonInputClasses} placeholder={mode === 'login' ? "Patient ID (use 'patient')" : "Patient ID"} value={patientId} onChange={(e) => setPatientId(e.target.value)} />
            </div>

            {mode === 'signup' && (
                 <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <PhoneIcon className="w-5 h-5 text-gray-400" />
                    </span>
                    <input id="phone" name="phone" type="tel" required className={commonInputClasses} placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
            )}

            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon className="w-5 h-5 text-gray-400" />
                </span>
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} required className={commonInputClasses + ' pr-10'} placeholder={mode === 'login' ? "Password (use 'password123')" : "Password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeSlashIcon className="w-5 h-5 text-gray-500" /> : <EyeIcon className="w-5 h-5 text-gray-500" />}
                </button>
            </div>

            {mode === 'signup' && (
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <LockClosedIcon className="w-5 h-5 text-gray-400" />
                    </span>
                    <input id="confirmPassword" name="confirmPassword" type={showPassword ? 'text' : 'password'} required className={commonInputClasses} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
            )}
          
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

            <div>
                <button type="submit" className="w-full py-3 px-4 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105 active:scale-95">
                    {mode === 'login' ? 'Sign In' : 'Create Account'}
                </button>
            </div>
          
            {mode === 'login' && (
                <div className="text-sm text-center">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                    Forgot your password?
                    </a>
                </div>
            )}
        </form>
      </div>
    </div>
  );
};

export default AuthScreen;
