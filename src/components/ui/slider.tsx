'use client';

import { cn } from '@/utils/cn';

interface SliderProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  showValue?: boolean;
  className?: string;
}

export function Slider({ label, value, onChange, min, max, step, showValue = true, className }: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn('space-y-2', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <label className="text-sm font-medium text-surface-700">{label}</label>}
          {showValue && (
            <span className="text-sm font-mono text-surface-500">{value}</span>
          )}
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-surface-200 rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-5
          [&::-webkit-slider-thumb]:h-5
          [&::-webkit-slider-thumb]:bg-spark-600
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:shadow-md
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-webkit-slider-thumb]:transition-transform
          [&::-webkit-slider-thumb]:hover:scale-110"
        style={{
          background: `linear-gradient(to right, #4c6ef5 0%, #4c6ef5 ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`,
        }}
      />
      <div className="flex justify-between text-xs text-surface-400">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
