'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getFormulaExplanation } from '@/lib/stress-calculations';

interface FormulaDisplayProps {
  stressType: string;
  formula: string;
}

export function FormulaDisplay({ stressType, formula }: FormulaDisplayProps) {
  const explanation = getFormulaExplanation(stressType);
  
  const getVariableDefinitions = (type: string) => {
    const definitions = {
      normal: [
        { symbol: 'σ', meaning: 'Normal stress' },
        { symbol: 'F', meaning: 'Applied force' },
        { symbol: 'A', meaning: 'Cross-sectional area' }
      ],
      shear: [
        { symbol: 'τ', meaning: 'Shear stress' },
        { symbol: 'F', meaning: 'Shear force' },
        { symbol: 'A', meaning: 'Cross-sectional area' }
      ],
      bending: [
        { symbol: 'σ', meaning: 'Bending stress' },
        { symbol: 'M', meaning: 'Bending moment' },
        { symbol: 'y', meaning: 'Distance from neutral axis' },
        { symbol: 'I', meaning: 'Moment of inertia' }
      ],
      torsional: [
        { symbol: 'τ', meaning: 'Torsional stress' },
        { symbol: 'T', meaning: 'Applied torque' },
        { symbol: 'r', meaning: 'Radius from center' },
        { symbol: 'J', meaning: 'Polar moment of inertia' }
      ],
      thermal: [
        { symbol: 'σ', meaning: 'Thermal stress' },
        { symbol: 'E', meaning: 'Elastic modulus' },
        { symbol: 'α', meaning: 'Thermal expansion coefficient' },
        { symbol: 'ΔT', meaning: 'Temperature change' }
      ]
    };
    
    return definitions[type as keyof typeof definitions] || [];
  };

  const variables = getVariableDefinitions(stressType);

  return (
    <Card className="mb-6 bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="text-lg text-blue-800 flex items-center gap-2">
          <span className="text-2xl">📐</span>
          Formula Reference
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Main Formula */}
          <div className="text-center">
            <div className="text-2xl font-mono font-bold text-blue-800 bg-white px-4 py-3 rounded-lg border border-blue-300 inline-block">
              {formula}
            </div>
          </div>
          
          {/* Explanation */}
          <div className="text-center text-blue-700 text-sm">
            {explanation}
          </div>
          
          {/* Variable Definitions */}
          {variables.length > 0 && (
            <div className="border-t pt-4">
              <h4 className="font-semibold text-blue-800 mb-3">Where:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {variables.map(({ symbol, meaning }) => (
                  <div key={symbol} className="flex items-center gap-3 bg-white px-3 py-2 rounded border border-blue-200">
                    <span className="font-mono font-bold text-blue-700 min-w-[24px]">
                      {symbol}
                    </span>
                    <span className="text-gray-700">=</span>
                    <span className="text-gray-600">{meaning}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Additional Notes */}
          <div className="text-xs text-blue-600 bg-blue-100 p-3 rounded-lg border border-blue-200">
            <strong>Note:</strong> Ensure all input values are in consistent units before calculating. 
            The calculator will automatically handle unit conversions when using the unit selector.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}