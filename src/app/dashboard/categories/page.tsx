import { PageHeader } from '@/components/page-header';
import { categories } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Circle, Edit, Plus, Trash2 } from 'lucide-react';
import { CategoryDialog } from './category-dialog';
import * as LucideIcons from 'lucide-react';

const Icon = ({ name, className }: { name: string, className?: string }) => {
    const LucideIcon = (LucideIcons as any)[name] as React.ElementType;
    if (LucideIcon) {
        return <LucideIcon className={className} />;
    }
    return <Circle className={className} />; // Fallback icon
};

export default function CategoriesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <PageHeader
                    title="Categories"
                    description="Manage your transaction categories."
                />
                <CategoryDialog>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        New Category
                    </Button>
                </CategoryDialog>
            </div>
            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[80px]">Icon</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead className="w-[150px] text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.map((category) => (
                                    <TableRow key={category.id}>
                                        <TableCell>
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: category.color }}>
                                                <Icon name={category.icon} className="h-5 w-5 text-white" />
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">{category.name}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <CategoryDialog category={category}>
                                                    <Button variant="ghost" size="icon">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </CategoryDialog>
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
