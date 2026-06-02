import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'
import { CodeBlock } from '../../../components/ui/CodeBlock'

const QUICK_DECISION = `适合使用这篇教程的情况：

1. 你使用 ChatGPT / Codex OAuth 登录
2. 账号突然要求手机号二次验证
3. 之前使用过接码平台或一次性手机号
4. 原手机号已经无法再次接收验证码
5. 你希望后续登录尽量不再依赖短信验证码

不适合直接操作的情况：

1. 你没有稳定保管恢复密钥的地方
2. 你只有一台设备，没有第二个可用登录方式
3. 账号是企业托管、SSO、Enterprise 或组织域账号
4. 你不确定自己能否长期保管 passkey / 安全密钥`

const SETUP_CHECKLIST = `开始前准备：

1. 当前还能登录 ChatGPT 网页端
2. 至少准备两个安全登录方式
3. 至少一个方式应支持跨设备同步或硬件安全密钥
4. 确认浏览器是 Chrome / Safari / Edge 等支持 passkey 的现代浏览器
5. 准备一个安全位置保存恢复密钥
6. 不要把恢复密钥只保存在当前 ChatGPT 会话或同一台临时设备上`

const RECOVERY_KEY_RULES = `恢复密钥保存规则：

1. 下载后立刻离线备份
2. 至少保存两份，放在不同位置
3. 不要只放在浏览器下载目录
4. 不要截图发到聊天工具
5. 不要交给接码平台、代注册平台或陌生人
6. 如果怀疑泄露，进入 Advanced Account Security 重新生成恢复密钥`

const COMMON_ERRORS = `常见错误：

1. 只添加一个 passkey 就继续，导致不满足高级账号安全要求
2. 两个 passkey 都只保存在同一台设备上
3. 没保存恢复密钥就点击“我已保存”
4. 用临时浏览器配置创建 passkey，之后找不到同一个 Chrome profile
5. 忘记把 Google Password Manager / iCloud Keychain 同步打开
6. 启用后发现所有设备被登出，但不知道要用 passkey 重新登录`

const CODEX_RELATION = `和 Codex / gpt88.cc 的关系：

1. gpt88.cc API Key 模式不依赖 ChatGPT 手机号验证
2. Codex 插件、ChatGPT OAuth、部分官方账号能力依赖 ChatGPT 登录态
3. 如果 ChatGPT OAuth 登录被手机号二次验证卡住，Codex 插件能力也可能无法恢复
4. Advanced Account Security 解决的是 ChatGPT 账号登录路径，不是 gpt88.cc API Key
5. 推荐保留两个 profile：gpt88-api 用于模型调用，chatgpt-oauth 用于插件和官方账号能力`

function StepCard({
  step,
  title,
  children,
}: {
  step: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="not-prose my-5 rounded-xl border border-white/10 bg-white/[0.035] p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-violet-400/40 bg-violet-500/10 font-mono text-sm font-semibold text-violet-200">
          {step}
        </div>
        <div className="min-w-0">
          <h3 className="m-0 text-base font-semibold text-ink-50">{title}</h3>
          <div className="mt-2 space-y-2 text-sm leading-6 text-ink-200">{children}</div>
        </div>
      </div>
    </section>
  )
}

