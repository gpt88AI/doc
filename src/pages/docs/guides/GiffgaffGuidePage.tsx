import type { ReactNode } from 'react'
import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'
import { CodeBlock } from '../../../components/ui/CodeBlock'

const WHY_GIFFGAFF = `giffgaff 常被用于这几类场景：

1. 海外应用注册或登录时接收短信验证码
2. ChatGPT、Codex、海外 AI 工具的手机号验证
3. 需要一张低维护、0 月租、长期保号的英国号码
4. 不想长期绑高成本月租套餐，只保留号码能力

不适合把它当成主力通信卡：

1. 海外漫游流量和语音成本通常不划算
2. 在中国大陆或非英国地区长期当主卡体验一般
3. 更适合作为验证号、备用号、接码号、低频使用号`

const ACTIVATE_FLOW = `1. 打开 https://www.giffgaff.com/activate
2. 输入卡片上的 6 位激活码
3. 输入邮箱并接收验证码
4. 输入邮箱验证码后创建密码并注册
5. 选择 No, thanks 继续
6. 下拉到底部，选择 Pay as you go
7. 充值 10 英镑，或使用 16 位充值卡密激活
8. 填写姓名和地址后提交订单
9. 看到系统分配的 +44 英国号码
10. 回到主页看到余额，表示激活完成`

const KEEP_ALIVE_RULES = `保号核心规则：

1. 每 180 天内必须至少发生一次有效的余额变动或使用行为
2. 每次新的消费 / 充值 / 触发行为，会重新开始下一轮 180 天周期
3. 超过周期不操作，号码和余额可能被回收

可用于保号的常见动作：

1. 发一条短信
2. 使用一次移动数据
3. 打一次电话（不含紧急服务和客服热线）
4. 充值一次话费

最推荐动作：

1. 发一条短信
2. 在日历中设置 175 天提醒`

const CHECK_NUMBER = `查询本机号码：

编辑短信：
number

发送到：
2020

或：
43430

通常 30 秒到 2 分钟内会收到回执短信。`

const ESIM_FLOW = `实体卡转 eSIM：

1. 手机先安装 giffgaff App
2. 连接稳定 Wi-Fi
3. 打开 App，进入 Account > SIM
4. 选择 Replace my SIM
5. 再选择 Switch to a new eSIM
6. 勾选理解说明后点击 Start the switch
7. 输入短信验证码或改收邮箱验证码
8. 点击 Install eSIM 按提示完成安装
9. 等待 eSIM 激活，通常 1 小时内完成，最慢不超过 24 小时
10. 激活完成后，原实体卡会失效`

const COMMON_ISSUES = `常见问题：

1. 收不到第三方平台验证码：多数是平台风控、IP 或 VPN 问题
2. 号码能收官方短信但收不到注册短信：优先换更干净的代理出口
3. 打电话提示“设置了限制”：手动切到中国移动网络后重启再试
4. 不记得本机号码：发短信 number 到 2020 或 43430
5. 不满意系统号码：进入 getnumber 页面随机换号，但次数有限
6. 想保号最省事：设置 175 天提醒，定期发一条短信`

const ACTIVATION_IMAGES = [
  {
    src: '/images/guides/giffgaff/HH0CvD3bsAA7q3o.png',
    alt: 'giffgaff 官方激活页面与 6 位激活码输入界面',
    caption: '步骤截图 1：进入官方激活页并输入 6 位激活码。',
  },
  {
    src: '/images/guides/giffgaff/HH0Cx_vaUAAzi1J.png',
    alt: 'giffgaff 激活流程中的邮箱输入界面',
    caption: '步骤截图 2：输入邮箱并继续。',
  },
  {
    src: '/images/guides/giffgaff/HH0C0grbQAA8gzy.png',
    alt: 'giffgaff 邮箱验证码确认界面',
    caption: '步骤截图 3：填写邮箱验证码完成确认。',
  },
  {
    src: '/images/guides/giffgaff/HH0Ef9xbYAA75Ku.png',
    alt: 'giffgaff 注册时创建密码的界面',
    caption: '步骤截图 4：创建密码并注册账号。',
  },
  {
    src: '/images/guides/giffgaff/HH0EiTTa0AAE3tl.png',
    alt: 'giffgaff 流程中的 No, thanks 继续界面',
    caption: '步骤截图 5：选择 No, thanks 后继续。',
  },
  {
    src: '/images/guides/giffgaff/HH0EkC3a8AAT0u8.png',
    alt: 'giffgaff Pay as you go 选择界面',
    caption: '步骤截图 6：下拉到底部，选择 Pay as you go。',
  },
  {
    src: '/images/guides/giffgaff/HH0EmAnbwAATFGb.png',
    alt: 'giffgaff 10 英镑充值或 voucher 激活界面',
    caption: '步骤截图 7：选择 10 英镑充值，或使用 voucher 激活。',
  },
  {
    src: '/images/guides/giffgaff/HH0EoSfbsAASEQL.png',
    alt: 'giffgaff 姓名和地址填写界面',
    caption: '步骤截图 8：填写英文姓名和真实地址格式。',
  },
  {
    src: '/images/guides/giffgaff/HH0EqKebIAE7NgF.png',
    alt: 'giffgaff Place order 下单界面',
    caption: '步骤截图 9：完成支付或提交订单。',
  },
  {
    src: '/images/guides/giffgaff/HH0EtOKaAAABz-Q.png',
    alt: 'giffgaff 分配英国手机号的界面',
    caption: '步骤截图 10：系统显示分配的 +44 英国号码。',
  },
  {
    src: '/images/guides/giffgaff/HH0EvHDboAEvBW6.png',
    alt: 'giffgaff 首页显示余额表示激活完成',
    caption: '步骤截图 11：主页显示余额，说明卡基本已激活完成。',
  },
] as const

