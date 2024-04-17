import { CsvParser } from '../services/api/metrics/csvParser';

describe('CsvParser', () => {
  let csvParser: CsvParser;

  beforeEach(() => {
    csvParser = new CsvParser();
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
});
