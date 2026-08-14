export type Role = 'doctor' | 'staff';

export type Account = {
  role: Role;
  email: string;
  password: string;
  name: string;
  title: string;
  department: string;
};

export const ACCOUNTS: Account[] = [
  {
    role: 'doctor',
    email: 'dr.sakif@amrguard.health',
    password: 'doctor123',
    name: 'Dr. Sakif Rahman',
    title: 'Consultant, Infectious Diseases',
    department: 'Critical Care',
  },
  {
    role: 'staff',
    email: 'priya.n@amrguard.health',
    password: 'staff123',
    name: 'Priya Nair',
    title: 'Front Desk Coordinator',
    department: 'Outpatient Registration',
  },
];

export const DEMO_CREDENTIALS: Record<Role, { email: string; password: string }> = {
  doctor: { email: ACCOUNTS[0].email, password: ACCOUNTS[0].password },
  staff: { email: ACCOUNTS[1].email, password: ACCOUNTS[1].password },
};

export type RiskBand = 'high' | 'moderate' | 'low' | 'unassessed';

export type Patient = {
  id: string;
  alphaId: string;
  ehrId: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  lastVisit: string;
  department: string;
  ward: string;
  admissionType: string;
  reasonForVisit: string;
  consultingDoctor: string;
  history: {
    previousAdmissions: number;
    positiveCultures: number;
    antibioticCourses12mo: number;
    resistantIsolate: string;
    deviceExposure: string;
  };
  risk: {
    band: RiskBand;
    score: number | null;
    drivers: string[];
  };
};

export type AppointmentStatus = 'confirmed' | 'checked-in' | 'waiting' | 'completed';

export type Appointment = {
  id: string;
  time: string;
  patientId: string;
  patientName: string;
  alphaId: string;
  department: string;
  doctor: string;
  status: AppointmentStatus;
};

export const SEED_PATIENTS: Patient[] = [
  {
    id: 'p-1',
    alphaId: 'A-102394',
    ehrId: 'EHR-77821',
    name: 'John Doe',
    age: 58,
    gender: 'Male',
    phone: '+91 98450 11223',
    lastVisit: '12 Mar 2026',
    department: 'Critical Care',
    ward: 'ICU Bed 4',
    admissionType: 'Inpatient',
    reasonForVisit: 'Persistent fever with suspected hospital-acquired infection',
    consultingDoctor: 'Dr. Sakif Rahman',
    history: {
      previousAdmissions: 3,
      positiveCultures: 2,
      antibioticCourses12mo: 4,
      resistantIsolate: 'ESBL Klebsiella pneumoniae',
      deviceExposure: 'Central line, urinary catheter',
    },
    risk: {
      band: 'high',
      score: 84,
      drivers: [
        'Four broad-spectrum antibiotic courses in the last 12 months',
        'Prior ESBL-producing Klebsiella isolate on record',
        'Indwelling central line for 9 days',
      ],
    },
  },
  {
    id: 'p-2',
    alphaId: 'A-100238',
    ehrId: 'EHR-77802',
    name: 'Meera Iyer',
    age: 34,
    gender: 'Female',
    phone: '+91 99001 45678',
    lastVisit: '02 Aug 2026',
    department: 'General Medicine',
    ward: 'OPD',
    admissionType: 'Outpatient',
    reasonForVisit: 'Recurrent urinary tract infection',
    consultingDoctor: 'Dr. Anita Menon',
    history: {
      previousAdmissions: 0,
      positiveCultures: 2,
      antibioticCourses12mo: 3,
      resistantIsolate: 'Nitrofurantoin-resistant E. coli',
      deviceExposure: 'None',
    },
    risk: {
      band: 'moderate',
      score: 56,
      drivers: [
        'Three antibiotic courses for recurrent UTI in 12 months',
        'Prior nitrofurantoin-resistant E. coli isolate',
      ],
    },
  },
  {
    id: 'p-3',
    alphaId: 'A-104517',
    ehrId: 'EHR-78140',
    name: 'Rahul Verma',
    age: 27,
    gender: 'Male',
    phone: '+91 90876 22119',
    lastVisit: '09 Aug 2026',
    department: 'Orthopaedics',
    ward: 'OPD',
    admissionType: 'Outpatient',
    reasonForVisit: 'Post-operative wound review',
    consultingDoctor: 'Dr. Sakif Rahman',
    history: {
      previousAdmissions: 1,
      positiveCultures: 0,
      antibioticCourses12mo: 1,
      resistantIsolate: 'None on record',
      deviceExposure: 'Surgical implant',
    },
    risk: {
      band: 'low',
      score: 18,
      drivers: ['Single prophylactic antibiotic course', 'No resistant isolate on record'],
    },
  },
  {
    id: 'p-4',
    alphaId: 'A-103880',
    ehrId: 'EHR-78065',
    name: 'Fatima Sheikh',
    age: 71,
    gender: 'Female',
    phone: '+91 93450 77621',
    lastVisit: '13 Aug 2026',
    department: 'Pulmonology',
    ward: 'Ward 3B',
    admissionType: 'Inpatient',
    reasonForVisit: 'Ventilator-associated pneumonia review',
    consultingDoctor: 'Dr. Kiran Desai',
    history: {
      previousAdmissions: 5,
      positiveCultures: 3,
      antibioticCourses12mo: 6,
      resistantIsolate: 'Carbapenem-resistant Acinetobacter baumannii',
      deviceExposure: 'Mechanical ventilation, central line',
    },
    risk: {
      band: 'high',
      score: 91,
      drivers: [
        'Six antibiotic courses in the last 12 months',
        'Carbapenem-resistant Acinetobacter isolated 6 weeks ago',
        'Ventilated for 11 days',
      ],
    },
  },
];

