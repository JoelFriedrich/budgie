'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import type { Category } from "@/lib/types"
import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

type BudgetDialogProps = {
    children: React.ReactNode;
    category: Category & { budget: number };
    spent: number;
}

export function BudgetDialog({ children, category, spent }: BudgetDialogProps) {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newBudget = parseFloat(formData.get('budget') as string);
        
        // Here you would typically call an API to update the budget
        // For this demo, we'll just show a toast
        toast({
            title: "Budget Updated",
            description: `Budget for ${category.name} set to $${newBudget.toFixed(2)} (simulated).`,
        });
        setOpen(false);
    }
    
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const progress = category.budget > 0 ? (spent / category.budget) * 100 : 0;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Set Budget for {category.name}</DialogTitle>
                        <DialogDescription>
                            Enter the total monthly budget for this category.
                        </DialogDescription>
                    </DialogHeader>

                     <div className="space-y-4 my-4">
                        <div className="space-y-2">
                           <div className="flex justify-between items-baseline">
                             <Label htmlFor="budget">Budget Amount</Label>
                             <span className={cn(
                                'text-sm font-medium',
                                spent > category.budget ? 'text-destructive' : 'text-green-600'
                             )}>
                               {formatCurrency(category.budget)}
                             </span>
                           </div>
                            <Input id="budget" name="budget" type="number" step="0.01" defaultValue={category.budget} className="col-span-3" required />
                        </div>
                        <div className="space-y-2">
                            <Label>Current Spending</Label>
                            <Progress value={progress} className="h-3" />
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>{formatCurrency(spent)} spent</span>
                                <span>{formatCurrency(Math.max(0, category.budget - spent))} {spent > category.budget ? 'over' : 'left'}</span>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                       <DialogClose asChild>
                         <Button variant="ghost">Cancel</Button>
                       </DialogClose>
                        <Button type="submit">Set Budget</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
