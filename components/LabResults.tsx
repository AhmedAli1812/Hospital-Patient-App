import React, { useState } from 'react';
import useMockApi from '../hooks/useMockApi';
import { mockLabResults, mockTrendData } from '../data/mockData';
import type { LabResult, LabResultParameter } from '../types';
import ChevronDownIcon from './icons/ChevronDownIcon';

const LabResultParameterRow: React.FC<{ param: LabResultParameter }> = ({ param }) => {
    const statusColor = {
        normal: 'text-green-600 dark:text-green-400',
        high: 'text-red-600 dark:text-red-400',
        low: 'text-yellow-600 dark:text-yellow-400'
    };
    return (
        <div className="grid grid-cols-3 gap-2 py-2 text-sm">
            <span className="text-gray-700 dark:text-gray-300">{param.parameter}</span>
            <span className={`font-semibold ${statusColor[param.status]}`}>{param.value} {param.unit}</span>
            <span className="text-gray-500 dark:text-gray-400">{param.reference_range}</span>
        </div>
    );
};

const LabResultCard: React.FC<{ result: LabResult }> = ({ result }) => {
    const [isOpen, setIsOpen] = useState(false);
     const statusClasses = {
        completed: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
        pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300',
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
             <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left p-4 flex justify-between items-center transition-colors hover:bg-gray-50 dark:hover:bg-gray-700">
                <div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-100">{result.test_name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Date: {result.test_date}</p>
                </div>
                 <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusClasses[result.status]}`}>
                        {result.status}
                    </span>
                    <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
                </div>
            </button>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                 <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    {result.status === 'completed' ? (
                        <>
                           <div className="px-2 font-semibold text-xs grid grid-cols-3 gap-2 text-gray-500 dark:text-gray-400 border-b dark:border-gray-600 pb-2 mb-1">
                                <span>Parameter</span>
                                <span>Result</span>
                                <span>Reference</span>
                            </div>
                            {result.results.map(param => <LabResultParameterRow key={param.parameter} param={param} />)}
                            <a href={result.report_url} className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-semibold mt-3 inline-block">Download Full Report</a>
                        </>
                    ) : (
                        <p className="text-gray-600 dark:text-gray-300">Results are not yet available for this test.</p>
                    )}
                 </div>
            </div>
        </div>
    );
};

const LabResults: React.FC = () => {
  const { data: labResults, loading } = useMockApi<LabResult[]>(mockLabResults);
  const { data: trendData } = useMockApi(mockTrendData);

  const Recharts = (window as any).Recharts;

  if (!Recharts) {
    return (
        <div className="text-center p-10 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <h3 className="text-lg font-bold text-red-700 dark:text-red-300">Error</h3>
            <p className="text-red-600 dark:text-red-400">The charting library could not be loaded. Please check your internet connection and try again.</p>
        </div>
    );
  }

  const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = Recharts;

  if (loading) return <div className="text-center p-10 dark:text-gray-300">Loading lab results...</div>;
  if (!labResults) return <div className="text-center p-10 dark:text-gray-300">No lab results found.</div>;

  return (
    <div className="space-y-4">
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">Hemoglobin Trend</h3>
        <div style={{ width: '100%', height: 200 }}>
          <ResponsiveContainer>
            <LineChart data={trendData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
              <XAxis dataKey="date" fontSize={12} stroke="#a0aec0" />
              <YAxis fontSize={12} stroke="#a0aec0" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a202c', border: '1px solid #4a5568', borderRadius: '0.5rem' }}
                labelStyle={{ color: '#e2e8f0' }}
                itemStyle={{ color: '#63b3ed' }}
              />
              <Legend wrapperStyle={{fontSize: "14px", color: '#a0aec0'}} />
              <Line type="monotone" dataKey="Hemoglobin" stroke="#63b3ed" strokeWidth={2} activeDot={{ r: 8 }} dot={{ strokeWidth: 1, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {labResults.map(res => <LabResultCard key={res.id} result={res} />)}
    </div>
  );
};

export default LabResults;