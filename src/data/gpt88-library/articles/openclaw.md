> **GPT88 使用说明**
> 配置界面、客户端字段和连通性检查以 GPT88 当前接入文档为准。
>
> [快速开始](/docs/quickstart/) · [模型导航](/models/) · [GPT88 API Key 管理](/docs/guides/api-key-management/)

## Openclaw 完整安装与 GPT88 接入配置教程

## 文档概述

> **适用范围**
> 本文档覆盖全新安装 Openclaw、已有实例重新配置两套操作流程，完成后可对接 GPT88 OpenAI 兼容接口服务。

### 一、全新安装 Openclaw（未安装过）

## 一、全新安装 Openclaw（未安装过）

根据操作系统选择对应终端安装脚本执行。

### 1.1 macOS / Linux 终端

~~~text
curl -fsSL https://openclaw.ai/install.sh | bash
~~~

### 1.2 Windows PowerShell

~~~text
iwr -useb https://openclaw.ai/install.ps1 | iex
~~~

### 1.3 Windows CMD

~~~text
curl -fsSL https://openclaw.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
~~~

### 二、全新安装后初始化引导 Onboarding（关键步骤）

## 二、全新安装后初始化引导 Onboarding（关键步骤）

安装完成执行初始化引导命令：

~~~text
openclaw onboard --install-daemon
~~~

按顺序完成16步配置：

1. 责任书确认：输入 `yes`
1. 配置模板选择：`QuickStart`
1. 配置处理策略：`Use existing values`
1. 模型服务商：`Custom Provider`
1. 填写 Base URL：`https://api.gpt88.cc/v1`
> **建议**
> 网络异常备选直连地址：`https://api.gpt88.cc/v1`

1. 密钥操作选项：`Paste API key now`
1. 粘贴来自网站「令牌管理」default 分组的 GPT88 API Key
1. 接口兼容类型：`openai-compatible`
1. 模型名称输入：`gpt-5.4` 或 `gpt-5.5`
1. 直接回车确认参数
1. 再次回车保存基础配置
1. 聊天渠道设置：下拉选择 `skip for now`
1. 模型额外检索：`skip for now`
1. 附加功能开关：`no`
1. 会话存储模式：`session-memory`
1. 回车完成全部初始化，即可正常对话

### 三、已安装 Openclaw 手动重新配置流程

## 三、已安装 Openclaw 手动重新配置流程

若本地已部署 Openclaw，无需重装，执行配置入口：

~~~text
openclaw config
~~~

分步操作：

1. 配置作用域：`Local`
1. 配置分类：`Model`
1. 服务商列表下滑选择：`Custom Provider`
1. Base URL 填入：`https://api.gpt88.cc/v1`
1. API Key 填入你的 GPT88 密钥（格式 sk-********）
1. 兼容协议选择：`OpenAI-compatible`
1. 指定模型：`gpt-5.4` / `gpt-5.5`
1. 直接回车确认下一步
1. 直接回车确认下一步
1. 保存配置完成，可发起对话测试

### 四、配套参考文档

## 四、配套参考文档

1. API Key、Base URL 获取与更新：[令牌选择与 API 配置](/docs/guides/gpt88-library/token-api-config/)
1. 全套工具手动配置合集：[手动配置教程](/docs/guides/gpt88-library/tokenrouter/manual/)
1. 运行报错、认证异常排查：[常见报错问题](/docs/guides/gpt88-library/faq-errors/)
