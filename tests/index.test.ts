import { Request, Response } from 'express';
import { CsvParser } from '../services/api/metrics/csvParser';
import { DataService } from '../services/api/metrics/dataService';
import { MetricsService } from '../services/api/metrics/metricsService';
import * as metricsControllers from '../services/api/metrics/index';
const {
  getTotalRevenue,
  getAvgRevenuePerOrder,
  getNumOrders,
  getUniqueCustomers,
  getDataByState,
  getMetricsByOrderDate
} = metricsControllers;

describe("controllers in index", () => {

  let metricsService: MetricsService;
  beforeEach(() => {
    metricsService = new MetricsService(new DataService(new CsvParser()));
  });
  it('should return total revenue', async () => {
    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    await metricsControllers.getTotalRevenue(req as Request, res as Response);
    const totalRevenue = await metricsService.getTotalRevenue();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({totalRevenue: totalRevenue});
  })

  it('should return avg revnue per order', async () => {
    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    await metricsControllers.getAvgRevenuePerOrder(req as Request, res as Response);
    const avgRevenuePerOrder = await metricsService.getAvgRevenuePerOrder();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({avgRevenuePerOrder: avgRevenuePerOrder});
  })

  it('should return num orders', async () => {
    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    await metricsControllers.getNumOrders(req as Request, res as Response);
    const numOrders = await metricsService.getNumOrders();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({numOrders: numOrders});
  })

  it('should return data by state', async () => {
    const req: Partial<Request> = {
      params: {
        state: 'California'
      }
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    await metricsControllers.getDataByState(req as Request, res as Response);
    const filteredData = await metricsService.getDataByState('California');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ filteredData });
  })

  it('should return metrics by order date', async () => {
    const req: Partial<Request> = {
      params: {
        orderDate: '6/12/2016'
      }
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await metricsControllers.getMetricsByOrderDate(req as Request, res as Response);
    const metricsByOrderDate = await metricsService.getMetricsByOrderDate(new Date('6/12/2016'));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ metricsByOrderDate });
  });
})
