import { transactions, categories } from '@/lib/data';
import { TransactionsClient } from './transactions-client';
import { PageHeader } from '@/components/page-header';
import { EmailParser } from './email-parser';

export default function DashboardPage() {
  // In a real app, you'd fetch this data from a database
  const initialTransactions = transactions;
  const allCategories = categories;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <PageHeader
          title="Transactions"
          description="Here's a list of your recent transactions."
        />
        <EmailParser />
      </div>
      <TransactionsClient
        initialTransactions={initialTransactions}
        categories={allCategories}
      />
    </div>
  );
}
