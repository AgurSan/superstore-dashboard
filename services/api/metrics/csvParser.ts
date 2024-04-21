import fs from 'fs';
import csv from 'csv-parser';

interface Row {
<<<<<<< HEAD
  'Row ID': number;
  'Order ID': string;
  'Order Date': Date;
  'Customer ID': string;
  'State': string;
  'Region': string;
  'Product ID': string;
  'Sales': number;
  'Quantity': number;
=======
    'Row ID': number;
    'Order ID': string;
    'Order Date': Date;
    'Customer ID': string;
    'State': string;
    'Region': string;
    'Product ID': string;
    'Sales': number;
    'Quantity': number;
>>>>>>> api
}

export class CsvParser {
<<<<<<< HEAD
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
=======
    async parseData(): Promise<Row[]> {
        return new Promise<Row[]>((resolve, reject) => {
            const datas: Row[] = [];
            const stream = fs.createReadStream('public/dataset.csv');

            stream.pipe(csv())
                .on('data', (data) => {
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
                .on('error', (error) => {
                    reject(error);
                });
>>>>>>> api
        });
    }
}
