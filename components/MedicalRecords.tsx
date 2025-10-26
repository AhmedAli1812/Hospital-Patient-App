import React from 'react';
import useMockApi from '../hooks/useMockApi';
import { mockMedicalRecords } from '../data/mockData';
import type { MedicalRecord } from '../types';
import DocumentIcon from './icons/DocumentIcon';
import HeartIcon from './icons/HeartIcon';
import ShieldIcon from './icons/ShieldIcon';
import SyringeIcon from './icons/SyringeIcon';

interface MedicalRecordsProps {
  showToast: (message: string) => void;
}

const RecordIcon: React.FC<{type: MedicalRecord['type']}> = ({ type }) => {
    const commonClasses = "w-6 h-6";
    switch(type) {
        case 'diagnosis': return <HeartIcon className={`${commonClasses} text-red-500 dark:text-red-400`} />;
        case 'procedure': return <DocumentIcon className={`${commonClasses} text-blue-500 dark:text-blue-400`} />;
        case 'allergy': return <ShieldIcon className={`${commonClasses} text-yellow-500 dark:text-yellow-400`} />;
        case 'immunization': return <SyringeIcon className={`${commonClasses} text-green-500 dark:text-green-400`} />;
        default: return <DocumentIcon className={`${commonClasses} text-gray-500 dark:text-gray-400`} />;
    }
}

const MedicalRecordCard: React.FC<{ record: MedicalRecord }> = ({ record }) => {
    const getIconBgColor = (type: MedicalRecord['type']) => {
        switch(type) {
            case 'diagnosis': return 'bg-red-100 dark:bg-red-900/50';
            case 'procedure': return 'bg-blue-100 dark:bg-blue-900/50';
            case 'allergy': return 'bg-yellow-100 dark:bg-yellow-900/50';
            case 'immunization': return 'bg-green-100 dark:bg-green-900/50';
            default: return 'bg-gray-100 dark:bg-gray-700';
        }
    }
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex items-start space-x-4">
            <div className={`p-3 rounded-full ${getIconBgColor(record.type)}`}>
                <RecordIcon type={record.type} />
            </div>
            <div>
                <p className="font-bold text-gray-800 dark:text-gray-100">{record.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{record.details}</p>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                    <span>{record.date}</span> &bull; <span>{record.doctor}</span>
                </div>
            </div>
        </div>
    );
};

const MedicalRecords: React.FC<MedicalRecordsProps> = ({ showToast }) => {
  const { data: records, loading } = useMockApi<MedicalRecord[]>(mockMedicalRecords);

  if (loading) return <div className="text-center p-10 dark:text-gray-300">Loading medical records...</div>;
  if (!records) return <div className="text-center p-10 dark:text-gray-300">No medical records found.</div>;

  return (
    <div className="space-y-4">
        {records.map(record => <MedicalRecordCard key={record.id} record={record} />)}
        <button onClick={() => showToast('Downloading records...')} className="w-full mt-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 active:scale-95">
            Download Records (PDF)
        </button>
    </div>
  );
};

export default MedicalRecords;
