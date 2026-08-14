import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Patient, MOCK_PATIENTS } from '../data/mockData';

interface AppStateContextType {
  activePatient: Patient | null;
  setActivePatient: (patient: Patient) => void;
  patients: Patient[];
  acceptRecommendation: (patientId: string, recommendationId: string) => void;
  overrideRecommendation: (patientId: string, recommendationId: string, reason: string) => void;
  addPatient: (patient: Partial<Patient>) => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [patients, setPatients] = useState<Patient[]>(MOCK_PATIENTS);
  const [activePatient, setActivePatient] = useState<Patient | null>(MOCK_PATIENTS[0] || null);

  const acceptRecommendation = (patientId: string, recommendationId: string) => {
    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        return {
          ...p,
          recommendations: p.recommendations.filter(r => r.id !== recommendationId)
        };
      }
      return p;
    }));
    
    if (activePatient?.id === patientId) {
      setActivePatient(prev => prev ? {
        ...prev,
        recommendations: prev.recommendations.filter(r => r.id !== recommendationId)
      } : null);
    }
  };

  const overrideRecommendation = (patientId: string, recommendationId: string, reason: string) => {
    // In a real app, we would log the override reason to a backend audit trail.
    console.log(`Recommendation ${recommendationId} overridden for patient ${patientId}. Reason: ${reason}`);
    acceptRecommendation(patientId, recommendationId); // Remove it from UI for now
  };

  const addPatient = (newPatient: Partial<Patient>) => {
    const defaultPatient: Patient = {
      id: `P-${Math.floor(Math.random() * 10000)}`,
      name: 'Unknown Patient',
      age: 0,
      gender: 'U',
      bed: 'Unassigned',
      admissionDate: new Date().toISOString().split('T')[0],
      primaryDiagnosis: 'TBD',
      amrRiskScore: 0,
      amrRiskStatus: 'Low',
      biomarkers: [],
      medications: [],
      recommendations: []
    };

    const createdPatient = { ...defaultPatient, ...newPatient } as Patient;
    setPatients(prev => [createdPatient, ...prev]);
  };

  return (
    <AppStateContext.Provider value={{
      activePatient,
      setActivePatient,
      patients,
      acceptRecommendation,
      overrideRecommendation,
      addPatient
    }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
