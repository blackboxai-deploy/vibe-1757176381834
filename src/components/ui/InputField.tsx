'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  unit?: string;
  units?: string[];
  onUnitChange?: (unit: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  type?: 'number' | 'text';
  step?: string;
  min?: number;
  max?: number;
}

export function InputField({
  label,
  value,
  onChange,
  unit,
  units = [],
  onUnitChange,
  placeholder,
  error,
  required = false,
  type = 'number',
  step = 'any',
  min,
  max
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={label} className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            id={label}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            step={step}
            min={min}
            max={max}
            className={error ? 'border-red-500 focus:border-red-500' : ''}
          />
        </div>
        
        {units.length > 0 && onUnitChange && (
          <div className="w-24">
            <Select value={unit} onValueChange={onUnitChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {units.map((unitOption) => (
                  <SelectItem key={unitOption} value={unitOption}>
                    {unitOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        {unit && units.length === 0 && (
          <div className="flex items-center px-3 py-2 bg-gray-100 rounded-md border text-sm text-gray-600 min-w-[60px] justify-center">
            {unit}
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
}