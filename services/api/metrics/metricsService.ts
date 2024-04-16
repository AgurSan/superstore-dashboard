import { dataService } from './dataService';

// Classe MetricsService qui contient la logique pour calculer les métriques
export class MetricsService {
  constructor(private dataService: dataService) {}

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
    const uniqueCustomers = [...new Set(data.map((item) => item.customer))].length;
    return uniqueCustomers;
  }

  // Méthode pour obtenir les métriques par état
  async getMetricsByState() {
    const data = await this.dataService.getData();
    const metricsByState = data.reduce((acc, item) => {
      if (!acc[item.state]) {
        acc[item.state] = {
          numOrders: 0,
          totalRevenue: 0,
        };
      }
      acc[item.state].numOrders++;
      acc[item.state].totalRevenue += item.price;
      return acc;
    }, {});
    return metricsByState;
  }

  // Méthode pour obtenir les métriques par date de commande
  async getMetricsByOrderDate() {
    const data = await this.dataService.getData();
    const metricsByOrderDate = data.reduce((acc, item) => {
      const date = new Date(item.orderDate).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = {
          numOrders: 0,
          totalRevenue: 0,
        };
      }
      acc[date].numOrders++;
      acc[date].totalRevenue += item.price;
      return acc;
    }, {});
    return metricsByOrderDate;
  }
}
