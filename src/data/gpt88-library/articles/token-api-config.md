# GPT88 API 配置与令牌选择

本文整理 GPT88 的最短接入路径。网页控制台登录凭证与 API Key 是不同凭证；模型调用使用 GPT88 API Key。

## 完成标准

- 已在 GPT88 控制台创建一把用于当前应用的 API Key。
- 已确认目标模型出现在当前账户可用模型列表中。
- 客户端使用 https://api.gpt88.cc 作为标准 Base URL，并通过 Bearer 方式发送 Key。
- 已发送一个最小请求，并在使用记录中核对结果。

## 配置步骤

1. 登录 [GPT88 控制台](https://agent.gpt88.cc)，在 [API Key 管理](https://agent.gpt88.cc/keys) 创建并复制 Key。完整密钥只在可信位置保存。
2. 打开 [模型导航](/models/)，确认模型 ID、能力与账户当前可用范围。模型目录的公开信息不等同于某把 Key 已获权限。
3. 在客户端选择 OpenAI 兼容接口，填写 Base URL https://api.gpt88.cc，将 Key 放入 API Key 字段。除非对应客户端文档明确要求，否则不要在 Base URL 末尾重复追加 /v1。
4. 填入模型导航中的准确模型 ID。
5. 按[快速开始](/docs/quickstart/)发送最小请求；再到[认证与计费](/docs/auth/)查看余额、用量和错误说明。

## 分组与权限

分组、模型权限、余额与速率限制以当前 GPT88 控制台和模型目录显示为准。不要把其他平台的分组名、额度单位或密钥管理接口复制到 GPT88。

## 安全检查

Key 放在服务端环境变量或密钥管理器中，不要提交到代码仓库、公开网页、截图或日志。若发生泄露，先撤销对应 Key，再创建新 Key 并逐个更新使用它的服务。

## 相关文档

- [创建与管理 GPT88 API Key](/docs/guides/api-key-management/)
- [完整接入指南](/docs/guides/complete-integration/)
- [首次请求失败排查](/docs/guides/api-key-first-request-failed/)
