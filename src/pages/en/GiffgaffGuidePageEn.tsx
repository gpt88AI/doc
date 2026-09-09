import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'

const ACTIVATION = `1. Open https://www.giffgaff.com/activate
2. Enter the six-digit activation code
3. Verify your email and create a password
4. Select Pay as you go
5. Add the initial top-up or enter a 16-digit voucher
6. Complete the requested profile details
7. Confirm that a +44 number and balance are visible`

const KEEP_ALIVE = `Keep the number active:
1. Complete at least one valid balance-changing or usage action within each 180-day period
2. Send an SMS, use mobile data, make a normal call or add credit
3. Set a reminder around day 175 instead of waiting until the deadline
4. After the action, move the next reminder forward`

export default function GiffgaffGuidePageEn() {
  return (
    <DocPage
      path="/docs/guides/giffgaff-sim-guide"
      title="giffgaff SIM activation, number maintenance and eSIM guide"
      description="A practical guide to activating a UK giffgaff SIM, keeping the number active, checking the number, moving to eSIM and troubleshooting verification use cases."
      headings={[
        { id: 'why', text: 'Why people use giffgaff', level: 2 },
        { id: 'activate', text: 'Activation flow', level: 2 },
        { id: 'roaming', text: 'Roaming and cost boundaries', level: 2 },
        { id: 'keepalive', text: 'Keeping the number active', level: 2 },
        { id: 'account', text: 'Account and number operations', level: 2 },
        { id: 'esim', text: 'Move from physical SIM to eSIM', level: 2 },
        { id: 'issues', text: 'Common verification issues', level: 2 },
        { id: 'references', text: 'References', level: 2 },
      ]}
    >
      <Callout tone="info" title="Use it as a verification or backup number, not as your primary communication line">
        <p>
          giffgaff can be useful when you need a UK number for account verification and occasional SMS.
          Roaming data and voice use outside the UK may be expensive or unsuitable for everyday communication.
        </p>
      </Callout>

      <h2 id="why">Why people use giffgaff</h2>
      <p>
        The main use case is a low-maintenance UK number that can receive messages for international services.
        It is often used as a backup or verification number, while the primary phone plan remains separate.
      </p>

      <h2 id="activate">Activation flow</h2>
      <p>Prepare the six-digit code printed on the SIM, an accessible email address and a supported payment or top-up method.</p>
      <CodeBlock lang="text" filename="activation-flow" code={ACTIVATION} />
      <ol>
        <li>Open the official activation page and enter the code.</li>
        <li>Use a long-term email address for verification and account recovery.</li>
        <li>Select <strong>Pay as you go</strong> when you want a simple low-maintenance setup.</li>
        <li>Complete the initial top-up according to the current page instructions.</li>
        <li>Confirm that the account shows a +44 number and an available balance.</li>
      </ol>
      <Callout tone="warn" title="Follow the current official page">
        <p>Activation screens, payment options and supported regions can change. Use the current giffgaff flow as the source of truth.</p>
      </Callout>

      <h2 id="roaming">Roaming and cost boundaries</h2>
      <ul>
        <li>Check the current country-specific roaming rate before enabling data.</li>
        <li>Keep mobile data and data roaming disabled when the SIM is only used for SMS verification.</li>
        <li>Use the giffgaff app or official account page to review available plans and top-ups.</li>
        <li>Do not assume a UK SIM is a cost-effective substitute for a local primary plan.</li>
      </ul>

      <h2 id="keepalive">Keeping the number active</h2>
      <p>Long periods without activity can put the number and balance at risk. Use a reminder before the relevant deadline.</p>
      <CodeBlock lang="text" filename="keep-number-active" code={KEEP_ALIVE} />
      <Callout tone="tip" title="A simple maintenance routine">
        <p>Set a reminder around day 175, complete one valid action, confirm the account changed as expected, and schedule the next reminder.</p>
      </Callout>

      <h2 id="account">Account and number operations</h2>
      <ul>
        <li>Password recovery: use the official account recovery page rather than sharing credentials with a third party.</li>
        <li>Profile changes: use the account profile page and verify the change before closing the session.</li>
        <li>Number changes: check the current eligibility window and limits before requesting a new number.</li>
        <li>Keep a record of the number and account email in a private password manager.</li>
      </ul>

      <h2 id="esim">Move from physical SIM to eSIM</h2>
      <p>
        If the device supports eSIM, use the current official migration flow. Confirm Wi-Fi, device compatibility and account access before starting.
        The physical SIM may stop working after the eSIM is activated, so do not begin the migration without a recovery path.
      </p>

      <h2 id="issues">Common verification issues</h2>
      <h3>Official messages arrive, but a platform verification SMS does not</h3>
      <p>
        This often reflects the target platform&apos;s risk controls rather than a broken SIM. Check the target service&apos;s country, IP, proxy and number-history requirements.
      </p>
      <h3>Can this number be used for ChatGPT or Codex verification?</h3>
      <p>
        It may work for some services, but no phone number can guarantee acceptance. Results depend on the service&apos;s current policy, number history, region and network environment.
      </p>
      <h3>What is the lowest-maintenance routine?</h3>
      <p>Use the day-175 reminder routine, complete one valid action, confirm the balance or usage state, and keep the next reminder private and documented.</p>

      <h2 id="references">References</h2>
      <ul>
        <li><a href="https://www.giffgaff.com/activate" target="_blank" rel="noreferrer">Official giffgaff activation page</a></li>
        <li><a href="https://www.giffgaff.com/help/articles/how-do-i-get-an-esim-on-giffgaff" target="_blank" rel="noreferrer">Official eSIM guidance</a></li>
        <li><a href="https://www.giffgaff.com/boiler-plate/contact" target="_blank" rel="noreferrer">Official support</a></li>
      </ul>
    </DocPage>
  )
}
