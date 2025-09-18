'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categories } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export function GoalsSettings() {
    const { toast } = useToast();
    const [goalsEnabled, setGoalsEnabled] = useState(false);
    const [sourceCategories, setSourceCategories] = useState<Record<string, boolean>>({});
    const [targetCategory, setTargetCategory] = useState<string | undefined>('7'); // Default to Savings

    const handleSourceCategoryChange = (categoryId: string, checked: boolean) => {
        setSourceCategories(prev => ({ ...prev, [categoryId]: checked }));
    };

    const handleSaveChanges = () => {
        // In a real app, you'd save these settings to a database
        toast({
            title: 'Goals Settings Saved',
            description: 'Your goals settings have been updated (simulated).',
        });
    };

    const potentialTargetCategories = categories.filter(c => c.name === 'Savings' || c.name === 'Debt' || c.id === targetCategory);


    return (
        <Card>
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle>Budget Goals</CardTitle>
                        <CardDescription>
                            Automatically allocate leftover budget from categories to a savings or debt goal at the end of the month.
                        </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Label htmlFor="goals-enabled" className="text-sm font-medium">
                            {goalsEnabled ? 'Enabled' : 'Disabled'}
                        </Label>
                        <Switch
                            id="goals-enabled"
                            checked={goalsEnabled}
                            onCheckedChange={setGoalsEnabled}
                        />
                    </div>
                </div>
            </CardHeader>
            {goalsEnabled && (
                <CardContent className="space-y-6 pt-4 border-t">
                    <div className="space-y-4">
                        <h4 className="font-medium text-base">Step 1: Choose Source Categories</h4>
                        <p className="text-sm text-muted-foreground">
                            Select the categories whose leftover budget you want to re-allocate.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {categories.map(category => (
                                <div key={category.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`source-${category.id}`}
                                        checked={!!sourceCategories[category.id]}
                                        onCheckedChange={(checked) => handleSourceCategoryChange(category.id, !!checked)}
                                    />
                                    <Label htmlFor={`source-${category.id}`} className="font-normal">
                                        {category.name}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-medium text-base">Step 2: Choose Target Category</h4>
                         <p className="text-sm text-muted-foreground">
                            This is where the excess funds will be transferred.
                        </p>
                        <Select value={targetCategory} onValueChange={setTargetCategory}>
                            <SelectTrigger className="w-full md:w-1/2">
                                <SelectValue placeholder="Select a target category" />
                            </SelectTrigger>
                            <SelectContent>
                                {potentialTargetCategories.map(cat => (
                                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex justify-end">
                        <Button onClick={handleSaveChanges}>Save Changes</Button>
                    </div>
                </CardContent>
            )}
        </Card>
    )
}
