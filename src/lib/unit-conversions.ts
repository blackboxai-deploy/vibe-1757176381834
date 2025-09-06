// Unit conversion utilities

import { UnitSystem } from '@/types/stress';

export const UNIT_SYSTEMS: Record<string, UnitSystem> = {
  metric: {
    name: 'Metric (SI)',
    stress: ['Pa', 'kPa', 'MPa', 'GPa'],
    force: ['N', 'kN', 'MN'],
    area: ['mm²', 'cm²', 'm²'],
    length: ['mm', 'cm', 'm'],
    moment: ['N⋅mm', 'N⋅cm', 'N⋅m', 'kN⋅m'],
    temperature: ['°C', 'K']
  },
  imperial: {
    name: 'Imperial (US)',
    stress: ['psi', 'ksi', 'Msi'],
    force: ['lbf', 'kip'],
    area: ['in²', 'ft²'],
    length: ['in', 'ft'],
    moment: ['lbf⋅in', 'lbf⋅ft', 'kip⋅in', 'kip⋅ft'],
    temperature: ['°F', '°R']
  }
};

/**
 * Convert force to base unit (N for metric, lbf for imperial)
 */
export function convertForceToBase(value: number, unit: string, system: 'metric' | 'imperial'): number {
  if (system === 'metric') {
    switch (unit) {
      case 'N': return value;
      case 'kN': return value * 1000;
      case 'MN': return value * 1000000;
      default: return value;
    }
  } else {
    switch (unit) {
      case 'lbf': return value;
      case 'kip': return value * 1000;
      default: return value;
    }
  }
}

/**
 * Convert area to base unit (m² for metric, in² for imperial)
 */
export function convertAreaToBase(value: number, unit: string, system: 'metric' | 'imperial'): number {
  if (system === 'metric') {
    switch (unit) {
      case 'mm²': return value / 1000000;
      case 'cm²': return value / 10000;
      case 'm²': return value;
      default: return value;
    }
  } else {
    switch (unit) {
      case 'in²': return value;
      case 'ft²': return value * 144;
      default: return value;
    }
  }
}

/**
 * Convert length to base unit (m for metric, in for imperial)
 */
export function convertLengthToBase(value: number, unit: string, system: 'metric' | 'imperial'): number {
  if (system === 'metric') {
    switch (unit) {
      case 'mm': return value / 1000;
      case 'cm': return value / 100;
      case 'm': return value;
      default: return value;
    }
  } else {
    switch (unit) {
      case 'in': return value;
      case 'ft': return value * 12;
      default: return value;
    }
  }
}

/**
 * Convert moment to base unit (N⋅m for metric, lbf⋅in for imperial)
 */
export function convertMomentToBase(value: number, unit: string, system: 'metric' | 'imperial'): number {
  if (system === 'metric') {
    switch (unit) {
      case 'N⋅mm': return value / 1000;
      case 'N⋅cm': return value / 100;
      case 'N⋅m': return value;
      case 'kN⋅m': return value * 1000;
      default: return value;
    }
  } else {
    switch (unit) {
      case 'lbf⋅in': return value;
      case 'lbf⋅ft': return value * 12;
      case 'kip⋅in': return value * 1000;
      case 'kip⋅ft': return value * 12000;
      default: return value;
    }
  }
}

/**
 * Convert temperature difference to base unit (K for metric, °R for imperial)
 */
export function convertTemperatureChangeToBase(value: number, unit: string, system: 'metric' | 'imperial'): number {
  if (system === 'metric') {
    switch (unit) {
      case '°C': return value; // Same as K for temperature differences
      case 'K': return value;
      default: return value;
    }
  } else {
    switch (unit) {
      case '°F': return value * (5/9); // Convert °F difference to °R difference
      case '°R': return value;
      default: return value;
    }
  }
}

/**
 * Get appropriate stress unit for the unit system
 */
export function getStressUnit(system: 'metric' | 'imperial'): string {
  return system === 'metric' ? 'Pa' : 'psi';
}

/**
 * Convert between unit systems
 */
export function convertBetweenSystems(value: number, fromSystem: 'metric' | 'imperial', toSystem: 'metric' | 'imperial', type: 'stress' | 'force' | 'area' | 'length'): number {
  if (fromSystem === toSystem) return value;
  
  const conversions = {
    stress: {
      metricToImperial: (v: number) => v / 6894.76, // Pa to psi
      imperialToMetric: (v: number) => v * 6894.76  // psi to Pa
    },
    force: {
      metricToImperial: (v: number) => v / 4.448, // N to lbf
      imperialToMetric: (v: number) => v * 4.448  // lbf to N
    },
    area: {
      metricToImperial: (v: number) => v * 1550, // m² to in²
      imperialToMetric: (v: number) => v / 1550  // in² to m²
    },
    length: {
      metricToImperial: (v: number) => v * 39.37, // m to in
      imperialToMetric: (v: number) => v / 39.37  // in to m
    }
  };
  
  if (fromSystem === 'metric' && toSystem === 'imperial') {
    return conversions[type].metricToImperial(value);
  } else {
    return conversions[type].imperialToMetric(value);
  }
}

/**
 * Format number with appropriate precision
 */
export function formatNumber(value: number): string {
  if (Math.abs(value) >= 1e6) {
    return value.toExponential(3);
  } else if (Math.abs(value) >= 1000) {
    return value.toFixed(1);
  } else if (Math.abs(value) >= 1) {
    return value.toFixed(3);
  } else {
    return value.toExponential(3);
  }
}