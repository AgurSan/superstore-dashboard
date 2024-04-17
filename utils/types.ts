// utils/types.ts

export type Order = {
  order_id: string;
  customer_id: string;
  order_date: string;
  revenue: number;
};

export type StateMetrics = {
  state: string;
  total_revenue: number;
  avg_revenue_per_order: number;
  num_unique_customers: number;
};

export type OrderMetrics = {
  order_date: string;
  total_revenue: number;
};


export interface Metrics {
  totalRevenue: number;
  avgRevenuePerOrder: number;
  numOrders: number;
  uniqueCustomers: number;
  metricsByState: { [state: string]: number };
  metricsByOrderDate: { [orderDate: string]: number };
}
