import { DataService } from './dataService';

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
<<<<<<< Updated upstream
    const data = await this.dataService.getData();
    const uniqueCustomers = [...new Set(data.map((item) => item.customer))].length;
    return uniqueCustomers;
  }

  // Méthode pour obtenir les métriques par état
=======
  const data = await this.dataService.getData();
  const customerIds = data.map((item) => item['Customer ID']).filter((customerId) => customerId);
  const uniqueCustomers = new Set(customerIds).size;
  return uniqueCustomers;
}


>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
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

  const data = await this.dataService.getData();
  const metricsByOrderDate = data.reduce((acc: Record<string, { numOrders: number; totalRevenue: number }>, row: Row) => {
    // Convertir la date de la commande en une chaîne de caractères représentant la date (sans l'heure)
    const orderDate = row['Order Date'].toISOString().split('T')[0];
    const totalPrice = row['Sales'] * row['Quantity'];
    if (!acc[orderDate]) {
      acc[orderDate] = {
        numOrders: 0,
        totalRevenue: 0,
      };
    }

    // Mettre à jour les métriques pour la date de commande actuelle
    acc[orderDate].numOrders++;
    acc[orderDate].totalRevenue += totalPrice;

    return acc;
  }, {});

  console.log(metricsByOrderDate); // Ajoute cette ligne pour afficher les données calculées

  return metricsByOrderDate;
}


>>>>>>> Stashed changes
}
