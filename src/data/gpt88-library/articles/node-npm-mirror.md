> **GPT88 使用说明**
> 配置界面、客户端字段和连通性检查以 GPT88 当前接入文档为准。
>
> [快速开始](/docs/quickstart/) · [模型导航](/models/) · [GPT88 API Key 管理](/docs/guides/api-key-management/)

## Node.js / npm 国内镜像配置教程

## 文档概述

本文档适用于中国大陆网络环境，用于解决 npm 包下载缓慢、连接超时、安装卡死等问题，可在安装 Codex、Claude Code 等 CLI 工具前执行镜像切换操作。 当执行 npm 安装命令长时间转圈、无响应时，优先按照本文流程配置国内镜像，配置完成后重新执行安装指令即可。

### 一、适用场景

## 一、适用场景

出现以下任意一种情况，建议配置 npm 国内镜像：

1. 执行 `npm install` / `npm i` 命令长时间卡住无进度；
1. 包下载进度长时间停滞不动；
1. 下载速率极低；
1. 终端提示连接 npm 官方源超时。 若本地 npm 下载速度正常，则无需执行本配置。

### 二、操作步骤

## 二、操作步骤

### 步骤1：打开对应命令行终端

- Windows 系统：快捷键 `Win + R`，输入 `cmd` 回车，打开命令提示符；
- macOS / Linux 系统：直接打开系统「终端」应用。
### 步骤2：切换至国内镜像源

在终端执行镜像配置命令：

~~~text
npm config set registry https://registry.npmmirror.com
~~~

执行完成后，通过校验命令确认配置生效：

~~~text
npm config get registry
~~~

校验成功标准输出：

~~~text
https://registry.npmmirror.com/
~~~

输出匹配即代表国内镜像配置完成。

### 步骤3：返回安装步骤重新执行安装命令

镜像配置完成后，回到对应产品安装文档重新执行安装指令。 示例1：全局安装 Codex

~~~text
npm i -g @openai/codex
~~~

示例2：全局安装 Claude Code

~~~text
npm install -g @anthropic-ai/claude-code
~~~

补充说明：macOS / Linux 系统安装命令带有 `sudo` 前缀的，执行时保留 `sudo`。

### 三、下载速度依旧缓慢优化方案

## 三、下载速度依旧缓慢优化方案

若切换镜像后下载速度仍不理想，可先强制清理 npm 缓存，再重新执行安装：

~~~text
npm cache clean --force
~~~

### 四、恢复 npm 官方默认源

## 四、恢复 npm 官方默认源

如需切回 npm 海外官方仓库，执行恢复命令：

~~~text
npm config set registry https://registry.npmjs.org/
~~~

再次校验当前源地址：

~~~text
npm config get registry
~~~

恢复成功标准输出：

~~~text
https://registry.npmjs.org/
~~~

### 五、重要说明

## 五、重要说明

npm 国内镜像仅优化包文件下载速度，**不会修改 GPT88 的 Base URL、API Key、Codex / Claude Code 模型相关配置参数**，不会影响接口鉴权与模型调用逻辑。

### 六、关联配套文档

## 六、关联配套文档

1. Windows Codex 手动部署：[Codex Windows 手动安装教程](/docs/guides/gpt88-library/codex-windows-manual/)
1. macOS / Linux Codex 部署：[Codex Mac / Linux 手动安装教程](/docs/guides/gpt88-library/codex-mac-linux/)
1. PowerShell 脚本权限报错修复：[Windows PowerShell 权限修复教程](/docs/guides/gpt88-library/windows-powershell-policy/)
1. 各类客户端运行异常排查：[常见报错问题](/docs/guides/gpt88-library/faq-errors/)
