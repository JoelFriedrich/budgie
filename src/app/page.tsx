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
    <path d="M14.5 13.5c-1.2 1.2-3.1 1.2-4.2 0-1-1-1.5-2.5-.9-3.8l-4.5-4.5c-.6-.6-.5-1.5.1-2.1s1.5-.7 2.1-.1l4.5 4.5c1.2-.6 2.8-.2 3.8.9 1.2 1.1 1.2 2.9 0 4.1z" />
    <path d="M12 11.5c.6-.6 1.5-.6 2.1 0" />
    <path d="M16 16c-1.5 1.5-4.1 1.5-5.6 0" />
    <path d="M20 20c-2 2-5 2-7 0" />
    <path d="M18 18c-1.5 1.5-4.1 1.5-5.6 0" />
    <path d="M22 22c-2.5 2.5-6.6 2.5-9.2 0" />
    <path d="M11 11l-6-6" />
    <path d="M9.5 12.5l-3-3" />
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
