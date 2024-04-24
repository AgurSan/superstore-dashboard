# Fonctionnement de l'API

Cette API récupère des données à partir d'un fichier CSV qui contient des informations sur les commandes passées dans plusieurs magasins. Elle fournit ensuite différentes métriques basées sur ces données, telles que le revenu total, le revenu moyen par commande, le nombre total de commandes, le nombre de clients uniques, ainsi que des données filtrées par état et par date de commande.

## Données

Les données sont stockées dans un fichier CSV et sont structurées selon une interface définie, qui inclut les informations suivantes pour chaque commande :

```typescript
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
```

## Endpoints

L'API expose les endpoints suivants pour récupérer les métriques et les données :

/api/metrics/total-revenue: Renvoie le revenu total.
/api/metrics/avg-revenue-per-order: Renvoie le revenu moyen par commande.
/api/metrics/num-orders: Renvoie le nombre total de commandes.
/api/metrics/unique-customers: Renvoie le nombre de clients uniques.
/api/metrics/by-state: Renvoie les données filtrées par état.
/api/metrics/by-order-date: Renvoie les données filtrées par date de commande.
Chaque endpoint est conçu pour répondre à une requête spécifique et renvoie les données correspondantes sous forme de réponse JSON.

Cette architecture permet aux utilisateurs de récupérer des métriques spécifiques ou des données filtrées en fonction de leurs besoins, ce qui facilite l'analyse des performances et des tendances de vente du magasin.

On va travailler avec ces endpoints dans l'interface react du projet.
