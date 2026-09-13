import{n as e}from"./ui-Caz9BZV8.js";import{n as t}from"./router-DpHSRQDQ.js";import{d as n}from"./Seo-zhKV3POX.js";import{t as r}from"./CodeBlock-D8kfQ6fq.js";import{c as i,l as a}from"./index-DCJmtdkW.js";var o=e(),s=`1. Keep the old version serving traffic
2. Deploy the new version to the idle environment
3. Switch traffic only after health and smoke checks pass
4. Keep the old version for a rollback window`,c=`1. Identify the active slot
2. Deploy the new version to the idle slot
3. Start the idle container
4. Wait for /ready to return 200
5. Run an internal smoke test
6. Point the proxy upstream to the idle slot
7. Reload the proxy
8. Verify /ready, /health, and core pages through the public hostname
9. Keep the old slot until the observation window ends`,l=`Health checks:
- /health: process and dependency liveness
- /ready: instance is prepared for real traffic
- Public smoke test: proxy, TLS, static assets, auth, database, and core API`,u=`1. If traffic has not switched, stop the new slot
2. If traffic has switched, point the upstream back to the old slot
3. Reload the reverse proxy
4. Verify public /ready, /health, and core flows
5. Restore the previous static-resource directory when needed
6. Record the cause before attempting the same release again`;function d(){return(0,o.jsxs)(a,{path:`/docs/guides/zero-downtime-release`,title:`Zero-Downtime Blue-Green Release Guide`,description:`Deploy a new version beside the active version, verify the real public path, switch traffic safely, and keep a fast rollback path.`,headings:[{id:`idea`,text:`The core idea`,level:2},{id:`precheck`,text:`Pre-release checks`,level:2},{id:`flow`,text:`Release flow`,level:2},{id:`proxy`,text:`Switching the proxy`,level:2},{id:`frontend`,text:`Frontend-only updates`,level:2},{id:`health`,text:`Health-check design`,level:2},{id:`rollback`,text:`Rollback`,level:2},{id:`risks`,text:`High-risk cases`,level:2},{id:`observe`,text:`Post-release observation`,level:2}],children:[(0,o.jsx)(i,{tone:`info`,title:`Blue-green release is controlled risk, not just faster deployment`,children:(0,o.jsx)(`p`,{children:`Keep the old version live while the new version is prepared in an idle slot. Move traffic only after the new slot passes checks, and preserve the old slot long enough to reverse the decision.`})}),(0,o.jsx)(`h2`,{id:`idea`,children:`The core idea`}),(0,o.jsx)(r,{lang:`text`,filename:`blue-green-idea`,code:s}),(0,o.jsx)(`p`,{children:`A typical path is DNS or CDN, then the reverse proxy, then one active upstream. The active slot may be blue while green is prepared, or the other way around. The proxy should switch the upstream without stopping the old container first.`}),(0,o.jsx)(`h2`,{id:`precheck`,children:`Pre-release checks`}),(0,o.jsxs)(`ul`,{children:[(0,o.jsx)(`li`,{children:`Record the branch, commit, image tag, and build artifact.`}),(0,o.jsx)(`li`,{children:`Confirm no important uncommitted change is being released accidentally.`}),(0,o.jsx)(`li`,{children:`Keep keys, environment files, certificates, and private documents out of Git.`}),(0,o.jsx)(`li`,{children:`Confirm database migrations are backward compatible with both versions.`}),(0,o.jsxs)(`li`,{children:[`Provide a real `,(0,o.jsx)(`code`,{children:`/health`}),` or `,(0,o.jsx)(`code`,{children:`/ready`}),` endpoint.`]}),(0,o.jsx)(`li`,{children:`Verify that the proxy can reload without interrupting connections.`}),(0,o.jsx)(`li`,{children:`Write down the rollback command before starting.`})]}),(0,o.jsx)(`h2`,{id:`flow`,children:`Release flow`}),(0,o.jsx)(r,{lang:`text`,filename:`release-flow`,code:c}),(0,o.jsx)(`p`,{children:`A container being “running” is not release evidence. Verify through the public hostname because users traverse DNS, CDN, TLS, the proxy, static assets, authentication, and backend APIs.`}),(0,o.jsx)(`h2`,{id:`proxy`,children:`Switching the proxy`}),(0,o.jsx)(`p`,{children:`Keep one explicit active-upstream configuration. Replace it with the idle slot and reload the proxy; do not stop the old container as part of the switch.`}),(0,o.jsx)(r,{lang:`caddyfile`,filename:`active-upstream.conf`,code:`reverse_proxy app-green:3000`}),(0,o.jsx)(r,{lang:`bash`,filename:`verify-release.sh`,code:`docker ps --format "table {{.Names}}\\t{{.Image}}\\t{{.Status}}"
cat caddy-upstreams/app-active.conf
curl -fsS https://example.com/ready
curl -fsS https://example.com/health`}),(0,o.jsx)(`h2`,{id:`frontend`,children:`Frontend-only updates`}),(0,o.jsx)(`p`,{children:`For copy, CSS, i18n, or page-only changes, publish the built static directory to a timestamped temporary path, verify its files and permissions, atomically swap it into place, and preserve the previous directory as a backup. Check the actual chunk files and browser console, not only the homepage status code.`}),(0,o.jsx)(`h2`,{id:`health`,children:`Health-check design`}),(0,o.jsx)(r,{lang:`text`,filename:`health-checks`,code:l}),(0,o.jsxs)(`p`,{children:[`Keep `,(0,o.jsx)(`code`,{children:`/health`}),` lightweight. Make `,(0,o.jsx)(`code`,{children:`/ready`}),` stricter: it should mean the instance can accept real traffic and its required dependencies are usable.`]}),(0,o.jsx)(`h2`,{id:`rollback`,children:`Rollback`}),(0,o.jsx)(r,{lang:`text`,filename:`rollback`,code:u}),(0,o.jsx)(`p`,{children:`Never invent rollback steps during an incident. Keep the old slot and its image or static-resource backup until the observation window has ended.`}),(0,o.jsx)(`h2`,{id:`risks`,children:`High-risk cases`}),(0,o.jsxs)(`ul`,{children:[(0,o.jsx)(`li`,{children:`Database migrations are not backward compatible.`}),(0,o.jsx)(`li`,{children:`Old and new versions cannot read the same data safely.`}),(0,o.jsx)(`li`,{children:`Queue consumers duplicate work or compete for locks.`}),(0,o.jsx)(`li`,{children:`Storage layout changes destructively.`}),(0,o.jsx)(`li`,{children:`The new process starts but no core smoke test exists.`}),(0,o.jsx)(`li`,{children:`Proxy reload behaviour has not been tested under live traffic.`})]}),(0,o.jsx)(`h2`,{id:`observe`,children:`Post-release observation`}),(0,o.jsxs)(`ul`,{children:[(0,o.jsxs)(`li`,{children:[`Public `,(0,o.jsx)(`code`,{children:`/ready`}),` and `,(0,o.jsx)(`code`,{children:`/health`}),` status codes.`]}),(0,o.jsx)(`li`,{children:`4xx and 5xx rates in proxy logs.`}),(0,o.jsx)(`li`,{children:`Recent errors from the new slot.`}),(0,o.jsx)(`li`,{children:`Core API latency and time to first byte.`}),(0,o.jsxs)(`li`,{children:[`Whether `,(0,o.jsx)(`code`,{children:`index.html`}),` references existing new chunks.`]}),(0,o.jsx)(`li`,{children:`Login, payment, and API-call flows from the user perspective.`})]}),(0,o.jsxs)(`p`,{children:[`For API integration, see the `,(0,o.jsx)(t,{to:`/docs/guides/complete-integration/`,children:`complete integration guide`}),`; for agent failures, see `,(0,o.jsx)(t,{to:`/docs/guides/codex-tool-recovery/`,children:`Codex tool recovery`}),`.`]})]})}var f=`无停服更新不是“发布速度快”，而是把风险拆成 4 个可控动作：

1. 老版本继续对外服务
2. 新版本先部署到空闲环境
3. 新版本健康检查通过后，再切换流量
4. 老版本保留一段时间，发现问题可以快速切回`,p=`用户请求
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
3. blue 暂时保留，作为回滚版本`,m=`发布前检查：

1. 确认当前分支、commit、镜像 tag 或构建产物版本
2. 确认本地没有未提交的关键变更
3. 确认私钥、ssh.md、.env、证书等敏感文件没有进入 Git
4. 确认数据库迁移是否向后兼容
5. 确认新版本有 /health 或 /ready 健康检查
6. 确认反向代理可以无中断 reload
7. 确认有明确回滚路径`,h=`标准蓝绿发布流程：

1. 识别当前 active 槽位
2. 选择 idle 槽位作为新版本部署目标
3. 拉取或构建新镜像
4. 启动 idle 槽位容器
5. 等待 idle 槽位 /ready 返回 200
6. 对 idle 槽位做内部 smoke test
7. 更新反向代理 upstream 到 idle 槽位
8. reload 反向代理
9. 通过公网域名验证 /ready、/health 和核心页面
10. 保留旧槽位一段时间，用于快速回滚`,g=`services:
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
      retries: 30`,_=`# caddy-upstreams/app-active.conf
reverse_proxy app-blue:3000`,v=`# caddy-upstreams/app-active.conf
reverse_proxy app-green:3000`,y=`# 1. 查看当前运行状态
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
curl -fsS https://example.com/health`,b=`前端静态资源热更新策略：

1. 本地构建前端 dist
2. 打包 dist，避免带入 macOS ._* 文件
3. 上传到服务器临时目录
4. 解压到 data/public.new-时间戳
5. 校验文件完整性和权限
6. 把旧 data/public 原子移动为备份目录
7. 把 public.new 原子切换为 data/public
8. 让新槽位读取静态资源目录
9. 健康检查通过后切换流量
10. 保留旧 public 目录用于回滚`,x=`回滚流程：

1. 如果新槽位还没切流量：停止新槽位，继续保留旧版本
2. 如果已经切流量：把 upstream 改回旧槽位
3. reload 反向代理
4. 通过公网域名验证 /ready、/health 和核心业务
5. 如果是前端静态资源问题，把 data/public.bak 恢复为 data/public
6. 记录失败原因，禁止在未定位原因前重复发布同一版本`,S=`建议至少准备 3 层检查：

1. /health
   进程是否存活，依赖是否能初始化

2. /ready
   当前实例是否已经准备好接收真实流量

3. smoke test
   用公网域名访问核心页面或核心 API，确认反向代理、静态资源、鉴权和数据库都正常`,C=`这些情况不适合直接蓝绿切换：

1. 数据库迁移不向后兼容
2. 新旧版本不能同时连接同一份数据
3. 消息队列消费者会重复消费或抢锁
4. 文件存储目录结构被破坏性变更
5. 新版本启动成功，但核心业务没有 smoke test
6. 反向代理 reload 会中断连接，且没有验证过`,w=`发布后观察：

1. 公网 /ready 和 /health 状态码
2. 反向代理日志里的 4xx / 5xx
3. 新槽位容器最近 5-10 分钟错误日志
4. 核心接口延迟和首包时间
5. 前端 index.html 是否引用新 chunk
6. 控制台是否出现静态资源 404
7. 用户侧是否有登录、支付、API 调用等关键链路异常`;function T({headers:e,rows:t}){return(0,o.jsx)(`div`,{className:`not-prose my-6 overflow-x-auto rounded-lg border border-white/5`,children:(0,o.jsxs)(`table`,{className:`w-full min-w-[46rem] text-left text-sm`,children:[(0,o.jsx)(`thead`,{className:`bg-white/[0.03] text-[11px] uppercase tracking-wider text-ink-400`,children:(0,o.jsx)(`tr`,{children:e.map(e=>(0,o.jsx)(`th`,{className:`px-4 py-2.5 font-medium`,children:e},e))})}),(0,o.jsx)(`tbody`,{children:t.map((e,t)=>(0,o.jsx)(`tr`,{className:`border-t border-white/5 align-top`+(t%2==1?` bg-white/[0.012]`:``),children:e.map((e,t)=>(0,o.jsx)(`td`,{className:`px-4 py-3 text-[13px] leading-relaxed text-ink-200`,children:e},t))},t))})]})})}function E(){let{locale:e}=n();return e===`zh`?(0,o.jsxs)(a,{path:`/docs/guides/zero-downtime-release`,title:`无停服更新技术方案`,description:`基于反向代理、蓝绿槽位、健康检查、原子切流和快速回滚的无停服发布教程，适合 1Panel、Docker Compose、Caddy / Nginx 部署场景。`,headings:[{id:`goal`,text:`方案目标`,level:2},{id:`core`,text:`核心思路`,level:2},{id:`architecture`,text:`推荐架构`,level:2},{id:`precheck`,text:`发布前检查`,level:2},{id:`flow`,text:`标准发布流程`,level:2},{id:`compose`,text:`Docker Compose 示例`,level:2},{id:`proxy`,text:`反向代理切流`,level:2},{id:`frontend`,text:`前端静态资源热更新`,level:2},{id:`health`,text:`健康检查设计`,level:2},{id:`rollback`,text:`回滚方案`,level:2},{id:`risks`,text:`高风险场景`,level:2},{id:`observe`,text:`发布后观察`,level:2},{id:`next`,text:`下一步`,level:2}],children:[(0,o.jsx)(i,{tone:`info`,title:`适用范围`,children:(0,o.jsx)(`p`,{children:`本文适合使用 1Panel、Docker Compose、Caddy、Nginx 或 Traefik 部署的 Web / API 服务。 核心思想是蓝绿发布：新版本先在空闲槽位跑起来，验证通过后再切流量。`})}),(0,o.jsx)(`h2`,{id:`goal`,children:`方案目标`}),(0,o.jsx)(`p`,{children:`无停服更新的目标不是“永远不会出错”，而是让发布过程具备可验证、可切换、可回滚的工程结构。 用户请求始终由一个健康版本承接，新版本只有在通过检查后才进入生产流量。`}),(0,o.jsx)(T,{headers:[`目标`,`做法`,`结果`],rows:[[`不中断访问`,`旧版本继续服务，新版本在空闲槽位启动`,`用户请求不会打到未启动完成的实例`],[`降低发布风险`,`先内部健康检查，再公网 smoke test`,`问题在切流前暴露`],[`快速回滚`,`旧槽位不立刻停止`,`新版本异常时可以切回旧 upstream`],[`便于审计`,`记录镜像 tag、commit、active 槽位、验证结果`,`出问题时能定位是哪次发布引入`]]}),(0,o.jsx)(`h2`,{id:`core`,children:`核心思路`}),(0,o.jsx)(r,{lang:`text`,filename:`core-idea`,code:f}),(0,o.jsx)(`p`,{children:`传统发布经常是“停旧服务、替换文件、启动新服务”。这会带来窗口期： 新服务启动慢、健康检查失败、静态资源不完整、数据库迁移异常，都会直接影响用户。 蓝绿发布把这些动作移到空闲槽位完成，最后只做一次反向代理切换。`}),(0,o.jsx)(`h2`,{id:`architecture`,children:`推荐架构`}),(0,o.jsx)(r,{lang:`text`,filename:`architecture`,code:p}),(0,o.jsx)(T,{headers:[`组件`,`职责`,`关键要求`],rows:[[`反向代理`,`接收公网请求，并转发到 active 槽位`,`支持 reload，不应重启导致断流`],[`blue 槽位`,`一个完整应用实例`,`能独立提供服务`],[`green 槽位`,`另一个完整应用实例`,`与 blue 共享同一套外部依赖，但端口或容器名隔离`],[`健康检查`,`判断实例是否可接流量`,`不能只检查进程存在，要检查依赖是否可用`],[`回滚入口`,`把 active upstream 指回旧槽位`,`必须简单、明确、可重复执行`]]}),(0,o.jsx)(`h2`,{id:`precheck`,children:`发布前检查`}),(0,o.jsx)(i,{tone:`warn`,title:`数据库迁移要单独评估`,children:(0,o.jsx)(`p`,{children:`蓝绿发布不能自动解决破坏性数据库变更。如果新旧版本不能同时兼容同一份数据， 需要先做兼容迁移、灰度字段或双写方案。`})}),(0,o.jsx)(r,{lang:`text`,filename:`precheck`,code:m}),(0,o.jsx)(`h2`,{id:`flow`,children:`标准发布流程`}),(0,o.jsx)(r,{lang:`text`,filename:`release-flow`,code:h}),(0,o.jsx)(`p`,{children:`判断发布是否成功，不能只看容器是否 running。必须从公网域名验证真实路径， 因为用户访问链路还包括 DNS、CDN、TLS、反向代理、静态资源和后端接口。`}),(0,o.jsx)(`h2`,{id:`compose`,children:`Docker Compose 示例`}),(0,o.jsx)(`p`,{children:`下面是简化示例。真实生产环境还会包含网络、卷、环境变量、日志、资源限制和反向代理配置。`}),(0,o.jsx)(r,{lang:`yaml`,filename:`docker-compose.bluegreen.yml`,code:g}),(0,o.jsx)(`h2`,{id:`proxy`,children:`反向代理切流`}),(0,o.jsx)(`p`,{children:`反向代理层只维护一个 active upstream 文件。切流时替换这个文件并 reload 代理， 不直接停止旧容器。`}),(0,o.jsx)(r,{lang:`caddyfile`,filename:`blue-active.conf`,code:_}),(0,o.jsx)(r,{lang:`caddyfile`,filename:`green-active.conf`,code:v}),(0,o.jsx)(r,{lang:`bash`,filename:`release-commands.sh`,code:y}),(0,o.jsx)(`h2`,{id:`frontend`,children:`前端静态资源热更新`}),(0,o.jsx)(`p`,{children:`如果只是改文案、样式、前端页面或 i18n 文案，不一定需要重建后端镜像。 可以把前端产物作为静态资源覆盖目录发布，再通过新槽位加载新资源。`}),(0,o.jsx)(r,{lang:`text`,filename:`frontend-only-hotfix`,code:b}),(0,o.jsx)(i,{tone:`tip`,title:`静态资源验证要看真实文件`,children:(0,o.jsxs)(`p`,{children:[`前端发布后不要只看首页状态码。还要检查 `,(0,o.jsx)(`code`,{children:`index.html`}),` 引用的 chunk 是否存在，关键文案是否出现在新 chunk 中，浏览器控制台是否有 404。`]})}),(0,o.jsx)(`h2`,{id:`health`,children:`健康检查设计`}),(0,o.jsx)(r,{lang:`text`,filename:`health-checks`,code:S}),(0,o.jsxs)(`p`,{children:[(0,o.jsx)(`code`,{children:`/health`}),` 可以很轻，表示进程活着；`,(0,o.jsx)(`code`,{children:`/ready`}),` 应该更严格， 表示实例可以接流量。发布切流必须以 ready 为准。`]}),(0,o.jsx)(`h2`,{id:`rollback`,children:`回滚方案`}),(0,o.jsx)(r,{lang:`text`,filename:`rollback`,code:x}),(0,o.jsx)(`p`,{children:`回滚方案要在发布前就存在，而不是线上出问题后临时想。最实用的做法是： 新版本切流后不要立刻停止旧槽位，至少保留到观察窗口结束。`}),(0,o.jsx)(`h2`,{id:`risks`,children:`高风险场景`}),(0,o.jsx)(r,{lang:`text`,filename:`danger-list`,code:C}),(0,o.jsx)(`h2`,{id:`observe`,children:`发布后观察`}),(0,o.jsx)(r,{lang:`text`,filename:`post-release`,code:w}),(0,o.jsx)(`p`,{children:`建议每次发布都记录：发布时间、commit、镜像 tag、切换前 active 槽位、切换后 active 槽位、 健康检查结果、smoke test 结果和是否保留旧槽位。`}),(0,o.jsx)(`h2`,{id:`next`,children:`下一步`}),(0,o.jsxs)(`ul`,{children:[(0,o.jsxs)(`li`,{children:[`如果你要把 gpt88.cc API 接入应用，可以先看`,` `,(0,o.jsx)(t,{to:`/docs/guides/complete-integration/`,children:`完整接入手册`}),`。`]}),(0,o.jsxs)(`li`,{children:[`如果你要配置开发工具，可以看 `,(0,o.jsx)(t,{to:`/docs/integrations/`,children:`集成指南`}),`。`]}),(0,o.jsxs)(`li`,{children:[`如果你要排查 Codex 执行中断，可以看`,` `,(0,o.jsx)(t,{to:`/docs/guides/codex-tool-recovery/`,children:`Codex 工具恢复`}),`。`]})]})]}):(0,o.jsx)(d,{})}export{E as default};