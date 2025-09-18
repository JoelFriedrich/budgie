'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MailPlus, Loader2 } from 'lucide-react';
import { parseTransaction } from '@/ai/flows/parser';

export function EmailParser() {
  const [open, setOpen] = useState(false);
  const [emailBody, setEmailBody] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const { toast } = useToast();

  const handleParse = async () => {
    if (!emailBody.trim()) {
      toast({
        title: 'Error',
        description: 'Email body cannot be empty.',
        variant: 'destructive',
      });
      return;
    }

    setIsParsing(true);
    try {
      const parsed = await parseTransaction(emailBody);
      // In a real app, you would add this to your state/database.
      // For now, we'll just show a success toast.
      toast({
        title: 'Transaction Parsed (Simulated)',
        description: `Vendor: ${parsed.vendor}, Amount: $${parsed.amount.toFixed(2)}`,
      });
      setOpen(false);
      setEmailBody('');
    } catch (error) {
      console.error(error);
      toast({
        title: 'Parsing Failed',
        description:
          'Could not extract transaction details. Please check the email format.',
        variant: 'destructive',
      });
    } finally {
      setIsParsing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <MailPlus className="mr-2 h-4 w-4" />
          Parse Email
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Parse Transaction from Email</DialogTitle>
          <DialogDescription>
            Paste the body of a transaction receipt email below to add it to
            your transactions.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            placeholder="Paste your email content here..."
            className="h-48"
            value={emailBody}
            onChange={(e) => setEmailBody(e.target.value)}
            disabled={isParsing}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" disabled={isParsing}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleParse} disabled={isParsing}>
            {isParsing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Parsing...
              </>
            ) : (
              'Parse Transaction'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
