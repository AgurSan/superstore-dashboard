import { DataService } from './dataService';


// Classe MetricsService qui contient la logique pour calculer les métriques
export class MetricsService {
  constructor(private dataService: DataService) {}

  // Méthode pour calculer le revenu total
  async getTotalRevenue() {
    const data = await this.dataService.getData();
    const totalRevenue = data.reduce((acc, item) => acc + (item.Sales * item.Quantity), 0);
    return totalRevenue;
  }


  // Méthode pour calculer le revenu moyen par commande
async getAvgRevenuePerOrder() {
    const data = await this.dataService.getData();
    const totalRevenue = data.reduce((acc, item) => acc + item.Sales * item.Quantity, 0);
    const totalQuantity = data.reduce((acc, item) => acc + item.Quantity, 0);
    const avgRevenuePerOrder = totalRevenue / totalQuantity;
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
  const uniqueCustomers = [...new Set(data.map((item) => item['Customer ID']))].length;
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
  const metricsByOrderDate: Record<string, { numOrders: number; totalRevenue: number }> = {};

  // Parcourir les données pour calculer les métriques par date de commande
  data.forEach((item) => {
    const date = new Date(item['Order Date']).toISOString().split('T')[0]; // Assurez-vous que la clé est correctement référencée
    const price = item['Sales'] * item['Quantity']; // Calculer le prix total de la commande

    // Si la date n'existe pas encore dans les métriques, initialiser les valeurs à zéro
    if (!metricsByOrderDate[date]) {
      metricsByOrderDate[date] = { numOrders: 0, totalRevenue: 0 };
    }

    // Mettre à jour les métriques pour cette date
    metricsByOrderDate[date].numOrders++;
    metricsByOrderDate[date].totalRevenue += price;
  });

  return metricsByOrderDate;
}
}
