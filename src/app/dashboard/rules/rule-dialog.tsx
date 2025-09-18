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
import { CalendarIcon, PlusCircle, Trash2 } from "lucide-react"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from 'date-fns';

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
    date: [
        { value: 'date_is', label: 'is on' },
        { value: 'date_is_before', label: 'is before' },
        { value: 'date_is_after', label: 'is after' },
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
        const newValue = newField === 'date' ? new Date().toISOString() : newField === 'amount' ? 0 : '';
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
            setConditions(rule?.conditions || [defaultCondition]);
        }
        setOpen(isOpen);
    }
    
    const renderValueInput = (condition: Condition) => {
        if (condition.field === 'date') {
            return (
                 <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !condition.value && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {condition.value ? format(new Date(condition.value as string), "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={new Date(condition.value as string)}
                            onSelect={(date) => handleConditionChange(condition.id, 'value', date?.toISOString() || '')}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            )
        }
        
        const isAmount = condition.field === 'amount';

        return (
            <Input 
                name={`value-${condition.id}`} 
                type={isAmount ? 'number' : 'text'}
                step={isAmount ? '0.01' : undefined}
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
                           <div className="grid grid-cols-1 gap-2 sm:grid-cols-4">
                               <Select name={`field-${condition.id}`} value={condition.field} onValueChange={(value: Condition['field']) => handleFieldChange(condition.id, value)}>
                                   <SelectTrigger>
                                       <SelectValue placeholder="Field" />
                                   </SelectTrigger>
                                   <SelectContent>
                                       <SelectItem value="vendor">Vendor</SelectItem>
                                       <SelectItem value="description">Description</SelectItem>
                                       <SelectItem value="amount">Amount</SelectItem>
                                       <SelectItem value="date">Date</SelectItem>
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
                                <div className="col-span-2">
                                  {renderValueInput(condition)}
                                </div>
                           </div>
                           <div className="flex items-center justify-end">
                               {conditions.length > 1 && (
                                   <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleRemoveCondition(condition.id)}>
                                        <Trash2 className="mr-2 h-4 w-4"/>
                                        Remove
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
