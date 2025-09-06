// Core stress calculation functions

import { 
  NormalStressInputs, 
  ShearStressInputs, 
  BendingStressInputs, 
  TorsionalStressInputs, 
  ThermalStressInputs,
  StressResult 
} from '@/types/stress';

/**
 * Calculate normal stress: σ = F/A
 * @param inputs - Force and area values
 * @returns Stress result with formula and calculation
 */
export function calculateNormalStress(inputs: NormalStressInputs, unit: string): StressResult {
  const { force, area } = inputs;
  const stress = force / area;
  
  return {
    value: stress,
    unit,
    formula: 'σ = F/A',
    inputs: { force, area }
  };
}

/**
 * Calculate shear stress: τ = F/A
 * @param inputs - Shear force and area values
 * @returns Stress result with formula and calculation
 */
export function calculateShearStress(inputs: ShearStressInputs, unit: string): StressResult {
  const { shearForce, area } = inputs;
  const stress = shearForce / area;
  
  return {
    value: stress,
    unit,
    formula: 'τ = F/A',
    inputs: { shearForce, area }
  };
}

/**
 * Calculate bending stress: σ = M*y/I
 * @param inputs - Moment, distance from neutral axis, and moment of inertia
 * @returns Stress result with formula and calculation
 */
export function calculateBendingStress(inputs: BendingStressInputs, unit: string): StressResult {
  const { moment, distance, momentOfInertia } = inputs;
  const stress = (moment * distance) / momentOfInertia;
  
  return {
    value: stress,
    unit,
    formula: 'σ = M×y/I',
    inputs: { moment, distance, momentOfInertia }
  };
}

/**
 * Calculate torsional stress: τ = T*r/J
 * @param inputs - Torque, radius, and polar moment of inertia
 * @returns Stress result with formula and calculation
 */
export function calculateTorsionalStress(inputs: TorsionalStressInputs, unit: string): StressResult {
  const { torque, radius, polarMomentOfInertia } = inputs;
  const stress = (torque * radius) / polarMomentOfInertia;
  
  return {
    value: stress,
    unit,
    formula: 'τ = T×r/J',
    inputs: { torque, radius, polarMomentOfInertia }
  };
}

/**
 * Calculate thermal stress: σ = E*α*ΔT
 * @param inputs - Elastic modulus, thermal expansion coefficient, and temperature change
 * @returns Stress result with formula and calculation
 */
export function calculateThermalStress(inputs: ThermalStressInputs, unit: string): StressResult {
  const { elasticModulus, thermalExpansion, temperatureChange } = inputs;
  const stress = elasticModulus * thermalExpansion * temperatureChange;
  
  return {
    value: stress,
    unit,
    formula: 'σ = E×α×ΔT',
    inputs: { elasticModulus, thermalExpansion, temperatureChange }
  };
}

/**
 * Format stress value for display
 * @param value - Stress value
 * @param unit - Unit string
 * @returns Formatted string with appropriate decimal places
 */
export function formatStressValue(value: number, unit: string): string {
  if (Math.abs(value) >= 1e9) {
    return `${(value / 1e9).toFixed(3)} G${unit}`;
  } else if (Math.abs(value) >= 1e6) {
    return `${(value / 1e6).toFixed(3)} M${unit}`;
  } else if (Math.abs(value) >= 1e3) {
    return `${(value / 1e3).toFixed(3)} k${unit}`;
  } else {
    return `${value.toFixed(3)} ${unit}`;
  }
}

/**
 * Get formula explanation for each stress type
 */
export function getFormulaExplanation(stressType: string): string {
  const explanations = {
    normal: 'σ = F/A - Normal stress equals force divided by cross-sectional area',
    shear: 'τ = F/A - Shear stress equals shear force divided by cross-sectional area',
    bending: 'σ = M×y/I - Bending stress equals moment times distance from neutral axis divided by moment of inertia',
    torsional: 'τ = T×r/J - Torsional stress equals torque times radius divided by polar moment of inertia',
    thermal: 'σ = E×α×ΔT - Thermal stress equals elastic modulus times thermal expansion coefficient times temperature change'
  };
  
  return explanations[stressType as keyof typeof explanations] || '';
}