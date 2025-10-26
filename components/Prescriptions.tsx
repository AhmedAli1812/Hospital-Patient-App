import React, { useState } from 'react';
import useMockApi from '../hooks/useMockApi';
import { mockPrescriptions } from '../data/mockData';
import type { Prescription } from '../types';
import ChevronDownIcon from './icons/ChevronDownIcon';
import PillIcon from './icons/PillIcon';
import ClockIcon from './icons/ClockIcon';

interface PrescriptionsProps {
  showToast: (message: string) => void;
}

const PrescriptionCard: React.FC<{ prescription: Prescription, showToast: (message: string) => void }> = ({ prescription, showToast }) => {
    const [isOpen, setIsOpen] = useState(false);
    const statusClasses = {
        active: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
        completed: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
        cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left p-4 flex justify-between items-center transition-colors hover:bg-gray-50 dark:hover:bg-gray-700">
                <div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-100">{prescription.medication_name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{prescription.dosage} - {prescription.frequency}</p>
                </div>
                <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusClasses[prescription.status]}`}>
                        {prescription.status}
                    </span>
                    <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
                </div>
            </button>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    <div className="space-y-3">
                        <p><strong className="font-semibold text-gray-700 dark:text-gray-300">Instructions:</strong> <span className="text-gray-600 dark:text-gray-400">{prescription.instructions}</span></p>
                        <p><strong className="font-semibold text-gray-700 dark:text-gray-300">Duration:</strong> <span className="text-gray-600 dark:text-gray-400">{prescription.duration}</span></p>
                        <p><strong className="font-semibold text-gray-700 dark:text-gray-300">Prescribed by:</strong> <span className="text-gray-600 dark:text-gray-400">{prescription.prescribed_by} on {prescription.prescribed_date}</span></p>
                        {prescription.schedule.length > 0 && (
                            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                <ClockIcon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                                <div>
                                    <strong className="font-semibold text-gray-700 dark:text-gray-300">Schedule:</strong> {prescription.schedule.join(', ')}
                                </div>
                            </div>
                        )}
                         <div className="flex space-x-2 mt-4">
                            <button onClick={() => showToast('Refill request sent.')} className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-600 dark:hover:bg-blue-400 transition transform hover:scale-105 active:scale-95">Request Refill</button>
                            <button onClick={() => showToast(`${prescription.medication_name} marked as taken.`)} className="flex-1 bg-green-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-600 dark:hover:bg-green-400 transition transform hover:scale-105 active:scale-95">Mark as Taken</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const Prescriptions: React.FC<PrescriptionsProps> = ({ showToast }) => {
  const { data: prescriptions, loading } = useMockApi<Prescription[]>(mockPrescriptions);
  
  if (loading) return <div className="text-center p-10 dark:text-gray-300">Loading prescriptions...</div>;
  if (!prescriptions) return <div className="text-center p-10 dark:text-gray-300">No prescriptions found.</div>;

  return (
    <div className="space-y-4">
        <div className="flex items-center p-4 bg-blue-50 dark:bg-gray-800 border dark:border-gray-700 rounded-lg">
            <PillIcon className="w-8 h-8 text-blue-500 dark:text-blue-400 mr-4"/>
            <div>
                <h2 className="font-bold text-gray-800 dark:text-gray-100">Medication Reminders</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Stay on track with your medication schedule.</p>
            </div>
        </div>
        {prescriptions.map(p => <PrescriptionCard key={p.id} prescription={p} showToast={showToast} />)}
    </div>
  );
};

export default Prescriptions;
