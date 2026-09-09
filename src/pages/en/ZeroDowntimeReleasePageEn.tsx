import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { Callout } from '../../components/ui/Callout'

const IDEA = `1. Keep the old version serving traffic
2. Deploy the new version to the idle environment
3. Switch traffic only after health and smoke checks pass
4. Keep the old version for a rollback window`

const FLOW = `1. Identify the active slot
2. Deploy the new version to the idle slot
3. Start the idle container
4. Wait for /ready to return 200
5. Run an internal smoke test
6. Point the proxy upstream to the idle slot
7. Reload the proxy
8. Verify /ready, /health, and core pages through the public hostname
9. Keep the old slot until the observation window ends`

const CHECKS = `Health checks:
- /health: process and dependency liveness
- /ready: instance is prepared for real traffic
- Public smoke test: proxy, TLS, static assets, auth, database, and core API`

const ROLLBACK = `1. If traffic has not switched, stop the new slot
2. If traffic has switched, point the upstream back to the old slot
3. Reload the reverse proxy
4. Verify public /ready, /health, and core flows
5. Restore the previous static-resource directory when needed
6. Record the cause before attempting the same release again`

export default function ZeroDowntimeReleasePageEn() {
  return (
    <DocPage
      path="/docs/guides/zero-downtime-release"
      title="Zero-Downtime Blue-Green Release Guide"
      description="Deploy a new version beside the active version, verify the real public path, switch traffic safely, and keep a fast rollback path."
      headings={[
        { id: 'idea', text: 'The core idea', level: 2 },
        { id: 'precheck', text: 'Pre-release checks', level: 2 },
        { id: 'flow', text: 'Release flow', level: 2 },
        { id: 'proxy', text: 'Switching the proxy', level: 2 },
        { id: 'frontend', text: 'Frontend-only updates', level: 2 },
        { id: 'health', text: 'Health-check design', level: 2 },
        { id: 'rollback', text: 'Rollback', level: 2 },
        { id: 'risks', text: 'High-risk cases', level: 2 },
        { id: 'observe', text: 'Post-release observation', level: 2 },
      ]}
    >
      <Callout tone="info" title="Blue-green release is controlled risk, not just faster deployment">
        <p>
          Keep the old version live while the new version is prepared in an idle slot. Move traffic only
          after the new slot passes checks, and preserve the old slot long enough to reverse the decision.
        </p>
      </Callout>

      <h2 id="idea">The core idea</h2>
      <CodeBlock lang="text" filename="blue-green-idea" code={IDEA} />
      <p>
        A typical path is DNS or CDN, then the reverse proxy, then one active upstream. The active slot may
        be blue while green is prepared, or the other way around. The proxy should switch the upstream without
        stopping the old container first.
      </p>

      <h2 id="precheck">Pre-release checks</h2>
      <ul>
        <li>Record the branch, commit, image tag, and build artifact.</li>
        <li>Confirm no important uncommitted change is being released accidentally.</li>
        <li>Keep keys, environment files, certificates, and private documents out of Git.</li>
        <li>Confirm database migrations are backward compatible with both versions.</li>
        <li>Provide a real <code>/health</code> or <code>/ready</code> endpoint.</li>
        <li>Verify that the proxy can reload without interrupting connections.</li>
        <li>Write down the rollback command before starting.</li>
      </ul>

      <h2 id="flow">Release flow</h2>
      <CodeBlock lang="text" filename="release-flow" code={FLOW} />
      <p>
        A container being “running” is not release evidence. Verify through the public hostname because users
        traverse DNS, CDN, TLS, the proxy, static assets, authentication, and backend APIs.
      </p>

      <h2 id="proxy">Switching the proxy</h2>
      <p>
        Keep one explicit active-upstream configuration. Replace it with the idle slot and reload the proxy;
        do not stop the old container as part of the switch.
      </p>
      <CodeBlock lang="caddyfile" filename="active-upstream.conf" code={`reverse_proxy app-green:3000`} />
      <CodeBlock lang="bash" filename="verify-release.sh" code={`docker ps --format "table {{.Names}}\\t{{.Image}}\\t{{.Status}}"\ncat caddy-upstreams/app-active.conf\ncurl -fsS https://example.com/ready\ncurl -fsS https://example.com/health`} />

      <h2 id="frontend">Frontend-only updates</h2>
      <p>
        For copy, CSS, i18n, or page-only changes, publish the built static directory to a timestamped temporary
        path, verify its files and permissions, atomically swap it into place, and preserve the previous directory
        as a backup. Check the actual chunk files and browser console, not only the homepage status code.
      </p>

      <h2 id="health">Health-check design</h2>
      <CodeBlock lang="text" filename="health-checks" code={CHECKS} />
      <p>
        Keep <code>/health</code> lightweight. Make <code>/ready</code> stricter: it should mean the instance can
        accept real traffic and its required dependencies are usable.
      </p>

      <h2 id="rollback">Rollback</h2>
      <CodeBlock lang="text" filename="rollback" code={ROLLBACK} />
      <p>
        Never invent rollback steps during an incident. Keep the old slot and its image or static-resource backup
        until the observation window has ended.
      </p>

      <h2 id="risks">High-risk cases</h2>
      <ul>
        <li>Database migrations are not backward compatible.</li>
        <li>Old and new versions cannot read the same data safely.</li>
        <li>Queue consumers duplicate work or compete for locks.</li>
        <li>Storage layout changes destructively.</li>
        <li>The new process starts but no core smoke test exists.</li>
        <li>Proxy reload behaviour has not been tested under live traffic.</li>
      </ul>

      <h2 id="observe">Post-release observation</h2>
      <ul>
        <li>Public <code>/ready</code> and <code>/health</code> status codes.</li>
        <li>4xx and 5xx rates in proxy logs.</li>
        <li>Recent errors from the new slot.</li>
        <li>Core API latency and time to first byte.</li>
        <li>Whether <code>index.html</code> references existing new chunks.</li>
        <li>Login, payment, and API-call flows from the user perspective.</li>
      </ul>
      <p>
        For API integration, see the <Link to="/docs/guides/complete-integration/">complete integration guide</Link>;
        for agent failures, see <Link to="/docs/guides/codex-tool-recovery/">Codex tool recovery</Link>.
      </p>
    </DocPage>
  )
}
