'use client';

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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { categories } from '@/lib/data';
import type { Rule, Condition } from '@/lib/types';
import { PlusCircle, Trash2 } from 'lucide-react';
import React, { useState, createContext, useContext } from 'react';

type RuleDialogContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  rule?: Rule;
};

const RuleDialogContext = createContext<RuleDialogContextType | null>(null);

type RuleDialogProps = {
    children: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

const fieldOperators: Record<
  Condition['field'],
  { value: Condition['operator']; label: string }[]
> = {
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
};

function RuleDialog({ children, open: controlledOpen, onOpenChange: controlledOnOpenChange }: RuleDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = controlledOnOpenChange !== undefined ? controlledOnOpenChange : setInternalOpen;

  return (
    <RuleDialogContext.Provider value={{ open, setOpen }}>
      <Dialog open={open} onOpenChange={setOpen}>
        {children}
      </Dialog>
    </RuleDialogContext.Provider>
  );
}

function RuleDialogTrigger({ children }: { children: React.ReactNode }) {
  return <DialogTrigger asChild>{children}</DialogTrigger>;
}

function RuleDialogContent({ rule }: { rule?: Rule }) {
  const context = useContext(RuleDialogContext);
  if (!context) {
    throw new Error('RuleDialogContent must be used within a RuleDialog');
  }
  const { setOpen } = context;

  const { toast } = useToast();
  const isEditMode = !!rule?.id;

  const getInitialConditions = () => {
    if (rule?.conditions && rule.conditions.length > 0) {
      return rule.conditions;
    }
    return [
      {
        id: Date.now().toString(),
        field: 'vendor' as const,
        operator: 'contains' as const,
        value: rule?.conditions?.[0]?.value ?? '',
      },
    ];
  };

  const [conditions, setConditions] = useState<Condition[]>(
    getInitialConditions()
  );

  const handleAddCondition = () => {
    const newCondition: Condition = {
      id: Date.now().toString(),
      field: 'vendor',
      operator: 'contains',
      value: '',
    };
    setConditions([...conditions, newCondition]);
  };

  const handleRemoveCondition = (id: string) => {
    setConditions(conditions.filter((c) => c.id !== id));
  };

  const handleConditionChange = (
    id: string,
    field: keyof Condition,
    value: any
  ) => {
    setConditions(
      conditions.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleFieldChange = (id: string, newField: Condition['field']) => {
    const newOperator = fieldOperators[newField][0].value;
    let newValue: string | number;
    if (newField === 'amount') {
      newValue = 0;
    } else {
      newValue = '';
    }
    setConditions(
      conditions.map((c) =>
        c.id === id
          ? { ...c, field: newField, operator: newOperator, value: newValue }
          : c
      )
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: isEditMode ? 'Rule Updated' : 'Rule Created',
      description: 'Your changes have been saved (simulated).',
    });
    setOpen(false);
  };

  const renderValueInput = (condition: Condition) => {
    const isAmount = condition.field === 'amount';

    const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const numValue = parseFloat(e.target.value);
      handleConditionChange(
        condition.id,
        'value',
        isNaN(numValue) ? 0 : numValue
      );
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleConditionChange(condition.id, 'value', e.target.value);
    };

    return (
      <Input
        key={`${condition.id}-${condition.field}`}
        name={`value-${condition.id}`}
        type={isAmount ? 'number' : 'text'}
        step={isAmount ? '0.01' : undefined}
        value={condition.value}
        onChange={isAmount ? handleNumericChange : handleTextChange}
        placeholder={'Value'}
        required
      />
    );
  };

  return (
    <DialogContent className="sm:max-w-2xl">
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit Rule' : 'Create Rule'}</DialogTitle>
          <DialogDescription>
            Rules automatically categorize transactions that meet certain
            criteria.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="font-mono text-sm font-bold">IF</p>
          <div className="space-y-4 rounded-md border p-4">
            {conditions.map((condition, index) => (
              <div key={condition.id} className="space-y-2">
                {index > 0 && (
                  <p className="font-mono text-sm font-bold text-center">AND</p>
                )}
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_2fr_auto]">
                  <Select
                    name={`field-${condition.id}`}
                    value={condition.field}
                    onValueChange={(value: Condition['field']) =>
                      handleFieldChange(condition.id, value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vendor">Vendor</SelectItem>
                      <SelectItem value="description">Description</SelectItem>
                      <SelectItem value="amount">Amount</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    name={`operator-${condition.id}`}
                    value={condition.operator}
                    onValueChange={(value) =>
                      handleConditionChange(condition.id, 'operator', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Operator" />
                    </SelectTrigger>
                    <SelectContent>
                      {fieldOperators[condition.field].map((op) => (
                        <SelectItem key={op.value} value={op.value}>
                          {op.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {renderValueInput(condition)}

                  {conditions.length > 1 ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleRemoveCondition(condition.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddCondition}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Condition
            </Button>
          </div>
          <p className="font-mono text-sm font-bold">THEN ASSIGN CATEGORY</p>
          <div className="rounded-md border p-4">
            <Select name="categoryId" defaultValue={rule?.categoryId} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">Save rule</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}


RuleDialog.Trigger = RuleDialogTrigger;
RuleDialog.Content = RuleDialogContent;

export { RuleDialog };