const MAINTENANCE_IMAGES = [
  {
    src: '/images/guides/giffgaff/HH0IAjjbMAAWz9I.jpg',
    alt: 'giffgaff 保号提醒与使用说明截图',
    caption: '保号提醒示意：建议把提醒设在 175 天左右。',
  },
  {
    src: '/images/guides/giffgaff/HH09219bgAA0Yu-.jpg',
    alt: 'giffgaff 实体卡实拍图片',
    caption: '实体卡实拍：可用于确认你拿到的是标准空白卡。',
  },
] as const

function StepCard({
  step,
  title,
  children,
}: {
  step: string
  title: string
  children: ReactNode
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

function ScreenshotGallery({
  items,
}: {
  items: ReadonlyArray<{ src: string; alt: string; caption: string }>
}) {
  return (
    <div className="not-prose my-6 grid gap-4">
      {items.map(item => (
        <figure key={item.src} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
          <img
            src={item.src}
            alt={item.alt}
            loading="lazy"
            className="w-full bg-white object-cover"
          />
          <figcaption className="border-t border-white/10 px-4 py-3 text-sm leading-6 text-ink-300">
            {item.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

function ProductCard() {
  return (
    <section className="not-prose my-6 overflow-hidden rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/10 via-white/[0.03] to-cyan-400/10">
      <div className="border-b border-white/10 px-5 py-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-200">
            在售商品
          </span>
          <h3 className="text-lg font-semibold text-ink-50">英国 giffgaff 实体 SIM 卡</h3>
        </div>
        <p className="mt-3 text-sm leading-6 text-ink-200">
          适合需要英国手机号、海外应用短信验证、长期保号和实体卡转 eSIM 的用户。
          购买后可按本文教程直接激活使用。
        </p>
      </div>

      <div className="grid gap-5 px-5 py-5 md:grid-cols-2">
        <div>
          <h4 className="text-sm font-semibold text-ink-50">商品特点</h4>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-ink-200">
            <li>英国 +44 号码，可用于海外平台注册与验证场景</li>
            <li>0 月租，适合低频持有与长期保号</li>
            <li>支持按教程激活、换号、查询号码与实体卡转 eSIM</li>
            <li>适合作为 ChatGPT、Codex 等海外工具验证用备用号码</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink-50">购买方式</h4>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-ink-200">
            <li>通过 Telegram 联系购买：<a href="https://t.me/+CtlYILkGaY1jYzBl" target="_blank" rel="noreferrer">加入 Telegram 社区</a></li>
            <li>通过 X 私信咨询：<a href="https://x.com/webstarchina" target="_blank" rel="noreferrer">联系 X 社区账号</a></li>
            <li>下单前建议确认发货地区、库存状态和交付方式</li>
            <li>收到实体卡后，按本页激活流程操作即可</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default function GiffgaffGuidePage() {
  return (
    <DocPage
      path="/docs/guides/giffgaff-sim-guide"
      title="giffgaff 实体 SIM 卡激活、保号与 eSIM 转换教程"
      description="详细讲清 giffgaff 英国实体 SIM 卡如何激活、保号、查询号码、转 eSIM、充值以及常见问题排查，适合 ChatGPT、Codex 等海外应用验证场景。"
      headings={[
        { id: 'why', text: '为什么很多人选 giffgaff', level: 2 },
        { id: 'buy', text: '购买英国 giffgaff 实体 SIM 卡', level: 2 },
        { id: 'activate', text: '激活流程', level: 2 },
        { id: 'roaming', text: '漫游与资费', level: 2 },
        { id: 'keepalive', text: '保号规则', level: 2 },
        { id: 'number', text: '查询本机号码', level: 2 },
        { id: 'email-password', text: '改密码与改邮箱', level: 2 },
        { id: 'change-number', text: '更换号码', level: 2 },
        { id: 'esim', text: '实体卡转 eSIM', level: 2 },
        { id: 'issues', text: '常见问题', level: 2 },
        { id: 'references', text: '参考资料', level: 2 },
      ]}
    >
      <Callout tone="info" title="这张卡更适合做验证号，不适合当主力卡">
        <p>
          giffgaff 的优势是英国号码、0 月租、可长期保号、适合接收海外应用短信验证码。
          但它并不适合在非英国地区长期当主力通信卡，尤其不建议把漫游流量和语音当作常规使用方式。
        </p>
      </Callout>

      <h2 id="why">为什么很多人选 giffgaff</h2>
      <p>
        在 AI 工具、海外平台和国际服务的使用场景里，很多人需要一个可长期保留、可接收验证码、维护成本低的英国号码。
        giffgaff 正好满足这类需求：实体卡容易上手、激活后有 +44 号码、支持实体卡转 eSIM、日常只要按规则保号即可。
      </p>
      <CodeBlock lang="text" filename="why-giffgaff" code={WHY_GIFFGAFF} />

      <h2 id="buy">购买英国 giffgaff 实体 SIM 卡</h2>
      <p>
        如果你还没有卡，可以直接购买英国 giffgaff 实体 SIM 卡。更适合的用户是：
        需要英国手机号、要做海外平台注册验证、或者希望长期保留一张低维护号码的人。
      </p>
      <ProductCard />

      <h2 id="activate">激活流程</h2>
      <p>
        下面是整理后的标准激活路径。第一次激活时最容易出错的是：
        选错资费类型、地址乱填、付款方式没准备好。
      </p>
      <CodeBlock lang="text" filename="activate-flow" code={ACTIVATE_FLOW} />
      <ScreenshotGallery items={ACTIVATION_IMAGES} />

      <StepCard step="1" title="准备激活码和邮箱">
        <p>
          拿到 giffgaff 实体卡后，先确认卡片上 6 位激活码清晰可见，并准备一个能正常接收邮件验证码的邮箱。
        </p>
      </StepCard>

      <StepCard step="2" title="进入官方激活页">
        <p>
          打开 <a href="https://www.giffgaff.com/activate" target="_blank" rel="noreferrer">giffgaff 官方激活页</a>，
          输入 6 位激活码，继续进入注册流程。
        </p>
      </StepCard>

      <StepCard step="3" title="邮箱验证并创建账号">
        <p>
          输入邮箱，接收并填写验证码，然后创建密码完成注册。这一步建议使用长期持有的邮箱，不要用一次性邮箱。
        </p>
      </StepCard>

      <StepCard step="4" title="选择 Pay as you go">
        <p>
          页面下拉到底部后，选择 <strong>Pay as you go</strong>。不要误选套餐型方案，否则后续维护成本和计费模式都会变化。
        </p>
      </StepCard>

      <StepCard step="5" title="完成初始充值">
        <p>
          常见做法是充值 10 英镑。如果没有外币信用卡，可以通过第三方购买 giffgaff top-up voucher，
          在页面里输入 16 位充值码完成激活。
        </p>
      </StepCard>

      <StepCard step="6" title="填写姓名和地址">
        <p>
          建议填写现实中存在的英文姓名和地址。地址通常可以用英国真实地址格式，
          最起码要保证结构像真实地址，避免明显虚构字段。
        </p>
      </StepCard>

      <StepCard step="7" title="确认号码已分配">
        <p>
          激活完成后，系统会分配一个英国号码，区号为 <code>+44</code>。回到主页看到余额，通常就表示卡已成功激活。
        </p>
      </StepCard>

      <h2 id="roaming">漫游与资费</h2>
      <p>
        如果只是拿来接码和保号，尽量不要把这张卡当作高频流量或通话卡使用。
        除了短信接码之外，其他漫游使用通常不划算。
      </p>
      <ul>
        <li>需要买流量时，优先在 giffgaff App 里按所在国家查看和购买。</li>
        <li>非必要不要开移动数据与数据漫游。</li>
        <li>如果只是保号和接码，平时保持数据关闭即可。</li>
      </ul>

      <h2 id="keepalive">保号规则</h2>
      <p>
        这部分是最关键的长期维护逻辑。很多人激活成功后忘了定期触发使用行为，几个月后号码直接失效。
      </p>
      <CodeBlock lang="text" filename="keepalive-rules" code={KEEP_ALIVE_RULES} />
      <Callout tone="warn" title="最稳妥的做法">
        <p>
          把提醒设在 175 天左右，而不是 180 天当天。每次触发一次余额变动或有效使用后，立即把下一次提醒顺延。
        </p>
      </Callout>
      <ScreenshotGallery items={MAINTENANCE_IMAGES} />

      <h2 id="number">查询本机号码</h2>
      <p>
        如果你忘了本机号码，不需要拆卡或重新查后台，直接按短信方式查询即可。
      </p>
      <CodeBlock lang="text" filename="check-number" code={CHECK_NUMBER} />

      <h2 id="email-password">改密码与改邮箱</h2>
      <ul>
        <li>
          改密码：
          {' '}<a href="https://www.giffgaff.com/auth/reset-password" target="_blank" rel="noreferrer">
            https://www.giffgaff.com/auth/reset-password
          </a>
        </li>
        <li>
          改邮箱或个人资料：
          {' '}<a href="https://www.giffgaff.com/profile/details" target="_blank" rel="noreferrer">
            https://www.giffgaff.com/profile/details
          </a>
        </li>
      </ul>

      <h2 id="change-number">更换号码</h2>
      <p>
        如果系统分配的号码历史使用痕迹太重，或者你单纯不喜欢当前号码，可以在允许时间段里申请随机换号。
      </p>
      <ol>
        <li>
          打开
          {' '}<a href="https://www.giffgaff.com/profile/details/getnumber" target="_blank" rel="noreferrer">
            https://www.giffgaff.com/profile/details/getnumber
          </a>
        </li>
        <li>点击 <code>Get a new giffgaff number</code>。</li>
        <li>输入密码后点击 <code>Change my number</code>。</li>
        <li>等待账户显示新号码和余额。</li>
      </ol>
      <ul>
        <li>通常存在可操作时间限制，某些时段不能换号。</li>
        <li>新号码和余额显示可能需要数小时。</li>
        <li>建议全程在 Wi-Fi 下操作。</li>
        <li>每个账户可换号次数有限，不要浪费。</li>
      </ul>

      <h2 id="esim">实体卡转 eSIM</h2>
      <p>
        如果你的手机支持 eSIM，且你不想继续插实体卡，可以把 giffgaff 实体卡迁移到 eSIM。
        这个流程对常用 iPhone 或支持 eSIM 的国际版设备比较友好。
      </p>
      <CodeBlock lang="text" filename="esim-flow" code={ESIM_FLOW} />
      <Callout tone="info" title="迁移后原实体卡会失效">
        <p>
          eSIM 激活成功后，原实体卡通常会变成无服务状态。迁移前先确认当前设备、Wi-Fi 和验证码接收路径都稳定。
        </p>
      </Callout>

      <h2 id="issues">常见问题</h2>
      <CodeBlock lang="text" filename="common-issues" code={COMMON_ISSUES} />

      <h3>为什么能收到 giffgaff 官方短信，却收不到某些平台注册短信？</h3>
      <p>
        这一般不是号码坏了，而是目标平台的风控策略拒绝向当前号码、当前国家、当前 IP 或当前注册环境发送短信。
        优先排查代理出口和 IP 纯净度。
      </p>

      <h3>这张卡适合做 ChatGPT / Codex 验证吗？</h3>
      <p>
        从用途上说，giffgaff 常被用作海外应用验证号，包括 AI 工具验证。但是否能成功接收某个平台验证码，
        仍然取决于该平台当时的风控策略、号码历史、IP 环境和地区限制，不能保证 100% 可用。
      </p>

      <h3>保号最省心的策略是什么？</h3>
      <p>
        最省心的是：设置 175 天提醒，到期前发一条短信，确认余额或账户状态已变动，然后重置下一次提醒。
      </p>

      <h2 id="references">参考资料</h2>
      <ul>
        <li>
          <a href="https://www.giffgaff.com/activate" target="_blank" rel="noreferrer">
            giffgaff 官方激活页
          </a>
        </li>
        <li>
          <a href="https://www.giffgaff.com/help/articles/how-do-i-get-an-esim-on-giffgaff" target="_blank" rel="noreferrer">
            giffgaff 官方 eSIM 说明
          </a>
        </li>
        <li>
          <a href="https://www.giffgaff.com/boiler-plate/contact" target="_blank" rel="noreferrer">
            giffgaff 官方客服
          </a>
        </li>
      </ul>
    </DocPage>
  )
}
