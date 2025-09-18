import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const BudgieIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12.5 8.5c-1.1.8-2.6.8-3.7 0" />
    <path d="M14.2 4.1c.3 1 .2 2.2-.5 3.1-1.1 1.4-3.1 1.5-4.4.4-1.3-1.1-1.4-3.1-.4-4.4.9-1.2 2.5-1.6 3.9-1.1" />
    <path d="M20.5 10.2c-1-2.1-3-3.7-5.3-4.1" />
    <path d="M3.5 10.2c1-2.1 3-3.7 5.3-4.1" />
    <path d="M7 11c-2.8 0-5 2.2-5 5s2.2 5 5 5h10c2.8 0 5-2.2 5-5s-2.2-5-5-5" />
    <path d="M7 11v5h10v-5" />
    <path d="M9 16v-2" />
    <path d="M15 16v-2" />
  </svg>
);


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center shadow-2xl">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <BudgieIcon className="h-8 w-8" />
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
