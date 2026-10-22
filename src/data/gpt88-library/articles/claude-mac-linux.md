> **GPT88 使用说明**
> 配置界面、客户端字段和连通性检查以 GPT88 当前接入文档为准。
>
> [快速开始](/docs/quickstart/) · [模型导航](/models/) · [GPT88 API Key 管理](/docs/guides/api-key-management/)

## Claude Code macOS / Linux 手动安装指南

## 文档概述

> **适用范围**
> 本安装教程适用于 macOS、Linux 系统，以及 Windows WSL / Linux 终端用户，完整覆盖 Claude Code 手动安装、环境配置与连通性校验全流程。

**关联配套技术文档：**

- [令牌选择与 API 配置](/docs/guides/gpt88-library/token-api-config/)
- [CCSwitch 配置教程](/docs/guides/gpt88-library/ccswitch/)
- [Node.js / npm 国内镜像配置教程](/docs/guides/gpt88-library/node-npm-mirror/)
- [常见报错问题](/docs/guides/gpt88-library/faq-errors/)
### 一、安装前置准备：准备 Node.js 与 API Key

### 前置资源准备

安装前请提前获取 Claude Code 运行所需 GPT88 API Key 与接口请求地址，详细获取指引参考文档： [令牌选择与 API 配置](/docs/guides/gpt88-library/token-api-config/)

### 重要安全规范

1. Claude / CCSwitch 标准 Base URL 不含 `/v1` 后缀，最终生效地址以「令牌选择与 API 配置」页面标注为准；
1. API Key 为私密身份凭证，仅允许填写至本地私有配置，禁止转发至公开群聊、共享文档或截图对外分享。
## 二、前置依赖：安装 Node.js

Claude Code 运行依赖 Node.js 运行时环境，未安装环境请按以下步骤操作：

1. **官方下载地址：**[https://nodejs.org/en/download](https://nodejs.org/en/download)
1. 推荐下载安装 LTS 长期支持版本；
1. **完成安装后打开终端，执行校验命令确认环境就绪：**
~~~bash
node -v
npm -v
~~~

> **验证成功**
> 终端正常输出版本号，代表 Node.js 与 npm 安装完成。

### 三、安装 Claude Code 命令行工具（CLI）

### 步骤1：全局安装 Claude Code

**在终端执行全局安装指令：**

~~~bash
sudo npm install -g @anthropic-ai/claude-code
~~~

#### 补充说明

1. 若下载卡顿、长时间无响应，可优先配置 npm 国内镜像后重试，参考文档：[Node.js / npm 国内镜像配置教程](/docs/guides/gpt88-library/node-npm-mirror/)；
1. 执行命令触发密码输入时，终端不会显示输入字符，输入本机登录密码后直接回车即可；
1. 本机 npm 无需管理员权限时，可删除指令内 `sudo` 前缀再执行。
### 步骤2：校验 Claude Code 安装结果

**安装完成后执行版本检测命令：**

~~~bash
claude --version
~~~

> **验证成功**
> 终端输出 `claude 1.x.x` / `claude 2.x.x` 格式版本号，代表客户端安装成功。

### 四、通过 CCSwitch 配置运行环境

CCSwitch 为 Claude Code 专用环境配置工具，可自动写入 GPT88 接口地址、API Key 等核心环境参数。

### 步骤1：下载安装 CCSwitch

1. **配置教程入口：**[CCSwitch 配置教程](/docs/guides/gpt88-library/ccswitch/)
1. **直接下载地址（选择对应系统安装包）：**[https://github.com/farion1231/cc-switch/releases/tag/v3.13.0](https://github.com/farion1231/cc-switch/releases/tag/v3.13.0)
1. 下载完成后按照程序向导完成安装。
### 步骤2：新建并启用 GPT88 配置

**打开 CCSwitch 客户端，按以下流程完成配置：**

1. 点击页面右上角「创建新配置」；
1. 填入从「令牌选择与 API 配置」页面获取的接口地址与 API Key；
1. 展开「高级选项」面板；
1. 点击「获取模型列表」自动拉取可用模型；
1. 将加载完成的模型标识填入模型配置栏；
1. 点击「保存」，并切换至当前新建配置为生效配置。
> **安全提醒**
> **提示：**若客户端按钮文字与本文描述存在细微差异，请以 CCSwitch 实时界面为准，核心目标为绑定 GPT88 接口、密钥与模型分组。

### 五、启动客户端并连通性验证

**返回终端，执行启动命令：**

~~~bash
claude
~~~

进入 Claude Code 交互窗口后输入测试文本校验连通性：

~~~text
你好
~~~

> **验证成功**
> 客户端正常返回对话回复，代表整套安装与配置流程全部生效。

## 六、常见故障排查

### 故障1：sudo 输入密码界面无字符显示

该现象为终端安全机制，属于正常情况，直接输入本机登录密码后回车即可。


### 故障2：执行 claude 提示 command not found

**故障原因：**终端环境变量未刷新或安装未完成。 处理方案：

1. **关闭当前终端窗口，重新打开全新终端重试版本检测命令：**
~~~bash
claude --version
~~~

1. **若报错依旧，重新执行全局安装指令：**
~~~bash
sudo npm install -g @anthropic-ai/claude-code
~~~


### 故障3：401 报错 / invalid token / 认证失败

**故障原因：**API Key 复制不全、存在多余空格、密钥失效。 处理方案：跳转 [令牌选择与 API 配置](/docs/guides/gpt88-library/token-api-config/) 重新复制完整密钥，在 CCSwitch 内更新配置并重新启用。


### 故障4：Claude Code 未接入 GPT88 服务

**处理方案：**核对 CCSwitch 内填写的接口地址与「令牌选择与 API 配置」页面地址保持一致，确认当前启用配置为新建的 GPT88 专用配置。
