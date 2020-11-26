type ChartType = "bar" | "line"
export type causeOfDeathOptions = "Breast Cancer" | "Alive" | "Other" | "Diseases of Heart"
export type predictionOptions = causeOfDeathOptions

interface Treatment {
  treatment: string;
  value: string;
  start: Date;
  end: Date;
}

export interface Prediction {
  model: string,
  value: predictionOptions;
  confidence: number;
  interpreter: string;
  survivalMonths: number;
}

export interface Death {
  causeOfDeath: causeOfDeathOptions;
  predictedCauseOfDeath: Array<Prediction> ;
  survivalMonths: number;
}

interface MedicalHistory {
  diagnosis: string;
  value: string;
  diagnosisDate: Date | null;
}

export interface PersonalInfo {
  name: string;
  value: string;
}

interface Laboratory {
  measurementName: string;
  value: string;
  reported: Date;
}

export interface Patient {
  id: string;
  personalInfo: Array<PersonalInfo>;
  yearOfDiagnosis: number;
  medicalHistory: Array<MedicalHistory>
  // treatment: Array<Treatment>
  death: Death | null
}