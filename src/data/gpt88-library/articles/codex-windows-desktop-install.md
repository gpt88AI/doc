> **GPT88 使用说明**
> 模型名、版本、默认值和平台入口可能随客户端版本变化，请按 GPT88 当前模型目录和客户端显示核对。
>
> [快速开始](/docs/quickstart/) · [模型导航](/models/) · [GPT88 API Key 管理](/docs/guides/api-key-management/)

## Codex Windows 桌面版安装指南

## 文档概述

> **适用范围**
> 本文档面向 Windows 系统用户，提供 Codex 桌面客户端两种完整安装方案、启动校验及故障排查操作指引。 重要前置说明：Codex 桌面版不会独立配置 GPT88，程序会自动读取本地 Codex 配置文件。建议先完成 Windows 命令行 Codex 配置，确认 `codex` 命令可正常对话后，再安装桌面客户端。

**关联配套技术文档：**

- [Codex Windows 一键安装教程（推荐新手）](/docs/integrations/dev/codex-cli/)
- [Codex Windows 手动安装教程](/docs/guides/gpt88-library/codex-windows-manual/)
- [Codex Windows 桌面版配置](/docs/guides/gpt88-library/codex-windows-desktop-config/)
- [Codex Mac / Linux 手动安装教程](/docs/guides/gpt88-library/codex-mac-linux/)
- [令牌选择与 API 配置](/docs/guides/gpt88-library/token-api-config/)
- [Windows PowerShell 权限修复教程](/docs/guides/gpt88-library/windows-powershell-policy/)
- [常见报错问题](/docs/guides/gpt88-library/faq-errors/)
### 一、安装前置准备

**安装前请完成两项校验：**

1. 已获取 GPT88 所需 Base URL 与 API Key；
1. Windows 本地 Codex 命令行配置已完成，CMD 执行 `codex` 可正常交互。
**未完成前置配置请查阅以下文档：**

- [Codex Windows 一键安装教程（推荐新手）](/docs/integrations/dev/codex-cli/)
- [Codex Windows 手动安装教程](/docs/guides/gpt88-library/codex-windows-manual/)
- [Codex Windows 桌面版配置](/docs/guides/gpt88-library/codex-windows-desktop-config/)
### 安全规范

> **安全提醒**
> API Key 属于私密身份凭证，仅允许填写至本地私有配置，禁止发送至公开群聊、共享文档或截图泄露。

### 二、安装方案一：微软商店正常安装（推荐）

适用于微软商店可正常访问的设备。

### 步骤1：访问官方下载页面

**浏览器打开官方页面地址：**

~~~text
https://openai.com/zh-Hans-CN/codex/
~~~

在页面内定位 Codex 桌面版下载/微软商店跳转入口。

### 步骤2：完成安装流程

> **验证成功**
> 跟随页面指引下载并安装桌面客户端；安装结束后，打开系统开始菜单，搜索 `Codex`，能检索到 OpenAI Codex 即代表安装完成。

### 三、安装方案二：离线 MSIX 包手动安装

**适用场景：**

1. 微软商店无法打开、点击安装无响应；
1. 双击 `.msix` 安装包弹出「文件系统错误(-2147219196)」；
1. 商店渠道下载失败。
> **安全提醒**
> **实现逻辑：**手动获取官方 MSIX 安装包，通过 PowerShell 命令行静默安装，绕过商店图形界面。 安全提示：仅使用 OpenAI 官方源安装包，拒绝不明来源修改安装包。

### 步骤1：打开商店解析工具页面

**浏览器访问解析站点：**

~~~text
https://store.rg-adguard.net
~~~

### 步骤2：填入 Codex 商店链接并查询

**输入框粘贴微软商店产品链接：**

~~~text
https://apps.microsoft.com/detail/9PLM9XGG6VKS
~~~

右侧下拉选择 `Retail`，点击查询按钮。

### 步骤3：筛选并下载对应 MSIX 安装包

**查询结果中筛选符合以下特征的文件：** 文件名格式参考：

~~~powershell
OpenAI.Codex_版本号_x64__2p2nqsd0c76g0.Msix
~~~

**筛选规则：**

