import { Wallet } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2 font-headline text-lg font-bold text-sidebar-foreground">
      <Wallet className="h-6 w-6" />
      <span>Budgie</span>
    </div>
  );
}
