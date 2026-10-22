> **GPT88 使用说明**
> 配置界面、客户端字段和连通性检查以 GPT88 当前接入文档为准。
>
> [快速开始](/docs/quickstart/) · [模型导航](/models/) · [GPT88 API Key 管理](/docs/guides/api-key-management/)

## Claude Code Windows 手动安装指南

## 文档概述

> **适用范围**
> 本安装教程适用于 Windows 原生、Windows WSL、macOS、Linux 终端用户，覆盖 Claude Code 完整手动安装与配置流程。

**相关配套配置文档：**

- [令牌选择与 API 配置](/docs/guides/gpt88-library/token-api-config/)
- [CCSwitch 配置教程](/docs/guides/gpt88-library/ccswitch/)
- [Node.js / npm 国内镜像配置教程](/docs/guides/gpt88-library/node-npm-mirror/)
- [常见报错问题](/docs/guides/gpt88-library/faq-errors/)
### 一、安装前置准备：安装 Node.js

### 资源准备

安装前请提前准备 Claude Code 运行所需 GPT88 API Key 和接口请求地址，详细获取方式参考文档： [令牌选择与 API 配置](/docs/guides/gpt88-library/token-api-config/)

### 重要安全须知

1. Claude / CCSwitch 通常使用不带 `/v1` 的 Base URL，最终接口地址以「令牌选择与 API 配置」页面为准；
1. API Key 属于私密凭证，仅可填写至本地配置文件，禁止发送至公开群聊、公开文档或截图分享。
## 二、安装 Node.js 运行环境

### Windows 两种安装方案

#### 方案一：官网安装包（推荐）

1. **下载地址：**[node.js官网](https://nodejs.org/en/download)
1. 点击 Windows installer（`.msi`）安装包下载；
1. **版本硬性要求：**Node.js v18.x 及以上版本；
1. 下载完成后双击 `.msi` 文件，启动安装向导；
1. 全程保持默认设置完成安装即可。
#### 方案二：Windows 包管理器安装

**打开终端执行对应命令安装，二选一运行：**

~~~powershell
# 使用 Chocolatey 安装
choco install nodejs
# 使用 Scoop 安装
scoop install nodejs
~~~

### Windows 使用注意事项

1. 推荐使用 PowerShell 终端操作，不建议使用 CMD；
1. 出现权限不足报错时，右键终端选择「以管理员身份运行」；
1. 部分杀毒软件会对 Node.js 产生误报，需将 Node.js 安装目录加入软件白名单。
### 验证 Node.js 安装是否成功

**打开 PowerShell / CMD，执行校验命令：**

~~~powershell
node --version
npm --version
~~~

> **验证成功**
> 终端正常输出版本号即代表安装成功。

### 三、全局安装 Claude Code

打开 PowerShell 或 CMD，执行国内镜像加速安装命令：

~~~powershell
npm install -g @anthropic-ai/claude-code --registry=https://registry.npmmirror.com
~~~

> **建议**
> **说明：**该命令自动下载并安装最新版 Claude Code；后续升级客户端同样执行此命令。

### 校验 Claude Code 安装状态

**执行版本查看命令：**

~~~powershell
claude --version
~~~

> **验证成功**
> 终端正常输出版本号，则代表 Claude Code 安装完成。

### 四、Claude Code 配置文件设置

### 配置文件路径说明

**通用配置路径：**`~/.claude/settings.json` Windows 系统完整路径：

~~~text
C:/Users/你的用户名/.claude
~~~

- 若 `.claude` 文件夹或 `settings.json` 文件不存在，可手动新建；
- 删除该配置文件仅会清空自定义配置，不会损坏 Claude Code 程序本体。
### 完整配置模板

将下方 JSON 内容写入 `settings.json`，替换 `sk-xxxxxxx` 为个人密钥：

~~~json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "sk-xxxxxxx",
    "ANTHROPIC_BASE_URL": "https://api.gpt88.cc/",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "claude code专用分组"
  },
  "theme": "auto"
}
~~~

### 参数释义

1. `ANTHROPIC_AUTH_TOKEN`**：**身份密钥，`sk-xxxxxxx` 替换为你的专属 Token（Claude Code 专用分组密钥，示例：claude-sonnet-4-6）；
1. `ANTHROPIC_BASE_URL`**：**接口请求基础地址，无官方通知请勿修改；
1. `ANTHROPIC_DEFAULT_SONNET_MODEL`：Claude Code 专属模型分组标识；
1. `theme`**：**界面主题，默认 auto 跟随系统。

### 五、启动与测试 Claude Code

### 方式1：全局直接启动

**任意终端目录执行命令：**

~~~powershell
claude
~~~

### 方式2：指定项目目录内启动

**先切换至本地项目文件夹，再启动客户端：**

~~~powershell
# 进入你的项目目录
cd C:\path\to\your\project
# 启动 Claude Code
claude
~~~

### 连通性测试

**进入 Claude Code 交互窗口后，输入测试文本：**

~~~text
你好
~~~

> **验证成功**
> 客户端正常返回回复内容，代表整套安装、配置流程全部生效。
