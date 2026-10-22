# GPT88 API Key 管理

GPT88 的 API Key 在 GPT88 控制台创建和管理。不要使用其他平台的系统访问令牌、用户 ID 请求头或 /api/token 管理接口。

## 创建

1. 登录 [GPT88 控制台](https://agent.gpt88.cc)。
2. 打开 [API Key 管理](https://agent.gpt88.cc/keys)。
3. 按项目、环境或用途创建独立 Key，例如 codex-dev 或 app-prod。
4. 根据当前控制台可选项设置分组或限制；选择前到[模型导航](/models/)确认模型可用性。
5. 创建后立即复制完整 Key 并放入可信的密码管理器或部署 Secret。

## 配置与验证

标准 API Base URL 是 https://api.gpt88.cc。在客户端填写 GPT88 Key 与模型导航列出的准确模型 ID，然后参考[快速开始](/docs/quickstart/)完成一次最小请求。回到控制台使用记录，按时间和 Key 名称核对请求。

## 搜索、停用与轮换

在密钥列表按名称或 Key 搜索，使用分组与状态筛选目标记录。轮换时先创建并验证新 Key，逐项更新服务，确认旧 Key 不再被使用后再撤销。若确认泄露，应立即撤销旧 Key。

## 安全要求

不要把 Key 放在浏览器前端、移动端公开包、代码仓库、截图或日志中。排查时只提供 Key 名称或末尾几位、请求时间和 Request ID，不发送完整 Key。

## 常见错误

- 401：检查是否用了 GPT88 API Key，而不是账户网页登录密码；确认 Key 完整且未撤销。
- 403：核对当前账户、Key 和模型的权限范围。
- 429：查看账户余额、速率和服务限制，不要通过重复创建 Key 绕过账户限制。
- 客户端失败但终端成功：逐项核对客户端实际读取的 Key、Base URL、认证格式和模型 ID。

更多信息见[认证与计费](/docs/auth/)、[完整接入指南](/docs/guides/complete-integration/)和[首次请求排查](/docs/guides/api-key-first-request-failed/)。
