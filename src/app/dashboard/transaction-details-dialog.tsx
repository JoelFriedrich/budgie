'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import type { Transaction } from '@/lib/types';

type TransactionDetailsDialogProps = {
  transaction: Transaction;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function TransactionDetailsDialog({
  transaction,
  open,
  onOpenChange,
}: TransactionDetailsDialogProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (typeof window === 'undefined') return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
          <DialogDescription>
            Viewing the complete details of this transaction.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 text-sm">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label className="text-muted-foreground">Vendor</Label>
            <span className="col-span-2 font-medium">{transaction.vendor}</span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label className="text-muted-foreground">Amount</Label>
            <span className="col-span-2 font-medium">
              {formatCurrency(transaction.amount)}
            </span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label className="text-muted-foreground">Date</Label>
            <span className="col-span-2 font-medium">
              {formatDate(transaction.date)}
            </span>
          </div>
          <div className="grid grid-cols-3 items-start gap-4">
            <Label className="text-muted-foreground mt-1">Description</Label>
            <p className="col-span-2">{transaction.description}</p>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
