import axios from 'axios';

async function fetchMetrics() {
  const [
    totalRevenueResponse,
    avgRevenuePerOrderResponse,
    numOrdersResponse,
    uniqueCustomersResponse,
    metricsByStateResponse,
    metricsByOrderDateResponse,
  ] = await Promise.all([
    axios.get('/api/metrics/total-revenue'),
    axios.get('/api/metrics/avg-revenue-per-order'),
    axios.get('/api/metrics/num-orders'),
    axios.get('/api/metrics/unique-customers'),
    axios.get('/api/metrics/by-state'),
    axios.get('/api/metrics/by-order-date'),
  ]);

  return {
    totalRevenue: totalRevenueResponse.data.totalRevenue,
    avgRevenuePerOrder: avgRevenuePerOrderResponse.data.avgRevenuePerOrder,
    numOrders: numOrdersResponse.data.numOrders,
    uniqueCustomers: uniqueCustomersResponse.data.uniqueCustomers,
    metricsByState: metricsByStateResponse.data.metricsByState,
    metricsByOrderDate: metricsByOrderDateResponse.data.metricsByOrderDate,
  };
}
