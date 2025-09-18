import { Transaction, Category, Rule } from './types';

export const categories: Category[] = [
  { id: '1', name: 'Groceries', icon: 'ShoppingCart', color: 'hsl(140 70% 60%)', budget: 0 },
  { id: '2', name: 'Coffee', icon: 'Coffee', color: 'hsl(25 70% 60%)', budget: 0 },
  { id: '3', name: 'Transportation', icon: 'Bus', color: 'hsl(210 70% 60%)', budget: 0 },
  { id: '4', name: 'Restaurants', icon: 'Utensils', color: 'hsl(340 70% 60%)', budget: 0 },
  { id: '5', name: 'Subscriptions', icon: 'Youtube', color: 'hsl(0 70% 60%)', budget: 0 },
  { id: '6', name: 'Shopping', icon: 'ShoppingBag', color: 'hsl(300 70% 60%)', budget: 0 },
  { id: '7', name: 'Savings', icon: 'PiggyBank', color: 'hsl(100 70% 60%)', budget: 0 },
];

export const transactions: Transaction[] = [];

export const rules: Rule[] = [];
