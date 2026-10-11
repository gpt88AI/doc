---
title: 用 Tailscale 和 Orca 把 Claude Code 放进长期在线的远程开发环境
description: 整理 AppSail 关于 Grok Bot 云电脑、Tailscale、Orca Remote Server 与 Claude Code 的实践，拆解远程连接、更新恢复、定时自检和故障排查，并标出账号与权限风险边界。
date: 2026-10-11
category: 开发工具
tags: [Claude Code, Orca, Tailscale, Grok Bot, 远程开发, Agent]
readTime: 18
---

> 来源：[AppSail 的 X 长文《把这篇文章丢给 Grok Bot：给你注册 Claude，搭配 Orca + Tailscale，打造 7×24 在线的 Claude Code 云主机》](https://x.com/app_sail/status/2108523630900748335)，原文发表于 2026 年 10 月 9 日。本文整理其中的远程开发架构、连接方式、更新恢复和排错经验；账号注册、订阅支付、地区可用性与平台风控属于原作者个人经历，不是 Anthropic 的官方规则，也不能保证账号不会被限制。本文不复述规避检测、绕过服务限制或跳过权限确认的操作。

![Grok Bot、Tailscale、Orca 与 Claude Code 的远程开发环境封面](/docs/blog/zh/grok-bot-tailscale-orca-claude-code/img/cover.jpg)

## 先看这套架构解决什么问题

这套实践的目标是把 Claude Code 放到一台长期在线的 Linux 云电脑里，让 MacBook 和手机通过 Tailscale 接入，再用 Orca Remote Server 查看和控制远程会话。设备合上盖子或切换网络后，云端任务仍能继续；日常操作可以从 Orca 客户端完成，也可以让云端 Agent 代为查看任务状态。

架构可以画成三层：

```text
MacBook / iPhone
       │ Tailscale tailnet
       ▼
远程 Linux 云电脑
  ├─ Orca Remote Server :6768
  ├─ Claude Code
  └─ Tailscale / 恢复与健康检查
```

原文以 Grok Bot 自带的美国云电脑为例，记录了 8 核、16 GB 内存的实例；换成自己的 VPS 后，Tailscale、Orca 和 Claude Code 三层仍然适用。云电脑是否会被替换、哪些目录会保留、是否提供 systemd，要以实际平台为准。

## 重要边界：环境稳定不等于账号安全

原文明确提醒：把 Claude Code 放进美国云电脑，不是防封教程，也不能保证账号正常。Anthropic 的可用地区、订阅条款、账号审核和风控由服务方决定。地区、出口 IP、支付资料和登录行为都可能影响可用性，任何“长期稳定”都不能从一台机器的短期体验推导出来。

因此，文章中的注册、订阅、支付和登录环节只应由账号所有者在官方页面亲自完成。不要把密码、验证码、卡号、授权码、API Key 或 Tailscale 状态文件贴进 Agent 对话，也不要把“跳过所有权限确认”当作通用建议。远程环境越自动化，越要把发送、发布、付款、生产修改和账号授权留在人手里。

## 一、动手前的三项准备

### 1. 统一云电脑时区

原文建议在云电脑设置中选择与出口所在地相符的时区，并用 `date` 检查。修改时要注意：

- 该设置可能对同一台云电脑上的所有 Bot 生效；
- 已经运行的程序通常需要重启才会读取新时区；
- 时区只是环境一致性信号，不是账号可用性的证明。

### 2. 不要把云电脑流量绕回本机

如果平台有“让云电脑网络流量经过本机”的选项，远程开发场景通常应保持关闭，让云电脑使用自己的网络出口。若必须经过本机代理，应把它当作明确的网络架构选择，记录出口、DNS、延迟和故障回退方式，不要误以为远程机器仍然拥有独立出口。

### 3. 先准备 Tailscale 连接方式

原文使用一个现成的 Grok Bot 来安装 Tailscale。换成其他平台时，目标不变：云电脑和你的 MacBook、手机加入同一个 tailnet，开启 MagicDNS，并让远程端只在 tailnet 内提供 Orca 端口。

## 二、Tailscale：先建立受控的设备网络

Tailscale 是这套架构的第一层。完成后，云电脑应当能被设备通过稳定的节点名访问，而不是依赖可能变化的 `100.x.x.x` 地址。

### 1. 节点与访问控制

原文示例把节点命名为 `grok-bot`，并通过 Tailscale SSH 连接：

```bash
ssh box@grok-bot
```

实际节点名可能是 `grok-bot-1` 或其他名称。不要照抄示例主机名和 IP；先从 Tailscale 管理后台和云电脑的实际输出确认。ACL 要限制到自己的设备和必要身份，避免让任意 Agent 继承你个人身份后访问整个 tailnet。

### 2. 登录与恢复

原文为 Tailscale 准备了以下恢复思路：

- 在 `~/.tailscale/` 保存可重复执行的 bootstrap 脚本；
- 将状态文件和 SSH host key 备份到 home 目录；
- 每 5 分钟检查 Tailscale 是否仍在线，掉线后尝试恢复；
- 每周检查节点密钥的剩余有效期。

备份文件只检查属主和权限，不要把状态文件内容输出到聊天中。建议使用 `ls -l`、服务状态和连接测试验证恢复，而不是 `cat` 敏感状态文件。

### 3. 完成标准

- 云电脑上 `tailscale ip -4` 返回 tailnet 地址；
- 自己的电脑能通过 `ssh box@<实际节点名>` 连接；
- MacBook 能 `ping <实际节点名>`，手机的 Tailscale App 能看到云电脑；
- 恢复脚本存在，状态备份由云电脑用户拥有且权限收紧；
- 定时任务能够报告恢复结果，但不会把密钥或登录状态写入日志。

## 三、在云电脑上准备 Claude Code

原文把账号注册、订阅和命令行登录全部放在云电脑上完成，目的是让运行环境、项目目录和日常会话保持在同一台机器。这里需要把技术步骤和账号动作分开：

1. 账号注册、邮箱验证码、订阅和支付由人亲自完成，只使用官方入口。
2. 密码、验证码、卡号和授权码只在云电脑的官方页面或终端提示中输入，不发给 Agent。
3. Claude Code 使用官方安装方式，并确认安装在 home 目录中，避免平台更新时丢失。
4. 登录完成后只验证命令是否可用和订阅状态，不打印 token、cookie 或本地授权文件。

原文给出的安装示例是：

```bash
curl -fsSL https://claude.ai/install.sh | bash
command -v claude
claude --version
claude auth status
```

安装脚本属于外部执行动作，使用前应核对当前官方文档和脚本内容。若平台不允许执行远程脚本，应改用官方提供的其他安装包，并记录版本和来源。

## 四、安装 Orca Remote Server

Orca 在云电脑上以服务模式运行，不需要打开桌面窗口，监听 `6768`，等待 MacBook 和手机连接。原文选择官方 AppImage，把文件放在 `~/.orca/`，再用启动脚本和定时任务补上没有 systemd 的平台能力。

### 1. 端口只在 tailnet 内开放

`6768` 不应暴露到公网。至少需要同时满足：

- 服务监听地址和防火墙规则只允许 loopback 与 Tailscale 接口；
- 公网扫描不能直接访问 Orca；
- 客户端通过 MagicDNS 节点名或受控的 tailnet 地址连接；
- 需要公网访问时，先加 TLS、认证、访问控制和审计，再评估是否真的必要。

### 2. 运行与幂等

原文的启动脚本负责三件事：确保必要防火墙规则存在；没有运行时才启动 Orca；已有服务时直接退出。脚本应当可重复执行，不能因为定时任务再次触发就启动多个服务。

不要用 `pkill -f orca` 重启。一个 Orca 进程可能管理多个 Claude Code 会话，这样做会把所有任务一起杀掉。只使用项目提供的受控重启命令，并在重启前说明会影响哪些会话。

可以用下面的非敏感检查确认状态：

```bash
~/.orca/orca-serve.sh --version
ss -ltn | grep ':6768 '
sudo -n iptables -S INPUT 2>/dev/null | head -4
```

不要把配对链接、二维码或日志中完整凭据复制到文章、Issue 或聊天记录。

### 3. 运行时目录与服务文件

原文指出 AppImage 放在 home 目录，平台更新后更容易保留；服务日志、PID 和恢复脚本也放在 home 目录，便于重新执行。实际平台可能清空 home 中的部分文件，因此仍要把项目代码推到 Git，并为安装包、脚本和配置准备可重复恢复路径。

## 五、从 MacBook 和手机配对

### MacBook

1. 确认 MacBook 的 Tailscale 已登录同一 tailnet，MagicDNS 已开启。
2. 在 Orca 的 Remote Orca Servers 中添加远程主机。
3. 粘贴专用于桌面端的配对链接。
4. 确认状态显示 `Connected`，再打开远程项目和 Claude Code 会话。

### 手机

1. 安装 Tailscale 并登录同一账号。
2. 安装 Orca 手机 App，进入 Pair。
3. 使用专用于手机的二维码完成配对。

电脑端配对链接和手机端二维码不是同一种凭据，不能混用。配对完成后，在设备之间切换应能继续看到相同的项目和会话。若 Orca 再次要求登录，先检查是否只是首次设置向导没有完成，不要立刻删除授权状态。

## 六、让 Agent 查看和调度远程会话

原文把 Grok Bot 放在同一台云电脑上，让它通过 Orca CLI 查看和调度 Claude Code。典型命令包括：

```bash
orca worktree ps
orca terminal list
orca terminal read
orca terminal send
orca terminal wait --for tui-idle
orca terminal create
orca worktree create --name <name> --agent claude
orca search <keyword>
```

先运行 `orca agent-context`，阅读当前机器上实际可用的命令和参数；不同版本的 CLI 可能变化。把“查状态 → 发指令 → 等待空闲 → 读回输出”写成 Skill，可以减少每次沟通的重复说明。

建议给远程 Agent 加一条明确的人工确认边界：调研、起草、测试和整理文件可以自动完成；发送、发布、付款、删除、修改生产环境和账号授权必须回到人手里。远程 Agent 不应持有超过当前任务所需的密钥和权限。

## 七、平台更新后的恢复设计

原文最有价值的经验不是某一条命令，而是把云电脑当成可能被替换的实例。更新可能导致：

- `/opt`、`/usr/local/bin`、`/var/lib/tailscale` 等系统目录中的安装消失；
- 开机脚本的自定义修改被覆盖；
- 正在运行的 Agent 任务被中断；
- Tailscale 节点重新登录后换 IP 或出现带后缀的新节点名；
- 只有 root 可读的备份文件无法随 home 快照恢复。

恢复清单应该包含：

1. 检查节点名、Tailscale 在线状态和 tailnet IP。
2. 执行 Tailscale bootstrap，确认节点恢复到同一访问策略。
3. 检查防火墙依赖是否存在；缺少 `iptables` 时先恢复依赖。
4. 执行 Orca 启动脚本，确认 `6768` 只在受控接口可达。
5. 检查 Claude Code 安装、版本和登录状态，不输出凭据。
6. 运行只读自检脚本，确认项目、会话和定时任务。
7. 从 Git 拉回重要代码和配置，重新配对设备（如节点身份已改变）。

恢复动作应当可重复、可审计。脚本修改用“写临时文件后原子替换”，不要原地改写正在运行的 watchdog。每次更新后还应检查项目是否仍在建议的持久化目录；平台文档若推荐 `/workspace`，新项目优先在那里创建。

## 八、常见故障

### Tailscale IP 变了

原因可能是重新登录生成了新节点。优先使用 MagicDNS 节点名，避免把易变 IP 写死在配对配置中；若节点身份已经更换，清理后台旧节点后重新配对。

### 云电脑更新后软件全没了

不要只重启 Orca。按恢复清单检查 home 目录中的安装包、bootstrap 脚本、定时任务和 Git 仓库，再逐层恢复 Tailscale、Orca、Claude Code 和设备配对。

### watchdog 无法再次启动

原文发现 watchdog 的锁文件描述符被子进程继承，导致旧进程退出后新 watchdog 仍抢不到锁。修复方向是让子进程关闭继承的锁 fd，并确保每个实例有明确的 PID 和退出日志。

### Tailscale 控制面显示离线

只检查 `tailscaled` 进程不够。还要检查控制面在线状态、最近的重连时间和恢复日志，否则进程存在但节点不可达时，Orca 仍会表现为断线。

### Orca 又要求登录

命令行登录正常不代表交互式首次设置已完成。先备份配置，再按当前 Orca/Claude Code 文档完成 onboarding；不要直接复制或公开本地授权文件。

### 6768 没有防火墙保护

若防火墙是随 Tailscale 安装的，平台更新可能先恢复 Orca、后恢复 Tailscale，形成短暂暴露窗口。启动脚本发现无法建立规则时应失败退出，并让定时任务报告错误；不要在没有边界保护时继续把服务当作已完成。

### 连接走中继、延迟偏高

Tailscale 可能选择中继而不是直连。检查节点可达性、UDP、防火墙和网络位置；在确认安全边界没有被放宽的前提下，再决定是否调整网络。

## 九、验收清单

- [ ] 云电脑和所有客户端在同一 tailnet，MagicDNS 可解析实际节点名。
- [ ] Orca Server 正在运行，`6768` 只对 loopback 和 tailnet 开放。
- [ ] 设备配对凭据未写入仓库、日志或聊天记录。
- [ ] 远程 Claude Code 会话能在 MacBook 与手机之间保持可见。
- [ ] Tailscale 与 Orca 的恢复任务可重复执行，失败时会报警。
- [ ] 云电脑更新后能从 home 中的安装包和脚本恢复。
- [ ] 重要代码已推送到 Git，不依赖单台云电脑。
- [ ] Agent 的令牌、账号授权和生产动作仍有人确认。

## 来源与相关资料

- [AppSail 原始 X 帖子](https://x.com/app_sail/status/2108523630900748335)
- [原文提到的 SSH to Grok via Tailscale Bot](https://x.ai/bot/BrViAOWzDSiAjBLqUnBgA)
- [AppSail 的 VPS Picks](https://vps.appsail.dev/)
- [Tailscale 官方文档](https://tailscale.com/kb/)
- [Orca 项目发布页](https://github.com/stablyai/orca/releases)

本文中的主机名、IP、端口、目录和命令均应以当前版本与实际机器为准；先查看状态，再执行变更。
