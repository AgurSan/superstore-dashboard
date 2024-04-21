import { DataService } from './dataService';

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

// Classe MetricsService qui contient la logique pour calculer les métriques
export class MetricsService {
  constructor(private dataService: DataService) {}

  // Méthode pour calculer le revenu total
  async getTotalRevenue() {
    const data = await this.dataService.getData();
    const totalRevenue = data.reduce((acc, item) => acc + item.price, 0);
    return totalRevenue;
  }

  // Méthode pour calculer le revenu moyen par commande
  async getAvgRevenuePerOrder() {
    const data = await this.dataService.getData();
    const totalRevenue = data.reduce((acc, item) => acc + item.price, 0);
    const numOrders = data.length;
    const avgRevenuePerOrder = totalRevenue / numOrders;
    return avgRevenuePerOrder;
  }

  // Méthode pour obtenir le nombre total de commandes
  async getNumOrders() {
    const data = await this.dataService.getData();
    const numOrders = data.length;
    return numOrders;
  }

  // Méthode pour obtenir le nombre de clients uniques
  async getUniqueCustomers() {
  const data = await this.dataService.getData();
  const customerIds = data.map((item) => item['Customer ID']).filter((customerId) => customerId);
  const uniqueCustomers = new Set(customerIds).size;
  return uniqueCustomers;
}

  async getDataByState(state: string) {
    const data = await this.dataService.getData();
    const filteredData = data.filter(item => item['State'] === state);
    return filteredData;
  }

  // Méthode pour obtenir les métriques par date de commande
  async getMetricsByOrderDate(date: Date): Promise<{ [key: string]: Row[] }> {
  const data = await this.dataService.getData();
  const filteredData = data.filter((item: Row) => {
    const orderDate = new Date(item['Order Date']);
    return orderDate.getTime() === date.getTime();
  });
  return { [date.toISOString()]: filteredData };
}
}
