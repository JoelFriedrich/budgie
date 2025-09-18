import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center shadow-2xl">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Image src="/budgie-logo.png" alt="Budgie Logo" width={40} height={40} />
          </div>
          <CardTitle className="text-4xl font-bold">
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
          <Button asChild size="lg">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
