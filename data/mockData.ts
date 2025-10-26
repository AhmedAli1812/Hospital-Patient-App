import type { Patient, Prescription, LabResult, Appointment, MedicalRecord } from '../types';

export const mockPatient: Patient = {
  id: 'PID-12345',
  name: 'John Doe',
  dob: '1985-05-15',
  gender: 'Male',
  contact: {
    phone: '+1-202-555-0182',
    email: 'john.doe@example.com',
  },
  emergencyContact: {
    name: 'Jane Doe',
    phone: '+1-202-555-0191',
  },
  insurance: {
    provider: 'HealthCare Inc.',
    policyNumber: 'HC123456789',
  },
  status: 'Discharged',
};

export const mockPrescriptions: Prescription[] = [
  {
    id: 1,
    medication_name: 'Amoxicillin 500mg',
    dosage: '500mg',
    frequency: '3 times daily',
    duration: '7 days',
    instructions: 'Take after meals',
    prescribed_by: 'Dr. Ahmed Hassan',
    prescribed_date: '2025-10-20',
    status: 'active',
    schedule: ['08:00', '14:00', '20:00'],
  },
  {
    id: 2,
    medication_name: 'Lisinopril 10mg',
    dosage: '10mg',
    frequency: 'Once daily',
    duration: 'Ongoing',
    instructions: 'Take in the morning',
    prescribed_by: 'Dr. Sarah Mohamed',
    prescribed_date: '2025-09-15',
    status: 'active',
    schedule: ['09:00'],
  },
  {
    id: 3,
    medication_name: 'Ibuprofen 200mg',
    dosage: '200mg',
    frequency: 'As needed for pain',
    duration: '5 days',
    instructions: 'Do not exceed 4 tablets in 24 hours',
    prescribed_by: 'Dr. Ahmed Hassan',
    prescribed_date: '2025-10-18',
    status: 'completed',
    schedule: [],
  },
];

export const mockLabResults: LabResult[] = [
  {
    id: 1,
    test_name: 'Complete Blood Count (CBC)',
    test_date: '2025-10-25',
    status: 'completed',
    ordered_by: 'Dr. Sarah Mohamed',
    results: [
      { parameter: 'Hemoglobin', value: '14.5', unit: 'g/dL', reference_range: '13.0-17.0', status: 'normal' },
      { parameter: 'WBC Count', value: '12.5', unit: '10^3/µL', reference_range: '4.0-11.0', status: 'high' },
      { parameter: 'Platelets', value: '250', unit: '10^3/µL', reference_range: '150-450', status: 'normal' },
    ],
    report_url: '#',
  },
  {
    id: 2,
    test_name: 'Lipid Panel',
    test_date: '2025-10-25',
    status: 'completed',
    ordered_by: 'Dr. Sarah Mohamed',
    results: [
      { parameter: 'Total Cholesterol', value: '210', unit: 'mg/dL', reference_range: '<200', status: 'high' },
      { parameter: 'HDL', value: '45', unit: 'mg/dL', reference_range: '>40', status: 'normal' },
      { parameter: 'LDL', value: '140', unit: 'mg/dL', reference_range: '<100', status: 'high' },
    ],
    report_url: '#',
  },
  {
    id: 3,
    test_name: 'Thyroid Function Test',
    test_date: '2025-11-05',
    status: 'pending',
    ordered_by: 'Dr. Sarah Mohamed',
    results: [],
    report_url: '#',
  }
];

export const mockAppointments: Appointment[] = [
  { id: 1, doctor: 'Dr. Sarah Mohamed', specialization: 'Cardiology', date: '2025-11-15', time: '10:00 AM', department: 'Cardiology', purpose: 'Follow-up consultation', status: 'upcoming' },
  { id: 2, doctor: 'Dr. Omar Farooq', specialization: 'Dermatology', date: '2025-11-20', time: '02:30 PM', department: 'Dermatology', purpose: 'Skin check', status: 'upcoming' },
  { id: 3, doctor: 'Dr. Ahmed Hassan', specialization: 'General Practice', date: '2025-10-18', time: '09:00 AM', department: 'General Clinic', purpose: 'Annual check-up', status: 'completed' },
];

export const mockMedicalRecords: MedicalRecord[] = [
  { id: 1, date: '2025-10-18', type: 'diagnosis', title: 'Hypertension', details: 'Diagnosed with stage 1 hypertension.', doctor: 'Dr. Sarah Mohamed' },
  { id: 2, date: '2023-05-20', type: 'procedure', title: 'Appendectomy', details: 'Laparoscopic appendectomy performed.', doctor: 'Dr. James Wilson' },
  { id: 3, date: '2010-01-01', type: 'allergy', title: 'Penicillin', details: 'Patient has a known allergy to Penicillin, resulting in hives.', doctor: 'Dr. Susan Bones' },
  { id: 4, date: '2024-09-01', type: 'immunization', title: 'Influenza Vaccine', details: 'Seasonal flu shot administered.', doctor: 'Nurse Joy' },
];

export const mockTrendData = [
    { date: '2025-04-25', Hemoglobin: 14.2 },
    { date: '2025-06-15', Hemoglobin: 14.8 },
    { date: '2025-08-20', Hemoglobin: 14.1 },
    { date: '2025-10-25', Hemoglobin: 14.5 },
];

export const mockMessages = [
    { id: 1, sender: 'doctor', text: 'Hello John, how are you feeling after starting the new medication?', timestamp: '10:30 AM' },
    { id: 2, sender: 'patient', text: 'Hi Dr. Sarah. I\'m feeling a bit dizzy sometimes.', timestamp: '10:32 AM' },
    { id: 3, sender: 'doctor', text: 'That can be a side effect. Please monitor your blood pressure and let me know the readings tomorrow.', timestamp: '10:35 AM' },
    { id: 4, sender: 'patient', text: 'Okay, I will. Thanks!', timestamp: '10:36 AM' },
];
