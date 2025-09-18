'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Render a placeholder or nothing until the client is mounted
    // to avoid hydration mismatch.
    return (
      <div className="flex items-center space-x-2">
        <Switch id="theme-toggle" disabled />
        <Label htmlFor="theme-toggle">
          <div className="flex items-center gap-2">
            <Sun className="h-5 w-5" /> / <Moon className="h-5 w-5" />
          </div>
        </Label>
      </div>
    );
  }

  const isDarkMode = resolvedTheme === 'dark';

  const handleToggle = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-5 w-5 text-muted-foreground transition-colors" />
      <Switch
        id="theme-toggle"
        checked={isDarkMode}
        onCheckedChange={handleToggle}
        aria-label="Toggle dark mode"
      />
      <Moon className="h-5 w-5 text-muted-foreground transition-colors" />
    </div>
  );
}
