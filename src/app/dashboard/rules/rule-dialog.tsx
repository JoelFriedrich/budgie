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
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { categories } from "@/lib/data"
import type { Rule } from "@/lib/types"
import { useState } from "react"

type RuleDialogProps = {
    children: React.ReactNode;
    rule?: Rule;
}

export function RuleDialog({ children, rule }: RuleDialogProps) {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const isEditMode = !!rule;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        toast({
            title: isEditMode ? "Rule Updated" : "Rule Created",
            description: "Your changes have been saved (simulated).",
        });
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{isEditMode ? 'Edit Rule' : 'Create Rule'}</DialogTitle>
                        <DialogDescription>
                            Rules automatically categorize transactions that meet certain criteria.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <p className="font-mono text-sm font-bold">IF</p>
                        <div className="grid grid-cols-1 gap-2 rounded-md border p-4 sm:grid-cols-3">
                            <Select defaultValue={rule?.field || 'vendor'}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Field" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="vendor">Vendor</SelectItem>
                                    <SelectItem value="description">Description</SelectItem>
                                    <SelectItem value="amount">Amount</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select defaultValue={rule?.operator || 'contains'}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Operator" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="contains">contains</SelectItem>
                                    <SelectItem value="equals">equals</SelectItem>
                                    <SelectItem value="greater_than">is greater than</SelectItem>
                                    <SelectItem value="less_than">is less than</SelectItem>
                                </SelectContent>
                            </Select>
                             <Input defaultValue={rule?.value || ''} placeholder="Value" required />
                        </div>
                        <p className="font-mono text-sm font-bold">THEN ASSIGN CATEGORY</p>
                        <div className="rounded-md border p-4">
                            <Select defaultValue={rule?.categoryId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map(cat => (
                                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="ghost">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save rule</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
