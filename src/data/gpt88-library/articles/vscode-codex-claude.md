> **GPT88 使用说明**
> 配置界面、客户端字段和连通性检查以 GPT88 当前接入文档为准。
>
> [快速开始](/docs/quickstart/) · [模型导航](/models/) · [GPT88 API Key 管理](/docs/guides/api-key-management/)

## VS Code Codex & Claude Code 插件使用完整教程

## 文档概述

> **适用范围**
> 本文档包含 VS Code Codex、Claude Code 插件前置部署要求、插件安装步骤，以及 WSL 环境下 DNS、代理网络异常全套修复方案。

### 重要前置提醒与插件部署要求

## 重要前置提醒

完成所有配置修改后，必须完全退出 VS Code 客户端并重新打开，新配置才可加载生效。

### 一、插件前置部署要求

## 一、插件前置部署要求

### 1.1 Codex VS Code 插件前置条件

使用 Codex 插件前，必须先完成 Codex 本地完整安装配置，根据操作系统选择对应教程：

- [Codex Windows 一键安装教程（推荐小白）](/docs/integrations/dev/codex-cli/)
- [Codex Windows 手动安装教程](/docs/guides/gpt88-library/codex-windows-manual/)
- [Codex macOS / Linux 手动安装教程](/docs/guides/gpt88-library/codex-mac-linux/)
Codex 本地配置完成后，打开 VS Code，在扩展市场搜索「Codex」完成安装即可使用。

### 1.2 Claude Code VS Code 插件前置条件

使用 Claude Code 插件前，必须先完成 Claude Code 本地完整安装配置，参考文档：

- [Claude Mac / Linux 手动安装教程](/docs/guides/gpt88-library/claude-mac-linux/)
### 1.3 VS Code 插件安装通用步骤

1. 启动 VS Code；
1. 左侧扩展面板搜索对应插件：`Claude Code for VS Code` / Codex；
1. 点击安装，安装完成后重启 VS Code。
### 1.4 WSL 环境额外说明

若在 Windows WSL 子系统中运行 Codex / Claude Code，需额外配置 DNS 与代理网络，详见下文完整修复方案。

## WSL 环境 Claude Code / Codex DNS 与网络配置教程

### 一、判断是否为 DNS 解析故障

## 一、判断是否为 DNS 解析故障

打开 WSL 终端执行检测命令：

~~~text
nslookup api.anthropic.com
curl -I https://api.openai.com
~~~

出现以下任意提示，判定为 DNS 解析异常：

1. `Could not resolve host`
1. `Temporary failure in name resolution`
1. nslookup 长时间无返回、超时
1. `/etc/resolv.conf` 内 nameserver 为 `172.x.x.x` 且无法 ping 通

### 二、临时 DNS 修复（重启 WSL 失效，仅用于验证网络）

## 二、临时 DNS 修复（重启 WSL 失效，仅用于验证网络）

WSL bash 终端执行：

~~~text
sudo rm /etc/resolv.conf
sudo tee /etc/resolv.conf > /dev/null <<'EOF'
nameserver 8.8.8.8
nameserver 1.1.1.1
EOF
~~~

修改后再次执行连通测试：

~~~text
curl -I https://api.openai.com
~~~

请求正常返回即确认是 DNS 问题，执行下方永久修复方案。

### 三、永久 DNS 修复方案（推荐）

## 三、永久 DNS 修复方案（推荐）

WSL 每次重启会自动覆盖 resolv.conf，需关闭自动生成并锁定配置文件。

### 步骤1：关闭 resolv.conf 自动生成

~~~text
sudo tee /etc/wsl.conf > /dev/null <<'EOF'
[network]
generateResolvConf = false
EOF
~~~

### 步骤2：写入稳定公共 DNS

~~~text
sudo rm -f /etc/resolv.conf
sudo tee /etc/resolv.conf > /dev/null <<'EOF'
nameserver 223.5.5.5
nameserver 119.29.29.29
nameserver 8.8.8.8
EOF
~~~

DNS 优先级说明：

- 使用国内中转服务：阿里DNS `223.5.5.5`、腾讯DNS `119.29.29.29` 放首位，解析速度更快；
- 直连官方接口：谷歌 `8.8.8.8`、Cloudflare `1.1.1.1` 放首位。
### 步骤3：锁定配置文件防止被覆盖

~~~text
sudo chattr +i /etc/resolv.conf
~~~

### 步骤4：重启 WSL 生效

切换至 Windows PowerShell 执行：

~~~text
wsl --shutdown
~~~

关闭后重新打开 WSL 终端，DNS 配置永久生效。

### 四、Windows 代理工具（Clash/V2ray/Mihomo）配套配置

## 四、Windows 代理工具（Clash/V2ray/Mihomo）配套配置

Windows 代理默认不被 WSL 继承，直连官方接口会访问失败，提供两种解决方案。

### 方案A：WSL 手动继承 Windows 代理端口

将以下内容追加至 `~/.bashrc`：

~~~text
export hostip=$(ip route show | grep -i default | awk '{print $3}')
export https_proxy="http://$hostip:7890"
export http_proxy="http://$hostip:7890"
export all_proxy="socks5://$hostip:7890"
~~~

> **提示**
> 将 `7890` 替换为你的代理软件实际监听端口； 关键前置设置：代理软件开启「允许局域网连接（Allow LAN）」，否则 WSL 无法连通代理。

写入后刷新配置：

~~~text
source ~/.bashrc
~~~

### 方案B：WSL2 镜像网络模式（Windows11 推荐，最简方案）

WSL2.0 及以上支持共用 Windows 完整网络栈，自动继承代理与 DNS，无需手动修改 resolv.conf。

1. 在 Windows 用户目录新建/编辑 `.wslconfig` 文件，路径：`C:\Users\<你的用户名>\.wslconfig`
~~~text
[wsl2]
networkingMode=mirrored
dnsTunneling=true
firewall=true
autoProxy=true
~~~

1. PowerShell 重启 WSL：
~~~text
wsl --shutdown
~~~

> **提示**
> 注意：开启镜像模式后，不要执行上文 `chattr +i /etc/resolv.conf` 锁定操作，交由系统自动管理 DNS。

### 五、网络连通验证命令与配置文件路径

## 五、网络连通验证命令

WSL bash 执行全套检测：

~~~text
# DNS 解析校验
nslookup api.anthropic.com
# OpenAI 接口连通测试
curl -I https://api.anthropic.com
curl -I https://api.openai.com
# GPT88 中转域名测试（替换为你实际中转地址）
curl -I https://你的中转域名/v1/models
~~~

> **验证成功**
> 返回 `HTTP/1.1 xxx` / `HTTP/2 xxx`（包含401、404均可）代表网络正常，Codex、Claude Code 插件可正常使用。

### 六、WSL Codex 配置文件路径说明

## 六、WSL Codex 配置文件路径说明

WSL 环境下 VS Code Codex 读取配置目录路径：

~~~text
\\wsl$\Ubuntu-22.04\home\<user>\.codex
~~~

### 配套排错文档

## 配套排错文档

- 各类客户端认证、流式异常：[常见报错问题](/docs/guides/gpt88-library/faq-errors/)
