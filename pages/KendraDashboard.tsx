
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
    <div className="bg-[#F3F4F6] min-h-screen pb-20">
      <div className="bg-white border-b shadow-sm sticky top-[72px] z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#0D47A1] rounded-xl flex items-center justify-center text-white shadow-inner">
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#0D47A1] font-heading">PHC Patna Sadar</h2>
                <p className="text-xs text-gray-500 font-medium font-heading">Reporting ID: <span className="font-mono text-[#FFC107]">BR-PAT-SDR-101</span></p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="bg-white border-2 border-gray-100 px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:border-gray-200 transition-all flex items-center gap-2">
                <Download className="w-4 h-4" /> Export Data
              </button>
              <button className="bg-[#0D47A1] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg hover:bg-[#004d99] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2">
                <Send className="w-4 h-4" /> सरकार को भेजें | Submit Reports
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KendraStat label="Daily Admissions" value="248" trend="+12%" icon={<Users className="w-6 h-6" />} color="#0D47A1" />
          <KendraStat label="Active Warnings" value="02" trend="Action" icon={<Biohazard className="w-6 h-6" />} color="#DC2626" />
          <KendraStat label="Medicine Stocks" value="85%" trend="Normal" icon={<Package className="w-6 h-6" />} color="#138808" />
          <KendraStat label="Reporting Status" value="Live" trend="Online" icon={<Radio className="w-6 h-6" />} color="#0066cc" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Update Form */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl border-t-8 border-[#0D47A1] relative overflow-hidden">
              <ClipboardList className="absolute top-0 right-0 w-24 h-24 opacity-5 -mr-4 -mt-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-8 font-heading flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0D47A1]" /> Case Reporting | केस रिपोर्टिंग
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2 font-heading">Select Disease</label>
                  <select 
                    value={form.disease}
                    onChange={(e) => setForm({...form, disease: e.target.value})}
                    className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-xl outline-none focus:border-[#0D47A1] focus:bg-white transition-all font-medium text-sm"
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
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2 font-heading">New Patients (Today)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 5"
                    value={form.count}
                    onChange={(e) => setForm({...form, count: e.target.value})}
                    className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-xl outline-none focus:border-[#0D47A1] focus:bg-white transition-all font-medium text-lg"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2 font-heading">Severity Assessment</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['low', 'medium', 'high', 'critical'].map(lvl => (
                      <button 
                        key={lvl}
                        onClick={() => setForm({...form, severity: lvl})}
                        className={`py-3 rounded-xl text-[10px] font-bold uppercase transition-all border-2 font-heading ${form.severity === lvl ? 'bg-[#0D47A1] text-white border-[#0D47A1] shadow-md' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'}`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
                <button className="w-full bg-[#FFC107] text-white p-5 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all mt-4 transform hover:-translate-y-1 active:scale-[0.98] text-sm flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" /> रिपोर्ट सबमिट करें | Submit Case
                </button>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-6 font-heading flex items-center gap-2">
                <Package className="w-5 h-5 text-[#0D47A1]" /> Stock Alerts | इन्वेंटरी
              </h3>
              <div className="space-y-4">
                <StockItem name="ORS (500ml)" stock={42} min={100} unit="packets" />
                <StockItem name="Paracetamol" stock={1200} min={500} unit="tabs" />
                <StockItem name="Dengue Test Kits" stock={15} min={50} unit="kits" />
                <StockItem name="IV Fluids" stock={85} min={50} unit="bottles" />
              </div>
            </div>
          </div>

          {/* Weekly Trends & Recent Reports */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-gray-800 font-heading">Patient Inflow Analysis</h3>
                <div className="flex items-center gap-2">
                   <div className="w-3 h-3 bg-[#0D47A1] rounded-full"></div>
                   <span className="text-[10px] font-bold text-gray-400 uppercase font-heading">Daily Cases</span>
                </div>
              </div>
              <div className="h-[340px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0D47A1" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#0D47A1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9CA3AF', fontWeight: 'bold'}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9CA3AF', fontWeight: 'bold'}} dx={-10} />
                    <Tooltip 
                      contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                    />
                    <Area type="monotone" dataKey="count" stroke="#0D47A1" strokeWidth={4} fillOpacity={1} fill="url(#colorCount)" animationDuration={1500} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
               <div className="p-8 border-b flex items-center justify-between bg-gray-50/50">
                 <h3 className="text-lg font-bold text-gray-800 font-heading">Case Logs | प्रविष्टि इतिहास</h3>
                 <button className="text-[#0D47A1] text-[10px] font-bold uppercase tracking-widest hover:text-[#FFC107] transition-colors border border-gray-200 px-3 py-1.5 rounded-lg bg-white font-heading">Full History</button>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b font-heading">
                     <tr>
                       <th className="px-8 py-5">Disease Unit</th>
                       <th className="px-8 py-5">Cases</th>
                       <th className="px-8 py-5">Severity</th>
                       <th className="px-8 py-5">Status</th>
                       <th className="px-8 py-5">Verified</th>
                     </tr>
                   </thead>
                   <tbody className="text-sm divide-y">
                     {mockReports.map((report) => (
                       <tr key={report.id} className="hover:bg-blue-50/30 transition-colors group">
                         <td className="px-8 py-5">
                           <p className="font-bold text-gray-800 group-hover:text-[#0D47A1] transition-colors font-heading">{report.disease_name}</p>
                           <p className="text-[10px] text-gray-400 font-medium font-heading">{report.disease_name_hindi}</p>
                         </td>
                         <td className="px-8 py-5 font-mono font-black text-[#0D47A1]">{report.patient_count}</td>
                         <td className="px-8 py-5">
                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter font-heading ${report.severity === 'high' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-orange-50 text-orange-600 border border-orange-100'}`}>
                              {report.severity}
                            </span>
                         </td>
                         <td className="px-8 py-5 font-heading">
                           <span className={`flex items-center gap-2 text-[10px] font-bold uppercase ${report.trend === 'increasing' ? 'text-red-500' : 'text-green-500'}`}>
                             <span className={`w-2 h-2 rounded-full ${report.trend === 'increasing' ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></span>
                             {report.trend}
                           </span>
                         </td>
                         <td className="px-8 py-5">
                            <CheckCircle className="w-5 h-5 text-green-500" />
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
  <div className="bg-white p-6 rounded-2xl shadow-lg border-b-4 transition-all hover:-translate-y-1" style={{ borderColor: color }}>
    <div className="flex justify-between items-start mb-6">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gray-50 shadow-inner group-hover:scale-110 transition-transform" style={{ color }}>
        {icon}
      </div>
      <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg border font-heading ${trend.includes('+') || trend === 'Action' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'}`}>
        {trend}
      </span>
    </div>
    <p className="text-4xl font-black mb-1 font-heading" style={{ color }}>{value}</p>
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-heading">{label}</p>
  </div>
);

const StockItem = ({ name, stock, min, unit }: any) => {
  const isLow = stock < min;
  return (
    <div className={`p-4 rounded-xl flex items-center justify-between border-2 transition-all hover:bg-white hover:shadow-md ${isLow ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-50'}`}>
      <div>
        <h4 className="text-xs font-bold text-gray-800 font-heading">{name}</h4>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5 font-heading">Alert Level: {isLow ? 'Critical' : 'Safe'}</p>
      </div>
      <div className="text-right">
        <p className={`text-xl font-black leading-none font-heading ${isLow ? 'text-red-600' : 'text-[#0D47A1]'}`}>{stock}</p>
        <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1 font-heading">{unit}</p>
      </div>
    </div>
  );
};

export default KendraDashboard;
