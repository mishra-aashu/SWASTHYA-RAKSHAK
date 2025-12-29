
import React from 'react';

export const COLORS = {
  govBlueDark: '#003366',
  govBlue: '#004d99',
  govBlueLight: '#0066cc',
  saffron: '#FF9933',
  white: '#FFFFFF',
  green: '#138808',
  navy: '#000080',
  alertCritical: '#DC2626',
  alertHigh: '#EA580C',
  alertMedium: '#F59E0B',
  alertLow: '#22C55E'
};

export const TricolorBar = () => (
  <div className="h-1.5 w-full flex">
    <div className="flex-1 bg-[#FF9933]"></div>
    <div className="flex-1 bg-white"></div>
    <div className="flex-1 bg-[#138808]"></div>
  </div>
);

export const GovLogo = () => (
  <div className="flex items-center gap-3">
    <div className="bg-white p-1 rounded-full w-12 h-12 flex items-center justify-center">
       <span className="text-2xl">🏛️</span>
    </div>
    <div className="flex flex-col text-white">
      <h1 className="text-lg font-bold leading-tight">स्वास्थ्य एवं परिवार कल्याण मंत्रालय</h1>
      <p className="text-[10px] uppercase tracking-wider opacity-90">Ministry of Health & Family Welfare</p>
      <p className="text-[10px] opacity-70">भारत सरकार | Government of India</p>
    </div>
  </div>
);
