'use client';

import { useState, useTransition, useEffect } from 'react';
import type { Transaction, Category } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Wand2 } from 'lucide-react';
import { suggestTransactionRules } from '@/ai/flows/suggest-transaction-rules';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { TransactionActions } from './transaction-actions';

type TransactionsClientProps = {
  initialTransactions: Transaction[];
  categories: Category[];
};

export function TransactionsClient({ initialTransactions, categories }: TransactionsClientProps) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [isSuggesting, startSuggestionTransition] = useTransition();
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCategoryChange = (transactionId: string, categoryId: string) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === transactionId ? { ...t, category: categoryId } : t
      )
    );
  };

  const getCategory = (categoryId?: string) => {
    return categories.find((c) => c.id === categoryId);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleSuggestCategories = async () => {
    startSuggestionTransition(async () => {
      try {
        const uncategorized = transactions.filter((t) => !t.category);
        if (uncategorized.length === 0) {
          toast({ title: 'All transactions are already categorized.' });
          return;
        }

        const input = uncategorized.map((t) => ({
          vendor: t.vendor,
          description: t.description,
        }));

        const suggestions = await suggestTransactionRules(input);
        
        let changes = 0;
        
        setTransactions(prevTransactions => {
          const updatedTransactions = [...prevTransactions];
          suggestions.forEach(suggestion => {
            const category = categories.find(c => c.name.toLowerCase() === suggestion.category.toLowerCase());
            if (category) {
              const originalTransaction = uncategorized.find(t => t.vendor === suggestion.vendor);
              if (originalTransaction) {
                const transactionIndex = updatedTransactions.findIndex(t => t.id === originalTransaction.id);
                if (transactionIndex !== -1 && !updatedTransactions[transactionIndex].category) {
                  updatedTransactions[transactionIndex] = { ...updatedTransactions[transactionIndex], category: category.id };
                  changes++;
                }
              }
            }
          });
          if(changes > 0) {
            toast({
              title: 'AI Suggestions Applied',
              description: `${changes} transaction(s) have been categorized.`,
            });
          } else {
            toast({
              title: 'AI Suggestions',
              description: `The AI couldn't find any new categories for the remaining transactions.`,
            });
          }
          return updatedTransactions;
        });

      } catch (error) {
        console.error('AI suggestion failed:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to get AI suggestions. Please try again.',
        });
      }
    });
  };
  
  const [editingTransactionId, setEditingTransactionId] = useState<string | null>(null);

  const onEdit = (transactionId: string) => {
    setEditingTransactionId(transactionId);
  }

  const onSaveCategory = (transactionId: string, categoryId: string) => {
    handleCategoryChange(transactionId, categoryId);
    setEditingTransactionId(null);
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="flex items-center justify-end border-b p-4">
          <Button onClick={handleSuggestCategories} disabled={isSuggesting}>
            <Wand2 className="mr-2 h-4 w-4" />
            {isSuggesting ? 'Thinking...' : 'AI Suggest Categories'}
          </Button>
        </div>
        <div className="overflow-x-auto">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="sticky right-0 bg-card w-[60px]"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.map((transaction) => {
                const category = getCategory(transaction.category);
                const isEditing = editingTransactionId === transaction.id;
                return (
                    <TableRow key={transaction.id} className="transition-colors duration-300 ease-in-out">
                    <TableCell className="whitespace-nowrap">{isClient ? formatDate(transaction.date) : ''}</TableCell>
                    <TableCell>
                        <div className="font-medium">{transaction.vendor}</div>
                        <div className="text-sm text-muted-foreground">{transaction.description}</div>
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap">{formatCurrency(transaction.amount)}</TableCell>
                    <TableCell>
                        {isEditing || !category ? (
                        <Select
                            value={category?.id}
                            onValueChange={(value) => onSaveCategory(transaction.id, value)}
                        >
                            <SelectTrigger className="w-[180px] h-8 text-xs">
                            <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                            {categories.map((cat) => (
                                <SelectItem key={cat.id} value={cat.id}>
                                {cat.name}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        ) : (
                        <Badge variant="outline" style={{ borderColor: category.color, color: category.color, backgroundColor: `${category.color}1A` }}>
                            {category.name}
                        </Badge>
                        )}
                    </TableCell>
                    <TableCell className="sticky right-0 bg-card">
                      <TransactionActions transaction={transaction} onEdit={onEdit} />
                    </TableCell>
                    </TableRow>
                );
                })}
            </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  );
}
