import React from 'react';
import SalesAnalytics from '../components/SalesAnalytics';
import { metricsService } from '../services/api';

interface DashboardProps {
  totalRevenue: number | null;
}

const Dashboard: React.FC<DashboardProps> = ({ totalRevenue }) => {
  return (
    <div>
      <h1>Tableau de bord</h1>
      <SalesAnalytics totalRevenue={totalRevenue} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const revenue = await metricsService.totalRevenue();

  return {
    props: {
      totalRevenue: revenue,
    },
  };
};

export default Dashboard;
