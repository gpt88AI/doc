import { DocPage } from '../components/layout/DocPage'
import { CodeBlock } from '../components/ui/CodeBlock'
import { useLocale } from '../lib/locale'
import { getLocaleCopy } from '../lib/localeCopy'

type CoreKind = 'overview' | 'auth' | 'faq'

export default function LocalizedCorePage({ kind }: { kind: CoreKind }) {
  const { locale } = useLocale()
  const copy = getLocaleCopy(locale).core[kind]
  const path = `/docs/${kind === 'overview' ? 'overview' : kind}`

  return (
    <DocPage path={path} title={copy.title} description={copy.description} headings={[{ id: 'main', text: copy.heading, level: 2 }]}>
      <h2 id="main">{copy.heading}</h2>
      <p>{copy.body}</p>
      <ul>{copy.bullets.map(item => <li key={item}>{item}</li>)}</ul>
      {kind === 'auth' ? (
        <>
          <h2 id="headers">Authorization header</h2>
          <CodeBlock lang="http" code={'Authorization: Bearer $GPT88_API_KEY\nContent-Type: application/json'} />
        </>
      ) : null}
      {kind === 'faq' ? (
        <>
          <h2 id="verification">GET /v1/models</h2>
          <p>Use the model list endpoint to confirm that your API key can access the requested model before sending production traffic.</p>
        </>
      ) : null}
    </DocPage>
  )
}
