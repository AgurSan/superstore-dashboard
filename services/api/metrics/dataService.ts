import { csvParser } from './csvParser';

export class dataService {
  constructor(private csvParser: csvParser) {}

  async getData(): Promise<any[]> {
    return this.csvParser.parseData();
  }
}
