import { Request, Response } from 'express';
import { MetricsService } from './metricsService';
import { CsvParser } from './csvParser';
import { DataService } from './dataService';

// Routes et méthodes associées
const routes = [
  { path: '/api/metrics/total-revenue', method: getTotalRevenue },
  { path: '/api/metrics/avg-revenue-per-order', method: getAvgRevenuePerOrder },
  { path: '/api/metrics/num-orders', method: getNumOrders },
  { path: '/api/metrics/unique-customers', method: getUniqueCustomers },
  { path: '/api/metrics/by-state', method: getMetricsByState },
  { path: '/api/metrics/by-order-date', method: getMetricsByOrderDate }
];

// Gestionnaire de requêtes
export async function handler(req: Request, res: Response) {
  const { url } = req;
  const route = routes.find(route => route.path === url);

  if (!route) {
    res.status(404).json({ error: 'Not found' });
    return;
  }

  try {
    const data = await route.method();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Création d'une instance de CsvParser
const csvParser = new CsvParser();

// Création d'une instance de DataService
const dataService = new DataService(csvParser);

// Création d'une instance de MetricsService en passant DataService comme argument
const metricsService = new MetricsService(dataService);

// Méthodes pour gérer les requêtes
async function getTotalRevenue() {
  return { totalRevenue: await metricsService.getTotalRevenue() };
}

async function getAvgRevenuePerOrder() {
  return { avgRevenuePerOrder: await metricsService.getAvgRevenuePerOrder() };
}

async function getNumOrders() {
  return { numOrders: await metricsService.getNumOrders() };
}

async function getUniqueCustomers() {
  return { uniqueCustomers: await metricsService.getUniqueCustomers() };
}

async function getMetricsByState() {
  return { metricsByState: await metricsService.getMetricsByState() };
}

async function getMetricsByOrderDate() {
  return { metricsByOrderDate: await metricsService.getMetricsByOrderDate() };
}
