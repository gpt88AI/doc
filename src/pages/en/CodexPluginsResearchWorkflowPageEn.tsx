import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import {
  GuideScreenshot,
  MiniCardGrid,
  SERIES_EXTRA_IMAGES,
  SERIES_IMAGES,
  SimpleTable,
  StepPanel,
  TwoUpScreenshots,
} from '../docs/guides/CodexGpt55SeriesShared'

export default function CodexPluginsResearchWorkflowPageEn() {
  return (
    <DocPage
      path="/docs/guides/codex-plugins-research-workflow"
      title="Codex Plugins and Research Workflow"
      description="This guide breaks down a research-oriented Codex workflow from the public demo: how plugins, source collection, and structured reports turn ad hoc research into a repeatable process."
      headings={[
        { id: 'research-mode', text: 'What research mode looks like', level: 2 },
        { id: 'plugin-role', text: 'What plugins solve here', level: 2 },
        { id: 'transcript-tools', text: 'YouTube transcript tools compared', level: 2 },
        { id: 'report-shape', text: 'What a good research result looks like', level: 2 },
        { id: 'repeatable', text: 'How to make it repeatable', level: 2 },
        { id: 'use-cases', text: 'Where this workflow fits', level: 2 },
      ]}
    >
      <h2 id="research-mode">What research mode looks like</h2>
      <p>
        The demo shows a clearly research-oriented session: Codex gathers outside material, organizes the
        findings, produces a report, and keeps a record of the work. That is very different from a simple
        Q&amp;A flow.
      </p>
      <TwoUpScreenshots items={[SERIES_IMAGES.researchChat, SERIES_IMAGES.youtubeResearchReport]} />

      <h2 id="plugin-role">What plugins solve here</h2>
      <p>
        Plugins are not just “one more button.” They connect the steps that are usually done by hand:
        collecting sources, extracting structure, organizing content, and writing the result to disk. That is
        what keeps research from living only inside a chat window.
      </p>
      <MiniCardGrid
        items={[
          {
            title: 'Expand input sources',
            body: 'Let Codex read more external materials instead of relying only on the current chat history.',
          },
          {
            title: 'Reduce manual copying',
            body: 'Move repetitive work such as pasting pages, pulling highlights, and reorganizing structure into the workflow.',
          },
          {
            title: 'Produce structured output',
            body: 'End with a report, comparison table, worklog, or follow-up checklist instead of a loose summary.',
          },
          {
            title: 'Feed later tasks',
            body: 'Research output can directly power frontend work, docs, course material, slide decks, or video production.',
          },
        ]}
      />

      <h2 id="transcript-tools">YouTube transcript tools compared</h2>
      <p>
        A closer look at the demo shows the author asking Codex to research YouTube transcript options and
        compare services such as Supadata and TranscriptAPI. The important part is not one API name; it is the
        workflow: compare the available tools first, then ask Codex to create a skill that can pull the latest
        videos from a channel, fetch transcripts, and summarize them.
      </p>
      <GuideScreenshot {...SERIES_EXTRA_IMAGES.youtubeTranscriptApiComparison} />
      <SimpleTable
        headers={['Stage', 'What the demo shows', 'What this becomes']}
        rows={[
          [
            'Tool research',
            'Compare the price, reliability, and developer experience of multiple YouTube transcript / creator data APIs.',
            'A reusable external-source shortlist so you do not search from scratch every time.',
          ],
          [
            'Capability packaging',
            'Ask Codex to create a skill: input a channel, find the latest video, pull the transcript, and summarize it.',
            'A research skill you can reuse for competitor analysis, course prep, and content research.',
          ],
          [
            'Output',
            'Turn the video information into a report instead of returning scattered notes.',
            'Material that can be reused in docs, courses, slide decks, and product notes.',
          ],
        ]}
      />

      <h2 id="report-shape">What a good research result looks like</h2>
      <GuideScreenshot {...SERIES_IMAGES.youtubeResearchReport} />
      <p>
        From the “Analyze latest YouTube videos...” screen in the demo, a useful research output should have at
        least three layers:
      </p>
      <SimpleTable
        headers={['Layer', 'What belongs here', 'Why it matters']}
        rows={[
          [
            'Fact layer',
            'Clearly visible facts: time, subject, function, and deliverable.',
            'Separating confirmed facts keeps the result from mixing in inference too early.',
          ],
          [
            'Interpretation layer',
            'What these facts suggest about workflow, product direction, or process design.',
            'This is where research turns from copying into actionable insight.',
          ],
          [
            'Execution layer',
            'What document to write next, what page to update, which images to add, and what to verify.',
            'This pushes research directly into production instead of leaving it in notes.',
          ],
        ]}
      />

      <h2 id="repeatable">How to make it repeatable</h2>
      <StepPanel title="1. Fix the input first">
        <p>Only use the sources the task really needs, such as public videos, screenshots, transcripts, README files, or page source.</p>
      </StepPanel>
      <StepPanel title="2. Fix the output shape second">
        <p>Ask for a comparison table, outline, publishing checklist, page draft, or task breakdown instead of free-form prose.</p>
      </StepPanel>
      <StepPanel title="3. Define a verification rule">
        <p>For example: every conclusion must be traceable to a screenshot, no invisible numeric precision, and the result must be reusable as a site tutorial.</p>
      </StepPanel>
      <StepPanel title="4. Feed the result back into the system">
        <p>Good research should not stop at one session. Move it into a skill, knowledge base, course material, or the next task.</p>
      </StepPanel>

      <h2 id="use-cases">Where this workflow fits</h2>
      <TwoUpScreenshots items={[SERIES_IMAGES.agentCurriculum, SERIES_IMAGES.investorDeck]} />
      <p>
        The workflow is not just for reports. It can also support course prep, product research, marketing
        material, slide-deck storytelling, website copy, and downstream production work.
      </p>
      <Callout tone="tip" title="Research and delivery should stay connected">
        <p>
          The most useful detail in the demo is that the research result immediately enters the next task. One
          source of truth can be reused many times instead of becoming a one-off note.
        </p>
      </Callout>
    </DocPage>
  )
}
