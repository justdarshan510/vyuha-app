import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import {
  SEED_APPOINTMENTS,
  SEED_PATIENTS,
  type Appointment,
  type AppointmentStatus,
  type Patient,
} from '../data/mockData';

type NewPatientInput = {
  name: string;
  age: string;
  gender: string;
  alphaId: string;
  ehrId: string;
  phone: string;
  reasonForVisit: string;
  department: string;
  ward: string;
  admissionType: string;
  consultingDoctor: string;
};

type NewAppointmentInput = {
  patientId: string;
  time: string;
  department: string;
  doctor: string;
};

type AppStateValue = {
  patients: Patient[];
  appointments: Appointment[];
  findPatients: (query: string) => Patient[];
  getPatient: (id: string) => Patient | undefined;
  addPatient: (input: NewPatientInput) => Patient;
  addAppointment: (input: NewAppointmentInput) => Appointment | null;
  setAppointmentStatus: (id: string, status: AppointmentStatus) => void;
};

const AppStateContext = createContext<AppStateValue | null>(null);

const todayLabel = () =>
  new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>(SEED_PATIENTS);
  const [appointments, setAppointments] = useState<Appointment[]>(SEED_APPOINTMENTS);

  const findPatients = useCallback(
    (query: string) => {
      const q = query.trim().toLowerCase();
      if (!q) return [];
      return patients.filter((p) =>
        [p.alphaId, p.ehrId, p.phone, p.name].some((field) => field.toLowerCase().includes(q))
      );
    },
    [patients]
  );

  const getPatient = useCallback((id: string) => patients.find((p) => p.id === id), [patients]);

  const addPatient = useCallback((input: NewPatientInput) => {
    const created: Patient = {
      id: `p-${Date.now()}`,
      alphaId: input.alphaId.trim() || `A-${Math.floor(100000 + Math.random() * 899999)}`,
      ehrId: input.ehrId.trim() || `EHR-${Math.floor(70000 + Math.random() * 29999)}`,
      name: input.name.trim(),
      age: Number(input.age) || 0,
      gender: input.gender,
      phone: input.phone.trim(),
      lastVisit: todayLabel(),
      department: input.department,
      ward: input.ward.trim() || 'OPD',
      admissionType: input.admissionType,
      reasonForVisit: input.reasonForVisit.trim(),
      consultingDoctor: input.consultingDoctor,
      history: {
        previousAdmissions: 0,
        positiveCultures: 0,
        antibioticCourses12mo: 0,
        resistantIsolate: 'None on record',
        deviceExposure: 'None recorded',
      },
      risk: {
        band: 'unassessed',
        score: null,
        drivers: ['New record — AMR risk is calculated after the first clinical assessment.'],
      },
    };
    setPatients((prev) => [created, ...prev]);
    return created;
  }, []);

  const addAppointment = useCallback(
    (input: NewAppointmentInput) => {
      const patient = patients.find((p) => p.id === input.patientId);
      if (!patient) return null;
      const created: Appointment = {
        id: `a-${Date.now()}`,
        time: input.time,
        patientId: patient.id,
        patientName: patient.name,
        alphaId: patient.alphaId,
        department: input.department,
        doctor: input.doctor,
        status: 'confirmed',
      };
      setAppointments((prev) =>
        [...prev, created].sort((a, b) => a.time.localeCompare(b.time))
      );
      return created;
    },
    [patients]
  );

  const setAppointmentStatus = useCallback((id: string, status: AppointmentStatus) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  }, []);

  const value = useMemo(
    () => ({
      patients,
      appointments,
      findPatients,
      getPatient,
      addPatient,
      addAppointment,
      setAppointmentStatus,
    }),
    [patients, appointments, findPatients, getPatient, addPatient, addAppointment, setAppointmentStatus]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used inside AppStateProvider');
  return ctx;
}
