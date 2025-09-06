// Input validation functions

import { ValidationError } from '@/types/stress';

/**
 * Validate that a value is a positive number
 */
export function validatePositiveNumber(value: string, fieldName: string): ValidationError | null {
  const num = parseFloat(value);
  
  if (isNaN(num)) {
    return {
      field: fieldName,
      message: `${fieldName} must be a valid number`
    };
  }
  
  if (num <= 0) {
    return {
      field: fieldName,
      message: `${fieldName} must be greater than zero`
    };
  }
  
  return null;
}

/**
 * Validate that a value is a number (can be negative for temperature changes)
 */
export function validateNumber(value: string, fieldName: string): ValidationError | null {
  const num = parseFloat(value);
  
  if (isNaN(num)) {
    return {
      field: fieldName,
      message: `${fieldName} must be a valid number`
    };
  }
  
  return null;
}

/**
 * Validate that a value is within a reasonable range
 */
export function validateRange(value: string, fieldName: string, min: number, max: number): ValidationError | null {
  const num = parseFloat(value);
  
  if (isNaN(num)) {
    return {
      field: fieldName,
      message: `${fieldName} must be a valid number`
    };
  }
  
  if (num < min || num > max) {
    return {
      field: fieldName,
      message: `${fieldName} must be between ${min} and ${max}`
    };
  }
  
  return null;
}

/**
 * Validate normal stress inputs
 */
export function validateNormalStressInputs(inputs: Record<string, string>): ValidationError[] {
  const errors: ValidationError[] = [];
  
  const forceError = validatePositiveNumber(inputs.force, 'Force');
  if (forceError) errors.push(forceError);
  
  const areaError = validatePositiveNumber(inputs.area, 'Area');
  if (areaError) errors.push(areaError);
  
  return errors;
}

/**
 * Validate shear stress inputs
 */
export function validateShearStressInputs(inputs: Record<string, string>): ValidationError[] {
  const errors: ValidationError[] = [];
  
  const forceError = validatePositiveNumber(inputs.shearForce, 'Shear Force');
  if (forceError) errors.push(forceError);
  
  const areaError = validatePositiveNumber(inputs.area, 'Area');
  if (areaError) errors.push(areaError);
  
  return errors;
}

/**
 * Validate bending stress inputs
 */
export function validateBendingStressInputs(inputs: Record<string, string>): ValidationError[] {
  const errors: ValidationError[] = [];
  
  const momentError = validatePositiveNumber(inputs.moment, 'Bending Moment');
  if (momentError) errors.push(momentError);
  
  const distanceError = validatePositiveNumber(inputs.distance, 'Distance from Neutral Axis');
  if (distanceError) errors.push(distanceError);
  
  const inertiaError = validatePositiveNumber(inputs.momentOfInertia, 'Moment of Inertia');
  if (inertiaError) errors.push(inertiaError);
  
  return errors;
}

/**
 * Validate torsional stress inputs
 */
export function validateTorsionalStressInputs(inputs: Record<string, string>): ValidationError[] {
  const errors: ValidationError[] = [];
  
  const torqueError = validatePositiveNumber(inputs.torque, 'Torque');
  if (torqueError) errors.push(torqueError);
  
  const radiusError = validatePositiveNumber(inputs.radius, 'Radius');
  if (radiusError) errors.push(radiusError);
  
  const inertiaError = validatePositiveNumber(inputs.polarMomentOfInertia, 'Polar Moment of Inertia');
  if (inertiaError) errors.push(inertiaError);
  
  return errors;
}

/**
 * Validate thermal stress inputs
 */
export function validateThermalStressInputs(inputs: Record<string, string>): ValidationError[] {
  const errors: ValidationError[] = [];
  
  const modulusError = validatePositiveNumber(inputs.elasticModulus, 'Elastic Modulus');
  if (modulusError) errors.push(modulusError);
  
  const expansionError = validatePositiveNumber(inputs.thermalExpansion, 'Thermal Expansion Coefficient');
  if (expansionError) errors.push(expansionError);
  
  const tempError = validateNumber(inputs.temperatureChange, 'Temperature Change');
  if (tempError) errors.push(tempError);
  
  return errors;
}

/**
 * Check if input string is empty or only whitespace
 */
export function isEmpty(value: string): boolean {
  return !value || value.trim().length === 0;
}

/**
 * Validate required fields are not empty
 */
export function validateRequiredFields(inputs: Record<string, string>, requiredFields: string[]): ValidationError[] {
  const errors: ValidationError[] = [];
  
  requiredFields.forEach(field => {
    if (isEmpty(inputs[field])) {
      errors.push({
        field,
        message: `${field} is required`
      });
    }
  });
  
  return errors;
}

/**
 * Get validation function for specific stress type
 */
export function getValidationFunction(stressType: string) {
  const validators = {
    normal: validateNormalStressInputs,
    shear: validateShearStressInputs,
    bending: validateBendingStressInputs,
    torsional: validateTorsionalStressInputs,
    thermal: validateThermalStressInputs
  };
  
  return validators[stressType as keyof typeof validators] || (() => []);
}