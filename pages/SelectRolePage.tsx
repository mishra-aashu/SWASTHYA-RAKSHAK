
import React from 'react';
import { useAuth } from '../App';
import { useNavigate } from 'react-router-dom';
import { Role } from '../types';
import { User, Building2, ArrowRight } from 'lucide-react';
import styles from './SelectRole.module.css'; // Import the CSS module

const SelectRolePage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSelect = (role: Role) => {
    login(role);
    navigate(role === 'kendra' ? '/kendra/dashboard' : '/user/home');
  };

  return (
    <div className={styles.selectRoleContainer}>
      <div className={styles.selectRoleContent}>
        <div className={styles.selectRoleHeader}>
          <h2 className={styles.selectRoleTitle}>अपना पद चुनें | Choose Your Role</h2>
          <p className={styles.selectRoleSubtitle}>Access specifically tailored features based on your responsibility</p>
        </div>

        <div className={styles.roleCardGrid}>
          <RoleCard 
            icon={<User className={styles.roleCardIcon} />}
            title="नागरिक | Citizen"
            desc="Track health alerts in your area, use symptom checker and view AI predictions."
            onClick={() => handleSelect('user')}
          />
          <RoleCard 
            icon={<Building2 className={styles.roleCardIcon} />}
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
    className={styles.roleCard}
  >
    <div className={styles.roleCardIconWrapper}>
      {icon}
    </div>
    <h3 className={styles.roleCardTitle}>{title}</h3>
    <p className={styles.roleCardDescription}>{desc}</p>
    <span className={styles.roleCardContinueLink}>
      जारी रखें | Continue <ArrowRight className={styles.roleCardContinueIcon} />
    </span>
  </button>
);

export default SelectRolePage;