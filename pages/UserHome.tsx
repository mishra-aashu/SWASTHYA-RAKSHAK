
import React, { useState } from 'react';
import { mockReports, mockAlerts, mockPredictions, patnaBlocks } from '../data/mockData';
import { Prediction } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  AlertTriangle, 
  MapPin, 
  Activity, 
  CheckCircle, 
  CheckCircle2,
  AlertCircle, 
  Search, 
  Biohazard, 
  Clock, 
  Droplets, 
  Stethoscope, 
  Info, 
  Phone, 
  Navigation,
  Bot,
  AlertOctagon,
  FileText
} from 'lucide-react';

const UserHome = () => {
  const [activeTab, setActiveTab] = useState('predictions');
  const [symptomInput, setSymptomInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleAnalyze = () => {
    if (!symptomInput.trim()) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    // Simulating AI Analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        condition: "Potential Viral Fever",
        conditionHindi: "संभावित वायरल बुखार",
        risk: "Low",
        severityColor: "text-green-600",
        advice: "Rest, stay hydrated, and monitor temperature. If symptoms worsen, visit PHC Patna Sadar.",
        adviceHindi: "आराम करें, हाइड्रेटेड रहें और तापमान की निगरानी करें। यदि लक्षण बिगड़ते हैं, तो पीएचसी पटना सदर जाएँ।",
        precaution: ["Stay away from children", "Use separate towels"],
        precautionHindi: ["बच्चों से दूर रहें", "अलग तौलिए का प्रयोग करें"]
      });
    }, 1800);
  };

  return (
    <div className="bg-[#F3F4F6] min-h-screen pb-20">
      {/* Emergency Alert Banner */}
      <div className="animate-pulse-red bg-[#DC2626] text-white p-4 text-center sticky top-[72px] z-40 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
          <AlertTriangle className="w-5 h-5 animate-bounce" />
          <p className="font-bold text-sm">
            आपातकालीन सूचना: पटना सदर में डेंगू के मामले बढ़ रहे हैं। | ALERT: Dengue spike in Patna Sadar.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Top Section: Location & Health Meter */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-md border-l-8 border-[#003366] transition-transform hover:scale-[1.01]">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Current Active Zone</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="w-6 h-6 text-[#003366]" />
                    <h2 className="text-xl font-bold text-[#003366]">Patna Sadar, Bihar</h2>
                  </div>
                </div>
                <button className="bg-[#003366] text-white px-4 py-2 rounded-lg text-xs font-bold transition-all hover:bg-[#004d99] shadow-sm">
                  स्थान बदलें | Update Location
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatsCard label="Today's Cases" value="24" icon={<Activity className="w-6 h-6" />} color="#003366" />
              <StatsCard label="Recovered" value="18" icon={<CheckCircle className="w-6 h-6" />} color="#138808" />
              <StatsCard label="Active Alerts" value="03" icon={<AlertCircle className="w-6 h-6" />} color="#EA580C" />
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md text-center flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#FF9933]"></div>
            <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-6">Locality Health Score</h3>
            <div className="relative w-44 h-44 flex items-center justify-center">
               <svg className="w-full h-full transform -rotate-90">
                 <circle cx="88" cy="88" r="75" stroke="#E5E7EB" strokeWidth="14" fill="transparent" />
                 <circle cx="88" cy="88" r="75" stroke="#138808" strokeWidth="14" fill="transparent" strokeDasharray="471" strokeDashoffset="117" strokeLinecap="round" className="transition-all duration-1000 ease-out" />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center animate-fadeIn">
                 <span className="text-5xl font-black text-[#003366]">75%</span>
                 <span className="text-[11px] font-bold text-[#138808] uppercase mt-1">Safe | सुरक्षित</span>
               </div>
            </div>
            <p className="mt-6 text-[11px] text-gray-400 font-medium">Updated 5 minutes ago based on PHC reports.</p>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="flex bg-gray-50 border-b overflow-x-auto no-scrollbar">
            <TabButton active={activeTab === 'predictions'} label="AI Predictions" hindi="AI भविष्यवाणियाँ" onClick={() => setActiveTab('predictions')} />
            <TabButton active={activeTab === 'symptom'} label="Symptom Checker" hindi="लक्षण जाँच" onClick={() => setActiveTab('symptom')} />
            <TabButton active={activeTab === 'advisory'} label="Health Advisory" hindi="स्वास्थ्य परामर्श" onClick={() => setActiveTab('advisory')} />
          </div>

          <div className="p-6 md:p-10">
            {activeTab === 'predictions' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[#003366] font-heading">AI Outbreak Forecasting</h3>
                    <p className="text-sm text-gray-500">Predictive analytics based on monsoon trends and climate data.</p>
                  </div>
                  <span className="bg-[#FF9933]/10 text-[#FF9933] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase border border-[#FF9933]/20">
                    Live Surveillance Mode
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  {mockPredictions.map((pred, i) => (
                    <PredictionCard key={i} prediction={pred} />
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'symptom' && (
              <div className="flex flex-col items-center justify-center py-8 text-center max-w-2xl mx-auto animate-fadeIn">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-[#003366] mb-6 shadow-inner">
                  <Search className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#003366] font-heading">AI Symptom Analysis</h3>
                <p className="text-gray-500 mt-2 mb-8 leading-relaxed">
                  Enter your symptoms below. Our AI assistant will analyze potential risks and direct you to the nearest PHC if necessary.
                </p>
                <div className="w-full space-y-4">
                  <div className="relative group">
                    <input 
                      type="text" 
                      value={symptomInput}
                      onChange={(e) => setSymptomInput(e.target.value)}
                      placeholder="e.g. High fever, headache, joint pain..." 
                      className="w-full border-2 border-gray-100 p-5 pl-14 rounded-2xl focus:border-[#003366] focus:ring-4 focus:ring-blue-50 outline-none transition-all text-lg shadow-sm group-hover:border-gray-200" 
                    />
                    <Biohazard className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-300" />
                  </div>
                  <button 
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className={`w-full bg-[#003366] text-white p-5 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-3 text-lg ${isAnalyzing ? 'opacity-70 cursor-wait' : ''}`}
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>विश्लेषण हो रहा है... | Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Bot className="w-6 h-6" />
                        <span>एआई से विश्लेषण करें | Analyze with AI</span>
                      </>
                    )}
                  </button>

                  {analysisResult && (
                    <div className="mt-8 w-full bg-white border-2 border-[#138808]/20 rounded-2xl overflow-hidden animate-slideUp">
                      <div className="bg-[#138808]/5 p-4 border-b border-[#138808]/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-[#138808]" />
                          <span className="text-xs font-bold uppercase text-[#138808] tracking-widest">Analysis Result</span>
                        </div>
                        <span className="text-[10px] font-bold text-gray-400">Powered by Gemini AI</span>
                      </div>
                      <div className="p-6 text-left">
                        <div className="mb-4">
                          <h4 className="text-lg font-bold text-[#003366]">{analysisResult.condition}</h4>
                          <p className="text-xs text-gray-500 font-medium">{analysisResult.conditionHindi}</p>
                        </div>
                        <div className="flex items-center gap-4 mb-6">
                           <div className="flex-1 bg-gray-50 p-3 rounded-xl border border-gray-100">
                             <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-1">Risk Level</p>
                             <p className={`text-sm font-bold ${analysisResult.severityColor}`}>{analysisResult.risk}</p>
                           </div>
                           <div className="flex-1 bg-gray-50 p-3 rounded-xl border border-gray-100">
                             <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-1">Recommended Action</p>
                             <p className="text-sm font-bold text-[#003366]">Self-Care</p>
                           </div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6">
                          <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-[#003366] mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-[#003366]">{analysisResult.advice}</p>
                              <p className="text-xs text-blue-600/70 mt-1 font-medium italic">{analysisResult.adviceHindi}</p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Immediate Precautions</p>
                          {analysisResult.precaution.map((p: string, i: number) => (
                            <div key={i} className="flex items-center gap-2 text-xs font-medium text-gray-600">
                              <CheckCircle2 className="w-3 h-3 text-[#138808]" />
                              {p}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <p className="text-[10px] text-gray-400 font-medium">
                    Disclaimer: This is for informational purposes only. Always consult a qualified medical professional.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'advisory' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="bg-gradient-to-r from-[#0066cc] to-[#004d99] p-8 rounded-2xl text-white shadow-lg relative overflow-hidden">
                  <Stethoscope className="absolute top-0 right-0 w-32 h-32 opacity-10 -mr-8 -mt-8" />
                  <h3 className="text-2xl font-bold flex items-center gap-3">
                    <Droplets className="w-8 h-8" /> Monsoon Safety Advisory
                  </h3>
                  <p className="text-sm text-white/80 mt-2 max-w-xl">
                    Health guidelines issued by the Ministry of Health for the 2024 Monsoon season in Bihar.
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <AdvisoryItem icon={<Droplets className="w-6 h-6" />} title="Safe Drinking Water" text="Always boil water for at least 20 minutes during monsoons to prevent waterborne outbreaks like Cholera." />
                  <AdvisoryItem icon={<Activity className="w-6 h-6" />} title="Vector Control" text="Clear stagnant water from pots and coolers. Use nets or repellents to prevent Dengue and Malaria." />
                  <AdvisoryItem icon={<AlertCircle className="w-6 h-6" />} title="Immediate Reporting" text="Report cases of high fever with shivering to your nearest ASHA worker or PHC immediately." />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Nearby Health Kendras */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold text-[#003366] flex items-center gap-2">
              <MapPin className="text-[#FF9933] w-6 h-6" /> Nearby Health Kendras | निकटतम स्वास्थ्य केंद्र
            </h3>
            <button className="text-xs font-bold text-[#003366] hover:text-[#FF9933] transition-colors">View Map →</button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             <KendraCard name="PHC Patna Sadar" address="Near Gandhi Maidan, Patna" distance="1.2 km" contact="0612-2345678" type="PHC" />
             <KendraCard name="Danapur Sub-Center" address="Saguna More, Danapur" distance="3.5 km" contact="0612-9876543" type="Sub-Center" />
             <KendraCard name="District Hospital Patna" address="Ashok Rajpath, Patna" distance="4.1 km" contact="0612-1112223" type="District Hospital" />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({ label, value, icon, color }: { label: string, value: string, icon: React.ReactNode, color: string }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border-b-4 transition-all hover:-translate-y-1" style={{ borderColor: color }}>
    <div className="flex items-center justify-between mb-3">
      <div style={{ color }}>{icon}</div>
      <span className="text-3xl font-black font-heading" style={{ color }}>{value}</span>
    </div>
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
  </div>
);

const TabButton = ({ active, label, hindi, onClick }: { active: boolean, label: string, hindi: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`px-10 py-6 text-sm font-bold transition-all border-b-4 ${active ? 'border-[#FF9933] text-[#003366] bg-white' : 'border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-100/50'}`}
  >
    <div className="flex flex-col items-center">
      <span className="font-heading tracking-tight">{label}</span>
      <span className="text-[10px] opacity-70 mt-1 font-medium">{hindi}</span>
    </div>
  </button>
);

const PredictionCard: React.FC<{ prediction: Prediction }> = ({ prediction }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all group flex flex-col">
    <div className={`h-2 w-full ${prediction.riskLevel === 'high' ? 'bg-[#DC2626]' : 'bg-[#F59E0B]'}`}></div>
    <div className="p-6 flex-1">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h4 className="text-xl font-bold text-gray-800 font-heading">{prediction.disease}</h4>
          <p className="text-xs text-gray-500 font-medium">{prediction.diseaseHindi}</p>
        </div>
        <div className="text-right bg-gray-50 p-2 rounded-xl border border-gray-100">
          <p className="text-2xl font-black text-[#003366] leading-none">{prediction.probability}%</p>
          <p className="text-[8px] font-bold uppercase text-gray-400 mt-1">Probability</p>
        </div>
      </div>
      <div className="flex items-center gap-3 mb-6 p-3 bg-blue-50/50 rounded-xl border border-blue-100/50">
        <Clock className="w-5 h-5 text-blue-400" />
        <div>
          <p className="text-[8px] font-bold text-blue-400 uppercase tracking-widest leading-none">Peak Forecast</p>
          <p className="text-xs font-bold text-[#003366] mt-1">{prediction.peakExpected}</p>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold text-[#138808] uppercase tracking-wider">Prevention Guidelines</p>
          <div className={`h-2 w-2 rounded-full animate-pulse ${prediction.riskLevel === 'high' ? 'bg-red-500' : 'bg-orange-500'}`}></div>
        </div>
        <ul className="text-xs text-gray-600 space-y-2">
          {prediction.preventionTips.map((tip, i) => (
            <li key={i} className="flex items-start gap-3 bg-gray-50/50 p-2 rounded-lg transition-all hover:bg-gray-100">
              <CheckCircle2 className="w-3 h-3 text-[#138808] mt-0.5" /> 
              <span className="font-medium">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="bg-gray-50 p-3 text-center border-t border-gray-100">
       <button className="text-[10px] font-bold text-[#003366] uppercase tracking-widest hover:text-[#FF9933] transition-colors">View Block Details</button>
    </div>
  </div>
);

const AdvisoryItem = ({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) => (
  <div className="p-6 bg-white rounded-2xl hover:shadow-lg transition-all border border-gray-100 group relative">
    <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
       <Info className="text-[#003366] w-5 h-5" />
    </div>
    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#003366] mb-4 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h4 className="font-bold text-gray-800 mb-2 font-heading">{title}</h4>
    <p className="text-xs text-gray-500 leading-relaxed font-medium">{text}</p>
  </div>
);

const KendraCard = ({ name, address, distance, contact, type }: { name: string, address: string, distance: string, contact: string, type: string }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-[#003366] transition-all group flex flex-col hover:shadow-md">
    <div className="flex justify-between items-start mb-4">
      <div className="flex flex-col">
        <span className="text-[8px] font-bold text-[#FF9933] uppercase tracking-widest mb-1">{type}</span>
        <h4 className="font-bold text-[#003366] group-hover:text-[#FF9933] transition-colors text-lg">{name}</h4>
      </div>
      <div className="bg-green-50 text-[#138808] text-[9px] font-bold px-2 py-1 rounded-full border border-green-100">
        {distance}
      </div>
    </div>
    <p className="text-xs text-gray-500 mb-6 font-medium flex-1">{address}</p>
    <div className="flex gap-3">
      <a href={`tel:${contact}`} className="flex-1 bg-[#F3F4F6] hover:bg-gray-200 flex items-center justify-center rounded-xl text-[10px] font-bold uppercase text-gray-700 transition-all active:scale-95 gap-2">
        <Phone className="w-3 h-3" /> Call
      </a>
      <button className="flex-1 bg-[#003366] text-white flex items-center justify-center rounded-xl text-[10px] font-bold uppercase hover:bg-[#004d99] transition-all shadow-sm active:scale-95 gap-2">
        <Navigation className="w-3 h-3" /> Navigate
      </button>
    </div>
  </div>
);

export default UserHome;
