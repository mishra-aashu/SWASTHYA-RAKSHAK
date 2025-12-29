
import { DiseaseReport, HealthAlert, Prediction } from '../types';

export const patnaBlocks = [
  { name: 'Patna Sadar', nameHindi: 'पटना सदर', lat: 25.6093, lng: 85.1376 },
  { name: 'Danapur', nameHindi: 'दानापुर', lat: 25.6216, lng: 85.0506 },
  { name: 'Phulwari Sharif', nameHindi: 'फुलवारी शरीफ', lat: 25.5716, lng: 85.0856 },
  { name: 'Bihta', nameHindi: 'बिहटा', lat: 25.5603, lng: 84.8619 },
  { name: 'Masaurhi', nameHindi: 'मसौढ़ी', lat: 25.3539, lng: 85.0328 }
];

export const biharDistricts = [
  { name: 'Patna', nameHindi: 'पटना', lat: 25.5941, lng: 85.1376 },
  { name: 'Gaya', nameHindi: 'गया', lat: 24.7914, lng: 85.0002 },
  { name: 'Muzaffarpur', nameHindi: 'मुजफ्फरपुर', lat: 26.1209, lng: 85.3647 },
  { name: 'Darbhanga', nameHindi: 'दरभंगा', lat: 26.1542, lng: 85.8918 }
];

export const mockReports: DiseaseReport[] = [
  {
    id: 'rep-1',
    kendra_name: 'PHC Patna Sadar',
    disease_name: 'Dengue',
    disease_name_hindi: 'डेंगू',
    patient_count: 142,
    severity: 'high',
    district: 'Patna',
    block: 'Patna Sadar',
    report_date: '2024-05-15',
    trend: 'increasing'
  },
  {
    id: 'rep-2',
    kendra_name: 'CHC Danapur',
    disease_name: 'Malaria',
    disease_name_hindi: 'मलेरिया',
    patient_count: 56,
    severity: 'medium',
    district: 'Patna',
    block: 'Danapur',
    report_date: '2024-05-14',
    trend: 'stable'
  },
  {
    id: 'rep-3',
    kendra_name: 'PHC Bihta',
    disease_name: 'Typhoid',
    disease_name_hindi: 'टाइफाइड',
    patient_count: 89,
    severity: 'medium',
    district: 'Patna',
    block: 'Bihta',
    report_date: '2024-05-15',
    trend: 'increasing'
  }
];

export const mockAlerts: HealthAlert[] = [
  {
    id: 'alt-1',
    type: 'outbreak',
    severity: 'red',
    title: 'Dengue Outbreak Warning',
    title_hindi: 'डेंगू के प्रकोप की चेतावनी',
    description: 'Sudden spike in Dengue cases reported in Patna Sadar. Ensure no stagnant water in your vicinity.',
    description_hindi: 'पटना सदर में डेंगू के मामलों में अचानक वृद्धि देखी गई है। सुनिश्चित करें कि आपके आसपास पानी जमा न हो।',
    date: '2024-05-15'
  }
];

export const mockPredictions: Prediction[] = [
  {
    disease: 'Malaria',
    diseaseHindi: 'मलेरिया',
    probability: 78,
    riskLevel: 'high',
    peakExpected: 'Next 10-14 days',
    preventionTips: ['Use mosquito nets', 'Wear long sleeves', 'Apply mosquito repellent'],
    preventionTipsHindi: ['मच्छरदानी का प्रयोग करें', 'पूरी बाजू के कपड़े पहनें', 'मच्छर भगाने वाली क्रीम लगाएं']
  },
  {
    disease: 'Cholera',
    diseaseHindi: 'हैजा',
    probability: 45,
    riskLevel: 'medium',
    peakExpected: 'Next 3-4 weeks',
    preventionTips: ['Drink boiled water', 'Wash hands frequently', 'Avoid street food'],
    preventionTipsHindi: ['उबला हुआ पानी पिएं', 'बार-बार हाथ धोएं', 'स्ट्रीट फूड से बचें']
  }
];
