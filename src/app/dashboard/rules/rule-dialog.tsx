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

const fieldOperators: Record<Condition['field'], { value: Condition['operator']; label: string }[]> = {
    vendor: [
        { value: 'contains', label: 'contains' },
        { value: 'does_not_contain', label: 'does not contain' },
        { value: 'equals', label: 'equals' },
    ],
    description: [
        { value: 'contains', label: 'contains' },
        { value: 'does_not_contain', label: 'does not contain' },
        { value: 'equals', label: 'equals' },
    ],
    amount: [
        { value: 'equals', label: 'equals' },
        { value: 'greater_than', label: 'is greater than' },
        { value: 'less_than', label: 'is less than' },
    ],
    day_of_month: [
        { value: 'is', label: 'is' },
        { value: 'is_not', label: 'is not' },
    ],
};


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

    const handleConditionChange = (id: string, field: keyof Condition, value: any) => {
        setConditions(conditions.map(c => c.id === id ? { ...c, [field]: value } : c));
    };

    const handleFieldChange = (id: string, newField: Condition['field']) => {
        const newOperator = fieldOperators[newField][0].value;
        const newValue = newField === 'amount' || newField === 'day_of_month' ? 1 : '';
        setConditions(conditions.map(c => c.id === id ? { ...c, field: newField, operator: newOperator, value: newValue } : c));
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
            if (!isEditMode) {
                setConditions([defaultCondition]);
            }
        }
        setOpen(isOpen);
    }
    
    const renderValueInput = (condition: Condition) => {
        const isAmount = condition.field === 'amount';
        const isDayOfMonth = condition.field === 'day_of_month';

        if (isAmount || isDayOfMonth) {
            return (
                <Input 
                    name={`value-${condition.id}`} 
                    type={'number'}
                    step={isAmount ? '0.01' : '1'}
                    min={isDayOfMonth ? 1 : undefined}
                    max={isDayOfMonth ? 31 : undefined}
                    value={condition.value.toString()} 
                    onChange={(e) => handleConditionChange(condition.id, 'value', e.target.value)} 
                    placeholder={isDayOfMonth ? 'Day (1-31)' : "Value"}
                    required 
                />
            )
        }
        
        return (
             <Input 
                name={`value-${condition.id}`} 
                type="text"
                value={condition.value.toString()} 
                onChange={(e) => handleConditionChange(condition.id, 'value', e.target.value)} 
                placeholder="Value"
                required 
            />
        )
    }

    const content = (
      <DialogContent className="sm:max-w-2xl">
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
                           <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_2fr_auto]">
                               <Select name={`field-${condition.id}`} value={condition.field} onValueChange={(value: Condition['field']) => handleFieldChange(condition.id, value)}>
                                   <SelectTrigger>
                                       <SelectValue placeholder="Field" />
                                   </SelectTrigger>
                                   <SelectContent>
                                       <SelectItem value="vendor">Vendor</SelectItem>
                                       <SelectItem value="description">Description</SelectItem>
                                       <SelectItem value="amount">Amount</SelectItem>
                                       <SelectItem value="day_of_month">Day of Month</SelectItem>
                                   </SelectContent>
                               </Select>
                               <Select name={`operator-${condition.id}`} value={condition.operator} onValueChange={(value) => handleConditionChange(condition.id, 'operator', value)}>
                                   <SelectTrigger>
                                       <SelectValue placeholder="Operator" />
                                   </SelectTrigger>
                                   <SelectContent>
                                       {fieldOperators[condition.field].map(op => (
                                          <SelectItem key={op.value} value={op.value}>{op.label}</SelectItem>
                                       ))}
                                   </SelectContent>
                               </Select>
                                
                                {renderValueInput(condition)}
                                
                               {conditions.length > 1 && (
                                   <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleRemoveCondition(condition.id)}>
                                        <Trash2 className="h-4 w-4"/>
                                   </Button>
                               )}
                           </div>
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
