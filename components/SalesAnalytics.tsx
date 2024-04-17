import React, { useState, useEffect } from 'react';
import { metricsService } from '../services/api/metrics';

interface SalesAnalyticsProps {
  totalRevenue: number | null;
}

const SalesAnalytics: React.FC<SalesAnalyticsProps> = ({ totalRevenue }) => {
  return (
    <div>
      <h1>Analytique des ventes</h1>
      {totalRevenue !== null ? (
        <p>Montant total des ventes: {totalRevenue}</p>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default SalesAnalytics;
