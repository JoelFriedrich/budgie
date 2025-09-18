import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center shadow-2xl">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Wallet className="h-8 w-8" />
          </div>
          <CardTitle className="font-headline text-4xl">
            Welcome to Budgie
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Your smart, automated budget companion.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-6">
            Forward your transaction emails, and Budgie handles the rest. We parse, categorize, and display your spending, all in one place.
          </p>
          <Button asChild size="lg" className="font-headline">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
