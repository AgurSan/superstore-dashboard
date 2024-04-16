import { CsvParser } from './csvParser';

export class DataService {
  constructor(private csvParser: CsvParser) {}

  async getData(): Promise<any[]> {
    return this.csvParser.parseData();
  }
}
