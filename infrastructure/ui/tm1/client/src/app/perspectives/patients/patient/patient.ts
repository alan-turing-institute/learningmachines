type ChartType = "bar" | "line"
export type causeOfDeathOptions = "class A" | "class B"
export type predictionOptions = causeOfDeathOptions

interface Treatment {
  treatment: string;
  value: string;
  start: Date;
  end: Date;
}

export interface Prediction {
  value: predictionOptions;
  confidence: number;
  intepreter: string;
  date: Date | null;
}

export interface Death {
  causeOfDeath: causeOfDeathOptions;
  predictedCauseOfDeath: Prediction ;
  date: Date | null;
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
  yearOfDiagnosis: Date;
  medicalHistory: Array<MedicalHistory>
  treatment: Array<Treatment>
  death: Death | null
}