export default function CodexChatgptPhoneVerificationPage() {
  return (
    <DocPage
      path="/docs/guides/codex-chatgpt-phone-verification"
      title="ChatGPT / Codex 手机号二次验证的解决方法"
      description="当 ChatGPT OAuth 或 Codex 登录反复要求手机号二次验证、原手机号无法找回时，使用 Advanced Account Security、passkey 和恢复密钥降低对短信验证码的依赖。"
      headings={[
        { id: 'background', text: '问题背景', level: 2 },
        { id: 'principle', text: '解决原理', level: 2 },
        { id: 'before', text: '操作前检查', level: 2 },
        { id: 'steps', text: '详细步骤', level: 2 },
        { id: 'passkey-choice', text: '通行密钥怎么选', level: 2 },
        { id: 'recovery', text: '恢复密钥', level: 2 },
        { id: 'codex', text: '和 Codex 的关系', level: 2 },
        { id: 'errors', text: '常见错误', level: 2 },
        { id: 'faq', text: 'FAQ', level: 2 },
        { id: 'references', text: '参考资料', level: 2 },
      ]}
    >
      <Callout tone="warn" title="这是账号安全设置，不是绕过验证">
        <p>
          这篇教程的目标是帮助仍能登录 ChatGPT 的用户，提前把账号升级为更强的
          passkey / 安全密钥登录方式，减少后续对邮箱验证码和短信验证码的依赖。
          如果你已经完全无法登录账号，这篇教程不能替代官方账号恢复流程。
        </p>
      </Callout>

      <h2 id="background">问题背景</h2>
      <p>
        很多 Codex 用户会同时使用两类登录方式：一类是 <code>gpt88.cc</code> API Key，
        用于模型调用；另一类是 ChatGPT OAuth，用于 Codex 插件、官方账号能力或 ChatGPT
        账号权益。问题通常出现在第二类：ChatGPT 账号重新授权时，页面要求手机号二次验证。
      </p>
      <p>
        如果账号当初使用接码平台、临时手机号或已经失效的海外手机号完成验证，后续再次要求短信验证时，
        就可能卡在“原手机号找不回”的状态。Tiger 在 X 上发布的教程记录了一个实操路径：
        进入 ChatGPT 的 Advanced Account Security，添加通行密钥并保存恢复密钥，
        让账号后续使用更强的登录方式。
      </p>
      <CodeBlock lang="text" filename="when-to-use" code={QUICK_DECISION} />

      <h2 id="principle">解决原理</h2>
      <p>
        OpenAI 官方说明里，Advanced Account Security 是个人 ChatGPT 账号的可选高级安全设置。
        启用后，账号会使用 passkey 或兼容安全密钥作为登录方式，并关闭较弱的路径，例如邮箱验证码、
        短信验证码、密码登录和邮箱恢复。
      </p>
      <p>
        换句话说，这不是“跳过安全验证”，而是把账号从短信验证码迁移到 passkey / FIDO 安全密钥体系。
        代价也很明确：如果你丢失所有 passkey、安全密钥和恢复密钥，账号可能更难恢复。
      </p>

      <h2 id="before">操作前检查</h2>
      <p>
        不要急着点注册。先确认自己具备长期保管密钥的能力，因为 Advanced Account Security 会显著改变账号恢复方式。
      </p>
      <CodeBlock lang="text" filename="setup-checklist" code={SETUP_CHECKLIST} />

      <Callout tone="info" title="推荐的两种安全登录方式">
        <p>
          最稳妥的组合是：一个跨设备同步的 passkey，例如 Google Password Manager 或 iCloud Keychain；
          再加一个独立方式，例如 Chrome 个人资料 passkey、手机 passkey 或 YubiKey 等 FIDO 安全密钥。
        </p>
      </Callout>

      <h2 id="steps">详细步骤</h2>
      <p>
        以下步骤基于 ChatGPT 网页端整理。不同地区、账号类型、浏览器版本看到的按钮文案可能略有变化，
        但主线是：进入安全设置，注册 Advanced Account Security，添加至少两个安全登录方式，保存恢复密钥。
      </p>

      <StepCard step="1" title="登录 ChatGPT 网页端">
        <p>
          打开 <a href="https://chatgpt.com" target="_blank" rel="noreferrer">chatgpt.com</a>，
          使用当前仍可登录的账号进入网页端。建议使用你平时最稳定的浏览器和浏览器资料，例如主力 Chrome profile。
        </p>
      </StepCard>

      <StepCard step="2" title="进入 Settings / Security">
        <p>
          点击头像或账号菜单，进入 <strong>Settings</strong>，再进入 <strong>Security</strong>。
          找到 <strong>Advanced Account Security</strong> 或类似“高级账号安全”的区域。
        </p>
      </StepCard>

      <StepCard step="3" title="点击 Enroll / 注册">
        <p>
          如果右侧显示 <strong>Enroll</strong>、<strong>Register</strong> 或“注册”，点击进入。
          移动端可能会跳转到浏览器完成后续设置。
        </p>
      </StepCard>

      <StepCard step="4" title="重新验证当前账号">
        <p>
          系统可能要求你重新登录 ChatGPT 账号。可用方式取决于你当前账号状态：
          可能是邮箱验证码、已有 Authenticator app、已有 passkey 或其他安全方式。
        </p>
      </StepCard>

      <StepCard step="5" title="进入安全设置页后点击 Continue">
        <p>
          验证通过后，页面会说明即将设置更强的登录方式。确认自己已经准备好两个安全登录方式和恢复密钥保存位置，
          再点击继续。
        </p>
      </StepCard>

      <StepCard step="6" title="添加第一个通行密钥">
        <p>
          选择添加登录方式，优先选择 <strong>Passkey / 通行密钥</strong>。如果浏览器弹出系统 passkey
          选择器，可以先选择跨设备同步的方案，例如 Google Password Manager、iCloud Keychain 或硬件安全密钥。
        </p>
      </StepCard>

      <StepCard step="7" title="添加第二个安全登录方式">
        <p>
          不要只添加一个。再次点击添加，新增第二个 passkey 或安全密钥。可以选择另一个 Chrome profile、
          手机 passkey、硬件安全密钥，或另一个可长期访问的同步密码管理工具。
        </p>
      </StepCard>

      <StepCard step="8" title="确认两个方式都可用">
        <p>
          页面通常会检查你的登录方式是否满足要求。如果提示你重新设置 passkey，按提示回到
          <strong>Settings → Security → Passkeys</strong> 添加或重建 passkey 后再继续。
        </p>
      </StepCard>

      <StepCard step="9" title="下载并保存恢复密钥">
        <p>
          进入恢复密钥页面后，下载密钥并离线保存。只有确认自己已经保存后，再勾选“我已保存恢复密钥”并继续。
          这一步不能敷衍。
        </p>
      </StepCard>

      <StepCard step="10" title="完成后重新登录">
        <p>
          Advanced Account Security 启用后，OpenAI 可能会让当前设备或其他设备退出登录。
          之后重新登录时，按页面提示使用 passkey 或安全密钥完成验证。
        </p>
      </StepCard>

      <h2 id="passkey-choice">通行密钥怎么选</h2>
      <p>
        如果你看到系统弹窗，不知道该选哪一个，可以按下面的优先级判断。
      </p>
      <div className="not-prose overflow-hidden rounded-xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/[0.04] text-ink-300">
            <tr>
              <th className="px-4 py-3 font-semibold">方式</th>
              <th className="px-4 py-3 font-semibold">适合谁</th>
              <th className="px-4 py-3 font-semibold">注意点</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-ink-200">
            <tr>
              <td className="px-4 py-3 font-mono text-violet-200">Google Password Manager</td>
              <td className="px-4 py-3">主要用 Chrome 和 Google 账号的人</td>
              <td className="px-4 py-3">确认 Chrome 同步和 Google 账号长期可用</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-violet-200">iCloud Keychain</td>
              <td className="px-4 py-3">主要用 macOS / iPhone / Safari 的人</td>
              <td className="px-4 py-3">确认 Apple ID、iCloud 钥匙串和设备密码安全</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-violet-200">Chrome profile</td>
              <td className="px-4 py-3">固定在某个浏览器资料里办公的人</td>
              <td className="px-4 py-3">不要随便删除 profile；迁移电脑前先新增其他方式</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-violet-200">YubiKey / FIDO Key</td>
              <td className="px-4 py-3">重度账号安全用户、团队管理员</td>
              <td className="px-4 py-3">建议准备两把，避免硬件丢失后无法登录</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="recovery">恢复密钥</h2>
      <p>
        恢复密钥是整个流程里最重要的一步。启用 Advanced Account Security 后，邮箱和短信恢复路径会被禁用。
        如果你丢失所有安全登录方式，恢复密钥就是最后的账号恢复入口。
      </p>
      <CodeBlock lang="text" filename="recovery-key-rules" code={RECOVERY_KEY_RULES} />

      <h2 id="codex">和 Codex 的关系</h2>
      <p>
        这篇教程解决的是 ChatGPT 账号登录问题，不是 API 网关问题。gpt88.cc API Key 模式可以继续用于模型调用；
        ChatGPT OAuth 则用于 Codex 插件、官方账号能力和需要 ChatGPT 登录态的场景。
      </p>
      <CodeBlock lang="text" filename="codex-relation" code={CODEX_RELATION} />
      <p>
        如果你的目标是让 Codex 插件恢复可用，可以继续阅读
        {' '}<Link to="/docs/guides/codex-plugins-oauth/">Codex 插件 OAuth 登录</Link>；
        如果你只是调用模型，继续使用 <Link to="/docs/quickstart/">gpt88.cc 快速开始</Link> 即可。
      </p>

      <h2 id="errors">常见错误</h2>
      <CodeBlock lang="text" filename="common-errors" code={COMMON_ERRORS} />

      <h2 id="faq">FAQ</h2>
      <h3>启用后是不是再也不会要手机号？</h3>
      <p>
        根据 OpenAI 官方说明，Advanced Account Security 启用后，邮箱和短信登录验证码会被禁用。
        但账号安全策略可能随地区、账号类型和风险判断变化，实际以 OpenAI 当前页面提示为准。
      </p>

      <h3>我已经完全无法登录，还能用这个方法吗？</h3>
      <p>
        不能。这篇教程的前提是你仍能进入 ChatGPT 账号安全设置。如果已经卡在登录前的手机号验证，
        需要走官方可用的账号恢复方式，或者使用仍能登录的设备先进入设置。
      </p>

      <h3>我应该注销账号再重新注册吗？</h3>
      <p>
        不建议把注销作为第一选择。注销存在等待期、订阅影响、数据丢失、邮箱复用规则变化等风险。
        如果当前账号还能登录，优先把安全登录方式补齐。
      </p>

      <h3>企业账号、团队账号能用吗？</h3>
      <p>
        OpenAI 官方说明显示，Enterprise、企业托管账号、企业托管域账号可能不支持 Advanced Account Security。
        如果页面没有这个入口，通常不是你的操作问题。
      </p>

      <h2 id="references">参考资料</h2>
      <ul>
        <li>
          <a href="https://x.com/tigeryan718/status/2061534208926102003" target="_blank" rel="noreferrer">
            Tiger 发布的 X 教程：ChatGPT Codex 手机号二次验证的解决方法
          </a>
        </li>
        <li>
          <a href="https://help.openai.com/en/articles/20001221-advanced-account-security" target="_blank" rel="noreferrer">
            OpenAI Help Center：Advanced Account Security
          </a>
        </li>
        <li>
          <a href="https://help.openai.com/en/articles/20001039-passkeys-to-secure-your-openai-account" target="_blank" rel="noreferrer">
            OpenAI Help Center：Passkeys to Secure Your OpenAI Account
          </a>
        </li>
      </ul>
    </DocPage>
  )
}
