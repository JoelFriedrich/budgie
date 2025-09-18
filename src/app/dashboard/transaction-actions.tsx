'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, BookA } from 'lucide-react';
import type { Transaction } from '@/lib/types';
import { RuleDialog } from './rules/rule-dialog';
import { useState } from 'react';

type TransactionActionsProps = {
  transaction: Transaction;
  onEdit: (transactionId: string) => void;
};

export function TransactionActions({ transaction, onEdit }: TransactionActionsProps) {
  const [isRuleDialogOpen, setIsRuleDialogOpen] = useState(false);
  
  const ruleForTransaction = {
    field: 'vendor' as const,
    operator: 'equals' as const,
    value: transaction.vendor,
    categoryId: transaction.category || '',
  }

  const handleCreateRule = () => {
    setIsRuleDialogOpen(true);
  };

  return (
    <>
      <RuleDialog 
        rule={ruleForTransaction}
        open={isRuleDialogOpen}
        onOpenChange={setIsRuleDialogOpen}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onEdit(transaction.id)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCreateRule}>
            <BookA className="mr-2 h-4 w-4" />
            Create rule
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
