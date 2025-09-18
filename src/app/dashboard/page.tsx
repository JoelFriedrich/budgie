import { transactions, categories } from '@/lib/data';
import { TransactionsClient } from './transactions-client';
import { PageHeader } from '@/components/page-header';

export default function DashboardPage() {
  // In a real app, you'd fetch this data from a database
  const initialTransactions = transactions;
  const allCategories = categories;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Here's a list of your recent transactions."
      />
      <TransactionsClient
        initialTransactions={initialTransactions}
        categories={allCategories}
      />
    </div>
  );
}