1. 文件名包含 `OpenAI.Codex`；
1. 普通64位Windows设备选择 `x64` 架构包；
1. 版本号随官方更新变动属于正常现象；
1. 忽略 BlockMap、依赖类非安装文件。
> **建议**
> **下载异常处理：**点击下载无响应时，右键复制下载链接，地址栏手动补充 `https://` 后访问下载；建议保存至「下载」文件夹方便后续读取路径。

### 四、PowerShell 离线安装 MSIX 包

### 步骤1：启动 PowerShell

快捷键 `Win + X`，选择「终端」或「Windows PowerShell」； 安装权限报错时，右键选择「以管理员身份运行」。

### 步骤2：复制安装包完整路径

文件资源管理器定位已下载的 `.msix` 文件，右键文件选择「复制为路径」，复制结果示例：

~~~text
C:\Users\你的用户名\Downloads\OpenAI.Codex_26.415.3242.0_x64__2p2nqsd0c76g0.Msix
~~~

### 步骤3：执行安装指令

将下方命令内路径替换为你复制的真实文件路径，粘贴至 PowerShell 执行：

~~~powershell
Add-AppxPackage -Path "C:\Users\你的用户名\Downloads\OpenAI.Codex_版本号_x64__2p2nqsd0c76g0.Msix"
~~~

> **验证成功**
> 执行完成无红色报错即代表安装成功。

### 五、启动客户端与连通性验证

### 步骤1：启动 Codex 桌面版

**按下 Windows 键，搜索关键词：**

~~~powershell
Codex
~~~

打开 OpenAI Codex 桌面程序。

### 步骤2：重载本地配置文件

**若此前运行过桌面版，必须完全退出后重启：**

1. 右下角托盘找到 Codex 图标，点击 `Exit` 彻底关闭；
1. 异常进程可打开任务管理器，结束 Codex 相关进程后重新启动。
### 步骤3：对话连通测试

**进入客户端对话窗口输入测试文本：**

~~~text
你好
~~~

> **验证成功**
> 客户端正常返回对话内容，代表桌面版安装、配置全部生效。

## 六、常见故障排查

### 双击.msix 提示文件系统错误(-2147219196)

### 故障1：双击.msix 提示文件系统错误(-2147219196)

**根因：**Windows MSIX 图形安装组件异常，与 GPT88 配置无关。 解决方案：放弃双击安装，使用本文 PowerShell 命令行安装方式：

~~~powershell
Add-AppxPackage -Path "你的 msix 文件路径"
~~~


### PowerShell 提示找不到文件路径

### 故障2：PowerShell 提示找不到文件路径

**根因：**路径复制错误、引号缺失、文件位置变更。 解决方案：重新右键 MSIX 文件选择「复制为路径」，完整粘贴至命令参数内。


### 检索页面找不到 OpenAI.Codex 安装包

### 故障3：检索页面找不到 OpenAI.Codex 安装包

**排查步骤：**

1. **确认粘贴商店链接为：**`https://apps.microsoft.com/detail/9PLM9XGG6VKS`；
1. 右侧下拉选项必须选择 `Retail`；
1. 仅筛选文件名含 `OpenAI.Codex`、`x64`、`.Msix` 的文件。

### 桌面端启动后无法连接 GPT88

### 故障4：桌面端启动后无法连接 GPT88

**根因：**本地 Codex 命令行配置未生效、桌面缓存未刷新。 解决方案：

1. 先确认 CMD 执行 `codex` 可正常对话；
1. 托盘右键 `Exit` 完全退出桌面端，任务管理器结束残留进程后重启。

### 401 invalid token 认证失败

### 故障5：401 invalid token 认证失败

**根因：**API Key 复制不全、首尾携带多余空格、密钥失效。 解决方案：跳转 [令牌选择与 API 配置](/docs/guides/gpt88-library/token-api-config/) 重新复制完整密钥，更新本地 Codex 配置文件，彻底关闭桌面端后重启。


## 七、配套排错文档指引

1. **桌面端无法接入 GPT88：**查阅 [Codex Windows 桌面版配置](/docs/guides/gpt88-library/codex-windows-desktop-config/)
1. **PowerShell 脚本、权限报错：**查阅 [Windows PowerShell 权限修复教程](/docs/guides/gpt88-library/windows-powershell-policy/)
1. **401、流式报错、VS Code 插件异常：**查阅 [常见报错问题](/docs/guides/gpt88-library/faq-errors/)
