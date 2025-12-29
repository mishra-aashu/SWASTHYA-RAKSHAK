
import React, { useState } from 'react';
import { mockReports } from '../data/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Building2, 
  FileText, 
  Users, 
  Biohazard, 
  Package, 
  Radio, 
  CheckCircle, 
  Send, 
  Download,
  ClipboardList
} from 'lucide-react';
import styles from './KendraDashboard.module.css'; // Import the CSS module

const chartData = [
  { name: 'Mon', count: 12 },
  { name: 'Tue', count: 19 },
  { name: 'Wed', count: 15 },
  { name: 'Thu', count: 28 },
  { name: 'Fri', count: 22 },
  { name: 'Sat', count: 35 },
  { name: 'Sun', count: 42 },
];

const KendraDashboard = () => {
  const [form, setForm] = useState({ disease: 'Dengue', count: '', severity: 'medium' });

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <div className={styles.kendraInfo}>
            <div className={styles.kendraIconWrapper}>
              <Building2 className={styles.kendraIcon} />
            </div>
            <div>
              <h2 className={styles.kendraTitle}>PHC Patna Sadar</h2>
              <p className={styles.kendraReportingId}>Reporting ID: <span>BR-PAT-SDR-101</span></p>
            </div>
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.exportButton}>
              <Download className="w-4 h-4" /> Export Data
            </button>
            <button className={styles.submitButton}>
              <Send className="w-4 h-4" /> सरकार को भेजें | Submit Reports
            </button>
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        {/* Quick Stats */}
        <div className={styles.statsGrid}>
          <KendraStat label="Daily Admissions" value="248" trend="+12%" icon={<Users className="w-7 h-7" />} color="var(--primary-color)" />
          <KendraStat label="Active Warnings" value="02" trend="Action" icon={<Biohazard className="w-7 h-7" />} color="var(--saffron-color)" />
          <KendraStat label="Medicine Stocks" value="85%" trend="Normal" icon={<Package className="w-7 h-7" />} color="var(--green-color)" />
          <KendraStat label="Reporting Status" value="Live" trend="Online" icon={<Radio className="w-7 h-7" />} color="var(--primary-color)" />
        </div>

        <div className={styles.formTrendsGrid}>
          {/* Quick Update Form */}
          <div className={styles.reportingFormContainer}>
            <div className={styles.reportingFormCard}>
              <ClipboardList className={styles.reportingFormIconBg} />
              <h3 className={styles.reportingFormTitle}>
                <FileText className={styles.reportingFormTitleIcon} /> Case Reporting | केस रिपोर्टिंग
              </h3>
              <div className={styles.formFields}>
                <div>
                  <label className={styles.formFieldLabel}>Select Disease</label>
                  <select 
                    value={form.disease}
                    onChange={(e) => setForm({...form, disease: e.target.value})}
                    className={styles.formSelect}
                  >
                    <option>Dengue</option>
                    <option>Malaria</option>
                    <option>Typhoid</option>
                    <option>Cholera</option>
                    <option>Viral Fever</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className={styles.formFieldLabel}>New Patients (Today)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 5"
                    value={form.count}
                    onChange={(e) => setForm({...form, count: e.target.value})}
                    className={styles.formInput}
                  />
                </div>
                <div>
                  <label className={styles.formFieldLabel}>Severity Assessment</label>
                  <div className={styles.severityButtons}>
                    {['low', 'medium', 'high', 'critical'].map(lvl => (
                      <button 
                        key={lvl}
                        onClick={() => setForm({...form, severity: lvl})}
                        className={`${styles.severityButton} ${form.severity === lvl ? styles.severityButtonActive : styles.severityButtonInactive}`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
                <button className={styles.submitCaseButton}>
                  <CheckCircle className="w-5 h-5" /> रिपोर्ट सबमिट करें | Submit Case
                </button>
              </div>
            </div>

            <div className={styles.stockAlertsCard}>
              <h3 className={styles.stockAlertsTitle}>
                <Package className={styles.stockAlertsTitleIcon} /> Stock Alerts | इन्वेंटरी
              </h3>
              <div className={styles.stockItemsContainer}>
                <StockItem name="ORS (500ml)" stock={42} min={100} unit="packets" />
                <StockItem name="Paracetamol" stock={1200} min={500} unit="tabs" />
                <StockItem name="Dengue Test Kits" stock={15} min={50} unit="kits" />
                <StockItem name="IV Fluids" stock={85} min={50} unit="bottles" />
              </div>
            </div>
          </div>

          {/* Weekly Trends & Recent Reports */}
          <div className={styles.trendsReportsContainer}>
            <div className={styles.patientInflowCard}>
              <div className={styles.patientInflowHeader}>
                <h3 className={styles.patientInflowTitle}>Patient Inflow Analysis</h3>
                <div className={styles.dailyCasesIndicator}>
                   <div className={styles.dailyCasesIndicatorDot}></div>
                   <span className={styles.dailyCasesIndicatorText}>Daily Cases</span>
                </div>
              </div>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary-color)" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="var(--primary-color)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--background-color)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9CA3AF', fontWeight: 'bold'}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9CA3AF', fontWeight: 'bold'}} dx={-10} />
                    <Tooltip 
                      contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                    />
                    <Area type="monotone" dataKey="count" stroke="var(--primary-color)" strokeWidth={4} fillOpacity={1} fill="url(#colorCount)" animationDuration={1500} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className={styles.caseLogsCard}>
               <div className={styles.caseLogsHeader}>
                 <h3 className={styles.caseLogsTitle}>Case Logs | प्रविष्टि इतिहास</h3>
                 <button className={styles.fullHistoryButton}>Full History</button>
               </div>
               <div className={styles.tableContainer}>
                 <table className={styles.caseLogsTable}>
                   <thead className={styles.tableHead}>
                     <tr>
                       <th className={styles.tableHeadTh}>Disease Unit</th>
                       <th className={styles.tableHeadTh}>Cases</th>
                       <th className={styles.tableHeadTh}>Severity</th>
                       <th className={styles.tableHeadTh}>Status</th>
                       <th className={styles.tableHeadTh}>Verified</th>
                     </tr>
                   </thead>
                   <tbody className={styles.tableBody}>
                     {mockReports.map((report) => (
                       <tr key={report.id} className={styles.tableRow}>
                         <td className={styles.tableCell}>
                           <p className={styles.diseaseName}>{report.disease_name}</p>
                           <p className={styles.diseaseNameHindi}>{report.disease_name_hindi}</p>
                         </td>
                         <td className={styles.tableCell}><span className={styles.patientCount}>{report.patient_count}</span></td>
                         <td className={styles.tableCell}>
                            <span className={`${styles.severityStatus} ${report.severity === 'high' ? styles.severityHigh : styles.severityMedium}`}>
                              {report.severity}
                            </span>
                         </td>
                         <td className={styles.tableCell}>
                           <span className={`${styles.trendStatus} ${report.trend === 'increasing' ? styles.trendIncreasing : styles.trendDecreasing}`}>
                             <span className={`${styles.trendDot} ${report.trend === 'increasing' ? styles.trendDotIncreasing : styles.trendDotDecreasing}`}></span>
                             {report.trend}
                           </span>
                         </td>
                         <td className={styles.tableCell}>
                            <CheckCircle className={styles.verifiedIcon} />
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const KendraStat = ({ label, value, trend, icon, color }: { label: string, value: string, trend: string, icon: React.ReactNode, color: string }) => (
  <div className={styles.kendraStatCard} style={{ borderColor: color }}>
    <div className={styles.kendraStatHeader}>
      <div className={styles.kendraStatIconWrapper} style={{ color }}>
        {icon}
      </div>
      <span className={`${styles.kendraStatTrend} ${trend.includes('+') || trend === 'Action' ? styles.severityHigh : styles.trendDecreasing}`}>
        {trend}
      </span>
    </div>
    <p className={styles.kendraStatValue} style={{ color }}>{value}</p>
    <p className={styles.kendraStatLabel}>{label}</p>
  </div>
);

const StockItem = ({ name, stock, min, unit }: any) => {
  const isLow = stock < min;
  return (
    <div className={`${styles.stockItemCard} ${isLow ? styles.stockItemLow : styles.stockItemSafe}`}>
      <div>
        <h4 className={styles.stockItemName}>{name}</h4>
        <p className={styles.stockItemAlertLevel}>Alert Level: {isLow ? 'Critical' : 'Safe'}</p>
      </div>
      <div className={styles.stockItemValue}>
        <p className={`${styles.stockItemCount} ${isLow ? styles.stockItemCountLow : styles.patientCount}`}>{stock}</p>
        <p className={styles.stockItemUnit}>{unit}</p>
      </div>
    </div>
  );
};

export default KendraDashboard;
