'use client'
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

export function CopyButton({ textToCopy }: { textToCopy: string }) {
    const { toast } = useToast();

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy);
        toast({ title: "Copied to clipboard!" });
    }

    return (
        <Button variant="outline" size="icon" aria-label="Copy email address" onClick={handleCopy}>
            <Copy className="h-4 w-4" />
        </Button>
    )
}
