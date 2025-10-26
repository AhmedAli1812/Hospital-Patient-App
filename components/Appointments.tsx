import React, { useState } from 'react';
import useMockApi from '../hooks/useMockApi';
import { mockAppointments } from '../data/mockData';
import type { Appointment } from '../types';
import CalendarIcon from './icons/CalendarIcon';

interface AppointmentsProps {
  showToast: (message: string) => void;
}

const AppointmentCard: React.FC<{ appointment: Appointment, onCancel: (id: number) => void }> = ({ appointment, onCancel }) => {
    const isUpcoming = appointment.status === 'upcoming';
    return (
        <div className={`p-4 rounded-lg flex items-start space-x-4 ${isUpcoming ? 'bg-white dark:bg-gray-800 shadow-sm' : 'bg-gray-100 dark:bg-gray-900'}`}>
            <div className={`p-3 rounded-full ${isUpcoming ? 'bg-blue-100 dark:bg-blue-900/50' : 'bg-gray-200 dark:bg-gray-700'}`}>
                <CalendarIcon className={`w-6 h-6 ${isUpcoming ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`} />
            </div>
            <div>
                <p className={`font-bold ${isUpcoming ? 'text-gray-800 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400'}`}>{appointment.doctor}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{appointment.specialization}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{appointment.date} at {appointment.time}</p>
            </div>
            {isUpcoming && <button onClick={() => onCancel(appointment.id)} className="ml-auto text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-semibold transition-colors">Cancel</button>}
        </div>
    );
};

const BookAppointmentModal: React.FC<{ onClose: () => void, onBook: () => void }> = ({ onClose, onBook }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-sm animate-fadeIn">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Book Appointment</h2>
                <form onSubmit={(e) => { e.preventDefault(); onBook(); }}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Department</label>
                            <select id="department" className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                <option>Cardiology</option>
                                <option>Dermatology</option>
                                <option>General Practice</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
                            <input type="date" id="date" className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm" />
                        </div>
                        <div className="flex space-x-2 pt-4">
                            <button type="button" onClick={onClose} className="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition">Cancel</button>
                            <button type="submit" className="flex-1 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition">Book Now</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Appointments: React.FC<AppointmentsProps> = ({ showToast }) => {
    const { data: appointments, loading } = useMockApi<Appointment[]>(mockAppointments);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleCancel = (id: number) => {
        showToast(`Appointment ${id} has been cancelled.`);
        // Here you would typically also update the state to reflect the change
    };

    const handleBook = () => {
        setIsModalOpen(false);
        showToast("Appointment booked successfully!");
    }

    if (loading) return <div className="text-center p-10 dark:text-gray-300">Loading appointments...</div>;
    if (!appointments) return <div className="text-center p-10 dark:text-gray-300">No appointments found.</div>;
    
    const upcomingAppointments = appointments.filter(a => a.status === 'upcoming');
    const pastAppointments = appointments.filter(a => a.status !== 'upcoming');
    
    return (
        <div className="space-y-6">
            <button onClick={() => setIsModalOpen(true)} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition-all duration-300 shadow-lg transform hover:scale-105 active:scale-95">
                Book a New Appointment
            </button>
            
            {isModalOpen && <BookAppointmentModal onClose={() => setIsModalOpen(false)} onBook={handleBook} />}
            
            <div>
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">Upcoming</h2>
                {upcomingAppointments.length > 0 ? (
                     <div className="space-y-3">
                        {upcomingAppointments.map(a => <AppointmentCard key={a.id} appointment={a} onCancel={handleCancel} />)}
                     </div>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4 bg-gray-100 dark:bg-gray-800 rounded-lg">No upcoming appointments.</p>
                )}
            </div>

            <div>
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">Past</h2>
                {pastAppointments.length > 0 ? (
                    <div className="space-y-3">
                        {pastAppointments.map(a => <AppointmentCard key={a.id} appointment={a} onCancel={handleCancel} />)}
                    </div>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4 bg-gray-100 dark:bg-gray-800 rounded-lg">No past appointments.</p>
                )}
            </div>
        </div>
    );
};

export default Appointments;
