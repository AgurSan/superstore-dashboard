import fs from 'fs';
import csv from 'csv-parser';

// Interface représentant la structure d'une ligne du CSV
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

// Classe CsvParser qui gère la lecture et le parsing du fichier CSV
export class CsvParser {
  async parseData(): Promise<Row[]> {
    return new Promise<Row[]>((resolve, reject) => {
      const datas: Row[] = [];
      const stream = fs.createReadStream('public/dataset.csv');

      stream.pipe(csv({ mapHeaders: ({ header }) => header.trim() }))
        .on('data', (data) => {
          const rowData: Row = {
            'Row ID': parseInt(data['Row ID']),
            'Order ID': data['Order ID'],
            'Order Date': new Date (data['Order Date']),
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
        .on('error', (error) => {
          reject(error);
        });
    });
  }
}
