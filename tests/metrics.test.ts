import { CsvParser } from '../services/api/metrics/csvParser';
import { DataService } from '../services/api/metrics/dataService';
import { MetricsService } from '../services/api/metrics/metricsService';

describe('CsvParser', () => {
  let csvParser: CsvParser;

  beforeEach(() => {
    csvParser = new CsvParser();
  });

  it('should correctly parse CSV data', async () => {
    const parsedData = await csvParser.parseData();
    expect(parsedData).toBeDefined();
    expect(parsedData.length).toBeGreaterThan(0);
  });

  it('should parse "Row ID" as a number', async () => {
    const parsedData = await csvParser.parseData();
    expect(typeof parsedData[0]['Row ID']).toBe('number');
  });

  it('should parse "Order Date" as a Date object', async () => {
    const parsedData = await csvParser.parseData();
    expect(parsedData[0]['Order Date'] instanceof Date).toBe(true);
  });

  it('should parse "Sales" as a number', async () => {
    const parsedData = await csvParser.parseData();
    expect(typeof parsedData[0].Sales).toBe('number');
  });

  it('should parse "Quantity" as a number', async () => {
    const parsedData = await csvParser.parseData();
    expect(typeof parsedData[0].Quantity).toBe('number');
  });
});

describe('DataService', () => {
  let csvParser: CsvParser;
  let dataService: DataService;

  beforeEach(() => {
    csvParser = new CsvParser();
    dataService = new DataService(csvParser);
  });

  it('should return data from CSV parser', async () => {
    const data = await dataService.getData();
    expect(data).toBeDefined();
    expect(data.length).toBeGreaterThan(0);
  });
});

describe('MetricsService', () => {
  let csvParser: CsvParser;
  let dataService: DataService;
  let metricsService: MetricsService;

  beforeEach(() => {
    csvParser = new CsvParser();
    dataService = new DataService(csvParser);
    metricsService = new MetricsService(dataService);
  });

  it('should calculate total revenue correctly', async () => {
    const totalRevenue = await metricsService.getTotalRevenue();
    expect(totalRevenue).toBeDefined();
    expect(totalRevenue).toBeGreaterThan(0);
  });

  it('should calculate average revenue per order correctly', async () => {
    const avgRevenuePerOrder = await metricsService.getAvgRevenuePerOrder();
    expect(avgRevenuePerOrder).toBeDefined();
    expect(avgRevenuePerOrder).toBeGreaterThan(0);
  });

  it('should get the number of orders correctly', async () => {
    const numOrders = await metricsService.getNumOrders();
    expect(numOrders).toBeDefined();
    expect(numOrders).toBeGreaterThan(0);
  });

  it('should get the number of unique customers correctly', async () => {
    const uniqueCustomers = await metricsService.getUniqueCustomers();
    expect(uniqueCustomers).toBeDefined();
    expect(uniqueCustomers).toBeGreaterThan(0);
  });

  it('should get metrics by state correctly', async () => {
    const metricsByState = await metricsService.getMetricsByState();
    expect(metricsByState).toBeDefined();
    // Add more assertions if needed to check the correctness of the result
  });

  it('should get metrics by order date correctly', async () => {
    const metricsByOrderDate = await metricsService.getMetricsByOrderDate();
    expect(metricsByOrderDate).toBeDefined();
    // Add more assertions if needed to check the correctness of the result
  });
});
