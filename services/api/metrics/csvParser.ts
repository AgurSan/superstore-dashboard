import fs from 'fs'; // Importation du module 'fs' pour la gestion des fichiers
import csv from 'csv-parser'; // Importation du module 'csv-parser' pour parser le CSV

// Interface représentant la structure d'une ligne du CSV
interface Row {
  rowID: number;
  orderID: string;
  orderDate: string;
  customerID: string;
  state: string;
  region: string;
  productID: string;
  sales: number;
  quantity: number;
}

// Classe CsvParser qui gère la lecture et le parsing du fichier CSV
export class CsvParser {
  // Méthode pour parser les données du CSV
  async parseData(): Promise<Row[]> {
    return new Promise<Row[]>((resolve, reject) => { // Retourne une promesse de tableau de lignes
      const datas: Row[] = []; // Initialise un tableau pour stocker les données parsées
      const stream = fs.createReadStream('public/dataset.csv'); // Crée un flux de lecture du fichier CSV

      // Utilisation de csv-parser pour parser les données CSV ligne par ligne
      stream.pipe(csv())
        .on('data', (data) => { // Lorsqu'une ligne est parsée
          // Convertit les données en objet de type Row et les ajoute au tableau datas
          const rowData: Row = {
            rowID: parseInt(data.rowID),
            orderID: data.orderID,
            orderDate: data.orderDate,
            customerID: data.customerID,
            state: data.state,
            region: data.region,
            productID: data.productID,
            sales: parseFloat(data.sales),
            quantity: parseInt(data.quantity)
          };
          datas.push(rowData); // Ajoute l'objet Row au tableau datas
        })
        .on('end', () => { // Lorsque toutes les lignes ont été lues et parsées
          resolve(datas); // Résout la promesse avec le tableau complet de données parsées
        })
        .on('error', (error) => { // En cas d'erreur lors de la lecture ou du parsing du CSV
          reject(error); // Rejette la promesse avec l'erreur rencontrée
        });
    });
  }
}
