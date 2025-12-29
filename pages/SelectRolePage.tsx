
import React from 'react';
import { useAuth } from '../App';
import { useNavigate } from 'react-router-dom';
import { Role } from '../types';
import { User, Building2, ArrowRight } from 'lucide-react';

const SelectRolePage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSelect = (role: Role) => {
    login(role);
    navigate(role === 'kendra' ? '/kendra/dashboard' : '/user/home');
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#003366] font-heading">अपना पद चुनें | Choose Your Role</h2>
          <p className="text-gray-600 mt-2">Access specifically tailored features based on your responsibility</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <RoleCard 
            icon={<User className="w-12 h-12" />}
            title="नागरिक | Citizen"
            desc="Track health alerts in your area, use symptom checker and view AI predictions."
            onClick={() => handleSelect('user')}
          />
          <RoleCard 
            icon={<Building2 className="w-12 h-12" />}
            title="स्वास्थ्य केंद्र | Health Kendra"
            desc="Report disease cases, manage medicine stock, and monitor local trends."
            onClick={() => handleSelect('kendra')}
          />
        </div>
      </div>
    </div>
  );
};

const RoleCard = ({ icon, title, desc, onClick }: { icon: React.ReactNode, title: string, desc: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-b-8 border-transparent hover:border-[#FF9933] text-left flex flex-col group"
  >
    <div className="text-[#003366] mb-6 group-hover:scale-110 transition-transform group-hover:text-[#FF9933]">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-[#003366] mb-4">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1">{desc}</p>
    <span className="inline-flex items-center gap-2 text-[#FF9933] font-bold uppercase text-xs tracking-wider">
      जारी रखें | Continue <ArrowRight className="w-4 h-4" />
    </span>
  </button>
);

export default SelectRolePage;