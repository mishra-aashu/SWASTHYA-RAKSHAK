
import React from 'react';
import { Landmark } from 'lucide-react';

export const COLORS = {
  govBlueDark: '#0D47A1',
  govBlue: '#004d99',
  govBlueLight: '#0066cc',
  saffron: '#FFC107',
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
    <div style={{backgroundColor: COLORS.saffron}} className="flex-1"></div>
    <div style={{backgroundColor: COLORS.white}} className="flex-1"></div>
    <div style={{backgroundColor: COLORS.green}} className="flex-1"></div>
  </div>
);

export const GovLogo = () => (
  <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
    <div style={{backgroundColor: 'white', padding: '8px', borderRadius: '8px', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}>
       <Landmark style={{color: '#1e3a8a', width: '28px', height: '28px'}} />
    </div>
    <div style={{display: 'flex', flexDirection: 'column', color: 'white', fontFamily: 'Roboto, sans-serif'}}>
      <h1 style={{fontSize: '24px', fontWeight: 'bold', lineHeight: '1.2', marginBottom: '4px', fontFamily: 'Roboto, sans-serif'}}>स्वास्थ्य एवं परिवार कल्याण मंत्रालय</h1>
      <p style={{fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.025em', marginBottom: '4px', fontFamily: 'Roboto, sans-serif'}}>Ministry of Health & Family Welfare</p>
      <p style={{fontSize: '14px', fontWeight: '500', fontFamily: 'Roboto, sans-serif'}}>भारत सरकार | Government of India</p>
    </div>
  </div>
);