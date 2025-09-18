import { PageHeader } from '@/components/page-header';
import { rules, categories } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Edit, Plus, Trash2 } from 'lucide-react';
import { RuleDialog } from './rule-dialog';

export default function RulesPage() {
    const getCategoryName = (categoryId: string) => {
        return categories.find(c => c.id === categoryId)?.name || 'Unknown';
    };

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
                                    <TableHead>Condition</TableHead>
                                    <TableHead>Assigned Category</TableHead>
                                    <TableHead className="w-[150px] text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rules.map((rule) => (
                                    <TableRow key={rule.id}>
                                        <TableCell>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="font-mono text-xs">IF</span>
                                                <div className="flex flex-col gap-2">
                                                    {rule.conditions.map((condition, index) => (
                                                        <div key={condition.id} className="flex flex-wrap items-center gap-2">
                                                            {index > 0 && <span className="font-mono text-xs">AND</span>}
                                                            <Badge variant="outline">{condition.field}</Badge>
                                                            <Badge variant="secondary">{condition.operator.replace(/_/g, ' ')}</Badge>
                                                            <Badge variant="outline" className="font-mono">{condition.value}</Badge>
                                                        </div>
                                                    ))}
                                                </div>
                                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge>{getCategoryName(rule.categoryId)}</Badge>
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
