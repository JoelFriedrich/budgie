import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CopyButton } from './copy-button';

export default function SetupPage() {
    const userEmailAlias = 'budgetapp+username@email.com';

    return (
        <div className="space-y-6">
            <PageHeader
                title="Email Setup"
                description="Connect your email to automatically import transactions."
            />
            <Card>
                <CardHeader>
                    <CardTitle>Your Unique Budgie Email</CardTitle>
                    <CardDescription>
                        Set up a forwarding rule in your email client to send transaction receipts to this address.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>
                        Most banks and services send an email receipt for every transaction. By forwarding these to Budgie, you can automate your expense tracking.
                    </p>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                        <li>Go to your email provider's settings (e.g., Gmail, Outlook).</li>
                        <li>Find the "Forwarding and POP/IMAP" section.</li>
                        <li>Add a new forwarding address and paste the email below.</li>
                        <li>Create a filter to automatically forward emails from your bank or services (e.g., with subjects like "Your receipt" or "Transaction alert").</li>
                    </ol>
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input type="email" readOnly value={userEmailAlias} className="font-mono" />
                        <CopyButton textToCopy={userEmailAlias} />
                    </div>
                     <p className="text-xs text-muted-foreground pt-4">
                        Note: For this demo, this is an illustrative email address. Transaction parsing is simulated.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
