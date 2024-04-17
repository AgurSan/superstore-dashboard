import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  getAvgRevenuePerOrder,
  getTotalRevenue,
  getNumOrders,
  getUniqueCustomers,
  getMetricsByState,
  getMetricsByOrderDate,
} from '../services/api/metrics';

const IndexPage: React.FC = () => {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get('/api/metrics');
        setMetrics(response.data);
      } catch (error) {
        console.error('Error fetching metrics:', error);
        // Display an error message to the user
      }
    };
    fetchMetrics();
  }, []);

  const memoizedMetrics = useMemo(() => {
    if (!metrics) return null;
    return {
      totalRevenue: getTotalRevenue(metrics),
      avgRevenuePerOrder: getAvgRevenuePerOrder(metrics),
      numOrders: getNumOrders(metrics),
      uniqueCustomers: getUniqueCustomers(metrics),
      metricsByState: getMetricsByState(metrics),
      metricsByOrderDate: getMetricsByOrderDate(metrics),
    };
  }, [metrics]);

  if (!memoizedMetrics) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Superstore Dashboard</h1>
      <div>
        <p>Total Revenue: {memoizedMetrics.totalRevenue}</p>
        <p>Average Revenue per Order: {memoizedMetrics.avgRevenuePerOrder}</p>
        <p>Number of Orders: {memoizedMetrics.numOrders}</p>
        <p>Number of Unique Customers: {memoizedMetrics.uniqueCustomers}</p>
        <h2>Metrics by State</h2>
        <ul>
          {Object.entries(memoizedMetrics.metricsByState).map(([state, revenue]) => (
            <li key={state}>{state}: {revenue}</li>
          ))}
        </ul>
        <h2>Metrics by Order Date</h2>
        <ul>
          {Object.entries(memoizedMetrics.metricsByOrderDate).map(([date, revenue]) => (
            <li key={date}>{date}: {revenue}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IndexPage;
