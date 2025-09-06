'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/ui/InputField';
import { ResultsDisplay } from '@/components/ui/ResultsDisplay';
import { FormulaDisplay } from '@/components/ui/FormulaDisplay';
import { 
  calculateShearStress
} from '@/lib/stress-calculations';
import { 
  UNIT_SYSTEMS,
  convertForceToBase,
  convertAreaToBase,
  getStressUnit 
} from '@/lib/unit-conversions';
import { validateShearStressInputs } from '@/lib/validation';
import { StressResult, ValidationError } from '@/types/stress';

interface ShearStressCalculatorProps {
  unitSystem: 'metric' | 'imperial';
}

export function ShearStressCalculator({ unitSystem }: ShearStressCalculatorProps) {
  const [inputs, setInputs] = useState({
    shearForce: '',
    area: ''
  });
  
  const [units, setUnits] = useState({
    shearForce: unitSystem === 'metric' ? 'N' : 'lbf',
    area: unitSystem === 'metric' ? 'mm²' : 'in²'
  });
  
  const [result, setResult] = useState<StressResult | null>(null);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [copySuccess, setCopySuccess] = useState(false);

  // Update units when unit system changes
  useEffect(() => {
    setUnits({
      shearForce: unitSystem === 'metric' ? 'N' : 'lbf',
      area: unitSystem === 'metric' ? 'mm²' : 'in²'
    });
    setResult(null);
  }, [unitSystem]);

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    setErrors(prev => prev.filter(error => error.field !== field));
    setResult(null);
  };

  const handleUnitChange = (field: string, unit: string) => {
    setUnits(prev => ({ ...prev, [field]: unit }));
    setResult(null);
  };

  const calculate = () => {
    const validationErrors = validateShearStressInputs(inputs);
    setErrors(validationErrors);
    
    if (validationErrors.length > 0) {
      return;
    }

    try {
      const shearForce = convertForceToBase(parseFloat(inputs.shearForce), units.shearForce, unitSystem);
      const area = convertAreaToBase(parseFloat(inputs.area), units.area, unitSystem);
      
      const stressUnit = getStressUnit(unitSystem);
      const calculationResult = calculateShearStress({ shearForce, area }, stressUnit);
      
      setResult(calculationResult);
    } catch (error) {
      console.error('Calculation error:', error);
      setErrors([{
        field: 'calculation',
        message: 'An error occurred during calculation. Please check your inputs.'
      }]);
    }
  };

  const clearAll = () => {
    setInputs({ shearForce: '', area: '' });
    setResult(null);
    setErrors([]);
    setCopySuccess(false);
  };

  const handleCopy = () => {
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const getFieldError = (field: string) => {
    return errors.find(error => error.field === field)?.message;
  };

  const isFormValid = inputs.shearForce && inputs.area && errors.length === 0;

  return (
    <div className="space-y-6">
      <FormulaDisplay stressType="shear" formula="τ = F/A" />
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">Input Parameters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Shear Force (F)"
              value={inputs.shearForce}
              onChange={(value) => handleInputChange('shearForce', value)}
              unit={units.shearForce}
              units={UNIT_SYSTEMS[unitSystem].force}
              onUnitChange={(unit) => handleUnitChange('shearForce', unit)}
              placeholder="Enter shear force value"
              error={getFieldError('shearForce')}
              required
            />
            
            <InputField
              label="Cross-sectional Area (A)"
              value={inputs.area}
              onChange={(value) => handleInputChange('area', value)}
              unit={units.area}
              units={UNIT_SYSTEMS[unitSystem].area}
              onUnitChange={(unit) => handleUnitChange('area', unit)}
              placeholder="Enter area value"
              error={getFieldError('area')}
              required
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button 
              onClick={calculate}
              disabled={!isFormValid}
              className="flex-1 sm:flex-none"
            >
              Calculate Shear Stress
            </Button>
            <Button 
              variant="outline"
              onClick={clearAll}
              className="flex-1 sm:flex-none"
            >
              Clear All
            </Button>
          </div>
          
          {errors.some(error => error.field === 'calculation') && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm">
                {errors.find(error => error.field === 'calculation')?.message}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <ResultsDisplay 
        result={result}
        onCopy={handleCopy}
      />
      
      {copySuccess && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
          Results copied to clipboard!
        </div>
      )}
    </div>
  );
}