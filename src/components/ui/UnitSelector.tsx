'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface UnitSelectorProps {
  unitSystem: 'metric' | 'imperial';
  onUnitSystemChange: (system: 'metric' | 'imperial') => void;
}

export function UnitSelector({ unitSystem, onUnitSystemChange }: UnitSelectorProps) {
  return (
    <Card className="mb-6 bg-gray-50 border-gray-200">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Unit System</h3>
            <p className="text-sm text-gray-600">
              Choose between metric (SI) and imperial units
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={unitSystem === 'metric' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onUnitSystemChange('metric')}
              className="min-w-[100px]"
            >
              Metric (SI)
            </Button>
            <Button
              variant={unitSystem === 'imperial' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onUnitSystemChange('imperial')}
              className="min-w-[100px]"
            >
              Imperial (US)
            </Button>
          </div>
        </div>
        
        {/* Unit System Info */}
        <div className="mt-4 p-3 bg-white rounded border text-xs text-gray-600">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong className="text-gray-800">Metric Units:</strong>
              <ul className="mt-1 space-y-0.5">
                <li>Stress: Pa, MPa, GPa</li>
                <li>Force: N, kN, MN</li>
                <li>Area: mm², cm², m²</li>
                <li>Length: mm, cm, m</li>
              </ul>
            </div>
            <div>
              <strong className="text-gray-800">Imperial Units:</strong>
              <ul className="mt-1 space-y-0.5">
                <li>Stress: psi, ksi</li>
                <li>Force: lbf, kip</li>
                <li>Area: in², ft²</li>
                <li>Length: in, ft</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}