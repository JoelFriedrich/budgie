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

type CategoryDialogProps = {
    children: React.ReactNode;
    category?: Category;
}

export function CategoryDialog({ children, category }: CategoryDialogProps) {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const isEditMode = !!category;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        toast({
            title: isEditMode ? "Category Updated" : "Category Created",
            description: "Your changes have been saved (simulated).",
        });
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{isEditMode ? 'Edit Category' : 'Create Category'}</DialogTitle>
                        <DialogDescription>
                            {isEditMode ? 'Make changes to your category here.' : 'Add a new category to track your expenses.'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" defaultValue={category?.name || ''} className="col-span-3" required />
                        </div>
                    </div>
                    <DialogFooter>
                       <DialogClose asChild>
                         <Button variant="ghost">Cancel</Button>
                       </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
