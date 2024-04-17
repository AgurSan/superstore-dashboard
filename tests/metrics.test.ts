import { CsvParser } from '../services/api/metrics/csvParser';
import { DataService } from '../services/api/metrics/dataService';

describe('CsvParser', () => {
  let csvParser: CsvParser;
  let dataService: DataService;

  beforeEach(() => {
    csvParser = new CsvParser();
    dataService = new DataService(csvParser);
  });

  it('should parse CSV data correctly', async () => {
    const parsedData = await csvParser.parseData();
    expect(parsedData).toBeDefined();
    expect(parsedData.length).toBeGreaterThan(0);
  });

  it('should parse rowID as number', async () => {
    const parsedData = await csvParser.parseData();
    expect(typeof parsedData[0]['Row ID']).toBe('number');
  });

  it('should parse orderDate as Date object', async () => {
    const parsedData = await csvParser.parseData();
    expect(parsedData[0]['Order Date'] instanceof Date).toBe(true);
  });

  it('should parse sales as number', async () => {
    const parsedData = await csvParser.parseData();
    expect(typeof parsedData[0].Sales).toBe('number');
  });

  it('should parse quantity as number', async () => {
    const parsedData = await csvParser.parseData();
    expect(typeof parsedData[0].Quantity).toBe('number');
  });

  // Tests for DataService

  it('should return data from CSV parser', async () => {
    const data = await dataService.getData();
    expect(data).toBeDefined();
    expect(data.length).toBeGreaterThan(0);
  });

});
