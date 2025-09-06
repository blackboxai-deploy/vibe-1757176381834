// Type definitions for stress calculator

export interface StressResult {
  value: number;
  unit: string;
  formula: string;
  inputs: Record<string, number>;
}

export interface CalculationInput {
  label: string;
  value: string;
  unit: string;
  placeholder: string;
  required: boolean;
  min?: number;
  max?: number;
}

export interface UnitSystem {
  name: string;
  stress: string[];
  force: string[];
  area: string[];
  length: string[];
  moment: string[];
  temperature: string[];
}

export type StressType = 
  | 'normal'
  | 'shear' 
  | 'bending'
  | 'torsional'
  | 'thermal';

export interface NormalStressInputs {
  force: number;
  area: number;
}

export interface ShearStressInputs {
  shearForce: number;
  area: number;
}

export interface BendingStressInputs {
  moment: number;
  distance: number;
  momentOfInertia: number;
}

export interface TorsionalStressInputs {
  torque: number;
  radius: number;
  polarMomentOfInertia: number;
}

export interface ThermalStressInputs {
  elasticModulus: number;
  thermalExpansion: number;
  temperatureChange: number;
}

export type StressInputs = 
  | NormalStressInputs
  | ShearStressInputs
  | BendingStressInputs
  | TorsionalStressInputs
  | ThermalStressInputs;

export interface ValidationError {
  field: string;
  message: string;
}

export interface CalculatorState {
  inputs: Record<string, string>;
  result: StressResult | null;
  errors: ValidationError[];
  unitSystem: 'metric' | 'imperial';
}