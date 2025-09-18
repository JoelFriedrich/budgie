import { Transaction, Category, Rule } from './types';

export const categories: Category[] = [
  { id: '1', name: 'Groceries', icon: 'ShoppingCart', color: 'hsl(140 70% 60%)', budget: 400 },
  { id: '2', name: 'Coffee', icon: 'Coffee', color: 'hsl(25 70% 60%)', budget: 50 },
  { id: '3', name: 'Transportation', icon: 'Bus', color: 'hsl(210 70% 60%)', budget: 100 },
  { id: '4', name: 'Restaurants', icon: 'Utensils', color: 'hsl(340 70% 60%)', budget: 250 },
  { id: '5', name: 'Subscriptions', icon: 'Youtube', color: 'hsl(0 70% 60%)', budget: 50 },
  { id: '6', name: 'Shopping', icon: 'ShoppingBag', color: 'hsl(300 70% 60%)', budget: 200 },
];

export const transactions: Transaction[] = [
  { id: '1', date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), vendor: 'Whole Foods', description: 'Weekly groceries', amount: 125.60, category: '1' },
  { id: '2', date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), vendor: 'Starbucks', description: 'Morning coffee', amount: 5.25, category: '2' },
  { id: '3', date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(), vendor: 'MTA', description: 'MetroCard refill', amount: 29.00, category: '3' },
  { id: '4', date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(), vendor: 'Sweetgreen', description: 'Lunch salad', amount: 14.50, category: '4' },
  { id: '5', date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(), vendor: 'Netflix', description: 'Monthly subscription', amount: 15.49, category: '5' },
  { id: '6', date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(), vendor: 'Amazon', description: 'New book', amount: 22.99, category: '6' },
  { id: '7', date: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString(), vendor: 'Blue Bottle', description: 'Iced Latte', amount: 6.50 }, // Uncategorized
  { id: '8', date: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString(), vendor: 'Uber', description: 'Ride to airport', amount: 45.30, category: '3' },
  { id: '9', date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(), vendor: 'The Local Butcher', description: 'Steak for dinner', amount: 32.10 }, // Uncategorized
  { id: '10', date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(), vendor: 'Spotify', description: 'Premium subscription', amount: 10.99, category: '5' },
  { id: '11', date: new Date(new Date().setDate(new Date().getDate() - 6)).toISOString(), vendor: 'Lyft', description: 'Ride from concert', amount: 22.80 }, // Uncategorized
  { id: '12', date: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(), vendor: 'Trader Joe\'s', description: 'Snacks', amount: 42.75, category: '1' },
];

export const rules: Rule[] = [
  { id: '1', field: 'vendor', operator: 'contains', value: 'Starbucks', categoryId: '2' },
  { id: '2', field: 'vendor', operator: 'contains', value: 'Blue Bottle', categoryId: '2' },
  { id: '3', field: 'vendor', operator: 'contains', value: 'Whole Foods', categoryId: '1' },
  { id: '4', field: 'vendor', operator: 'contains', value: 'Trader Joe', categoryId: '1' },
  { id: '5', field: 'vendor', operator: 'contains', value: 'Uber', categoryId: '3' },
  { id: '6', field: 'vendor', operator: 'contains', value: 'Lyft', categoryId: '3' },
  { id: '7', field: 'description', operator: 'contains', value: 'subscription', categoryId: '5' },
];