export const SEED_APPOINTMENTS: Appointment[] = [
  {
    id: 'a-1',
    time: '09:00',
    patientId: 'p-1',
    patientName: 'John Doe',
    alphaId: 'A-102394',
    department: 'Critical Care',
    doctor: 'Dr. Sakif Rahman',
    status: 'checked-in',
  },
  {
    id: 'a-2',
    time: '09:30',
    patientId: 'p-2',
    patientName: 'Meera Iyer',
    alphaId: 'A-100238',
    department: 'General Medicine',
    doctor: 'Dr. Anita Menon',
    status: 'waiting',
  },
  {
    id: 'a-3',
    time: '10:00',
    patientId: 'p-3',
    patientName: 'Rahul Verma',
    alphaId: 'A-104517',
    department: 'Orthopaedics',
    doctor: 'Dr. Sakif Rahman',
    status: 'confirmed',
  },
  {
    id: 'a-4',
    time: '10:30',
    patientId: 'p-4',
    patientName: 'Fatima Sheikh',
    alphaId: 'A-103880',
    department: 'Pulmonology',
    doctor: 'Dr. Kiran Desai',
    status: 'confirmed',
  },
];

export const DEPARTMENTS = [
  'General Medicine',
  'Critical Care',
  'Pulmonology',
  'Orthopaedics',
  'Nephrology',
  'Paediatrics',
];

export const ADMISSION_TYPES = ['Outpatient', 'Inpatient', 'Emergency', 'Day care'];

export const DOCTORS = [
  'Dr. Sakif Rahman',
  'Dr. Anita Menon',
  'Dr. Kiran Desai',
  'Dr. Leela Krishnan',
];

export const RISK_BAND_META: Record<RiskBand, { label: string; color: string; bg: string }> = {
  high: { label: 'High AMR risk', color: '#dc2626', bg: '#fee2e2' },
  moderate: { label: 'Moderate AMR risk', color: '#d97706', bg: '#fef3c7' },
  low: { label: 'Low AMR risk', color: '#0d9488', bg: '#ccfbf1' },
  unassessed: { label: 'Not yet assessed', color: '#475569', bg: '#e2e8f0' },
};

export const APPOINTMENT_STATUS_META: Record<
  AppointmentStatus,
  { label: string; color: string; bg: string }
> = {
  confirmed: { label: 'Confirmed', color: '#0369a1', bg: '#e0f2fe' },
  'checked-in': { label: 'Checked in', color: '#0d9488', bg: '#ccfbf1' },
  waiting: { label: 'Waiting', color: '#d97706', bg: '#fef3c7' },
  completed: { label: 'Completed', color: '#475569', bg: '#e2e8f0' },
};
