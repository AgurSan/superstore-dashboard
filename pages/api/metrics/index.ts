import { CsvParser } from '../../../services/csvParser';
import { DataService } from '../../../services/dataService';
import { MetricsService } from '../../../services/metricsService';
import express from 'express';
const app = express();

//point d'entrée de l'api

const csvParser = new CsvParser();
const dataService = new DataService(csvParser);
const metricsService = new MetricsService(dataService);


import { Request, Response } from 'express';

export async function getTotalRevenue(req: Request, res: Response) {
  try {
    const totalRevenue = await metricsService.getTotalRevenue();
    res.status(200).json({ totalRevenue });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}


export async function getAvgRevenuePerOrder(req: Request, res: Response) {
  try {
    const avgRevenuePerOrder = await metricsService.getAvgRevenuePerOrder();
    res.status(200).json({ avgRevenuePerOrder });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function getNumOrders(req: Request, res: Response) {
  try {
    const numOrders = await metricsService.getNumOrders();
    res.status(200).json({ numOrders });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function getUniqueCustomers(req: Request, res: Response) {
  try {
    const uniqueCustomers = await metricsService.getUniqueCustomers();
    res.status(200).json({ uniqueCustomers });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function getDataByState(req: Request, res: Response) {
  try {
    const state = req.params.state;
    const filteredData = await metricsService.getDataByState(state);
    res.status(200).json({ filteredData: filteredData});
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function getMetricsByOrderDate(req: Request, res: Response) {
  try {
    const orderDateParam = req.params.orderDate;
    const date = new Date(orderDateParam);
    const metricsByOrderDate = await metricsService.getMetricsByOrderDate(date);
    res.status(200).json({ metricsByOrderDate });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}


export async function handler(req: Request, res: Response) {
  switch (req.path) { //req.path au lieu de req.url
    case '/total-revenue':
      return await getTotalRevenue(req, res);
    case '/avg-revenue-per-order':
      return await getAvgRevenuePerOrder(req, res);
    case '/num-orders':
      return await getNumOrders(req, res);
    case '/unique-customers':
      return await getUniqueCustomers(req, res);
    case '/by-state':
      return await getDataByState(req, res);
    case '/by-order-date':
      return await getMetricsByOrderDate(req, res);
    default:
      res.status(404).json({ error: 'Not found' });
  }
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
