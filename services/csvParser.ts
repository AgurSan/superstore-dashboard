import csv from 'csv-parser';

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

export class CsvParser {
  private readFile: (path: string) => Promise<fs.ReadStream>;

  constructor(readFile: (path: string) => Promise<fs.ReadStream>) {
    this.readFile = readFile;
  }

  async parseData(filePath: string): Promise<Row[]> {
      const stream = await this.readFile(filePath);

      return new Promise<Row[]>((resolve, reject) => {
          const datas: Row[] = [];

          stream.pipe(csv())
              .on('data', (data: any) => {
                  const rowData: Row = {
                    'Row ID': parseInt(data['Row ID']),
                    'Order ID': data['Order ID'],
                    'Order Date': new Date(data['Order Date']),
                    'Customer ID': data['Customer ID'],
                    'State': data['State'],
                    'Region': data['Region'],
                    'Product ID': data['Product ID'],
                    'Sales': parseFloat(data['Sales']),
                    'Quantity': parseInt(data['Quantity'])
                  };
                  datas.push(rowData);
              })
              .on('end', () => {
                  resolve(datas);
              })
              .on('error', (error: any) => {
                  reject(error);
              });
      });
  }
}
