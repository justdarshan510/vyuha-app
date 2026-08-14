export interface Biomarker {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'elevated' | 'low' | 'critical';
  trend: 'up' | 'down' | 'stable';
  history: number[];
}

export interface Medication {
  id: string;
  name: string;
  class: string;
  dosage: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'completed' | 'discontinued';
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  bed: string;
  admissionDate: string;
  primaryDiagnosis: string;
  amrRiskScore: number;
  amrRiskStatus: 'Low' | 'Moderate' | 'High' | 'Critical Escalation';
  biomarkers: Biomarker[];
  medications: Medication[];
  recommendations: {
    id: string;
    type: 'escalation' | 'de-escalation' | 'review';
    description: string;
    confidence: number;
    actionable: boolean;
  }[];
}

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 'P-1001',
    name: 'Robert Chen',
    age: 64,
    gender: 'M',
    bed: 'ICU-04',
    admissionDate: '2026-08-10',
    primaryDiagnosis: 'Severe Sepsis secondary to Pneumonia',
    amrRiskScore: 84,
    amrRiskStatus: 'Critical Escalation',
    biomarkers: [
      { id: 'b1', name: 'WBC', value: 18.4, unit: 'x10³/µL', status: 'elevated', trend: 'up', history: [12.1, 14.5, 16.2, 18.4] },
      { id: 'b2', name: 'Procalcitonin', value: 2.8, unit: 'ng/mL', status: 'critical', trend: 'up', history: [0.5, 1.2, 2.1, 2.8] },
      { id: 'b3', name: 'Lactate', value: 4.1, unit: 'mmol/L', status: 'elevated', trend: 'up', history: [2.0, 2.5, 3.8, 4.1] },
      { id: 'b4', name: 'Creatinine', value: 1.5, unit: 'mg/dL', status: 'elevated', trend: 'stable', history: [1.1, 1.3, 1.4, 1.5] },
    ],
    medications: [
      { id: 'm1', name: 'Piperacillin-Tazobactam', class: 'Penicillin', dosage: '4.5g q8h IV', startDate: '2026-08-10', status: 'active' },
      { id: 'm2', name: 'Vancomycin', class: 'Glycopeptide', dosage: '15mg/kg q12h IV', startDate: '2026-08-11', status: 'active' },
    ],
    recommendations: [
      { id: 'r1', type: 'escalation', description: 'Consider escalating to Meropenem due to increasing PCT and suspected ESBL resistance profile.', confidence: 92, actionable: true }
    ]
  },
  {
    id: 'P-1002',
    name: 'Sarah Jenkins',
    age: 52,
    gender: 'F',
    bed: 'ICU-12',
    admissionDate: '2026-08-12',
    primaryDiagnosis: 'Complicated UTI',
    amrRiskScore: 42,
    amrRiskStatus: 'Moderate',
    biomarkers: [
      { id: 'b1', name: 'WBC', value: 11.2, unit: 'x10³/µL', status: 'elevated', trend: 'down', history: [15.4, 13.2, 11.2] },
      { id: 'b2', name: 'Procalcitonin', value: 0.8, unit: 'ng/mL', status: 'elevated', trend: 'down', history: [1.5, 1.1, 0.8] },
    ],
    medications: [
      { id: 'm3', name: 'Ceftriaxone', class: 'Cephalosporin', dosage: '1g q24h IV', startDate: '2026-08-12', status: 'active' }
    ],
    recommendations: [
      { id: 'r2', type: 'de-escalation', description: 'Urine culture sensitive to oral Ciprofloxacin. Consider IV to PO transition.', confidence: 88, actionable: true }
    ]
  },
  {
    id: 'P-1003',
    name: 'David Okafor',
    age: 41,
    gender: 'M',
    bed: 'WARD-2B-01',
    admissionDate: '2026-08-13',
    primaryDiagnosis: 'Cellulitis',
    amrRiskScore: 15,
    amrRiskStatus: 'Low',
    biomarkers: [
      { id: 'b1', name: 'WBC', value: 8.5, unit: 'x10³/µL', status: 'normal', trend: 'stable', history: [10.2, 9.1, 8.5] },
      { id: 'b2', name: 'CRP', value: 12.0, unit: 'mg/L', status: 'elevated', trend: 'down', history: [45.0, 22.5, 12.0] },
    ],
    medications: [
      { id: 'm4', name: 'Cefazolin', class: 'Cephalosporin', dosage: '1g q8h IV', startDate: '2026-08-13', status: 'active' }
    ],
    recommendations: [
      { id: 'r3', type: 'review', description: 'Patient responding well. Consider discharge on oral cephalexin.', confidence: 95, actionable: true }
    ]
  },
  {
    id: 'P-1004',
    name: 'Maria Garcia',
    age: 77,
    gender: 'F',
    bed: 'ICU-02',
    admissionDate: '2026-08-08',
    primaryDiagnosis: 'Ventilator-Associated Pneumonia (VAP)',
    amrRiskScore: 91,
    amrRiskStatus: 'Critical Escalation',
    biomarkers: [
      { id: 'b1', name: 'WBC', value: 22.1, unit: 'x10³/µL', status: 'critical', trend: 'up', history: [14.0, 18.5, 22.1] },
      { id: 'b2', name: 'Procalcitonin', value: 5.4, unit: 'ng/mL', status: 'critical', trend: 'up', history: [1.2, 3.4, 5.4] },
    ],
    medications: [
      { id: 'm5', name: 'Meropenem', class: 'Carbapenem', dosage: '1g q8h IV', startDate: '2026-08-10', status: 'active' },
      { id: 'm6', name: 'Levofloxacin', class: 'Fluoroquinolone', dosage: '750mg q24h IV', startDate: '2026-08-10', status: 'completed' }
    ],
    recommendations: [
      { id: 'r4', type: 'escalation', description: 'Suspected Metallo-beta-lactamase (MBL) producer. Recommend adding Colistin or Aztreonam.', confidence: 85, actionable: true }
    ]
  },
  {
    id: 'P-1005',
    name: 'James Wilson',
    age: 28,
    gender: 'M',
    bed: 'WARD-4A-12',
    admissionDate: '2026-08-14',
    primaryDiagnosis: 'Community-Acquired Pneumonia',
    amrRiskScore: 22,
    amrRiskStatus: 'Low',
    biomarkers: [
      { id: 'b1', name: 'WBC', value: 13.5, unit: 'x10³/µL', status: 'elevated', trend: 'up', history: [13.5] },
    ],
    medications: [
      { id: 'm7', name: 'Azithromycin', class: 'Macrolide', dosage: '500mg q24h IV', startDate: '2026-08-14', status: 'active' },
    ],
    recommendations: [
      { id: 'r5', type: 'review', description: 'Standard CAP protocol initiated. Review cultures in 48h.', confidence: 90, actionable: false }
    ]
  },
  {
    id: 'P-1006',
    name: 'Linda Martinez',
    age: 59,
    gender: 'F',
    bed: 'ICU-08',
    admissionDate: '2026-08-05',
    primaryDiagnosis: 'Intra-abdominal Infection',
    amrRiskScore: 68,
    amrRiskStatus: 'High',
    biomarkers: [
      { id: 'b1', name: 'WBC', value: 16.2, unit: 'x10³/µL', status: 'elevated', trend: 'stable', history: [18.1, 16.5, 16.2] },
      { id: 'b2', name: 'Lactate', value: 2.5, unit: 'mmol/L', status: 'elevated', trend: 'down', history: [4.2, 3.1, 2.5] },
    ],
    medications: [
      { id: 'm8', name: 'Ertapenem', class: 'Carbapenem', dosage: '1g q24h IV', startDate: '2026-08-05', status: 'active' },
    ],
    recommendations: [
      { id: 'r6', type: 'review', description: 'Patient on day 9 of Ertapenem. Consider source control review if markers plateau.', confidence: 78, actionable: true }
    ]
  },
  {
    id: 'P-1007',
    name: 'William Taylor',
    age: 82,
    gender: 'M',
    bed: 'WARD-1B-05',
    admissionDate: '2026-08-11',
    primaryDiagnosis: 'Catheter-Associated UTI',
    amrRiskScore: 55,
    amrRiskStatus: 'Moderate',
    biomarkers: [
      { id: 'b1', name: 'WBC', value: 12.8, unit: 'x10³/µL', status: 'elevated', trend: 'down', history: [16.4, 14.2, 12.8] },
    ],
    medications: [
      { id: 'm9', name: 'Cefepime', class: 'Cephalosporin', dosage: '2g q12h IV', startDate: '2026-08-11', status: 'active' }
    ],
    recommendations: [
      { id: 'r7', type: 'de-escalation', description: 'Urine culture shows pan-sensitive E. coli. Safe to de-escalate to Ceftriaxone.', confidence: 96, actionable: true }
    ]
  },
  {
    id: 'P-1008',
    name: 'Emily Davis',
    age: 34,
    gender: 'F',
    bed: 'ICU-10',
    admissionDate: '2026-08-09',
    primaryDiagnosis: 'Meningitis (Suspected Bacterial)',
    amrRiskScore: 75,
    amrRiskStatus: 'High',
    biomarkers: [
      { id: 'b1', name: 'WBC', value: 19.5, unit: 'x10³/µL', status: 'critical', trend: 'stable', history: [21.0, 19.8, 19.5] },
      { id: 'b2', name: 'CRP', value: 150.4, unit: 'mg/L', status: 'critical', trend: 'up', history: [80.2, 120.5, 150.4] },
    ],
    medications: [
      { id: 'm10', name: 'Ceftriaxone', class: 'Cephalosporin', dosage: '2g q12h IV', startDate: '2026-08-09', status: 'active' },
      { id: 'm11', name: 'Vancomycin', class: 'Glycopeptide', dosage: '15mg/kg q8h IV', startDate: '2026-08-09', status: 'active' }
    ],
    recommendations: [
      { id: 'r8', type: 'review', description: 'CSF culture pending. Continue empiric coverage.', confidence: 88, actionable: false }
    ]
  },
  {
    id: 'P-1009',
    name: 'Michael Brown',
    age: 45,
    gender: 'M',
    bed: 'WARD-3A-08',
    admissionDate: '2026-08-12',
    primaryDiagnosis: 'Osteomyelitis',
    amrRiskScore: 35,
    amrRiskStatus: 'Moderate',
    biomarkers: [
      { id: 'b1', name: 'WBC', value: 9.8, unit: 'x10³/µL', status: 'normal', trend: 'stable', history: [11.2, 10.5, 9.8] },
      { id: 'b2', name: 'ESR', value: 65, unit: 'mm/hr', status: 'elevated', trend: 'down', history: [85, 75, 65] },
    ],
    medications: [
      { id: 'm12', name: 'Daptomycin', class: 'Lipopeptide', dosage: '6mg/kg q24h IV', startDate: '2026-08-12', status: 'active' },
    ],
    recommendations: [
      { id: 'r9', type: 'review', description: 'MRSA confirmed. Current Daptomycin therapy appropriate. Plan for 6-week course.', confidence: 95, actionable: false }
    ]
  },
  {
    id: 'P-1010',
    name: 'Jessica Moore',
    age: 51,
    gender: 'F',
    bed: 'ICU-06',
    admissionDate: '2026-08-07',
    primaryDiagnosis: 'Necrotizing Fasciitis',
    amrRiskScore: 88,
    amrRiskStatus: 'Critical Escalation',
    biomarkers: [
      { id: 'b1', name: 'WBC', value: 24.5, unit: 'x10³/µL', status: 'critical', trend: 'down', history: [32.1, 28.4, 24.5] },
      { id: 'b2', name: 'Lactate', value: 3.8, unit: 'mmol/L', status: 'elevated', trend: 'down', history: [6.5, 4.8, 3.8] },
    ],
    medications: [
      { id: 'm13', name: 'Meropenem', class: 'Carbapenem', dosage: '1g q8h IV', startDate: '2026-08-07', status: 'active' },
      { id: 'm14', name: 'Clindamycin', class: 'Lincosamide', dosage: '900mg q8h IV', startDate: '2026-08-07', status: 'active' },
      { id: 'm15', name: 'Vancomycin', class: 'Glycopeptide', dosage: '15mg/kg q12h IV', startDate: '2026-08-07', status: 'active' }
    ],
    recommendations: [
      { id: 'r10', type: 'de-escalation', description: 'Patient clinically stable post-debridement. Consider discontinuing Clindamycin if toxin-production window has passed.', confidence: 82, actionable: true }
    ]
  }
];
