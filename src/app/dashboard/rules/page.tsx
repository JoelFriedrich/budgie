'use client';

import { PageHeader } from '@/components/page-header';
import { rules as initialRules, categories } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Edit, Plus, Trash2, ChevronsUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { RuleDialog } from './rule-dialog';
import { format } from 'date-fns';
import { useState, useMemo } from 'react';
import type { Rule } from '@/lib/types';
import { cn } from '@/lib/utils';

type SortKey = 'condition' | 'category';

export default function RulesPage() {
    const [rules, setRules] = useState(initialRules);
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'ascending' | 'descending' } | null>(null);

    const getCategoryName = (categoryId: string) => {
        return categories.find(c => c.id === categoryId)?.name || 'Unknown';
    };

    const formatValue = (field: string, value: string | number) => {
        if (field === 'amount') {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value as number);
        }
        return value;
    }

    const sortedRules = useMemo(() => {
        let sortableRules = [...rules];
        if (sortConfig !== null) {
            sortableRules.sort((a, b) => {
                let aValue: string;
                let bValue: string;

                if (sortConfig.key === 'condition') {
                    aValue = a.conditions.map(c => `${c.field} ${c.operator} ${c.value}`).join(', ');
                    bValue = b.conditions.map(c => `${c.field} ${c.operator} ${c.value}`).join(', ');
                } else { // category
                    aValue = getCategoryName(a.categoryId);
                    bValue = getCategoryName(b.categoryId);
                }

                if (aValue < bValue) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableRules;
    }, [rules, sortConfig]);

    const requestSort = (key: SortKey) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key: SortKey) => {
        if (!sortConfig || sortConfig.key !== key) {
            return <ChevronsUpDown className="ml-2 h-4 w-4" />;
        }
        if (sortConfig.direction === 'ascending') {
            return <ArrowUp className="ml-2 h-4 w-4" />;
        }
        return <ArrowDown className="ml-2 h-4 w-4" />;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <PageHeader
                    title="Rules"
                    description="Automate transaction categorization with rules."
                />
                <RuleDialog>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        New Rule
                    </Button>
                </RuleDialog>
            </div>
            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>
                                        <Button variant="ghost" onClick={() => requestSort('condition')}>
                                            Condition
                                            {getSortIcon('condition')}
                                        </Button>
                                    </TableHead>
                                    <TableHead>
                                        <Button variant="ghost" onClick={() => requestSort('category')}>
                                            Assigned Category
                                            {getSortIcon('category')}
                                        </Button>
                                    </TableHead>
                                    <TableHead className="w-[150px] text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sortedRules.map((rule) => (
                                    <TableRow key={rule.id}>
                                        <TableCell>
                                            <div className="flex flex-col items-start gap-2">
                                                {rule.conditions.map((condition, index) => (
                                                    <div key={condition.id} className="flex flex-wrap items-center gap-2">
                                                        <span className="font-mono text-xs">{index === 0 ? 'IF' : 'AND'}</span>
                                                        <Badge variant="outline">{condition.field.replace(/_/g, ' ')}</Badge>
                                                        <Badge variant="secondary">{condition.operator.replace(/_/g, ' ')}</Badge>
                                                        <Badge variant="outline" className="font-mono">{formatValue(condition.field, condition.value)}</Badge>
                                                    </div>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                                <Badge>{getCategoryName(rule.categoryId)}</Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <RuleDialog rule={rule}>
                                                    <Button variant="ghost" size="icon">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </RuleDialog>
                                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}