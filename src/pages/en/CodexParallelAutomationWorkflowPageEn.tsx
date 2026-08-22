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

export default function CodexParallelAutomationWorkflowPageEn() {
  return (
    <DocPage
      path="/docs/guides/codex-parallel-automation-workflow"
      title="Codex Parallel Tasks and Automation Workflow"
      description="This guide focuses on the most visible part of the demo: how Codex runs multiple tasks in parallel and uses worklogs, automation, and task splitting to stay stable."
      headings={[
        { id: 'parallel-why', text: 'Why parallel execution matters', level: 2 },
        { id: 'what-parallel', text: 'Which parallel tasks appear in the demo', level: 2 },
        { id: 'automation-role', text: 'What automation does here', level: 2 },
        { id: 'automation-credentials', text: 'Automation credentials and external APIs', level: 2 },
        { id: 'coordination', text: 'How to keep tasks from stepping on each other', level: 2 },
        { id: 'recovery', text: 'How to recover after interruption', level: 2 },
      ]}
    >
      <h2 id="parallel-why">Why parallel execution matters</h2>
      <p>
        When Codex is only used as a chat tool, work is naturally serial: ask one question, wait for one
        answer, then move to the next task. The demo shows a different model: split the deliverables into
        separate units and run them at the same time.
      </p>
      <GuideScreenshot {...SERIES_IMAGES.buildSixThings} />

      <h2 id="what-parallel">Which parallel tasks appear in the demo</h2>
      <p>
        The visible parallel directions include research, iOS, video planning, slide decks, web pages, and
        skill management.
      </p>
      <MiniCardGrid
        items={[
          {
            title: 'Research tasks',
            body: 'Collect public sources, organize video takeaways, and produce reports and worklogs.',
          },
          {
            title: 'Product / app tasks',
            body: 'Summarize iOS features, inspect assets, fix logos, and verify simulator builds.',
          },
          {
            title: 'Content tasks',
            body: 'Prepare slide-deck structure, write product narrative, and organize course or training material.',
          },
          {
            title: 'Creative tasks',
            body: 'Plan a Remotion launch video with shots, subtitles, music, and voiceover.',
          },
        ]}
      />

      <h2 id="automation-role">What automation does here</h2>
      <TwoUpScreenshots items={[SERIES_IMAGES.skillWorklog, SERIES_IMAGES.remotionPlan]} />
      <p>
        Automation is not mainly about saving one click. It removes repetitive task switching: organizing
        research results, recording work logs, keeping fixed output formats, checking steps, and generating
        delivery checklists.
      </p>
      <SimpleTable
        headers={['Without automation', 'With automation']}
        rows={[
          [
            'You have to remember where every task is and what happens next.',
            'Use worklogs or a fixed process to keep progress recoverable across sessions.',
          ],
          [
            'Every task needs a new output format.',
            'Templates or skills keep the output structure stable.',
          ],
          [
            'The more tasks you run, the more likely you are to miss a verification step.',
            'Build checks such as compile, screenshot, write-to-disk, and routing validation into the standard flow.',
          ],
        ]}
      />

      <h2 id="automation-credentials">Automation credentials and external APIs</h2>
      <p>
        A closer look at the demo shows an API key configuration screen during the automation portion. That
        means automation is not “let the model browse the internet freely.” External services, API keys,
        permission boundaries, and trigger conditions all need to be configured explicitly.
      </p>
      <GuideScreenshot {...SERIES_EXTRA_IMAGES.automationApiKey} />
      <SimpleTable
        headers={['What to define', 'What to write down', 'Why it matters']}
        rows={[
          [
            'External API',
            'Service name, purpose, usage limits, and retry policy.',
            'Prevents the automation from silently failing or calling the wrong service.',
          ],
          [
            'API key',
            'Store it only in a local environment variable, secret, or tool config—not in public docs or the repo.',
            'The demo shows configuration steps; the actual rollout must avoid key leakage.',
          ],
          [
            'Trigger condition',
            'When it runs, where the input comes from, and where the result goes.',
            'Automation needs boundaries; otherwise it becomes an opaque background job.',
          ],
        ]}
      />

      <h2 id="coordination">How to keep tasks from stepping on each other</h2>
      <StepPanel title="Split first, then parallelize">
        <p>Parallel execution is not “put everything into one huge prompt.” Start by splitting the work into small tasks with clear boundaries.</p>
      </StepPanel>
      <StepPanel title="One task, one deliverable">
        <p>For example, one task only prepares screenshots, one task only writes the page, and one task only verifies routing and SEO.</p>
      </StepPanel>
      <StepPanel title="Share the same constraints">
        <p>All tasks should follow the same skills, naming rules, output templates, and verification criteria so the results stay aligned.</p>
      </StepPanel>
      <StepPanel title="Make state explicit">
        <p>Worklogs, task boards, or stage markers matter a lot. Without them, parallel work quickly turns into context confusion.</p>
      </StepPanel>

      <h2 id="recovery">How to recover after interruption</h2>
      <TwoUpScreenshots items={[SERIES_IMAGES.assetsFix, SERIES_IMAGES.appIconBuild]} />
      <p>
        Recovery is what separates a stable system from a fragile one. The demo shows asset fixes, icons, and
        build results as visible states, which means the task is not done when someone says “done.” It is done
        when the intermediate states can be revisited.
      </p>
      <Callout tone="warn" title="Parallel tasks fail when state exists only in someone’s head">
        <p>
          If you can only remember where a task was by memory, you will lose speed as soon as you switch
          projects or reopen the session. Worklogs, screenshots, build records, and explicit stage files are
          part of recovery.
        </p>
      </Callout>
    </DocPage>
  )
}
