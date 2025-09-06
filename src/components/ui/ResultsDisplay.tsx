'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StressResult } from '@/types/stress';
import { formatStressValue } from '@/lib/stress-calculations';

interface ResultsDisplayProps {
  result: StressResult | null;
  isCalculating?: boolean;
  onCopy?: () => void;
}

export function ResultsDisplay({ 
  result, 
  isCalculating = false,
  onCopy
}: ResultsDisplayProps) {
  const copyToClipboard = () => {
    if (!result) return;
    
    const textToCopy = `
Stress Calculation Result:
Formula: ${result.formula}
Result: ${formatStressValue(result.value, result.unit)}
Inputs: ${Object.entries(result.inputs).map(([key, value]) => `${key}: ${value}`).join(', ')}
    `.trim();
    
    navigator.clipboard.writeText(textToCopy);
    onCopy?.();
  };

  if (isCalculating) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Calculating...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card className="mt-6 border-dashed border-gray-300">
        <CardHeader>
          <CardTitle className="text-lg text-gray-500">Results</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">
            Enter values above to see calculation results
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6 border-green-200 bg-green-50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg text-green-800">Calculation Result</CardTitle>
        <Button 
          variant="outline" 
          size="sm"
          onClick={copyToClipboard}
          className="text-green-700 border-green-300 hover:bg-green-100"
        >
          Copy Result
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Main Result */}
          <div className="text-center">
            <div className="text-3xl font-bold text-green-800 mb-2">
              {formatStressValue(result.value, result.unit)}
            </div>
            <div className="text-sm text-green-600 bg-green-100 inline-block px-3 py-1 rounded-full">
              {result.formula}
            </div>
          </div>
          
          {/* Input Summary */}
          <div className="border-t pt-4">
            <h4 className="font-semibold text-green-800 mb-2">Input Values:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {Object.entries(result.inputs).map(([key, value]) => (
                <div key={key} className="flex justify-between bg-white px-3 py-2 rounded border">
                  <span className="capitalize text-gray-600">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                  </span>
                  <span className="font-mono text-gray-800">{value}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="text-xs text-green-600 text-center pt-2 border-t">
            Results calculated using standard engineering formulas
          </div>
        </div>
      </CardContent>
    </Card>
  );
}