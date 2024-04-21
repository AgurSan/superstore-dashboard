import { CsvParser } from '../services/api/metrics/csvParser';
import { DataService } from '../services/api/metrics/dataService';
import { MetricsService } from '../services/api/metrics/metricsService';

interface Row {
  'Row ID': number;
  'Order ID': string;
  'Order Date': Date;
  'Customer ID': string;
  'State': string;
  'Region': string;
  'Product ID': string;
  'Sales': number;
  'Quantity': number;
}

interface MetricsByState {
  [state: string]: {
    numOrders: number;
    totalRevenue: number;
  };
}

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
  let dataService: DataService;

  beforeEach(() => {
    const csvParser = new CsvParser();
    dataService = new DataService(csvParser);
  });

  it('should return data from CSV parser', async () => {
    const data = await dataService.getData();
    expect(data).toBeDefined();
    expect(data.length).toBeGreaterThan(0);
  });

  it('should have a method getData that returns an array of Row objects', async () => {
    const data = await dataService.getData();
    expect(Array.isArray(data)).toBe(true);
    if (data.length > 0) {
      const firstRow: Row = data[0];
      expect(typeof firstRow['Row ID']).toBe('number');
      expect(typeof firstRow['Order ID']).toBe('string');
      expect(firstRow['Order Date']).toBeInstanceOf(Date);
      expect(typeof firstRow['Customer ID']).toBe('string');
      expect(typeof firstRow['State']).toBe('string');
      expect(typeof firstRow['Region']).toBe('string');
      expect(typeof firstRow['Product ID']).toBe('string');
      expect(typeof firstRow['Sales']).toBe('number');
      expect(typeof firstRow['Quantity']).toBe('number');
    }
  });
});

describe('MetricsService', () => {
  let metricsService: MetricsService;

  beforeEach(() => {
    metricsService = new MetricsService(new DataService(new CsvParser()));
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

  it('should return data by state', async () => {
    const state = 'California';
    const data = await metricsService.getDataByState(state);
    expect(data).toBeDefined();
    expect(Array.isArray(data)).toBe(true);
    data.forEach((item: Row) => {
      expect(item['State']).toBe(state);
    });
  });

  it('should get metrics by order date correctly', async () => {
    const orderDate = new Date('2023-04-15');
    const metricsByOrderDate = await metricsService.getMetricsByOrderDate(orderDate);
    expect(metricsByOrderDate).toBeDefined();
    expect(Object.keys(metricsByOrderDate).length).toBeGreaterThan(0);
    const dataForDate = metricsByOrderDate[orderDate.toISOString()];
    expect(dataForDate).toBeDefined();
    expect(Array.isArray(dataForDate)).toBe(true);
    dataForDate.forEach((item: Row) => {
      expect(new Date(item['Order Date']).toISOString()).toBe(orderDate.toISOString());
    });
  });
});
