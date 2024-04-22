import { Request, Response } from 'express';
import { CsvParser } from '../services/api/metrics/csvParser';
import { DataService } from '../services/api/metrics/dataService';
import { MetricsService } from '../services/api/metrics/metricsService';
import * as metricsControllers from '../services/api/metrics/index';

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
}
)
