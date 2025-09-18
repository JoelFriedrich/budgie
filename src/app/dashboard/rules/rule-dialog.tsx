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
import type { Rule, Condition } from "@/lib/types"
import { PlusCircle, Trash2 } from "lucide-react"
import { useState } from "react"

type RuleDialogProps = {
    children: React.ReactNode;
    rule?: Rule;
}

const defaultCondition: Condition = { id: Date.now().toString(), field: 'vendor', operator: 'contains', value: '' };

export function RuleDialog({ children, rule }: RuleDialogProps) {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const isEditMode = !!rule;
    const [conditions, setConditions] = useState<Condition[]>(rule?.conditions || [defaultCondition]);

    const handleAddCondition = () => {
        setConditions([...conditions, { ...defaultCondition, id: Date.now().toString() }]);
    };

    const handleRemoveCondition = (id: string) => {
        setConditions(conditions.filter(c => c.id !== id));
    };

    const handleConditionChange = (id: string, field: keyof Condition, value: string) => {
        setConditions(conditions.map(c => c.id === id ? { ...c, [field]: value } : c));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        toast({
            title: isEditMode ? "Rule Updated" : "Rule Created",
            description: "Your changes have been saved (simulated).",
        });
        setOpen(false);
    }

    const onOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
             // Reset conditions when closing if not editing an existing rule
            setConditions(rule?.conditions || [defaultCondition]);
        }
        setOpen(isOpen);
    }

    const content = (
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
                  <div className="space-y-4 rounded-md border p-4">
                     {conditions.map((condition, index) => (
                        <div key={condition.id} className="space-y-2">
                           {index > 0 && <p className="font-mono text-sm font-bold text-center">AND</p>}
                           <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                               <Select name={`field-${condition.id}`} value={condition.field} onValueChange={(value) => handleConditionChange(condition.id, 'field', value)}>
                                   <SelectTrigger>
                                       <SelectValue placeholder="Field" />
                                   </SelectTrigger>
                                   <SelectContent>
                                       <SelectItem value="vendor">Vendor</SelectItem>
                                       <SelectItem value="description">Description</SelectItem>
                                       <SelectItem value="amount">Amount</SelectItem>
                                   </SelectContent>
                               </Select>
                               <Select name={`operator-${condition.id}`} value={condition.operator} onValueChange={(value) => handleConditionChange(condition.id, 'operator', value)}>
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
                                <Input name={`value-${condition.id}`} value={condition.value.toString()} onChange={(e) => handleConditionChange(condition.id, 'value', e.target.value)} placeholder="Value" required />
                           </div>
                           {conditions.length > 1 && (
                               <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleRemoveCondition(condition.id)}>
                                    <Trash2 className="mr-2 h-4 w-4"/>
                                    Remove Condition
                               </Button>
                           )}
                        </div>
                     ))}
                     <Button type="button" variant="outline" size="sm" onClick={handleAddCondition}>
                        <PlusCircle className="mr-2 h-4 w-4"/>
                        Add Condition
                     </Button>
                  </div>
                  <p className="font-mono text-sm font-bold">THEN ASSIGN CATEGORY</p>
                  <div className="rounded-md border p-4">
                      <Select name="categoryId" defaultValue={rule?.categoryId}>
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
    );

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            {content}
        </Dialog>
    )
}
