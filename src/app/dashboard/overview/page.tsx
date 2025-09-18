import { PageHeader } from '@/components/page-header';
import { categories, transactions } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { Category as CategoryType } from '@/lib/types';
import { BudgetDialog } from './budget-dialog';

export default function OverviewPage() {
    const transactionsByCategory = categories.map((category) => {
        const categoryTransactions = transactions.filter(
            (t) => t.category === category.id
        );
        const spent = categoryTransactions.reduce((sum, t) => sum + t.amount, 0);
        const budget = category.budget || 0;
        const progress = budget > 0 ? (spent / budget) * 100 : 0;
        return {
            ...category,
            spent,
            progress,
        };
    });

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <PageHeader
                    title="Budget Overview"
                    description="View and manage your category budgets."
                />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {transactionsByCategory.map((category) => (
                    <BudgetDialog key={category.id} category={category as CategoryType} spent={category.spent}>
                        <Card className="cursor-pointer hover:border-primary/50 transition-colors">
                            <CardContent className="p-4 space-y-2">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold">{category.name}</p>
                                    <div
                                        className={cn(
                                            'font-semibold',
                                            category.spent > (category.budget || 0)
                                                ? 'text-destructive'
                                                : 'text-green-600'
                                        )}
                                    >
                                        {formatCurrency(category.budget || 0)}
                                    </div>
                                </div>
                                <Progress value={category.progress} className="h-2" />
                                <div className="flex justify-between items-center text-sm text-muted-foreground">
                                    <span>{formatCurrency(category.spent)} spent</span>
                                    <span>
                                        {formatCurrency(Math.max(0, (category.budget || 0) - category.spent))}{' '}
                                        {category.spent > (category.budget || 0) ? 'over' : 'left'}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </BudgetDialog>
                ))}
            </div>
        </div>
    );
}
