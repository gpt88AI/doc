import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { CodeBlock } from '../../../components/ui/CodeBlock'
import { Callout } from '../../../components/ui/Callout'

const CORE_IDEA = `无停服更新不是“发布速度快”，而是把风险拆成 4 个可控动作：

1. 老版本继续对外服务
2. 新版本先部署到空闲环境
3. 新版本健康检查通过后，再切换流量
4. 老版本保留一段时间，发现问题可以快速切回`

const ARCHITECTURE = `用户请求
  ↓
域名 / CDN / DNS
  ↓
反向代理层（Caddy / Nginx / Traefik）
  ↓
当前 active upstream
  ├─ app-blue   当前生产版本
  └─ app-green  空闲发布槽位

发布时：
1. 如果 blue 正在对外服务，就把新版本部署到 green
2. green 健康检查通过后，把反向代理 upstream 指向 green
3. blue 暂时保留，作为回滚版本`

const PRECHECK = `发布前检查：

1. 确认当前分支、commit、镜像 tag 或构建产物版本
2. 确认本地没有未提交的关键变更
3. 确认私钥、ssh.md、.env、证书等敏感文件没有进入 Git
4. 确认数据库迁移是否向后兼容
5. 确认新版本有 /health 或 /ready 健康检查
6. 确认反向代理可以无中断 reload
7. 确认有明确回滚路径`

const DEPLOY_FLOW = `标准蓝绿发布流程：

1. 识别当前 active 槽位
2. 选择 idle 槽位作为新版本部署目标
3. 拉取或构建新镜像
4. 启动 idle 槽位容器
5. 等待 idle 槽位 /ready 返回 200
6. 对 idle 槽位做内部 smoke test
7. 更新反向代理 upstream 到 idle 槽位
8. reload 反向代理
9. 通过公网域名验证 /ready、/health 和核心页面
10. 保留旧槽位一段时间，用于快速回滚`

const EXAMPLE_COMPOSE = `services:
  app-blue:
    image: ghcr.io/example/app:2026-05-27-001
    container_name: app-blue
    environment:
      - APP_SLOT=blue
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/ready"]
      interval: 10s
      timeout: 3s
      retries: 30

  app-green:
    image: ghcr.io/example/app:2026-05-27-002
    container_name: app-green
    environment:
      - APP_SLOT=green
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/ready"]
      interval: 10s
      timeout: 3s
      retries: 30`

const UPSTREAM_BLUE = `# caddy-upstreams/app-active.conf
reverse_proxy app-blue:3000`

const UPSTREAM_GREEN = `# caddy-upstreams/app-active.conf
reverse_proxy app-green:3000`

const RELEASE_COMMANDS = `# 1. 查看当前运行状态
docker ps --format "table {{.Names}}\\t{{.Image}}\\t{{.Status}}"

# 2. 查看当前 active upstream
cat caddy-upstreams/app-active.conf

# 3. 启动空闲槽位
docker compose up -d app-green

# 4. 等待健康检查
curl -fsS http://app-green:3000/ready

# 5. 切换 upstream 后 reload 反向代理
docker compose exec caddy caddy reload --config /etc/caddy/Caddyfile

# 6. 从公网域名验证
curl -fsS https://example.com/ready
curl -fsS https://example.com/health`

const FRONTEND_ONLY = `前端静态资源热更新策略：

1. 本地构建前端 dist
2. 打包 dist，避免带入 macOS ._* 文件
3. 上传到服务器临时目录
4. 解压到 data/public.new-时间戳
5. 校验文件完整性和权限
6. 把旧 data/public 原子移动为备份目录
7. 把 public.new 原子切换为 data/public
8. 让新槽位读取静态资源目录
9. 健康检查通过后切换流量
10. 保留旧 public 目录用于回滚`

const ROLLBACK = `回滚流程：

1. 如果新槽位还没切流量：停止新槽位，继续保留旧版本
2. 如果已经切流量：把 upstream 改回旧槽位
3. reload 反向代理
4. 通过公网域名验证 /ready、/health 和核心业务
5. 如果是前端静态资源问题，把 data/public.bak 恢复为 data/public
6. 记录失败原因，禁止在未定位原因前重复发布同一版本`

const HEALTH_CHECKS = `建议至少准备 3 层检查：

1. /health
   进程是否存活，依赖是否能初始化

2. /ready
   当前实例是否已经准备好接收真实流量

3. smoke test
   用公网域名访问核心页面或核心 API，确认反向代理、静态资源、鉴权和数据库都正常`

