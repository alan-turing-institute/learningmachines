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
}

interface Outcome {
  actual: string;
  prediction: Prediction;
}

interface MedicalHistory {
  diagnosis: string;
  value: string;
  diagnosisDate: Date;
  treatment: Treatment;
  outcome: Outcome;
}

interface Personal {
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
  personalInfo: Array<Personal>;
  medicalHistory: Array<MedicalHistory>
}