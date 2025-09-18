import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const BudgieIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    <path
      stroke="currentColor"
      d="M5 4h5M4 5h7M3 6h9M3 7h10M3 8h10M3 9h9M4 10h7M5 11h5M6 12h3"
    />
    <path stroke="currentColor" d="M10 7v1M12 7v1" />
    <path stroke="#000" d="M12 7h1" />
  </svg>
);


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center shadow-2xl">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <BudgieIcon className="h-10 w-10" />
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
