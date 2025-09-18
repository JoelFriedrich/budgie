'use server';
/**
 * @fileOverview A transaction parsing AI agent.
 *
 * - parseTransaction - A function that handles parsing transaction emails.
 * - ParsedTransaction - The return type for the parseTransaction function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ParsedTransactionSchema = z.object({
  vendor: z.string().describe('The vendor or merchant of the transaction.'),
  amount: z.number().describe('The amount of the transaction.'),
  description: z.string().describe('A brief description of the transaction.'),
  date: z.string().describe('The date of the transaction in ISO 8601 format (YYYY-MM-DD).'),
});
export type ParsedTransaction = z.infer<typeof ParsedTransactionSchema>;


export async function parseTransaction(emailBody: string): Promise<ParsedTransaction> {
  return transactionParserFlow(emailBody);
}

const prompt = ai.definePrompt({
  name: 'transactionParserPrompt',
  input: { schema: z.string() },
  output: { schema: ParsedTransactionSchema },
  prompt: `You are an expert at parsing transaction receipts and emails.
Extract the transaction details from the following email body.
Today's date is ${new Date().toDateString()}. If the email does not specify a year, assume it's the current year.

Email Body:
{{{input}}}
`,
});

const transactionParserFlow = ai.defineFlow(
  {
    name: 'transactionParserFlow',
    inputSchema: z.string(),
    outputSchema: ParsedTransactionSchema,
  },
  async (emailBody) => {
    const { output } = await prompt(emailBody);
    return output!;
  }
);
