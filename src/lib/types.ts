export type Transaction = {
  id: string;
  date: string;
  vendor: string;
  description: string;
  amount: number;
  category?: string; // category id
};

export type Category = {
  id: string;
  name: string;
  icon: string; // lucide-react icon name
  color: string;
};

export type Rule = {
  id: string;
  field: 'vendor' | 'description' | 'amount';
  operator: 'contains' | 'equals' | 'greater_than' | 'less_than';
  value: string | number;
  categoryId: string;
};
