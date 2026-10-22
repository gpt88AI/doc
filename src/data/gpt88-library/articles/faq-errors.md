> **GPT88 使用说明**
> 配置界面、客户端字段和连通性检查以 GPT88 当前接入文档为准。
>
> [快速开始](/docs/quickstart/) · [模型导航](/models/) · [GPT88 API Key 管理](/docs/guides/api-key-management/)

## 常见报错问题排查手册

### 文档概述

## 文档概述

本文档汇总 Codex、VS Code Codex 插件、GPT88 对接过程中高频报错、版本缺陷与对应完整修复方案,出现异常可按报错关键词快速检索处理。

### 一、API error 500 / 上游服务过载

## 一、API error 500 / 上游服务过载

### 故障现象

### 故障现象

返回 `API error 500`,服务端内部异常


### 处理步骤

### 处理步骤

1. 完全退出客户端后重新打开重试;
1. 单次重试无效则间隔一段时间再次测试;
1. 查看官方服务状态页面确认是否全局故障:
- Anthropic 服务状态:[https://status.anthropic.com/](https://status.anthropic.com/)
- OpenAI 服务状态:[https://status.openai.com/](https://status.openai.com/)

### 二、stream error: stream disconnected before completion

## 二、stream error: stream disconnected before completion

### 故障诱因分两类

### 故障诱因分两类

1. 模型思考时长超过 150s,OpenAI 侧强制截断会话,等待官方更新修复;
1. 本地客户端与 GPT88 网关网络连接中断。

### 修复方案

### 修复方案

排查本地网络、代理出口稳定性,更换网络环境重试。

### 三、Unable to persist auth file: 系统找不到指定的路径。(os error 3)

## 三、Unable to persist auth file: 系统找不到指定的路径。(os error 3)

### 处理方案

### 处理方案

全盘检索是否存在多余 `.codex` 文件夹,删除冗余目录后严格按照安装教程重新部署配置文件。

### 四、stream error: error sending request for url

## 四、stream error: error sending request for url

### 处理方案

### 处理方案

1. 替换配置内 Base URL;
1. 关闭全部终端窗口重新打开;
1. 检查本地代理、DNS 网络配置。

### 五、error start conversation

## 五、error start conversation

### 说明

### 说明

该故障为 VS Code Codex 插件已知缺陷,暂无临时修复手段,等待插件官方更新修复。

### 六、401 invalid token 令牌认证失败

## 六、401 invalid token 令牌认证失败

### 逐项核对修复点

### 逐项核对修复点

1. 确认 `config.toml` 内 `base_url` 地址填写规范;
1. `auth.json` 文件仅保留一行 `OPENAI_API_KEY` 配置,删除其余多余空行、注释;
1. 确认两个配置文件已正常保存、文件名无拼写错误;
1. 桌面端需右下角点击 `Exit` 完全退出后台进程后重启;命令行关闭终端重开。

### 七、通用 stream error(纯网络类报错)

## 七、通用 stream error(纯网络类报错)

### 处理方案

### 处理方案

切换手机热点等全新网络;若开启代理工具,临时关闭代理重试。

### 八、400 官方参数校验错误

## 八、400 官方参数校验错误

### 说明

### 说明

请求参数格式不符合接口规范,翻译报错提示文本,对照配置文件修改参数,新开会话重试。

### 九、Codex 版本专属问题汇总

## 九、Codex 版本专属问题汇总

### 9.1 VS Code 更新插件后历史会话丢失

### 9.1 VS Code 更新插件后历史会话丢失

故障规则:跨大版本升级插件会丢失本地会话缓存(示例:0.4.6 直接升级至 0.4.9)。 修复方案:回退至上一可用插件版本即可恢复历史对话记录。


### 9.2 无法选择思考等级

### 9.2 无法选择思考等级

限制说明:通过 API 接入模式暂不支持可视化切换思考等级,仅可在 `config.toml` 文件静态配置,等待官方迭代功能。


### 9.3 gpt-5-codex 文件编辑功能 Bug

### 9.3 gpt-5-codex 文件编辑功能 Bug

异常表现:

1. gpt-5 模型:文件编辑展示变更清单 `changed list`,支持点击查看完整修改;
1. `gpt-5`-codex 模型:仅通过命令行执行文件修改,无变更清单、不可点击追溯历史。 临时方案:临时切换 gpt-5 模型处理文件编辑场景,等待官方修复。

### 十、更新 CLI 后 VS Code 无法用 /model 切换 gpt-5-codex

## 十、更新 CLI 后 VS Code 无法用 /model 切换 gpt-5-codex

### 修复配置

### 修复配置

在 `[model_providers.gpt88]` 区块新增 `requires_openai_auth = true`,完整模板如下:

~~~text
model = "gpt-5.5"
model_provider = "gpt88"
preferred_auth_method = "apikey"
model_reasoning_effort = "high"
[model_providers.gpt88]
name = "GPT88"
base_url = "https://api.gpt88.cc"
wire_api = "responses"
requires_openai_auth = true

[desktop]
localeOverride = "zh-CN"
~~~

> **默认使用中文界面**
> Codex 桌面端默认界面语言设为简体中文：在 config.toml 的 [desktop] 下加入 localeOverride = "zh-CN"。配置示例已包含此项；[desktop] 与 [model_providers.*] 是并列配置节，不要把 localeOverride 写入服务商配置节。已有 [desktop] 时在该节内修改原值，不要重复创建。保存后完全退出并重新打开 Codex。

### 十一、客户端响应速度极慢

## 十一、客户端响应速度极慢

### 说明

### 说明

`codex-5-high` 内置深度思考逻辑,无可视化思考过程展示,生成文本质量更高,耗时更长; 提速方案:同时打开多个客户端窗口并行处理任务。

### 十二、配套关联技术文档

## 十二、配套关联技术文档

1. API 密钥、网关地址获取:[令牌选择与 API 配置](/docs/guides/gpt88-library/token-api-config/)
1. Windows Codex 手动部署:[Codex Windows 手动安装教程](/docs/guides/gpt88-library/codex-windows-manual/)
1. Codex 桌面端可视化配置:[Codex Windows 桌面版配置](/docs/guides/gpt88-library/codex-windows-desktop-config/)
1. PowerShell 脚本权限拦截报错修复:[Windows PowerShell 权限修复教程](/docs/guides/gpt88-library/windows-powershell-policy/)
1. npm 下载缓慢、安装超时:[Node.js / npm 国内镜像配置教程](/docs/guides/gpt88-library/node-npm-mirror/)
1. 全套工具教程总目录:[手动配置教程](/docs/guides/gpt88-library/tokenrouter/manual/)
