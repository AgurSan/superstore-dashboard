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

  async getTotalRevenue() {
    const data = await this.dataService.getData();
    const totalRevenue = data.reduce((acc, item) => acc + item.Sales * item.Quantity, 0);
    return totalRevenue;
  }

  async getAvgRevenuePerOrder() {
    const data = await this.dataService.getData();
    const totalRevenue = data.reduce((acc, item) => acc + item.Sales * item.Quantity, 0);
    const totalQuantity = data.reduce((acc, item) => acc + item.Quantity, 0);
    const avgRevenuePerOrder = totalRevenue / totalQuantity;
    return avgRevenuePerOrder;
  }

  async getNumOrders() {
    const data = await this.dataService.getData();
    const numOrders = data.length;
    return numOrders;
  }

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