const DANGER_LIST = `这些情况不适合直接蓝绿切换：

1. 数据库迁移不向后兼容
2. 新旧版本不能同时连接同一份数据
3. 消息队列消费者会重复消费或抢锁
4. 文件存储目录结构被破坏性变更
5. 新版本启动成功，但核心业务没有 smoke test
6. 反向代理 reload 会中断连接，且没有验证过`

const POST_RELEASE = `发布后观察：

1. 公网 /ready 和 /health 状态码
2. 反向代理日志里的 4xx / 5xx
3. 新槽位容器最近 5-10 分钟错误日志
4. 核心接口延迟和首包时间
5. 前端 index.html 是否引用新 chunk
6. 控制台是否出现静态资源 404
7. 用户侧是否有登录、支付、API 调用等关键链路异常`

function DocTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: React.ReactNode[][]
}) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-white/5">
      <table className="w-full min-w-[46rem] text-left text-sm">
        <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-ink-400">
          <tr>
            {headers.map(h => (
              <th key={h} className="px-4 py-2.5 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={i}
              className={
                'border-t border-white/5 align-top' +
                (i % 2 === 1 ? ' bg-white/[0.012]' : '')
              }
            >
              {r.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-[13px] leading-relaxed text-ink-200">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function ZeroDowntimeReleasePage() {
  return (
    <DocPage
      path="/docs/guides/zero-downtime-release"
      title="无停服更新技术方案"
      description="基于反向代理、蓝绿槽位、健康检查、原子切流和快速回滚的无停服发布教程，适合 1Panel、Docker Compose、Caddy / Nginx 部署场景。"
      headings={[
        { id: 'goal', text: '方案目标', level: 2 },
        { id: 'core', text: '核心思路', level: 2 },
        { id: 'architecture', text: '推荐架构', level: 2 },
        { id: 'precheck', text: '发布前检查', level: 2 },
        { id: 'flow', text: '标准发布流程', level: 2 },
        { id: 'compose', text: 'Docker Compose 示例', level: 2 },
        { id: 'proxy', text: '反向代理切流', level: 2 },
        { id: 'frontend', text: '前端静态资源热更新', level: 2 },
        { id: 'health', text: '健康检查设计', level: 2 },
        { id: 'rollback', text: '回滚方案', level: 2 },
        { id: 'risks', text: '高风险场景', level: 2 },
        { id: 'observe', text: '发布后观察', level: 2 },
        { id: 'next', text: '下一步', level: 2 },
      ]}
    >
      <Callout tone="info" title="适用范围">
        <p>
          本文适合使用 1Panel、Docker Compose、Caddy、Nginx 或 Traefik 部署的 Web / API 服务。
          核心思想是蓝绿发布：新版本先在空闲槽位跑起来，验证通过后再切流量。
        </p>
      </Callout>

      <h2 id="goal">方案目标</h2>
      <p>
        无停服更新的目标不是“永远不会出错”，而是让发布过程具备可验证、可切换、可回滚的工程结构。
        用户请求始终由一个健康版本承接，新版本只有在通过检查后才进入生产流量。
      </p>
      <DocTable
        headers={['目标', '做法', '结果']}
        rows={[
          ['不中断访问', '旧版本继续服务，新版本在空闲槽位启动', '用户请求不会打到未启动完成的实例'],
          ['降低发布风险', '先内部健康检查，再公网 smoke test', '问题在切流前暴露'],
          ['快速回滚', '旧槽位不立刻停止', '新版本异常时可以切回旧 upstream'],
          ['便于审计', '记录镜像 tag、commit、active 槽位、验证结果', '出问题时能定位是哪次发布引入'],
        ]}
      />

      <h2 id="core">核心思路</h2>
      <CodeBlock lang="text" filename="core-idea" code={CORE_IDEA} />
      <p>
        传统发布经常是“停旧服务、替换文件、启动新服务”。这会带来窗口期：
        新服务启动慢、健康检查失败、静态资源不完整、数据库迁移异常，都会直接影响用户。
        蓝绿发布把这些动作移到空闲槽位完成，最后只做一次反向代理切换。
      </p>

      <h2 id="architecture">推荐架构</h2>
      <CodeBlock lang="text" filename="architecture" code={ARCHITECTURE} />
      <DocTable
        headers={['组件', '职责', '关键要求']}
        rows={[
          ['反向代理', '接收公网请求，并转发到 active 槽位', '支持 reload，不应重启导致断流'],
          ['blue 槽位', '一个完整应用实例', '能独立提供服务'],
          ['green 槽位', '另一个完整应用实例', '与 blue 共享同一套外部依赖，但端口或容器名隔离'],
          ['健康检查', '判断实例是否可接流量', '不能只检查进程存在，要检查依赖是否可用'],
          ['回滚入口', '把 active upstream 指回旧槽位', '必须简单、明确、可重复执行'],
        ]}
      />

      <h2 id="precheck">发布前检查</h2>
      <Callout tone="warn" title="数据库迁移要单独评估">
        <p>
          蓝绿发布不能自动解决破坏性数据库变更。如果新旧版本不能同时兼容同一份数据，
          需要先做兼容迁移、灰度字段或双写方案。
        </p>
      </Callout>
      <CodeBlock lang="text" filename="precheck" code={PRECHECK} />

      <h2 id="flow">标准发布流程</h2>
      <CodeBlock lang="text" filename="release-flow" code={DEPLOY_FLOW} />
      <p>
        判断发布是否成功，不能只看容器是否 running。必须从公网域名验证真实路径，
        因为用户访问链路还包括 DNS、CDN、TLS、反向代理、静态资源和后端接口。
      </p>

      <h2 id="compose">Docker Compose 示例</h2>
      <p>
        下面是简化示例。真实生产环境还会包含网络、卷、环境变量、日志、资源限制和反向代理配置。
      </p>
      <CodeBlock lang="yaml" filename="docker-compose.bluegreen.yml" code={EXAMPLE_COMPOSE} />

      <h2 id="proxy">反向代理切流</h2>
      <p>
        反向代理层只维护一个 active upstream 文件。切流时替换这个文件并 reload 代理，
        不直接停止旧容器。
      </p>
      <CodeBlock lang="caddyfile" filename="blue-active.conf" code={UPSTREAM_BLUE} />
      <CodeBlock lang="caddyfile" filename="green-active.conf" code={UPSTREAM_GREEN} />
      <CodeBlock lang="bash" filename="release-commands.sh" code={RELEASE_COMMANDS} />

      <h2 id="frontend">前端静态资源热更新</h2>
      <p>
        如果只是改文案、样式、前端页面或 i18n 文案，不一定需要重建后端镜像。
        可以把前端产物作为静态资源覆盖目录发布，再通过新槽位加载新资源。
      </p>
      <CodeBlock lang="text" filename="frontend-only-hotfix" code={FRONTEND_ONLY} />
      <Callout tone="tip" title="静态资源验证要看真实文件">
        <p>
          前端发布后不要只看首页状态码。还要检查 <code>index.html</code> 引用的 chunk
          是否存在，关键文案是否出现在新 chunk 中，浏览器控制台是否有 404。
        </p>
      </Callout>

      <h2 id="health">健康检查设计</h2>
      <CodeBlock lang="text" filename="health-checks" code={HEALTH_CHECKS} />
      <p>
        <code>/health</code> 可以很轻，表示进程活着；<code>/ready</code> 应该更严格，
        表示实例可以接流量。发布切流必须以 ready 为准。
      </p>

      <h2 id="rollback">回滚方案</h2>
      <CodeBlock lang="text" filename="rollback" code={ROLLBACK} />
      <p>
        回滚方案要在发布前就存在，而不是线上出问题后临时想。最实用的做法是：
        新版本切流后不要立刻停止旧槽位，至少保留到观察窗口结束。
      </p>

      <h2 id="risks">高风险场景</h2>
      <CodeBlock lang="text" filename="danger-list" code={DANGER_LIST} />

      <h2 id="observe">发布后观察</h2>
      <CodeBlock lang="text" filename="post-release" code={POST_RELEASE} />
      <p>
        建议每次发布都记录：发布时间、commit、镜像 tag、切换前 active 槽位、切换后 active 槽位、
        健康检查结果、smoke test 结果和是否保留旧槽位。
      </p>

      <h2 id="next">下一步</h2>
      <ul>
        <li>
          如果你要把 gpt88.cc API 接入应用，可以先看{' '}
          <Link to="/docs/guides/complete-integration">完整接入手册</Link>。
        </li>
        <li>
          如果你要配置开发工具，可以看 <Link to="/docs/integrations">集成指南</Link>。
        </li>
        <li>
          如果你要排查 Codex 执行中断，可以看{' '}
          <Link to="/docs/guides/codex-tool-recovery">Codex 工具恢复</Link>。
        </li>
      </ul>
    </DocPage>
  )
}
