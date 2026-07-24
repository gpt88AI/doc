import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { localizePath } from '../../lib/locale'

const ACCOUNTING_FLOW = `Payment currency
  |- Pay CNY: CNY 1 -> 1.00 RMB balance
  \`- Pay USD: USD payment -> currency conversion -> RMB balance

Model request
  official API usage (USD) -> selected group multiplier -> RMB deduction

Actual deduction (RMB) = official usage (USD) x selected group multiplier`

const CALCULATION_EXAMPLE = `Illustrative exchange rate: 1 USD = 7.20 CNY
(Only to show the calculation; it is not a live-rate promise.)

Top-up: pay 10 USD
Conversion: 10 x 7.20 = 72 CNY
Credit: about 72.00 RMB balance (use the final order as the source of truth)

Request: 0.10 USD official usage, group multiplier 2.0
Deduction: 0.10 x 2.0 = 0.20 CNY
Remaining: 72.00 - 0.20 = 71.80 CNY`

const REVIEW_TEMPLATE = `Cost review:
- Payment currency: CNY / USD
- Final top-up credit: ________ RMB balance
- Model ID: ________
- Group: ________
- Group multiplier: ________
- Official usage (USD): ________
- Expected deduction (RMB): usage x multiplier = ________
- Actual console deduction (RMB): ________
- Difference or open question: ________

Conclusion: use the final top-up order, current model/group pages,
and the account usage record as the evidence.`

function SimpleTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: React.ReactNode[][]
}) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-white/10">
      <table className="w-full min-w-[48rem] text-left text-sm">
        <thead className="bg-white/[0.04] text-[11px] uppercase tracking-wider text-ink-400">
          <tr>
            {headers.map(header => <th key={header} className="px-4 py-3 font-medium">{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={`border-t border-white/10 align-top${rowIndex % 2 === 1 ? ' bg-white/[0.02]' : ''}`}>
              {row.map((cell, cellIndex) => <td key={cellIndex} className="px-4 py-3 text-[13px] leading-6 text-ink-200">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function BillingUnitsGuidePageEn() {
  return (
    <DocPage
      path="/docs/guides/billing-units"
      title="Why 1 RMB Is 1 Balance Unit: RMB Settlement and USD Top-Up Guide"
      description="A beginner-friendly explanation of RMB account balance, USD top-up conversion, official API usage, and group multipliers for Chinese and international gpt88.cc users."
      headings={[
        { id: 'summary', text: 'The one sentence to remember', level: 2 },
        { id: 'audience', text: 'Audience and definition of done', level: 2 },
        { id: 'units', text: 'Separate the four accounting units', level: 2 },
        { id: 'why-one-to-one', text: 'Why the platform uses 1:1', level: 2 },
        { id: 'top-up', text: 'How top-ups are converted', level: 2 },
        { id: 'settlement', text: 'How model requests are settled', level: 2 },
        { id: 'example', text: 'A complete calculation example', level: 2 },
        { id: 'where-to-check', text: 'Where to verify each value', level: 2 },
        { id: 'shortest-path', text: 'The shortest successful path', level: 2 },
        { id: 'decisions', text: 'Choosing a model and group', level: 2 },
        { id: 'iteration', text: 'Cost review and iteration', level: 2 },
        { id: 'troubleshooting', text: 'Common questions and recovery', level: 2 },
        { id: 'practice', text: 'Practice task and acceptance checklist', level: 2 },
        { id: 'template', text: 'Reusable cost-review template', level: 2 },
        { id: 'evidence', text: 'Evidence and pricing boundaries', level: 2 },
      ]}
    >
      <Callout tone="danger" title="Important: 1 RMB balance is not 1 USD">
        <p>
          <strong>“RMB 1 = 1.00 balance” describes an internal RMB accounting relationship, not an exchange rate.</strong>
          It does not mean CNY 1 equals USD 1, and it does not mean a USD 1 payment produces only CNY 1 of balance.
        </p>
        <p>
          If the interface shows a <code>$</code> symbol, use the current billing explanation, top-up order, and account usage record to identify the real unit. In this settlement setup, the account balance and deductions are understood in RMB; a USD payment is converted before it is credited as RMB balance.
        </p>
      </Callout>

      <h2 id="summary">The one sentence to remember</h2>
      <p>
        There are three different layers: the currency you use to pay, the RMB balance used for account deductions, and the official USD usage used to calculate upstream model cost. The platform converts these into a simple RMB balance system so users can see and control spending.
      </p>
      <CodeBlock lang="text" filename="billing-map" code={ACCOUNTING_FLOW} />
      <p>
        The 1:1 rule applies only to <strong>RMB top-up amount and RMB account balance</strong>: CNY 1 tops up 1.00 RMB balance. A USD top-up is converted to CNY first and then credited.
      </p>

      <h2 id="audience">Audience and definition of done</h2>
      <p>This guide is for Chinese users who see USD-style pricing while settling in RMB, and international users who pay in USD but need to understand a RMB-settled account.</p>
      <p>At the end, you should be able to make one small top-up and one minimal model request, then verify the top-up credit, group multiplier, official usage, and actual RMB deduction from records rather than guessing from a currency symbol.</p>
      <ul>
        <li>Understand that payment currency and account settlement unit are different concepts.</li>
        <li>Explain “CNY 1 top-up = 1.00 balance” without saying “CNY 1 = USD 1.”</li>
        <li>Estimate a request cost from official usage and the selected group multiplier.</li>
        <li>Know where to verify public model information and account-specific billing.</li>
      </ul>

      <h2 id="units">Separate the four accounting units</h2>
      <SimpleTable
        headers={['Unit / layer', 'What it means', 'Where to verify it']}
        rows={[
          ['Payment currency', 'The CNY, USD, or other currency used at checkout.', 'Payment page, order amount, and payment provider.'],
          ['Account balance', 'The RMB balance used for deductions, such as 72.00 RMB balance.', 'Console balance, top-up order, and usage record.'],
          ['Official API usage', 'Upstream usage expressed in USD, often related to tokens or media usage.', 'Request usage, billing detail, and model pricing notes.'],
          ['Group multiplier', 'The coefficient that converts official USD usage into RMB deduction.', 'The group selector on the API Keys page.'],
        ]}
      />
      <p>These values cannot be collapsed into one number. A public model price does not necessarily equal the final deduction for your account because model, input/output usage, selected group, and permissions also matter.</p>

      <h2 id="why-one-to-one">Why the platform uses 1:1</h2>
      <p>
        This is a virtual balance design that simplifies accounting and user experience. The platform needs one internal unit, while users can reason more easily about “RMB 100 balance and RMB 0.05 deducted” than about points, virtual dollars, and multiple conversion layers.
      </p>
      <SimpleTable
        headers={['Common misunderstanding', 'Correct interpretation']}
        rows={[
          ['CNY 1 = USD 1', 'Wrong. 1.00 is a balance amount, not a USD amount.'],
          ['USD 1 payment = 1.00 balance', 'Wrong. The USD payment is converted to RMB before crediting.'],
          ['A $ symbol proves the balance is USD', 'Not necessarily. Use billing text, orders, and usage records.'],
          ['The Model Square price is the final deduction', 'Not necessarily. The account’s model, group, usage, and console record are authoritative.'],
        ]}
      />

      <h2 id="top-up">How top-ups are converted</h2>
      <ol>
        <li><strong>CNY top-up:</strong> CNY 1 adds 1.00 RMB balance; CNY 100 adds 100.00 RMB balance.</li>
        <li><strong>USD top-up:</strong> the payment is converted to RMB using the rule shown by the checkout, payment provider, or platform at that time, then credited as RMB balance.</li>
        <li><strong>Use the order as the source of truth:</strong> fees, exchange-rate timing, payment-channel rules, and promotions can affect the final credit. Do not reverse-engineer it from one assumed fixed rate.</li>
      </ol>
      <Callout tone="info" title="The USD example is illustrative, not a live exchange rate">
        <p>Assume the checkout shows an illustrative rate of 1 USD = 7.20 CNY. A 10 USD payment would theoretically convert to 72 CNY. The final credited amount still comes from the top-up order; this guide does not promise a live rate, fee, or fixed payout.</p>
      </Callout>

      <h2 id="settlement">How model requests are settled</h2>
      <p>Upstream model providers commonly express API usage in USD. The platform converts that usage into an RMB deduction using the selected group multiplier:</p>
      <CodeBlock lang="text" filename="billing-formula" code="Actual deduction (RMB) = official usage (USD) x selected group multiplier" />
      <SimpleTable
        headers={['Group multiplier', 'Official usage', 'Account deduction', 'Meaning']}
        rows={[
          ['2.0', '$1.00', 'CNY 2.00', 'Each $1 of official usage deducts CNY 2.00.'],
          ['0.5', '$1.00', 'CNY 0.50', 'Each $1 of official usage deducts CNY 0.50.'],
          ['2.0', '$0.10', 'CNY 0.20', 'The deduction scales with official usage.'],
        ]}
      />
      <p>Lower multipliers generally mean lower unit cost, but groups can differ in upstream route, stability, model access, or account permissions. Choose with latency, success rate, capability, and budget in mind, not by multiplier alone.</p>

      <h2 id="example">A complete calculation example</h2>
      <CodeBlock lang="text" filename="billing-example" code={CALCULATION_EXAMPLE} />
      <p>This example demonstrates the order of operations. It does not fix your exchange rate or any model’s live price. Replace 7.20, 0.10, and 2.0 with the current top-up order, request usage, and API Keys group selector values.</p>

      <h2 id="where-to-check">Where to verify each value</h2>
      <SimpleTable
        headers={['Question', 'First place to check', 'Do not rely on only']}
        rows={[
          ['Which models exist and how public prices compare', <a key="square" href="https://agent.gpt88.cc/model-square" target="_blank" rel="noreferrer">Model Square</a>, 'Search snippets or old screenshots.'],
          ['Public packages, prices, and top-up entry', <a key="pricing" href="https://gpt88.cc/pricing" target="_blank" rel="noreferrer">Website pricing page</a>, 'A public page as an account-specific billing promise.'],
          ['Current group multiplier and route', <><Link to={localizePath('/docs/auth/#billing', 'en')}>Auth & Billing</Link> and the API Keys page</>, 'A model name alone.'],
          ['What one request actually deducted', 'Console usage, billing, and balance records', 'A hand calculation from public pricing.'],
        ]}
      />
      <Callout tone="warn" title="Dynamic data has priority">
        <p>Public model and pricing pages explain the product and pricing vocabulary. Your account’s available models, groups, permissions, and final deduction come from the live console, API Keys page, and usage record.</p>
      </Callout>

      <h2 id="shortest-path">The shortest successful path</h2>
      <p>Do not start with a batch job or an expensive long-context request. First complete one small, auditable request:</p>
      <ol>
        <li><strong>Prepare:</strong> have an account, an API key, and a small balance you are comfortable testing.</li>
        <li><strong>Verify the credit:</strong> record payment currency, order amount, and final RMB balance after the top-up.</li>
        <li><strong>Choose a group:</strong> record the group name, multiplier, and route notes from the API Keys page.</li>
        <li><strong>Choose a model:</strong> use the <a href="https://agent.gpt88.cc/model-square" target="_blank" rel="noreferrer">Model Square</a> or <a href="https://gpt88.cc/pricing" target="_blank" rel="noreferrer">website pricing page</a>, then confirm current availability in the console.</li>
        <li><strong>Send a minimal request:</strong> use short input, low concurrency, and one clear task.</li>
        <li><strong>Review the result:</strong> record model, group, official USD usage, before/after balance, and actual RMB deduction.</li>
      </ol>
      <p>After the last step, you have a personal cost baseline. Model and group comparisons become evidence-based instead of being driven by a currency symbol.</p>

      <h2 id="decisions">Choosing a model and group</h2>
      <SimpleTable
        headers={['Goal', 'Start with', 'Tradeoff']}
        rows={[
          ['Verify access for the first time', 'A currently available model and one minimal request.', 'A successful smoke test does not prove complex-task quality.'],
          ['Minimize unit cost', 'Compare current group multipliers and input/output usage.', 'A lower multiplier does not guarantee lower latency or higher stability.'],
          ['Prioritize reliability', 'Use the route that fits your environment and test a small sample first.', 'The unit deduction may be higher.'],
          ['Compare model capability', 'Hold input, output length, and group constant.', 'Different context and output lengths distort price comparisons.'],
          ['Reconcile the final bill', 'Use console usage and balance records.', 'A public price page cannot replace account detail.'],
        ]}
      />

      <h2 id="iteration">Cost review and iteration</h2>
      <p>When a cost looks unexpected, use a one-variable-at-a-time loop:</p>
      <ol>
        <li>Inspect the console record: model, group, input/output usage, deduction, and time.</li>
        <li>Identify the largest difference: conversion, usage, multiplier, or repeated retries.</li>
        <li>Change one variable only: for example, keep the model fixed and change the group.</li>
        <li>Repeat the same small request and compare it with the prior result.</li>
        <li>Save a validated combination; do not scale an unexplained result into a batch workflow.</li>
      </ol>
      <Callout tone="info" title="Validate before scaling">
        <p>Batch work, long context, images, video, and multi-turn tool loops can amplify both cost and failure impact. Confirm billing, output quality, and route stability with a small sample first.</p>
      </Callout>

      <h2 id="troubleshooting">Common questions and recovery</h2>
      <SimpleTable
        headers={['Symptom', 'Likely cause', 'Recovery']}
        rows={[
          ['I paid USD 1 and expected 1.00 balance.', 'The balance unit was mistaken for USD.', 'Check the final RMB credit in the top-up order. Do not assume a USD 1:1 rule.'],
          ['The interface shows $ but docs say RMB settlement.', 'A display symbol and accounting unit are different.', 'Use billing text, order details, and usage records; keep the order ID.'],
          ['My calculation differs from the actual deduction.', 'Group, input/output usage, model version, or retries differ.', 'Fix the model and group, then inspect one complete successful request.'],
          ['The Model Square lists a model but my API cannot use it.', 'Availability, group access, or route permissions differ by account.', 'Use the live console and test a currently available model.'],
          ['I do not know whether a failed request was charged.', 'Failed, retried, async, image, and video flows can have different accounting behavior.', 'Do not assume a refund or charge. Inspect usage detail and provide the request ID when asking support.'],
          ['The balance changed unexpectedly.', 'A top-up may be processing, or concurrent requests / retries occurred.', 'Stop scaling, then reconcile order status, request times, logs, and usage detail.'],
        ]}
      />

      <h2 id="practice">Practice task and acceptance checklist</h2>
      <p>Use one low-risk text request for this exercise. Avoid batch images, video, and very long context:</p>
      <ol>
        <li>Record the balance before top-up and the payment currency.</li>
        <li>Record the final RMB balance after top-up.</li>
        <li>Record model ID, group, and group multiplier.</li>
        <li>Send one fixed-size minimal request.</li>
        <li>Record official USD usage and actual RMB deduction.</li>
        <li>Apply the formula and flag any difference.</li>
      </ol>
      <ul>
        <li>□ I did not compare CNY and USD as if their numeric values were 1:1.</li>
        <li>□ I understand that USD top-ups are converted into RMB balance.</li>
        <li>□ I recorded the current group multiplier from the API Keys page.</li>
        <li>□ I reconciled the actual deduction with console usage records.</li>
        <li>□ I completed a small test before batch usage.</li>
      </ul>

      <h2 id="template">Reusable cost-review template</h2>
      <CodeBlock lang="text" filename="billing-review-template" code={REVIEW_TEMPLATE} />
      <p>Store this in a project document, billing review, or integration acceptance checklist. It does not replace the console; it makes each comparison use the same inputs and evidence.</p>

      <h2 id="evidence">Evidence and pricing boundaries</h2>
      <p>This guide explains the public billing vocabulary: CNY 1 top-up produces 1.00 balance, USD top-ups are converted to RMB before crediting, and model requests deduct RMB based on official USD usage multiplied by the selected group multiplier. Model prices, exchange rates, fees, availability, permissions, rate limits, and failed-request handling can change with the payment channel, upstream provider, account, and console configuration.</p>
      <p>Use the formulas for understanding and estimation. For actual operations, use the top-up order, <a href="https://agent.gpt88.cc/model-square" target="_blank" rel="noreferrer">Model Square</a>, <a href="https://gpt88.cc/pricing" target="_blank" rel="noreferrer">website pricing page</a>, API Keys page, and account usage record as evidence. For a billing investigation, keep the order ID, request ID, model, group, and request time.</p>
      <Callout tone="info" title="Related documentation">
        <p>Use the <a href="https://agent.gpt88.cc/model-square" target="_blank" rel="noreferrer">Model Square</a> for model discovery, the <a href="https://gpt88.cc/pricing" target="_blank" rel="noreferrer">website pricing page</a> for public pricing context, and <Link to={localizePath('/docs/auth/', 'en')}>Auth & Billing</Link> plus the console for your account’s balance and usage.</p>
      </Callout>
    </DocPage>
  )
}
