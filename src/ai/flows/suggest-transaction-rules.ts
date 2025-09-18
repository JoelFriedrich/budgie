'use server';

/**
 * @fileOverview Suggests rules for categorizing uncategorized transactions.
 *
 * - suggestTransactionRules - A function that suggests rules for categorizing uncategorized transactions.
 * - SuggestTransactionRulesInput - The input type for the suggestTransactionRules function.
 * - SuggestTransactionRulesOutput - The return type for the suggestTransactionRules function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTransactionRulesInputSchema = z.array(
  z.object({
    vendor: z.string().describe('The name of the vendor.'),
    description: z.string().describe('A description of the transaction.'),
  })
);

export type SuggestTransactionRulesInput = z.infer<
  typeof SuggestTransactionRulesInputSchema
>;

const SuggestTransactionRulesOutputSchema = z.array(
  z.object({
    vendor: z.string().describe('The name of the vendor.'),
    category: z.string().describe('The suggested category for the transaction.'),
  })
);

export type SuggestTransactionRulesOutput = z.infer<
  typeof SuggestTransactionRulesOutputSchema
>;

export async function suggestTransactionRules(
  input: SuggestTransactionRulesInput
): Promise<SuggestTransactionRulesOutput> {
  return suggestTransactionRulesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTransactionRulesPrompt',
  input: {schema: SuggestTransactionRulesInputSchema},
  output: {schema: SuggestTransactionRulesOutputSchema},
  prompt: `You are a personal finance expert. Given a list of uncategorized transactions, suggest a category for each transaction based on the vendor and description. Return the suggestions as a JSON array.

Transactions:
{{#each this}}
- Vendor: {{vendor}}, Description: {{description}}
{{/each}}
`,
});

const suggestTransactionRulesFlow = ai.defineFlow(
  {
    name: 'suggestTransactionRulesFlow',
    inputSchema: SuggestTransactionRulesInputSchema,
    outputSchema: SuggestTransactionRulesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
