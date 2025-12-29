
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

import styles from './Home.module.css'; // Import the CSS module

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
        severityColor: "text-green",
        advice: "Rest, stay hydrated, and monitor temperature. If symptoms worsen, visit PHC Patna Sadar.",
        adviceHindi: "आराम करें, हाइड्रेटेड रहें और तापमान की निगरानी करें। यदि लक्षण बिगड़ते हैं, तो पीएचसी पटना सदर जाएँ।",
        precaution: ["Stay away from children", "Use separate towels"],
        precautionHindi: ["बच्चों से दूर रहें", "अलग तौलिए का प्रयोग करें"]
      });
    }, 1800);
  };

  return (
    <div className={styles.homeContainer}> {/* Use module class */}
      {/* Emergency Alert Banner */}
      <div className={`${styles.emergencyBanner} animate-pulse-red`}> {/* Use module class */}
        <div className={styles.emergencyBannerContent}> {/* Use module class */}
          <AlertTriangle className="w-5 h-5 animate-bounce" />
          <p className={styles.emergencyBannerText}> {/* Use module class */}
            आपातकालीन सूचना: पटना सदर में डेंगू के मामले बढ़ रहे हैं। | ALERT: Dengue spike in Patna Sadar.
          </p>
        </div>
      </div>

      <div className={styles.mainContent}> {/* Use module class */}
        {/* Top Section: Location & Health Meter */}
        <div className={`${styles.topSection} ${styles.topSectionGrid}`}> {/* Use module class */}
          <div className={styles.topSectionLeft}> {/* Use module class */}
            <div className={styles.currentActiveZoneCard}> {/* Use module class */}
              <div>
                <h3 className={styles.currentActiveZoneLabel}>Current Active Zone</h3> {/* Use module class */}
                <div className={styles.currentActiveZoneValue}> {/* Use module class */}
                  <MapPin className={styles.currentActiveZoneValueIcon} /> {/* Use module class */}
                  <h2 className={styles.currentActiveZoneValueText}>Patna Sadar, Bihar</h2> {/* Use module class */}
                </div>
              </div>
              <button className={styles.updateLocationButton}> {/* Use module class */}
                स्थान बदलें | Update Location
              </button>
            </div>

            <div className={styles.statsGrid}> {/* Use module class */}
              <StatsCard label="Today's Cases" value="24" icon={<Activity className="w-7 h-7" />} color="var(--primary-color)" />
              <StatsCard label="Recovered" value="18" icon={<CheckCircle className="w-7 h-7" />} color="var(--green-color)" />
              <StatsCard label="Active Alerts" value="03" icon={<AlertCircle className="w-7 h-7" />} color="var(--saffron-color)" />
            </div>
          </div>

          <div className={styles.healthScoreCard}> {/* Use module class */}
            <div className={styles.healthScoreCardTopBorder}></div> {/* Use module class */}
            <h3 className={styles.healthScoreCardLabel}>Locality Health Score</h3> {/* Use module class */}
            <div className={styles.healthScoreCircleContainer}> {/* Use module class */}
               <svg className={styles.healthScoreCircleSvg}> {/* Use module class */}
                 <circle cx="96" cy="96" r="84" stroke="#E5E7EB" strokeWidth="16" fill="transparent" className={styles.healthScoreCircleBg} /> {/* Use module class */}
                 <circle cx="96" cy="96" r="84" stroke="var(--green-color)" strokeWidth="16" fill="transparent" strokeDasharray="527" strokeDashoffset="132" strokeLinecap="round" className={styles.healthScoreCircleFill} /> {/* Use module class */}
               </svg>
               <div className={`${styles.healthScoreTextContainer} animate-fadeIn`}> {/* Use module class */}
                 <span className={styles.healthScorePercentage}>75%</span> {/* Use module class */}
                 <span className={styles.healthScoreStatus}>Safe | सुरक्षित</span> {/* Use module class */}
               </div>
            </div>
            <p className={styles.healthScoreUpdateInfo}>Updated 5 minutes ago based on PHC reports.</p> {/* Use module class */}
          </div>
        </div>

        {/* Tabs Section */}
        <div className={styles.tabsSection}> {/* Use module class */}
          <div className={styles.tabButtonsContainer}> {/* Use module class */}
            <TabButton active={activeTab === 'predictions'} label="AI Predictions" hindi="AI भविष्यवाणियाँ" onClick={() => setActiveTab('predictions')} />
            <TabButton active={activeTab === 'symptom'} label="Symptom Checker" hindi="लक्षण जाँच" onClick={() => setActiveTab('symptom')} />
            <TabButton active={activeTab === 'advisory'} label="Health Advisory" hindi="स्वास्थ्य परामर्श" onClick={() => setActiveTab('advisory')} />
          </div>

          <div className={styles.tabContent}> {/* Use module class */}
            {activeTab === 'predictions' && (
              <div className={`${styles.predictionsContent} animate-fadeIn`}> {/* Use module class */}
                <div className={styles.predictionsHeader}> {/* Use module class */}
                  <div>
                    <h3 className={styles.predictionsTitle}>AI Outbreak Forecasting</h3> {/* Use module class */}
                    <p className={styles.predictionsSubtitle}>Predictive analytics based on monsoon trends and climate data.</p> {/* Use module class */}
                  </div>
                  <span className={styles.predictionsLiveStatus}>
                    Live Surveillance Mode
                  </span>
                </div>
                <div className={styles.predictionsGrid}> {/* Use module class */}
                  {mockPredictions.map((pred, i) => (
                    <PredictionCard key={i} prediction={pred} />
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'symptom' && (
              <div className={`${styles.symptomCheckerContent} animate-fadeIn`}> {/* Use module class */}
                <div className={styles.symptomCheckerIconWrapper}> {/* Use module class */}
                  <Search className={styles.symptomCheckerIcon} /> {/* Use module class */}
                </div>
                <h3 className={styles.symptomCheckerTitle}>AI Symptom Analysis</h3> {/* Use module class */}
                <p className={styles.symptomCheckerSubtitle}>
                  Enter your symptoms below. Our AI assistant will analyze potential risks and direct you to the nearest PHC if necessary.
                </p>
                <div className={styles.symptomInputContainer}> {/* Use module class */}
                  <div className={styles.symptomInputWrapper}> {/* Use module class */}
                    <Biohazard className={styles.symptomInputIcon} /> {/* Use module class */}
                    <input 
                      type="text" 
                      value={symptomInput}
                      onChange={(e) => setSymptomInput(e.target.value)}
                      placeholder="e.g. High fever, headache, joint pain..." 
                      className={styles.symptomInput} 
                    />
                  </div>
                  <button 
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className={`${styles.analyzeButton} ${isAnalyzing ? styles.analyzeButtonDisabled : ''}`}
                  >
                    {isAnalyzing ? (
                      <>
                        <div className={styles.analyzeButtonSpinner}></div> {/* Use module class */}
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
                    <div className={`${styles.analysisResult} animate-slideUp`}> {/* Use module class */}
                      <div className={styles.analysisResultHeader}> {/* Use module class */}
                        <div className={styles.analysisResultHeaderLeft}> {/* Use module class */}
                          <CheckCircle2 className={styles.analysisResultHeaderIcon} /> {/* Use module class */}
                          <span className={styles.analysisResultHeaderText}>Analysis Result</span> {/* Use module class */}
                        </div>
                        <span className={styles.analysisResultHeaderPoweredBy}>Powered by Gemini AI</span> {/* Use module class */}
                      </div>
                      <div className={styles.analysisResultBody}> {/* Use module class */}
                        <div className={styles.analysisResultCondition}> {/* Use module class */}
                          <h4 className={styles.analysisResultConditionTitle}>{analysisResult.condition}</h4> {/* Use module class */}
                          <p className={styles.analysisResultConditionHindi}>{analysisResult.conditionHindi}</p> {/* Use module class */}
                        </div>
                        <div className={styles.analysisResultRiskActions}> {/* Use module class */}
                           <div className={styles.analysisResultRiskItem}> {/* Use module class */}
                             <p className={styles.analysisResultRiskLabel}>Risk Level</p> {/* Use module class */}
                             <p className={`${styles.analysisResultRiskValue} ${analysisResult.severityColor}`}>{analysisResult.risk}</p> {/* Use module class */}
                           </div>
                           <div className={styles.analysisResultRiskItem}> {/* Use module class */}
                             <p className={styles.analysisResultRiskLabel}>Recommended Action</p> {/* Use module class */}
                             <p className={styles.analysisResultRiskValue}>Self-Care</p> {/* Use module class */}
                           </div>
                        </div>
                        <div className={styles.analysisResultAdvice}> {/* Use module class */}
                          <div className={styles.analysisResultAdviceContent}> {/* Use module class */}
                            <Info className={styles.analysisResultAdviceIcon} /> {/* Use module class */}
                            <div>
                              <p className={styles.analysisResultAdviceText}>{analysisResult.advice}</p> {/* Use module class */}
                              <p className={styles.analysisResultAdviceHindi}>{analysisResult.adviceHindi}</p> {/* Use module class */}
                            </div>
                          </div>
                        </div>
                        <div className={styles.analysisResultPrecautions}> {/* Use module class */}
                          <p className={styles.analysisResultPrecautionsLabel}>Immediate Precautions</p> {/* Use module class */}
                          {analysisResult.precaution.map((p: string, i: number) => (
                            <div key={i} className={styles.analysisResultPrecautionItem}> {/* Use module class */}
                              <CheckCircle2 className={styles.analysisResultPrecautionIcon} /> {/* Use module class */}
                              {p}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <p className={styles.disclaimerText}> {/* Use module class */}
                    Disclaimer: This is for informational purposes only. Always consult a qualified medical professional.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'advisory' && (
              <div className={`${styles.advisoryContent} animate-fadeIn`}> {/* Use module class */}
                <div className={styles.advisoryHeader}> {/* Use module class */}
                  <Stethoscope className={styles.advisoryHeaderIconBg} /> {/* Use module class */}
                  <h3 className={styles.advisoryHeaderTitle}> {/* Use module class */}
                    <Droplets className={styles.advisoryHeaderTitleIcon} /> {/* Use module class */}
                    Monsoon Safety Advisory
                  </h3>
                  <p className={styles.advisoryHeaderSubtitle}>
                    Health guidelines issued by the Ministry of Health for the 2024 Monsoon season in Bihar.
                  </p>
                </div>
                <div className={styles.advisoryGrid}> {/* Use module class */}
                  <AdvisoryItem icon={<Droplets className="w-6 h-6" />} title="Safe Drinking Water" text="Always boil water for at least 20 minutes during monsoons to prevent waterborne outbreaks like Cholera." />
                  <AdvisoryItem icon={<Activity className="w-6 h-6" />} title="Vector Control" text="Clear stagnant water from pots and coolers. Use nets or repellents to prevent Dengue and Malaria." />
                  <AdvisoryItem icon={<AlertCircle className="w-6 h-6" />} title="Immediate Reporting" text="Report cases of high fever with shivering to your nearest ASHA worker or PHC immediately." />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Nearby Health Kendras */}
        <div className={styles.nearbyKendraSection}> {/* Use module class */}
          <div className={styles.nearbyKendraHeader}> {/* Use module class */}
            <h3 className={styles.nearbyKendraTitle}> {/* Use module class */}
              <MapPin className={styles.nearbyKendraTitleIcon} /> {/* Use module class */}
              Nearby Health Kendras | निकटतम स्वास्थ्य केंद्र
            </h3>
            <button className={styles.nearbyKendraMapButton}>View Map →</button> {/* Use module class */}
          </div>
          <div className={styles.kendraGrid}> {/* Use module class */}
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
  <div className={styles.statsCard} style={{ borderColor: color }}> {/* Use module class */}
    <div className={styles.statsCardHeader}> {/* Use module class */}
      <div style={{ color }}>{icon}</div>
      <span className={styles.statsCardValue} style={{ color }}>{value}</span> {/* Use module class */}
    </div>
    <p className={styles.statsCardLabel}>{label}</p> {/* Use module class */}
  </div>
);

const TabButton = ({ active, label, hindi, onClick }: { active: boolean, label: string, hindi: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`${styles.tabButton} ${active ? styles.tabButtonActive : ''}`}
  >
    <div className={styles.tabButtonTextContainer}> {/* Use module class */}
      <span className={styles.tabButtonLabel}>{label}</span> {/* Use module class */}
      <span className={styles.tabButtonHindi}>{hindi}</span> {/* Use module class */}
    </div>
  </button>
);

const PredictionCard: React.FC<{ prediction: Prediction }> = ({ prediction }) => (
  <div className={styles.predictionCard}> {/* Use module class */}
    <div className={`${styles.predictionCardRiskBar} ${prediction.riskLevel === 'high' ? styles.bgRed600 : styles.bgOrange500}`}></div> {/* Use module class */}
    <div className={styles.predictionCardContent}> {/* Use module class */}
      <div className={styles.predictionCardHeader}> {/* Use module class */}
        <div>
          <h4 className={styles.predictionCardTitle}>{prediction.disease}</h4> {/* Use module class */}
          <p className={styles.predictionCardSubtitle}>{prediction.diseaseHindi}</p> {/* Use module class */}
        </div>
        <div className={styles.predictionCardProbability}> {/* Use module class */}
          <p className={styles.predictionCardProbabilityValue}>{prediction.probability}%</p> {/* Use module class */}
          <p className={styles.predictionCardProbabilityLabel}>Probability</p> {/* Use module class */}
        </div>
      </div>
      <div className={styles.predictionCardPeakForecast}> {/* Use module class */}
        <Clock className={styles.predictionCardPeakForecastIcon} /> {/* Use module class */}
        <div>
          <p className={styles.predictionCardPeakForecastLabel}>Peak Forecast</p> {/* Use module class */}
          <p className={styles.predictionCardPeakForecastValue}>{prediction.peakExpected}</p> {/* Use module class */}
        </div>
      </div>
      <div className={styles.predictionCardPrevention}> {/* Use module class */}
        <div className={styles.predictionCardPreventionHeader}> {/* Use module class */}
          <p className={styles.predictionCardPreventionLabel}>Prevention Guidelines</p> {/* Use module class */}
          <div className={`${styles.predictionCardPreventionPulse} ${prediction.riskLevel === 'high' ? styles.bgRed500 : styles.bgOrange500}`}></div> {/* Use module class */}
        </div>
        <ul className={styles.predictionCardPreventionList}> {/* Use module class */}
          {prediction.preventionTips.map((tip, i) => (
            <li key={i} className={styles.predictionCardPreventionListItem}> {/* Use module class */}
              <CheckCircle2 className={styles.predictionCardPreventionListItemIcon} /> {/* Use module class */}
              <span className={styles.predictionCardPreventionListItemText}>{tip}</span> {/* Use module class */}
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className={styles.predictionCardFooter}> {/* Use module class */}
       <button className={styles.predictionCardFooterButton}>View Block Details</button> {/* Use module class */}
    </div>
  </div>
);

const AdvisoryItem = ({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) => (
  <div className={styles.advisoryItem}> {/* Use module class */}
    <div className={styles.advisoryItemInfoIconWrapper}> {/* Use module class */}
       <Info className={styles.advisoryItemInfoIcon} /> {/* Use module class */}
    </div>
    <div className={styles.advisoryItemIconWrapper}> {/* Use module class */}
      {icon}
    </div>
    <h4 className={styles.advisoryItemTitle}>{title}</h4> {/* Use module class */}
    <p className={styles.advisoryItemText}>{text}</p> {/* Use module class */}
  </div>
);

const KendraCard = ({ name, address, distance, contact, type }: { name: string, address: string, distance: string, contact: string, type: string }) => (
  <div className={styles.kendraCard}> {/* Use module class */}
    <div className={styles.kendraCardHeader}> {/* Use module class */}
      <div className={styles.kendraCardHeaderLeft}> {/* Use module class */}
        <span className={styles.kendraCardType}>{type}</span> {/* Use module class */}
        <h4 className={styles.kendraCardName}>{name}</h4> {/* Use module class */}
      </div>
      <div className={styles.kendraCardDistance}> {/* Use module class */}
        {distance}
      </div>
    </div>
    <p className={styles.kendraCardAddress}>{address}</p> {/* Use module class */}
    <div className={styles.kendraCardActions}> {/* Use module class */}
      <a href={`tel:${contact}`} className={styles.kendraCardActionButton}> {/* Use module class */}
        <Phone className="w-4 h-4" /> Call
      </a>
      <button className={`${styles.kendraCardActionButton} ${styles.kendraCardActionButtonPrimary}`}> {/* Use module class */}
        <Navigation className="w-4 h-4" /> Navigate
      </button>
    </div>
  </div>
);

export default UserHome;
