import { CsvParser } from './CsvParser';
import { DataService } from './dataService';
import { MetricsService } from './MetricsService';

//point d'entrée de l'api

const csvParser = new CsvParser();
const dataService = new DataService(csvParser);
const metricsService = new MetricsService(csvParser, dataService);

export async function getTotalRevenue(req, res) {
  const totalRevenue = await metricsService.getTotalRevenue();
  res.status(200).json({ totalRevenue });
}

export async function getAvgRevenuePerOrder(req, res) {
  const avgRevenuePerOrder = await metricsService.getAvgRevenuePerOrder();
  res.status(200).json({ avgRevenuePerOrder });
}

export async function getNumOrders(req, res) {
  const numOrders = await metricsService.getNumOrders();
  res.status(200).json({ numOrders });
}

export async function getUniqueCustomers(req, res) {
  const uniqueCustomers = await metricsService.getUniqueCustomers();
  res.status(200).json({ uniqueCustomers });
}

export async function getMetricsByState(req, res) {
  const metricsByState = await metricsService.getMetricsByState();
  res.status(200).json({ metricsByState });
}

export async function getMetricsByOrderDate(req, res) {
  const metricsByOrderDate = await metricsService.getMetricsByOrderDate();
  res.status(200).json({ metricsByOrderDate });
}

export async function handler(req, res) {
  switch (req.url) {
    case '/api/metrics/total-revenue':
      return await getTotalRevenue(req, res);
    case '/api/metrics/avg-revenue-per-order':
      return await getAvgRevenuePerOrder(req, res);
    case '/api/metrics/num-orders':
      return await getNumOrders(req, res);
    case '/api/metrics/unique-customers':
      return await getUniqueCustomers(req, res);
    case '/api/metrics/by-state':
      return await getMetricsByState(req, res);
    case '/api/metrics/by-order-date':
      return await getMetricsByOrderDate(req, res);
    default:
      res.status(404).json({ error: 'Not found' });
  }
}
