type ChartType = "bar" | "line"

interface Treatment {
  treatment: string;
  value: string;
  start: Date;
  end: Date;
}

interface Prediction {
  outcome: string;
  confidence: string;
  intepreter: string;
  date: Date;
}

interface Outcome {
  actual: string;
  prediction: Prediction;
  date: Date;
}

interface MedicalHistory {
  diagnosis: string;
  value: string;
  diagnosisDate: Date;
  treatment: Treatment;
  outcome: Outcome;
}

export interface PersonalInfo {
  name: string;
  value: string;
}

// interface Laboratory {
//   measurementName: string;
//   value: string;
//   reported: Date;
// }

export interface Patient {
  id: string;
  personalInfo: Array<PersonalInfo>;
  yearOfDiagnosis: Date;
  medicalHistory: Array<MedicalHistory>
}