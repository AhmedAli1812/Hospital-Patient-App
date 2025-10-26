
export interface Patient {
  id: string;
  name: string;
  dob: string;
  gender: string;
  contact: {
    phone: string;
    email: string;
  };
  emergencyContact: {
    name: string;
    phone: string;
  };
  insurance: {
    provider: string;
    policyNumber: string;
  };
  status: 'Admitted' | 'Discharged';
}

export interface Prescription {
  id: number;
  medication_name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  prescribed_by: string;
  prescribed_date: string;
  status: 'active' | 'completed' | 'cancelled';
  schedule: string[];
}

export interface LabResultParameter {
  parameter: string;
  value: string;
  unit: string;
  reference_range: string;
  status: 'normal' | 'high' | 'low';
}

export interface LabResult {
  id: number;
  test_name: string;
  test_date: string;
  status: 'completed' | 'pending';
  ordered_by: string;
  results: LabResultParameter[];
  report_url: string;
}

export interface Appointment {
  id: number;
  doctor: string;
  specialization: string;
  date: string;
  time: string;
  department: string;
  purpose: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface MedicalRecord {
  id: number;
  date: string;
  type: 'diagnosis' | 'procedure' | 'allergy' | 'immunization';
  title: string;
  details: string;
  doctor: string;
}
